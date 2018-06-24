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

export type Suggestion = {
  functionName: string;
  example: string;
};

export enum AstTypeKind {
  Simple,
  Array,
  List,
  Func,
  Generic,
  Tuple
}

export type AstType =
  | AstFunctionType
  | AstTupleType
  | AstSimpleType
  | AstGenericType
  | AstArrayType
  | AstListType;

export type AstFunctionType = {
  kind: AstTypeKind.Func;
  input: AstType;
  output: AstType;
};

export type AstTupleType = {
  kind: AstTypeKind.Tuple;
  types: AstType[];
};

export type AstSimpleType = {
  kind: AstTypeKind.Simple;
  type: string;
};

export type AstGenericType = {
  kind: AstTypeKind.Generic;
  type: string;
};

export type AstListType = {
  kind: AstTypeKind.List;
  itemType: AstType;
};

export type AstArrayType = {
  kind: AstTypeKind.Array;
  itemType: AstType;
};
