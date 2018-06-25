import {
  CompilationResult,
  AstTypeKind,
  AstType,
  ValidCompilationResult,
  Suggestion,
  Input,
  CompiledInput
} from "./types";

import parseType from "./parseType";
import isTypeAssignable from "./isTypeAssignable";
import { caml_equal } from "bs-platform/lib/js/caml_obj";
import * as $$Array from "bs-platform/lib/js/array.js";
import uniquePermutations from "./uniquePermutations";
import flatten from "./flatten";
import * as db from "./generated/db.js";
import makeExample from "./makeExample";

type AstTypeToFuncs = [AstType, any[]];

const strToFunctionPair = Object.values(db) as [string, any[]][];
const astTypeToFunctionPairs = strToFunctionPair.map(([type, funcs]) => {
  return [parseType(type), $$Array.of_list(funcs)] as AstTypeToFuncs;
});

export function makeAstFunctionType(
  inputs: AstType[],
  output: AstType
): AstType {
  if (inputs.length === 0) {
    return output;
  }
  return {
    kind: AstTypeKind.Func,
    input: inputs[0],
    output: makeAstFunctionType(inputs.slice(1), output)
  };
}

function prepareInputValues(inputs: CompiledInput[]): any[] {
  return inputs.map(i => {
    if (i.expectedMutation !== null) {
      // If mutation is expected, we assume jsValue is an array so we clone it
      return i.expectedMutation.jsValue.slice(0);
    } else {
      return i.expression.jsValue;
    }
  });
}

function doesFunctionPassExample(
  func: Function,
  inputs: CompiledInput[],
  output: ValidCompilationResult
): boolean {
  try {
    const preparedInputs = prepareInputValues(inputs);
    const expectedOutput = output.jsValue;
    const actualOutput = func.apply(null, preparedInputs);
    const areOutputsEqual = caml_equal(actualOutput, expectedOutput) === true;
    const areMutationsCorrect = preparedInputs.every((input, index) => {
      if (inputs[index].expectedMutation === null) {
        return caml_equal(input, inputs[index].expression.jsValue) === true;
      } else {
        return (
          caml_equal(input, inputs[index].expectedMutation.jsValue) === true
        );
      }
    });
    return areOutputsEqual && areMutationsCorrect;
  } catch (ex) {
    return false;
  }
}

export function orderedSuggest(
  inputs: CompiledInput[],
  output: ValidCompilationResult
): Suggestion[] {
  const expectedFunctionType = makeAstFunctionType(
    inputs.map(i => i.expression.type),
    output.type
  );

  const functionsWithMatchingSignature = flatten(
    astTypeToFunctionPairs
      .filter(([ast, funcs]) => {
        return isTypeAssignable(ast, expectedFunctionType);
      })
      .map(([ast, funcs]) => funcs)
  );

  return functionsWithMatchingSignature
    .filter(([func, _name]) => {
      return doesFunctionPassExample(func, inputs, output);
    })
    .map(([_func, name]) => name)
    .map(functionName => ({
      functionName,
      example: makeExample(functionName, inputs, output)
    }));
}

function validateOutput(
  output: CompilationResult
): ValidCompilationResult | null {
  if (output.kind === "valid") {
    return output;
  } else if (output.kind === "empty") {
    return {
      kind: "valid",
      code: "",
      type: { kind: AstTypeKind.Unit },
      jsValue: 0
    };
  } else {
    return null;
  }
}

function filterValidInputs(
  inputs: Array<{
    expression: CompilationResult;
    expectedMutation: CompilationResult | null;
  }>
): CompiledInput[] {
  return inputs.filter(input => {
    return (
      input.expression.kind === "valid" &&
      (input.expectedMutation === null ||
        input.expectedMutation.kind === "valid")
    );
  }) as CompiledInput[];
}

export default function suggest(
  inputs: Array<{
    expression: CompilationResult;
    expectedMutation: CompilationResult | null;
  }>,
  output: CompilationResult
) {
  const validOuput = validateOutput(output);
  const validInputs = filterValidInputs(inputs);

  if (validInputs.length === 0 || validOuput === null) {
    return [];
  }

  return flatten(
    uniquePermutations(validInputs).map(permutedInputs =>
      orderedSuggest(permutedInputs, validOuput)
    )
  );
}
