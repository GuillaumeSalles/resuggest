import { orderedSuggest } from "../suggest";

test("(+)", () => {
  expect(
    orderedSuggest(
      [
        {
          kind: "success",
          code: "1",
          jsValue: 1,
          type: "int"
        },
        {
          kind: "success",
          code: "3",
          jsValue: 3,
          type: "int"
        }
      ],
      {
        kind: "success",
        code: "4",
        jsValue: 4,
        type: "int"
      }
    ).map(r => r.functionName)
  ).toEqual(["(+)"]);
});
