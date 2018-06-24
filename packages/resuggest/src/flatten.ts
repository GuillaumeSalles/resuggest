export default function flatten<T>(arrayOfArrays: T[][]): T[] {
  var result = [];
  for (var array of arrayOfArrays) {
    for (var item of array) {
      result.push(item);
    }
  }
  return result;
}
