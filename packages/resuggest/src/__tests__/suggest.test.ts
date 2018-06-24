import suggest from "../suggest";
import { ValidCompilationResult, Suggestion, CompiledInput } from "../types";

function immutableInput(
  code: string,
  jsValue: any,
  type: string
): CompiledInput {
  return {
    expression: cr(code, jsValue, type),
    expectedMutation: null
  };
}

function cr(code: string, jsValue: any, type: string): ValidCompilationResult {
  return {
    kind: "valid",
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
    suggest(
      [immutableInput("1", 1, "int"), immutableInput("3", 3, "int")],
      cr("4", 4, "int")
    )
  ).toEqual([suggestion("(+)", "1 + 3 == 4")]);
});
