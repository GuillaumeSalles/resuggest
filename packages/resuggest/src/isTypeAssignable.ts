import { AstType, AstTypeKind } from "./types";

export default function isTypeAssignable(
  left: AstType,
  right: AstType,
  genericsMap: { [id: string]: AstType } = {}
): boolean {
  if (
    left.kind === AstTypeKind.Generic &&
    right.kind === AstTypeKind.Generic &&
    left.type === right.type
  ) {
    return true;
  }

  if (left.kind === AstTypeKind.Generic) {
    if (genericsMap[left.type] === undefined) {
      genericsMap[left.type] = right;
      return true;
    } else {
      return isTypeAssignable(genericsMap[left.type], right, genericsMap);
    }
  }

  if (right.kind === AstTypeKind.Generic) {
    if (genericsMap[right.type] === undefined) {
      genericsMap[right.type] = left;
      return true;
    } else {
      return isTypeAssignable(left, genericsMap[right.type], genericsMap);
    }
  }

  if (left.kind !== right.kind) {
    return false;
  }

  if (left.kind === AstTypeKind.Simple && right.kind === AstTypeKind.Simple) {
    return left.type === right.type;
  }

  if (left.kind === AstTypeKind.List && right.kind === AstTypeKind.List) {
    return isTypeAssignable(left.itemType, right.itemType, genericsMap);
  }

  if (left.kind === AstTypeKind.Array && right.kind === AstTypeKind.Array) {
    return isTypeAssignable(left.itemType, right.itemType, genericsMap);
  }

  if (left.kind === AstTypeKind.Func && right.kind === AstTypeKind.Func) {
    return (
      isTypeAssignable(left.input, right.input, genericsMap) &&
      isTypeAssignable(left.output, right.output, genericsMap)
    );
  }

  if (left.kind === AstTypeKind.Tuple && right.kind === AstTypeKind.Tuple) {
    return (
      left.types.length === right.types.length &&
      left.types.every((leftSubType, index) =>
        isTypeAssignable(leftSubType, right.types[index], genericsMap)
      )
    );
  }

  throw new Error(`Unsupported type kind ${left.kind}`);
}
