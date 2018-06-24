export type CompilationResult = {
  code: string;
  jsValue: any;
  type: string;
  error: string | null;
};

export enum AstTypeKind {
  simple = "simple",
  array = "array",
  list = "list",
  func = "func",
  generic = "generic",
  tuple = "tuple"
}

export type AstType =
  | AstFunctionType
  | AstTupleType
  | AstSimpleType
  | AstGenericType
  | AstArrayType
  | AstListType;

export type AstFunctionType = {
  kind: AstTypeKind.func;
  input: AstType;
  output: AstType;
};

export type AstTupleType = {
  kind: AstTypeKind.tuple;
  types: AstType[];
};

export type AstSimpleType = {
  kind: AstTypeKind.simple;
  type: string;
};

export type AstGenericType = {
  kind: AstTypeKind.generic;
  type: string;
};

export type AstListType = {
  kind: AstTypeKind.list;
  itemType: AstType;
};

export type AstArrayType = {
  kind: AstTypeKind.array;
  itemType: AstType;
};
