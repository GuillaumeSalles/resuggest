const wrapInExports = code =>
  `(function(exports) {${code}})(window.exports = {})`;

function compileReason(reason) {
  const converted = window.refmt(reason, "RE", "implementation", "ML");
  const ocaml = converted[1];
  return JSON.parse(window.ocaml.compile(ocaml));
}

const guessType = reasonExpression => {
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
};

const reasonExpToJs = reasonExp => {
  if (reasonExp.length === 0) {
    return {
      code: reasonExp,
      jsValue: null,
      type: null,
      error: null
    };
  }

  const reasonCode = `let exp = ${reasonExp};`;
  const compilationResult = compileReason(reasonCode);
  if (compilationResult.js_code) {
    window.eval(wrapInExports(compilationResult.js_code));
    return {
      code: reasonExp,
      jsValue: window.exports.exp,
      type: guessType(reasonExp),
      error: null
    };
  } else {
    return {
      code: reasonExp,
      jsValue: null,
      type: null,
      error: compilationResult.text
    };
  }
};

export default reasonExpToJs;
