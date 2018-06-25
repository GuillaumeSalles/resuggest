import suggest from "./suggest";
import reasonExpToJs from "./reasonExpToJs";
import { CompilationResult, Input } from "./types";

var compilationCache = new Map();

function memoizedReasonExpToJs(exp: string): CompilationResult {
  if (compilationCache.has(exp)) {
    return compilationCache.get(exp);
  }

  let result = reasonExpToJs(exp);
  compilationCache.set(exp, result);
  return result;
}

export default function(inputs: Input[], output: string) {
  const compiledInputs = inputs.map(input => ({
    expression: memoizedReasonExpToJs(input.code),
    expectedMutation:
      input.expectedMutation !== null
        ? memoizedReasonExpToJs(input.expectedMutation)
        : null
  }));
  const compiledOutput = memoizedReasonExpToJs(output);
  return {
    inputs: compiledInputs,
    output: compiledOutput,
    suggestions: suggest(compiledInputs, compiledOutput)
  };
}
