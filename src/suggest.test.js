import { orderedSuggest } from "./suggest";

test("(+)", () => {
  expect(
    orderedSuggest(
      [
        {
          code: "1",
          jsValue: 1,
          type: "int",
          error: null
        },
        {
          code: "3",
          jsValue: 3,
          type: "int",
          error: null
        }
      ],
      {
        code: "4",
        jsValue: 4,
        type: "int",
        error: null
      }
    ).map(r => r.functionName)
  ).toEqual(["(+)"]);
});
