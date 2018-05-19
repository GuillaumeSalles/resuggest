const functions = [
  // Pervasives

  // Comparisons
  "(==)",
  "(!=)",
  "(<)",
  "(>)",
  "(<=)",
  "(>=)",
  "compare",
  "min",
  "max",
  "(===)",
  "(!==)",

  // Boolean
  "(!)",
  "(&&)",
  "(||)",

  // Composition Operators
  "(|>)",
  "(@@)",

  // Integer arithmetic
  "(~-)",
  "(~+)",
  "succ",
  "pred",
  "(+)",
  "(-)",
  "(*)",
  "(/)",
  "(mod)",
  "abs",

  // Bitwise operations
  "lnot",
  "(land)",
  "(lor)",
  "(lxor)",
  "(lsl)",
  "(lsr)",
  "(asr)",

  // Floating-point arithmetic
  "(~-.)",
  "(~+.)",
  "(+.)",
  "(-.)",
  "(*.)",
  "(/.)",
  "(**)",
  "sqrt",
  "exp",
  "log",
  "log10",
  "expm1",
  "log1p",
  "cos",
  "sin",
  "tan",
  "acos",
  "asin",
  "atan",
  "atan2",
  "hypot",
  "cosh",
  "sinh",
  "tanh",
  "ceil",
  "floor",
  "abs_float",
  "copysign",
  "mod_float",
  // "frexp"
  // "ldexp"
  // "modf"
  "float",
  "float_of_int",
  "truncate",
  "int_of_float",

  // String operations
  "(++)",

  // Character operations
  "int_of_char",
  "char_of_int",

  // String conversion functions
  "string_of_bool",
  "bool_of_string",
  "string_of_int",
  "int_of_string",
  "string_of_float",
  "float_of_string",

  // Pair operations
  // "fst",
  // "snd",

  // List operations
  "(@)",

  "Char.code",
  "Char.chr",
  "Char.escaped",
  "Char.lowercase",
  "Char.uppercase",

  "String.get",
  "String.make",
  "String.init",
  "String.sub",
  "String.mapi",
  "String.map",
  "String.trim",
  "String.escaped",
  "String.uppercase",
  "String.lowercase",
  "String.capitalize",
  "String.uncapitalize",
  "String.index",
  "String.rindex",
  "String.index_from",
  "String.rindex_from",
  "String.contains",
  "String.contains_from",
  "String.rcontains_from",
  "String.length",

  "List.append",
  "List.rev_append",
  "List.length",
  "List.hd",
  "List.tl",
  "List.rev",
  "List.nth",
  "List.concat",
  "List.flatten",
  "List.map",
  "List.rev_map",
  "List.mapi",
  "List.fold_left",
  "List.fold_right",
  "List.map2",
  "List.rev_map2",
  "List.fold_left2",
  "List.fold_right2",
  "List.exists",
  "List.exists2",
  "List.mem",
  "List.memq",
  "List.find",
  "List.filter",
  "List.find_all",
  "List.sort",
  "List.stable_sort",
  "List.fast_sort",
  "List.sort_uniq",
  "List.merge",

  "Array.length",
  "Array.get",
  "Array.make",
  "Array.init",
  "Array.make_matrix",
  "Array.append",
  "Array.concat",
  "Array.sub",
  "Array.copy",
  "Array.to_list",
  "Array.of_list",
  "Array.map",
  "Array.mapi",
  "Array.fold_left",
  "Array.fold_right",
  "Array.make_float"
];

require("../public/bsReasonReact");
const { printML, parseRE } = require("../public/refmt");
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
