let int_int = [|
  ((~-), "(~-)"),
  ((~+), "(~+)"),
  (succ, "succ"),
  (pred, "pred"),
  (abs, "abs"),
  (lnot, "lnot")
|];

let int_int_int = [|
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
|];

let float_float = [|
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
|];

let float_float_float = [|
  ((+.), "(+.)"),
  ((-.), "(-.)"),
  (( *. ), "(*.)"),
  ((/.), "(/.)"),
  (( *\* ), "(**)"),
  (atan2, "atan2"),
  (hypot, "hypot"),
  (copysign, "copysign"),
  (mod_float, "mod_float")
|];

let string_int_chat = [|(String.get, "String.get")|];

let int_char_string = [|(String.make, "String.make")|];

let int_intchar_string = [|(String.init, "String.init")|];

let string_int_int_string = [|(String.sub, "String.sub")|];

let intcharchar_string_string = [|(String.mapi, "String.mapi")|];

let charchar_string_string = [|(String.map, "String.map")|];

let string_string = [|
  (String.trim, "String.trim"),
  (String.escaped, "String.escaped"),
  (String.uppercase, "String.uppercase"),
  (String.lowercase, "String.lowercase"),
  (String.capitalize, "String.capitalize"),
  (String.uncapitalize, "String.uncapitalize")
|];

let string_char_int = [|(String.index, "String.index"), (String.rindex, "String.rindex")|];

let string_int_char_int = [|
  (String.index_from, "String.index_from"),
  (String.rindex_from, "String.rindex_from")
|];

let string_char_bool = [|(String.contains, "String.contains")|];

let string_int_char_bool = [|
  (String.contains_from, "String.contains_from"),
  (String.rcontains_from, "String.rcontains_from")
|];

let string_string_string = [|((^), "(^)")|];

let bool_string = [|(string_of_bool, "string_of_bool")|];

let string_bool = [|(bool_of_string, "bool_of_string")|];

let int_string = [|(string_of_int, "string_of_int")|];

let string_int = [|(int_of_string, "int_of_string"), (String.length, "String.length")|];

let float_string = [|(string_of_float, "string_of_float")|];

let string_float = [|(float_of_string, "float_of_string")|];