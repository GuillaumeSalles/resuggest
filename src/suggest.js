import parseType from "./parseType";
import { isEqual, flatten } from "lodash";
import typeKinds from "./typeKinds";

import {
  int_int,
  int_int_int,
  float_float,
  float_float_float,
  string_string,
  string_int_char,
  lista_lista,
  a_a_bool,
  aToB_lista_listb
} from "./generated/functions";

const typeToFunctionPairs = [
  ["int -> int", int_int],
  ["int -> int -> int", int_int_int],
  ["float -> float", float_float],
  ["float -> float -> float", float_float_float],
  ["string -> string", string_string],
  ["'a list -> 'a list", lista_lista],
  ["'a -> 'a -> bool", a_a_bool],
  ["('a -> 'b) -> 'a list -> 'b list", aToB_lista_listb]
];

const astTypeToFunctionPairs = typeToFunctionPairs.map(([type, func]) => [
  parseType(type),
  func
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

export default function suggest(inputs, output) {
  const expectedFunctionType = makeAstFunctionType(inputs, output);
  const typedSuggestFunctions = astTypeToFunctionPairs
    .filter(([ast, func]) => {
      return isTypeAssignable(ast, expectedFunctionType);
    })
    .map(([ast, func]) => func);

  const reasonInputs = inputs.map(i => i.jsValue).concat([output.jsValue]);

  return flatten(
    typedSuggestFunctions.map(func => {
      var result = func.apply(null, reasonInputs);
      return result;
    })
  );
}
