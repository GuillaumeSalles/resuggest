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
  inputs: ValidCompilationResult[],
  output: ValidCompilationResult
): AstType {
  if (inputs.length === 0) {
    return parseType(output.type);
  }
  return {
    kind: AstTypeKind.Func,
    input: parseType(inputs[0].type),
    output: makeAstFunctionType(inputs.slice(1), output)
  };
}

export function orderedSuggest(
  inputs: ValidCompilationResult[],
  output: ValidCompilationResult
): Suggestion[] {
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
      example: makeExample(functionName, inputs, output)
    }));
}

function sucessfulCompilationResultOrNull(
  compilationResult: CompilationResult
): ValidCompilationResult | null {
  if (compilationResult.kind === "valid") {
    return compilationResult;
  } else {
    return null;
  }
}

function filterValidCompilationResults(
  compilationResults: CompilationResult[]
): ValidCompilationResult[] {
  return compilationResults.filter(
    r => r.kind === "valid"
  ) as ValidCompilationResult[];
}

export default function suggest(
  inputs: CompiledInput[],
  output: CompilationResult
) {
  const validOuput = sucessfulCompilationResultOrNull(output);
  const validInputs = filterValidCompilationResults(
    inputs.map(i => i.expression)
  );

  if (validInputs.length === 0 || validOuput === null) {
    return {
      inputs,
      output,
      suggestions: []
    };
  }

  return {
    inputs,
    output,
    suggestions: flatten(
      uniquePermutations(validInputs).map(permutedInputs =>
        orderedSuggest(permutedInputs, validOuput)
      )
    )
  };
}
