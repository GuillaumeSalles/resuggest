import uniquePermutations from "../uniquePermutations";

test("should return all possibilities", () => {
  expect(uniquePermutations(["1", "2"], s => s)).toEqual([
    ["1", "2"],
    ["2", "1"]
  ]);
});
