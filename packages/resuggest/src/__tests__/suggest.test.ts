import suggest from "../suggest";
import { SuccessfulCompilationResult, Suggestion } from "../types";

function cr(
  code: string,
  jsValue: any,
  type: string
): SuccessfulCompilationResult {
  return {
    kind: "success",
    code,
    jsValue,
    type
  };
}

function suggestion(functionName: string, example: string): Suggestion {
  return {
    functionName,
    example
  };
}

test("(+)", () => {
  expect(
    suggest([cr("1", 1, "int"), cr("3", 3, "int")], cr("4", 4, "int"))
  ).toEqual([suggestion("(+)", "1 + 3 == 4")]);
});
