import { ValidCompilationResult, CompiledInput, AstTypeKind } from "./types";

function functionNameToDisplayUsage(name: string) {
  if (name[0] === "(") {
    return name.substr(1, name.length - 2);
  }

  return name;
}

function comparison(a: string, b: string): string {
  return `${a} == ${b}`;
}

function functionCallWithNInputs(functionName: string, inputs: string[]) {
  return (
    functionNameToDisplayUsage(functionName) +
    "(" +
    inputs.join(", ").concat(")")
  );
}

function applyOperatorWithOneInput(functionName: string, input: string) {
  return `${functionNameToDisplayUsage(functionName)} ${input}`;
}

function applyOperatorWithTwoInputs(functionName: string, inputs: string[]) {
  return `${inputs[0]} ${functionNameToDisplayUsage(functionName)} ${
    inputs[1]
  }`;
}

function functionCall(functionName: string, inputs: string[]): string {
  switch (functionName) {
    case "(~-)":
    case "(~+)":
    case "(~-.)":
    case "(~+.)":
      return applyOperatorWithOneInput(functionName, inputs[0]);
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
    case "(++)":
      return applyOperatorWithTwoInputs(functionName, inputs);
    default:
      return functionCallWithNInputs(functionName, inputs);
  }
}

function wrapWithJsLog(str: string) {
  return `Js.log(${str}); /* true */`;
}

function assignment(argName: string, value: string): string {
  return `let ${argName} = ${value};`;
}

function assignmentsForInputsWithMutation(inputs: CompiledInput[]) {
  return inputs
    .map((input, index) => {
      if (input.expectedMutation === null) {
        return null;
      }
      return assignment("arg" + (index + 1), input.expression.code);
    })
    .filter(str => str !== null);
}

function inputsOrPreviousAssigments(inputs: CompiledInput[]) {
  return inputs.map((input, index) => {
    if (input.expectedMutation === null) {
      return input.expression.code;
    } else {
      return "arg" + (index + 1);
    }
  });
}

function compareExpectedMutation(inputs: CompiledInput[]) {
  return inputs
    .map((input, index) => {
      if (input.expectedMutation === null) {
        return null;
      }
      return wrapWithJsLog(
        comparison("arg" + (index + 1), input.expectedMutation.code)
      );
    })
    .filter(str => str !== null);
}

export default function makeExample(
  functionName: string,
  inputs: CompiledInput[],
  output: ValidCompilationResult
): string {
  const assignments = assignmentsForInputsWithMutation(inputs);
  let fnCall = functionCall(functionName, inputsOrPreviousAssigments(inputs));

  if (output.type.kind !== AstTypeKind.Unit) {
    fnCall = wrapWithJsLog(comparison(fnCall, output.code));
  } else {
    fnCall = fnCall + ";";
  }

  return assignments
    .concat(fnCall)
    .concat(compareExpectedMutation(inputs))
    .join("\n");
}
