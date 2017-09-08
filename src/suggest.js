import parseType from "./parseType";
import { isEqual, flatten } from "lodash";
import typeKinds from "./typeKinds";

import {
  int_int,
  float_float,
  int_int_int,
  float_float_float,
  string_int_char,
  int_char_string,
  int_intToChar_string,
  string_int_int_string,
  intToCharToChar_string_string,
  charToChar_string_string,
  string_string,
  suggest_string_char_int,
  string_int_char_int,
  string_char_bool,
  string_int_char_bool,
  string_string_string,
  bool_string,
  string_bool,
  int_string,
  string_int,
  float_string,
  string_float,
  a_a_bool,
  lista_lista_lista,
  lista_int,
  lista_a,
  lista_lista,
  lista_int_a,
  listOflista_lista,
  aToB_lista_listb,
  intToAToB_lista_listb,
  aToBToA_a_listb_a,
  aToBToB_lista_b_b
} from "./generated/functions";

const typeToFunctionPairs = [
  ["int -> int", int_int],
  ["float -> float", float_float],
  ["int -> int -> int", int_int_int],
  ["float -> float -> float", float_float_float],
  ["string -> int -> char", string_int_char],
  ["int -> char -> string", int_char_string],
  //["int -> (int -> char) -> string", int_intToChar_string],
  ["string -> int -> int -> string", string_int_int_string],
  ["(int -> char -> char) -> string -> string", intToCharToChar_string_string],
  ["(char -> char) -> string -> string", charToChar_string_string],
  ["string -> string", string_string],
  ["string -> char -> int", string_char_int],
  ["string -> int -> char -> int", string_int_char_int],
  ["string -> char -> bool", string_char_bool],
  ["string -> int -> char -> bool", string_int_char_bool],
  ["string -> string -> string", string_string_string],
  ["bool -> string", bool_string],
  ["string -> bool", string_bool],
  ["int -> string", int_string],
  ["string -> int", string_int],
  ["float -> string", float_string],
  ["string -> float", string_float],
  ["'a -> 'a -> bool", a_a_bool],
  ["'a list -> 'a list -> 'a list", lista_lista_lista],
  ["'a list -> int", lista_int],
  ["'a list -> 'a", lista_a],
  ["'a list -> 'a list", lista_lista],
  ["'a list -> int -> 'a", lista_int_a],
  ["'a list list -> 'a list", listOflista_lista],
  ["('a -> 'b) -> 'a list -> 'b list", aToB_lista_listb],
  ["(int -> 'a -> 'b) -> 'a list -> 'b list", intToAToB_lista_listb],
  ["('a -> 'b -> 'a) -> 'a -> 'b list -> 'a", aToBToA_a_listb_a],
  ["('a -> 'b -> 'b) -> 'a list -> 'b -> 'b", aToBToB_lista_b_b]
];

const astTypeToFunctionPairs = typeToFunctionPairs.map(([type, func]) => [
  parseType(type),
  func
]);

const makeAstFunctionType = (inputs, output) => {
  if (inputs.length === 0) {
    return parseType(output.type);
  }
  return {
    kind: typeKinds.func,
    input: parseType(inputs[0].type),
    output: makeAstFunctionType(inputs.slice(1), output)
  };
};

export function isTypeAssignable(left, right, genericsMap = {}) {
  if (left.kind === typeKinds.generic) {
    if (genericsMap[left.type] === undefined) {
      genericsMap[left.type] = right;
      return true;
    } else {
      var result = isTypeAssignable(genericsMap[left.type], right, genericsMap);
      return result;
    }
  }

  if (left.kind !== right.kind) {
    return false;
  }

  if (left.kind === typeKinds.simple) {
    return left.type === right.type;
  }

  if (left.kind === typeKinds.list) {
    return isTypeAssignable(left.itemType, right.itemType, genericsMap);
  }

  if (left.kind === typeKinds.func) {
    return (
      isTypeAssignable(left.input, right.input, genericsMap) &&
      isTypeAssignable(left.output, right.output, genericsMap)
    );
  }

  throw new Error("Unsupported type kind", left.kind);
}

export default function suggest(inputs, output) {
  const expectedFunctionType = makeAstFunctionType(inputs, output);
  const typedSuggestFunctions = astTypeToFunctionPairs
    .filter(([ast, func]) => {
      return isTypeAssignable(ast, expectedFunctionType);
    })
    .map(([ast, func]) => func);

  const reasonInputs = inputs.map(i => i.jsValue).concat([output.jsValue]);

  return flatten(
    typedSuggestFunctions.map(func => {
      var result = func.apply(null, reasonInputs);
      return result;
    })
  );
}
