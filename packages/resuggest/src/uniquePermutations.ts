import { ValidCompilationResult, CompiledInput } from "./types";

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

function makeKeyMap(inputs: CompiledInput[]): Map<string, number> {
  let p2 = [1, 2, 4, 8];
  let map = new Map();

  for (let input of inputs) {
    if (!map.has(input.expression.code)) {
      map.set(input.expression.code, p2.pop());
    }
  }

  return map;
}

function computeKey(
  inputs: CompiledInput[],
  keyMap: Map<string, number>
): number {
  var result = 0;
  for (let input of inputs) {
    const value = keyMap.get(input.expression.code);
    if (value === undefined) {
      throw new Error(`Key map does not contains ${input.expression.code}`);
    }
    result += value;
  }
  return result;
}

// Weird way to compute unique permutations but
// that's the first idea that came to my brain ¯\_(ツ)_/¯
// Todo: Handle input with mutation
export default function uniquePermutations(
  inputs: CompiledInput[]
): CompiledInput[][] {
  if (inputs.length === 0) {
    return [];
  }

  if (inputs.length === 1) {
    return [inputs];
  }

  let keyMap = makeKeyMap(inputs);

  let uniquePermutations = [];
  let generatedKeys = new Set();

  for (let permutation of permutator(inputs)) {
    let key = computeKey(permutation, keyMap);

    if (!generatedKeys.has(key)) {
      generatedKeys.add(key);
      uniquePermutations.push(permutation);
    }
  }

  return uniquePermutations;
}
