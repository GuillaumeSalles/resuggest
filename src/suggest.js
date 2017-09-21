import parseType from "./parseType";
import { isEqual, flatten } from "lodash";
import typeKinds from "./typeKinds";
import { caml_equal } from "bs-platform/lib/js/caml_obj";
import $$Array from "bs-platform/lib/js/array.js";

const db = require("./generated/db.js");

const permutator = inputArr => {
  let result = [];
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(inputArr);
  return result;
};

const astTypeToFunctionPairs = Object.values(db).map(([type, funcs]) => [
  parseType(type),
  $$Array.of_list(funcs)
]);

const makeAstFunctionType = (inputs, output) => {
  if (inputs.length === 0) {
    return parseType(output.type);
  }
  return {
    kind: typeKinds.func,
    input: parseType(inputs[0].type),
    output: makeAstFunctionType(inputs.slice(1), output)
  };
};

export function isTypeAssignable(left, right, genericsMap = {}) {
  if (left.kind === typeKinds.generic) {
    if (right.kind === typeKinds.generic && left.type === right.type) {
      return true;
    }
    if (genericsMap[left.type] === undefined) {
      genericsMap[left.type] = right;
      return true;
    } else {
      var result = isTypeAssignable(genericsMap[left.type], right, genericsMap);
      return result;
    }
  }

  if (left.kind !== right.kind) {
    return false;
  }

  if (left.kind === typeKinds.simple) {
    return left.type === right.type;
  }

  if (left.kind === typeKinds.list) {
    return isTypeAssignable(left.itemType, right.itemType, genericsMap);
  }

  if (left.kind === typeKinds.func) {
    return (
      isTypeAssignable(left.input, right.input, genericsMap) &&
      isTypeAssignable(left.output, right.output, genericsMap)
    );
  }

  throw new Error("Unsupported type kind", left.kind);
}

export function orderedSuggest(inputs, output) {
  const expectedFunctionType = makeAstFunctionType(inputs, output);
  const reasonInputs = inputs.map(i => i.jsValue);
  const functionsWithMatchingSignature = flatten(
    astTypeToFunctionPairs
      .filter(([ast, funcs]) => {
        return isTypeAssignable(ast, expectedFunctionType);
      })
      .map(([ast, funcs]) => funcs)
  );

  return functionsWithMatchingSignature
    .filter(
      ([func, _name]) =>
        caml_equal(func.apply(null, reasonInputs), output.jsValue) === 1
    )
    .map(([_func, name]) => name)
    .map(functionName => ({
      functionName,
      inputs,
      output
    }));
}

export default function suggest(inputs, output) {
  return flatten(
    permutator(inputs).map(permutedInputs =>
      orderedSuggest(permutedInputs, output)
    )
  );
}
