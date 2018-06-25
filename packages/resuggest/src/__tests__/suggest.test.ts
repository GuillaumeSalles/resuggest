import suggest from "../suggest";
import {
  ValidCompilationResult,
  Suggestion,
  CompiledInput,
  EmptyCompilationResult
} from "../types";
import parseType from "../parseType";

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

function mutableInput(
  code: string,
  jsValue: any,
  mCode: string,
  mJsValue: any,
  type: string
): CompiledInput {
  return {
    expression: cr(code, jsValue, type),
    expectedMutation: cr(mCode, mJsValue, type)
  };
}

function empty(): EmptyCompilationResult {
  return {
    kind: "empty",
    code: ""
  };
}

function cr(code: string, jsValue: any, type: string): ValidCompilationResult {
  return {
    kind: "valid",
    code,
    jsValue,
    type: parseType(type)
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
  ).toEqual([suggestion("(+)", "Js.log(1 + 3 == 4); /* true */")]);
});

test("Array.set", () => {
  expect(
    suggest(
      [
        mutableInput(
          "[|0,1,2|]",
          [0, 1, 2],
          "[|3,1,2|]",
          [3, 2, 1],
          "array int"
        ),
        immutableInput("0", 0, "int"),
        immutableInput("3", 3, "int")
      ],
      empty()
    )
  ).toEqual([
    suggestion(
      "Array.set",
      `let arg1 = [|0,1,2|];
Array.set(arg1, 0, 3);
Js.log(arg1 == [|3,1,2|]); /* true */`
    )
  ]);
});
