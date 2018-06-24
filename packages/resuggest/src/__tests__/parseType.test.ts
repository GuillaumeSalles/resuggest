import parseType, {
  createPostfixExpression,
  tokenStream,
  tokenKinds
} from "../parseType";
import { AstTypeKind } from "../types";

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
    expect(parseType("bool")).toEqual({
      kind: AstTypeKind.Simple,
      type: "bool"
    });
  });

  it("should parse int", () => {
    expect(parseType("int")).toEqual({ kind: AstTypeKind.Simple, type: "int" });
  });

  it("should parse float", () => {
    expect(parseType("float")).toEqual({
      kind: AstTypeKind.Simple,
      type: "float"
    });
  });

  it("should parse char", () => {
    expect(parseType("char")).toEqual({
      kind: AstTypeKind.Simple,
      type: "char"
    });
  });

  it("should parse string", () => {
    expect(parseType("string")).toEqual({
      kind: AstTypeKind.Simple,
      type: "string"
    });
  });

  it("should parse int * string -> int", () => {
    expect(parseType("int * string -> int")).toEqual({
      kind: AstTypeKind.Func,
      input: {
        kind: AstTypeKind.Tuple,
        types: [
          { kind: AstTypeKind.Simple, type: "int" },
          { kind: AstTypeKind.Simple, type: "string" }
        ]
      },
      output: { kind: AstTypeKind.Simple, type: "int" }
    });
  });

  it("should parse list of string", () => {
    expect(parseType("string list")).toEqual({
      kind: AstTypeKind.List,
      itemType: { kind: AstTypeKind.Simple, type: "string" }
    });
  });

  it("should parse list of list of string", () => {
    expect(parseType("string list list")).toEqual({
      kind: AstTypeKind.List,
      itemType: {
        kind: AstTypeKind.List,
        itemType: { kind: AstTypeKind.Simple, type: "string" }
      }
    });
  });

  it("should parse int -> string", () => {
    expect(parseType("int -> string")).toEqual({
      kind: AstTypeKind.Func,
      input: { kind: AstTypeKind.Simple, type: "int" },
      output: { kind: AstTypeKind.Simple, type: "string" }
    });
  });

  it("should parse int -> string -> float", () => {
    expect(parseType("int -> string -> float")).toEqual({
      kind: AstTypeKind.Func,
      input: { kind: AstTypeKind.Simple, type: "int" },
      output: {
        kind: AstTypeKind.Func,
        input: { kind: AstTypeKind.Simple, type: "string" },
        output: { kind: AstTypeKind.Simple, type: "float" }
      }
    });
  });

  it("should parse 'a -> 'a", () => {
    expect(parseType("'a -> 'a")).toEqual({
      kind: AstTypeKind.Func,
      input: { kind: AstTypeKind.Generic, type: "'a" },
      output: { kind: AstTypeKind.Generic, type: "'a" }
    });
  });

  it("should parse int -> ('a -> char) -> string", () => {
    expect(parseType("int -> ('a -> char) -> string")).toEqual({
      kind: AstTypeKind.Func,
      input: { kind: AstTypeKind.Simple, type: "int" },
      output: {
        kind: AstTypeKind.Func,
        input: {
          kind: AstTypeKind.Func,
          input: { kind: AstTypeKind.Generic, type: "'a" },
          output: { kind: AstTypeKind.Simple, type: "char" }
        },
        output: { kind: AstTypeKind.Simple, type: "string" }
      }
    });
  });

  it("should parse ('a -> 'b) -> 'a list -> 'b list", () => {
    expect(parseType("('a -> 'b) -> 'a list -> 'b list")).toEqual({
      kind: AstTypeKind.Func,
      input: {
        kind: AstTypeKind.Func,
        input: { kind: AstTypeKind.Generic, type: "'a" },
        output: { kind: AstTypeKind.Generic, type: "'b" }
      },
      output: {
        kind: AstTypeKind.Func,
        input: {
          kind: AstTypeKind.List,
          itemType: {
            kind: AstTypeKind.Generic,
            type: "'a"
          }
        },
        output: {
          kind: AstTypeKind.List,
          itemType: {
            kind: AstTypeKind.Generic,
            type: "'b"
          }
        }
      }
    });
  });

  it("should parse 'a array -> int", () => {
    expect(parseType("'a array -> int")).toEqual({
      kind: AstTypeKind.Func,
      input: {
        kind: AstTypeKind.Array,
        itemType: {
          kind: AstTypeKind.Generic,
          type: "'a"
        }
      },
      output: { kind: AstTypeKind.Simple, type: "int" }
    });
  });

  it("should parse int * string", () => {
    expect(parseType("int * string")).toEqual({
      kind: AstTypeKind.Tuple,
      types: [
        { kind: AstTypeKind.Simple, type: "int" },
        { kind: AstTypeKind.Simple, type: "string" }
      ]
    });
  });

  it("should parse string * int * char", () => {
    expect(parseType("string * int * char")).toEqual({
      kind: AstTypeKind.Tuple,
      types: [
        { kind: AstTypeKind.Simple, type: "string" },
        { kind: AstTypeKind.Simple, type: "int" },
        { kind: AstTypeKind.Simple, type: "char" }
      ]
    });
  });

  it("should parse float * string * int * char", () => {
    expect(parseType("float * string * int * char")).toEqual({
      kind: AstTypeKind.Tuple,
      types: [
        { kind: AstTypeKind.Simple, type: "float" },
        { kind: AstTypeKind.Simple, type: "string" },
        { kind: AstTypeKind.Simple, type: "int" },
        { kind: AstTypeKind.Simple, type: "char" }
      ]
    });
  });
});
