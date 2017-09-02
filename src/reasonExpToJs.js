const wrapInExports = code =>
  `(function(exports) {${code}})(window.exports = {})`;

function compileReason(reason) {
  const converted = window.refmt(reason, "RE", "implementation", "ML");
  const ocaml = converted[1];
  return JSON.parse(window.ocaml.compile(ocaml));
}

const reasonExpToJs = reasonExp => {
  const reasonCode = `let exp = ${reasonExp};`;
  const compilationResult = compileReason(reasonCode);
  if (compilationResult.js_code) {
    window.eval(wrapInExports(compilationResult.js_code));
    return {
      jsValue: window.exports.exp,
      error: null
    };
  } else {
    return {
      jsValue: null,
      error: compilationResult.text
    };
  }
};

export default reasonExpToJs;
