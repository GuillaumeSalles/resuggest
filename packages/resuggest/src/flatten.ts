export default function flatten(arrayOfArrays) {
  var result = [];
  for (var array of arrayOfArrays) {
    for (var item of array) {
      result.push(item);
    }
  }
  return result;
}
