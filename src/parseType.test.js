import parseType, {
  createPostfixExpression,
  tokenStream,
  tokenKinds
} from "./parseType";
import typeKinds from "./typeKinds";

describe("createPostfixExpression", () => {
  it("should parse int * string -> int", () => {
    expect(createPostfixExpression(tokenStream("int * string -> int"))).toEqual(
      [
        { kind: tokenKinds.simple, value: "int" },
        { kind: tokenKinds.simple, value: "string" },
        { kind: tokenKinds.star },
        { kind: tokenKinds.simple, value: "int" },
        { kind: tokenKinds.arrow }
      ]
    );
  });

  it("should parse int * int * int", () => {
    expect(createPostfixExpression(tokenStream("int * int * int"))).toEqual([
      { kind: tokenKinds.simple, value: "int" },
      { kind: tokenKinds.simple, value: "int" },
      { kind: tokenKinds.simple, value: "int" },
      { kind: tokenKinds.star },
      { kind: tokenKinds.star }
    ]);
  });

  it("ratata should parse int * int * int -> int", () => {
    expect(
      createPostfixExpression(tokenStream("int * int * int -> int"))
    ).toEqual([
      { kind: tokenKinds.simple, value: "int" },
      { kind: tokenKinds.simple, value: "int" },
      { kind: tokenKinds.simple, value: "int" },
      { kind: tokenKinds.star },
      { kind: tokenKinds.star },
      { kind: tokenKinds.simple, value: "int" },
      { kind: tokenKinds.arrow }
    ]);
  });

  it("should parse int -> string * int", () => {
    expect(createPostfixExpression(tokenStream("int -> string * int"))).toEqual(
      [
        { kind: tokenKinds.simple, value: "int" },
        { kind: tokenKinds.simple, value: "string" },
        { kind: tokenKinds.simple, value: "int" },
        { kind: tokenKinds.star },
        { kind: tokenKinds.arrow }
      ]
    );
  });
});

describe("parseType", () => {
  it("should parse bool", () => {
    expect(parseType("bool")).toEqual({ kind: typeKinds.simple, type: "bool" });
  });

  it("should parse int", () => {
    expect(parseType("int")).toEqual({ kind: typeKinds.simple, type: "int" });
  });

  it("should parse float", () => {
    expect(parseType("float")).toEqual({
      kind: typeKinds.simple,
      type: "float"
    });
  });

  it("should parse char", () => {
    expect(parseType("char")).toEqual({ kind: typeKinds.simple, type: "char" });
  });

  it("should parse string", () => {
    expect(parseType("string")).toEqual({
      kind: typeKinds.simple,
      type: "string"
    });
  });

  it("should parse int * string -> int", () => {
    expect(parseType("int * string -> int")).toEqual({
      kind: typeKinds.func,
      input: {
        kind: typeKinds.tuple,
        types: [
          { kind: typeKinds.simple, type: "int" },
          { kind: typeKinds.simple, type: "string" }
        ]
      },
      output: { kind: typeKinds.simple, type: "int" }
    });
  });

  it("should parse list of string", () => {
    expect(parseType("string list")).toEqual({
      kind: typeKinds.list,
      itemType: { kind: typeKinds.simple, type: "string" }
    });
  });

  it("should parse list of list of string", () => {
    expect(parseType("string list list")).toEqual({
      kind: typeKinds.list,
      itemType: {
        kind: typeKinds.list,
        itemType: { kind: typeKinds.simple, type: "string" }
      }
    });
  });

  it("should parse int -> string", () => {
    expect(parseType("int -> string")).toEqual({
      kind: typeKinds.func,
      input: { kind: typeKinds.simple, type: "int" },
      output: { kind: typeKinds.simple, type: "string" }
    });
  });

  it("should parse int -> string -> float", () => {
    expect(parseType("int -> string -> float")).toEqual({
      kind: typeKinds.func,
      input: { kind: typeKinds.simple, type: "int" },
      output: {
        kind: typeKinds.func,
        input: { kind: typeKinds.simple, type: "string" },
        output: { kind: typeKinds.simple, type: "float" }
      }
    });
  });

  it("should parse 'a -> 'a", () => {
    expect(parseType("'a -> 'a")).toEqual({
      kind: typeKinds.func,
      input: { kind: typeKinds.generic, type: "'a" },
      output: { kind: typeKinds.generic, type: "'a" }
    });
  });

  it("should parse int -> ('a -> char) -> string", () => {
    expect(parseType("int -> ('a -> char) -> string")).toEqual({
      kind: typeKinds.func,
      input: { kind: typeKinds.simple, type: "int" },
      output: {
        kind: typeKinds.func,
        input: {
          kind: typeKinds.func,
          input: { kind: typeKinds.generic, type: "'a" },
          output: { kind: typeKinds.simple, type: "char" }
        },
        output: { kind: typeKinds.simple, type: "string" }
      }
    });
  });

  it("should parse ('a -> 'b) -> 'a list -> 'b list", () => {
    expect(parseType("('a -> 'b) -> 'a list -> 'b list")).toEqual({
      kind: typeKinds.func,
      input: {
        kind: typeKinds.func,
        input: { kind: typeKinds.generic, type: "'a" },
        output: { kind: typeKinds.generic, type: "'b" }
      },
      output: {
        kind: typeKinds.func,
        input: {
          kind: typeKinds.list,
          itemType: {
            kind: typeKinds.generic,
            type: "'a"
          }
        },
        output: {
          kind: typeKinds.list,
          itemType: {
            kind: typeKinds.generic,
            type: "'b"
          }
        }
      }
    });
  });

  it("should parse 'a array -> int", () => {
    expect(parseType("'a array -> int")).toEqual({
      kind: typeKinds.func,
      input: {
        kind: typeKinds.array,
        itemType: {
          kind: typeKinds.generic,
          type: "'a"
        }
      },
      output: { kind: typeKinds.simple, type: "int" }
    });
  });

  it("should parse int * string", () => {
    expect(parseType("int * string")).toEqual({
      kind: typeKinds.tuple,
      types: [
        { kind: typeKinds.simple, type: "int" },
        { kind: typeKinds.simple, type: "string" }
      ]
    });
  });

  it("should parse string * int * char", () => {
    expect(parseType("string * int * char")).toEqual({
      kind: typeKinds.tuple,
      types: [
        { kind: typeKinds.simple, type: "string" },
        { kind: typeKinds.simple, type: "int" },
        { kind: typeKinds.simple, type: "char" }
      ]
    });
  });

  it("should parse float * string * int * char", () => {
    expect(parseType("float * string * int * char")).toEqual({
      kind: typeKinds.tuple,
      types: [
        { kind: typeKinds.simple, type: "float" },
        { kind: typeKinds.simple, type: "string" },
        { kind: typeKinds.simple, type: "int" },
        { kind: typeKinds.simple, type: "char" }
      ]
    });
  });
});
