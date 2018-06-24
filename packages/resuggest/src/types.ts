export type Input = {
  code: string;
  expectedMutation: string | null;
};

export type EmptyCompilationResult = {
  kind: "empty";
  code: string;
};

export type ValidCompilationResult = {
  kind: "valid";
  code: string;
  jsValue: any;
  type: AstType;
};

export type FailedCompilationResult = {
  kind: "fail";
  code: string;
  error: string;
};

export type CompilationResult =
  | ValidCompilationResult
  | FailedCompilationResult
  | EmptyCompilationResult;

export type CompiledInput = {
  expression: ValidCompilationResult;
  expectedMutation: ValidCompilationResult | null;
};

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
  Tuple,
  Unit
}

export type AstType =
  | AstUnitType
  | AstFunctionType
  | AstTupleType
  | AstSimpleType
  | AstGenericType
  | AstArrayType
  | AstListType;

export type AstUnitType = {
  kind: AstTypeKind.Unit;
};

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
