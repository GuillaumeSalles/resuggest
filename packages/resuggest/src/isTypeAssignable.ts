import { AstType, AstTypeKind } from "./types";

export default function isTypeAssignable(
  left: AstType,
  right: AstType,
  genericsMap: { [id: string]: AstType } = {}
): boolean {
  if (
    left.kind === AstTypeKind.generic &&
    right.kind === AstTypeKind.generic &&
    left.type === right.type
  ) {
    return true;
  }

  if (left.kind === AstTypeKind.generic) {
    if (genericsMap[left.type] === undefined) {
      genericsMap[left.type] = right;
      return true;
    } else {
      return isTypeAssignable(genericsMap[left.type], right, genericsMap);
    }
  }

  if (right.kind === AstTypeKind.generic) {
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

  if (left.kind === AstTypeKind.simple && right.kind === AstTypeKind.simple) {
    return left.type === right.type;
  }

  if (left.kind === AstTypeKind.list && right.kind === AstTypeKind.list) {
    return isTypeAssignable(left.itemType, right.itemType, genericsMap);
  }

  if (left.kind === AstTypeKind.array && right.kind === AstTypeKind.array) {
    return isTypeAssignable(left.itemType, right.itemType, genericsMap);
  }

  if (left.kind === AstTypeKind.func && right.kind === AstTypeKind.func) {
    return (
      isTypeAssignable(left.input, right.input, genericsMap) &&
      isTypeAssignable(left.output, right.output, genericsMap)
    );
  }

  if (left.kind === AstTypeKind.tuple && right.kind === AstTypeKind.tuple) {
    return (
      left.types.length === right.types.length &&
      left.types.every((leftSubType, index) =>
        isTypeAssignable(leftSubType, right.types[index], genericsMap)
      )
    );
  }

  throw new Error(`Unsupported type kind ${left.kind}`);
}
