import typeKinds from "./typeKinds";

export default function isTypeAssignable(left, right, genericsMap = {}) {
  if (
    left.kind === typeKinds.generic &&
    right.kind === typeKinds.generic &&
    left.type === right.type
  ) {
    return true;
  }

  if (left.kind === typeKinds.generic) {
    if (genericsMap[left.type] === undefined) {
      genericsMap[left.type] = right;
      return true;
    } else {
      return isTypeAssignable(genericsMap[left.type], right, genericsMap);
    }
  }

  if (right.kind === typeKinds.generic) {
    if (genericsMap[right.type] === undefined) {
      genericsMap[right.type] = left;
      return true;
    } else {
      return isTypeAssignable(left.type, genericsMap[right.type], genericsMap);
    }
  }

  if (left.kind !== right.kind) {
    return false;
  }

  if (left.kind === typeKinds.simple) {
    return left.type === right.type;
  }

  if (left.kind === typeKinds.list || left.kind === typeKinds.array) {
    return isTypeAssignable(left.itemType, right.itemType, genericsMap);
  }

  if (left.kind === typeKinds.func) {
    return (
      isTypeAssignable(left.input, right.input, genericsMap) &&
      isTypeAssignable(left.output, right.output, genericsMap)
    );
  }

  if (left.kind === typeKinds.tuple) {
    return (
      isTypeAssignable(left.firstType, right.firstType, genericsMap) &&
      isTypeAssignable(left.secondType, right.secondType, genericsMap)
    );
  }

  throw new Error("Unsupported type kind", left.kind);
}
