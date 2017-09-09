import { isTypeAssignable } from "./suggest";
import parseType from "./parseType";

function testCase(left, right, result) {
  test(`${right} should ${result
    ? ""
    : "NOT"} be assignable to ${left}`, () => {
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
