import { ValidCompilationResult } from "./types";

function functionNameToDisplayUsage(name: string) {
  if (name[0] === "(") {
    return name.substr(1, name.length - 2);
  }

  return name;
}

function renderBasicFunctionUsage(
  functionName: string,
  inputs: ValidCompilationResult[],
  output: ValidCompilationResult
) {
  return (
    functionNameToDisplayUsage(functionName) +
    "(" +
    inputs
      .map(i => i.code.trim())
      .join(", ")
      .concat(") == ")
      .concat(output.code.trim())
  );
}

function renderOperatorWith1Arg(
  functionName: string,
  inputs: ValidCompilationResult[],
  output: ValidCompilationResult
) {
  return `${functionNameToDisplayUsage(
    functionName
  )} ${inputs[0].code.trim()} == ${output.code.trim()}`;
}

function renderOperatorWith2Args(
  functionName: string,
  inputs: ValidCompilationResult[],
  output: ValidCompilationResult
) {
  return `${inputs[0].code.trim()} ${functionNameToDisplayUsage(
    functionName
  )} ${inputs[1].code.trim()} == ${output.code.trim()}`;
}

export default function makeExample(
  functionName: string,
  inputs: ValidCompilationResult[],
  output: ValidCompilationResult
): string {
  switch (functionName) {
    case "(~-)":
    case "(~+)":
    case "(~-.)":
    case "(~+.)":
      return renderOperatorWith1Arg(functionName, inputs, output);
    case "(+)":
    case "(-)":
    case "(*)":
    case "(/)":
    case "(==)":
    case "(===)":
    case "(!=)":
    case "(!==)":
    case "(<=)":
    case "(>=)":
    case "(<)":
    case "(>)":
    case "(!)":
    case "(&&)":
    case "(||)":
    case "(@)":
    case "(|>)":
    case "(@@)":
    case "(mod)":
    case "(land)":
    case "(lor)":
    case "(lxor)":
    case "(lsl)":
    case "(lsr)":
    case "(asr)":
    case "(+.)":
    case "(-.)":
    case "(*.)":
    case "(/.)":
    case "(**)":
      return renderOperatorWith2Args(functionName, inputs, output);
    default:
      return renderBasicFunctionUsage(functionName, inputs, output);
  }
}
