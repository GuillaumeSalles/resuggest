export const funcWithOneParam = [
  "(~-)",
  "(~+)",
  "succ",
  "pred",
  "abs",
  "lnot",

  "(~-.)",
  "(~+.)",
  "sqrt",
  "exp",
  "log",
  "log10",
  "expm1",
  "cos",
  "sin",
  "tan",
  "acos",
  "asin",
  "atan",
  "cosh",
  "sinh",
  "tanh",
  "ceil",
  "floor",
  "abs_float",

  "String.trim",
  "String.escaped",
  "String.uppercase",
  "String.lowercase",
  "String.capitalize",
  "String.uncapitalize",

  "string_of_bool",
  "bool_of_string",
  "string_of_int",
  "int_of_string",
  "String.length",
  "string_of_float",
  "float_of_string",

  "List.length",
  "List.hd",
  "List.tl",
  "List.rev",
  "List.concat",
  "List.flatten"
];

export const funcWithTwoParams = [
  "(+)",
  "(-)",
  "(*)",
  "(/)",
  "(mod)",
  "(land)",
  "(lor)",
  "(lxor)",
  "lsl",
  "lsr",
  "ars",

  "(+.)",
  "(-.)",
  "(*.)",
  "(/.)",
  "(**)",
  "atan2",
  "hypot",
  "copysign",
  "mod_float",

  "String.get",
  "String.make",
  "String.init",
  "String.mapi",
  "String.map",
  "String.index",
  "String.contains",
  "(^)",

  "=",
  "(@)",
  "List.nth",
  "List.append",
  "List.rev_append",
  "List.map",
  "List.mapi",
  "List.rev_map",
  "List.exists",
  "List.mem",
  "List.memq",
  "List.find",
  "List.filter",
  "List.find_all",
  "List.partition",
  "List.sort",
  "List.fast_sort",
  "List.sort_uniq"
];

export const funcWithThreeParams = [
  "String.sub",
  "String.index_from",
  "String.rindex_from",
  "String.contains_from",
  "String.rcontains_from",
  "List.fold_left",
  "List.fold_right",
  "List.map2",
  "List.rev_map2",
  "List.exists2",
  "List.merge"
];

export const funcWithFourParams = ["List.fold_left2", "List.fold_right2"];

export default funcWithOneParam
  .map(x => ({ numberOfArgs: 1, functionName: x }))
  .concat(funcWithTwoParams.map(x => ({ numberOfArgs: 2, functionName: x })))
  .concat(funcWithThreeParams.map(x => ({ numberOfArgs: 3, functionName: x })))
  .concat(funcWithFourParams.map(x => ({ numberOfArgs: 4, functionName: x })));
