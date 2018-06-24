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

export function orderedSuggest(
  inputs: CompiledInput[],
  output: ValidCompilationResult
): Suggestion[] {
  const expectedFunctionType = makeAstFunctionType(
    inputs.map(i => i.expression.type),
    output.type
  );
  const reasonInputs = inputs.map(i => i.expression.jsValue);
  const functionsWithMatchingSignature = flatten(
    astTypeToFunctionPairs
      .filter(([ast, funcs]) => {
        return isTypeAssignable(ast, expectedFunctionType);
      })
      .map(([ast, funcs]) => funcs)
  );

  return functionsWithMatchingSignature
    .filter(([func, _name]) => {
      try {
        return (
          caml_equal(func.apply(null, reasonInputs), output.jsValue) === true
        );
      } catch (ex) {
        return false;
      }
    })
    .map(([_func, name]) => name)
    .map(functionName => ({
      functionName,
      example: makeExample(functionName, inputs.map(i => i.expression), output)
    }));
}

function validCompilationResultOrNull(
  compilationResult: CompilationResult
): ValidCompilationResult | null {
  if (compilationResult.kind === "valid") {
    return compilationResult;
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
  const validOuput = validCompilationResultOrNull(output);
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
