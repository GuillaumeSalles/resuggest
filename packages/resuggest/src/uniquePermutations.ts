function permutator<T>(inputArr: T[]): T[][] {
  let result: T[][] = [];
  const permute = (arr: T[], m: T[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(inputArr);
  return result;
}

function computeKey<T>(
  inputs: T[],
  keySelector: (input: T) => string,
  keyMap: Map<string, number>
): number {
  var result = 0;
  for (let input of inputs) {
    const value = keyMap.get(keySelector(input));
    if (value === undefined) {
      throw new Error(`Key map does not contains ${keySelector(input)}`);
    }
    result += value;
  }
  return result;
}

// Weird way to compute unique permutations but
// that's the first idea that came to my brain ¯\_(ツ)_/¯
// Todo: Handle input with mutation
export default function uniquePermutations<T>(
  inputs: T[],
  keySelector: (input: T) => string
): T[][] {
  if (inputs.length === 0) {
    return [];
  }

  if (inputs.length === 1) {
    return [inputs];
  }

  let uniquePermutations = [];
  let generatedKeys = new Set();

  for (let permutation of permutator(inputs)) {
    let key = permutation.map(keySelector).join(",");
    if (!generatedKeys.has(key)) {
      generatedKeys.add(key);
      uniquePermutations.push(permutation);
    }
  }

  return uniquePermutations;
}
