import {
  CompilationResult,
  AstFunctionType,
  AstTypeKind,
  AstType,
  SuccessfulCompilationResult
} from "./types";

import parseType from "./parseType";
import isTypeAssignable from "./isTypeAssignable";
import { caml_equal } from "bs-platform/lib/js/caml_obj";
import * as $$Array from "bs-platform/lib/js/array.js";
import reasonExpToJs from "./reasonExpToJs";
import uniquePermutations from "./uniquePermutations";
import flatten from "./flatten";
import * as db from "./generated/db.js";

var compilationCache = new Map();

function memoizedReasonExpToJs(exp: string): CompilationResult {
  if (compilationCache.has(exp)) {
    return compilationCache.get(exp);
  }

  let result = reasonExpToJs(exp);
  compilationCache.set(exp, result);
  return result;
}

type AstTypeToFuncs = [AstType, any[]];

const strToFunctionPair = Object.values(db) as [string, any[]][];
const astTypeToFunctionPairs: AstTypeToFuncs[] = strToFunctionPair.map(
  ([type, funcs]) => {
    return [parseType(type), $$Array.of_list(funcs)] as AstTypeToFuncs;
  }
);

export function makeAstFunctionType(
  inputs: SuccessfulCompilationResult[],
  output: SuccessfulCompilationResult
): AstType {
  if (inputs.length === 0) {
    return parseType(output.type);
  }
  return {
    kind: AstTypeKind.func,
    input: parseType(inputs[0].type),
    output: makeAstFunctionType(inputs.slice(1), output)
  };
}

export function orderedSuggest(
  inputs: SuccessfulCompilationResult[],
  output: SuccessfulCompilationResult
) {
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
      inputs,
      output
    }));
}

function isFailedCompulationResult(
  compilationResult: CompilationResult
): boolean {
  return compilationResult.kind === "fail";
}

function isSucessfulCompilationResult(
  compilationResult: CompilationResult
): boolean {
  return compilationResult.kind === "success";
}

export default function suggest(inputs: string[], output: string) {
  const compiledInputs = inputs.map(memoizedReasonExpToJs);
  const compiledOutput = memoizedReasonExpToJs(output);

  if (
    compiledInputs.some(isFailedCompulationResult) ||
    isFailedCompulationResult(compiledOutput)
  ) {
    return {
      inputs: compiledInputs,
      output: compiledOutput,
      suggestions: []
    };
  }

  var validInputs = compiledInputs.filter(
    isSucessfulCompilationResult
  ) as SuccessfulCompilationResult[];

  if (
    validInputs.length === 0 ||
    !isSucessfulCompilationResult(compiledOutput)
  ) {
    return {
      inputs: compiledInputs,
      output: compiledOutput,
      suggestions: []
    };
  }

  return {
    inputs: compiledInputs,
    output: compiledOutput,
    suggestions: flatten(
      uniquePermutations(validInputs).map(permutedInputs =>
        orderedSuggest(
          permutedInputs,
          compiledOutput as SuccessfulCompilationResult
        )
      )
    )
  };
}
