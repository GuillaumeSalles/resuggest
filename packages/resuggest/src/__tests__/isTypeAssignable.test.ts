import isTypeAssignable from "../isTypeAssignable";
import parseType from "../parseType";

function testCase(left: string, right: string, result: boolean) {
  test(`${right} should ${
    result ? "" : "NOT"
  } be assignable to ${left}`, () => {
    expect(isTypeAssignable(parseType(left), parseType(right))).toEqual(result);
  });
}

testCase("int", "int", true);
testCase("string", "string", true);
testCase("int", "string", false);
testCase("string list", "string list", true);
testCase("string list list", "string list list", true);
testCase("int -> int", "int -> int", true);
testCase("'a -> 'a", "int -> int", true);
testCase("'a -> 'a", "int -> string", false);
testCase("int -> int -> int", "int -> int -> int", true);
testCase("'a -> 'a -> int", "'a -> 'a -> int", true);
testCase(
  "('a -> 'a -> bool) -> 'a list -> 'a list",
  "(int -> int -> bool) -> int list -> int list",
  true
);
testCase(
  "('a -> 'b) -> 'a list -> 'b list",
  "(int -> int) -> int list -> int list",
  true
);
testCase(
  "int -> (int -> char) -> string",
  "int -> ('a -> char) -> string",
  true
);
testCase("'a array -> int", "int array -> int", true);
testCase("int * string", "int * string", true);
testCase("int * int", "int * string", false);
testCase("int * string * char", "int * string * char", true);
testCase("'a * 'b * 'a", "int * string * int", true);
testCase("'a * 'b -> 'a", "int * string -> int", true);
testCase("'a * 'b -> 'a", "int * int * int -> int", false);
testCase("int -> unit", "int -> unit", true);
