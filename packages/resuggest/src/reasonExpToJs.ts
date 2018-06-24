import { CompilationResult } from "./types";
import parseType from "./parseType";

function wrapInExports(code: string): string {
  return `(function(exports) {${code}})(window.exports = {})`;
}

function compileReason(reason: string) {
  try {
    const ocaml = (<any>window).printML((<any>window).parseRE(reason));
    return (<any>window).ocaml.compile(ocaml);
  } catch (er) {
    return {
      text: er.message
    };
  }
}

function guessType(reasonExpression: string): string {
  const compilationResult = compileReason(
    `let exp = (${reasonExpression}) == 1;`
  );
  if (compilationResult.js_code) {
    return "int";
  } else {
    // error format : "This expression has type int but an expression was expected of type {expressionType}"
    const type = compilationResult.text.substring(69).trim();
    return type;
  }
}

function reasonExpToJs(reasonExp: string): CompilationResult {
  if (reasonExp.trim().length === 0) {
    return {
      kind: "empty",
      code: reasonExp
    };
  }

  const reasonCode = `let exp = ${reasonExp};`;
  const compilationResult = compileReason(reasonCode);
  if (compilationResult.js_code) {
    (<any>window).eval(wrapInExports(compilationResult.js_code));
    return {
      kind: "valid",
      code: reasonExp,
      jsValue: (<any>window).exports.exp,
      type: parseType(guessType(reasonExp))
    };
  } else {
    return {
      kind: "fail",
      code: reasonExp,
      error: compilationResult.text
    };
  }
}

export default reasonExpToJs;
