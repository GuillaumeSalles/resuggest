let suggest_1 funcs input output =>
  funcs |> List.filter (fun (func, _name) => func input == output) |> List.map snd |> Array.of_list;

let suggest_2 funcs input1 input2 output =>
  funcs |> List.filter (fun (func, _name) => func input1 input2 == output) |> List.map snd |> Array.of_list;

let suggest_3 funcs input1 input2 input3 output =>
  funcs |> List.filter (fun (func, _name) => func input1 input2 input3 == output) |> List.map snd |> Array.of_list;

let int_int =
  suggest_1 [
    ((~-), "(~-)"),
    ((~+), "(~+)"),
    (succ, "succ"),
    (pred, "pred"),
    (abs, "abs"),
    (lnot, "lnot")
  ];

let float_float =
  suggest_1 [
    ((~-.), "(~-.)"),
    ((~+.), "(~+.)"),
    (sqrt, "sqrt"),
    (exp, "exp"),
    (log, "log"),
    (log10, "log10"),
    (expm1, "expm1"),
    (cos, "cos"),
    (sin, "sin"),
    (tan, "tan"),
    (acos, "acos"),
    (asin, "asin"),
    (atan, "atan"),
    (cosh, "cosh"),
    (sinh, "sinh"),
    (tanh, "tanh"),
    (ceil, "ceil"),
    (floor, "floor"),
    (abs_float, "abs_float")
  ];

let int_int_int =
  suggest_2 [
    ((+), "(+)"),
    ((-), "(-)"),
    (( * ), "(*)"),
    ((/), "(/)"),
    ((mod), "(mod)"),
    ((land), "(land)"),
    ((lor), "(lor)"),
    ((lxor), "(lxor)"),
    ((lsl), "lsl"),
    ((lsr), "lsr"),
    ((asr), "ars")
  ];

let float_float_float =
  suggest_2 [
    ((+.), "(+.)"),
    ((-.), "(-.)"),
    (( *. ), "(*.)"),
    ((/.), "(/.)"),
    (( *\* ), "(**)"),
    (atan2, "atan2"),
    (hypot, "hypot"),
    (copysign, "copysign"),
    (mod_float, "mod_float")
  ];

let string_int_char = suggest_2 [(String.get, "String.get")];

let int_char_string = suggest_2 [(String.make, "String.make")];

let int_intToChar_string = suggest_2 [(String.init, "String.init")];

let string_int_int_string = suggest_2 [(String.sub, "String.sub")];

let intToCharToChar_string_string = suggest_2 [(String.mapi, "String.mapi")];

let charToChar_string_string = suggest_2 [(String.map, "String.map")];

let string_string =
  suggest_1 [
    (String.trim, "String.trim"),
    (String.escaped, "String.escaped"),
    (String.uppercase, "String.uppercase"),
    (String.lowercase, "String.lowercase"),
    (String.capitalize, "String.capitalize"),
    (String.uncapitalize, "String.uncapitalize")
  ];

let string_char_int =
  suggest_2 [(String.index, "String.index"), (String.rindex, "String.rindex")];

let string_int_char_int =
  suggest_2 [(String.index_from, "String.index_from"), (String.rindex_from, "String.rindex_from")];

let string_char_bool = suggest_1 [(String.contains, "String.contains")];

let string_int_char_bool =
  suggest_3 [
    (String.contains_from, "String.contains_from"),
    (String.rcontains_from, "String.rcontains_from")
  ];

let string_string_string = suggest_2 [((^), "(^)")];

let bool_string = suggest_1 [(string_of_bool, "string_of_bool")];

let string_bool = suggest_1 [(bool_of_string, "bool_of_string")];

let int_string = suggest_1 [(string_of_int, "string_of_int")];

let string_int = suggest_1 [(int_of_string, "int_of_string"), (String.length, "String.length")];

let float_string = suggest_1 [(string_of_float, "string_of_float")];

let string_float = suggest_1 [(float_of_string, "float_of_string")];

let a_a_bool i1 i2 o => suggest_2 [((==), "=")] i1 i2 o;

let lista_lista_lista i1 i2 o =>
  suggest_2
    [((@), "(@)"), (List.append, "List.append"), (List.rev_append, "List.rev_append")] i1 i2 o;

let lista_int i1 o => suggest_1 [(List.length, "List.length")] i1 o;

let lista_a i1 o => suggest_1 [(List.hd, "List.hd")] i1 o;

let lista_lista i1 o => suggest_1 [(List.tl, "List.tl"), (List.rev, "List.rev")] i1 o;

let lista_int_a i1 i2 o => suggest_2 [(List.nth, "List.nth")] i1 i2 o;

let listOflista_lista i1 o =>
  suggest_1 [(List.concat, "List.concat"), (List.flatten, "List.flatten")] i1 o;

let aToB_lista_listb i1 i2 o =>
  suggest_2 [(List.map, "List.map"), (List.rev_map, "List.rev_map")] i1 i2 o;

let intToAToB_lista_listb i1 i2 o => suggest_2 [(List.mapi, "List.mapi")] i1 i2 o;

let aToBToA_a_listb_a i1 i2 i3 o => suggest_3 [(List.fold_left, "List.fold_left")] i1 i2 i3 o;

let aToBToB_lista_b_b i1 i2 i3 o => suggest_3 [(List.fold_right, "List.fold_right")] i1 i2 i3 o;

let list_map2 = (List.map2, "List.map2");

let list_rev_map2 = (List.rev_map2, "List.rev_map2");

let list_fold_left2 = (List.fold_left2, "List.fold_left2");

let list_fold_right2 = (List.fold_right2, "List.fold_right2");

let list_exists = (List.exists, "List.exists");

let list_exists2 = (List.exists2, "List.exists2");

let list_mem = (List.mem, "List.mem");

let list_memq = (List.memq, "List.memq");

let list_find = (List.find, "List.find");

let list_filter = (List.filter, "List.filter");

let list_find_all = (List.find_all, "List.find_all");

let list_partition = (List.partition, "List.partition");

let list_sort = (List.sort, "List.sort");

let list_stable_sort = (List.stable_sort, "List.stable_sort");

let list_fast_sort = (List.fast_sort, "List.fast_sort");

let list_sort_uniq = (List.sort_uniq, "List.sort_uniq");

let list_merge = (List.merge, "List.merge");