export type EmptyCompilationResult = {
  kind: "empty";
  code: string;
};

export type SuccessfulCompilationResult = {
  kind: "success";
  code: string;
  jsValue: any;
  type: string;
};

export type FailedCompilationResult = {
  kind: "fail";
  code: string;
  error: string;
};

export type CompilationResult =
  | SuccessfulCompilationResult
  | FailedCompilationResult
  | EmptyCompilationResult;

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
