const functions = require("./functions");
require("../../../public/bsReasonReact");
const { printML, parseRE } = require("../../../public/refmt");
var fs = require("fs");

function compileReason(reason) {
  const ocamlCode = printML(parseRE(reason));
  return ocaml.compile(ocamlCode);
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

function makeReasonArrayOfFunctions(name, type, functions) {
  const fns = functions.map(fnName => `(${fnName},"${fnName}")`).join(",");
  return `let ${name} = ("${type}",[${fns}]);`;
}

const functionsByType = new Map();

for (var functionName of functions) {
  const type = guessType(functionName);
  if (!functionsByType.has(type)) {
    functionsByType.set(type, []);
  }
  functionsByType.get(type).push(functionName);
}

const tmpReasonFileContent = Array.from(functionsByType)
  .map(([type, fns], i) => makeReasonArrayOfFunctions("f" + i, type, fns))
  .join("\n");

fs.writeFileSync(
  "./src/generated/db.js",
  compileReason(tmpReasonFileContent).js_code.replace(
    /stdlib/g,
    "bs-platform/lib/js"
  )
);
