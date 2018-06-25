import React, { Component } from "react";
import ReasonExpressionInput from "./ReasonExpressionInput";

function indexToArgLabel(index) {
  switch (index) {
    case 0:
      return "1st argument";
    case 1:
      return "2nd argument";
    case 2:
      return "3rd argument";
    default:
      throw new Error(`${index} not supported`);
  }
}

class InputsForm extends Component {
  render() {
    return (
      <div>
        <h4>Arguments</h4>
        {this.props.inputs.map((input, index) => (
          <React.Fragment>
            <div>{indexToArgLabel(index)}</div>
            <ReasonExpressionInput
              value={input}
              key={"input" + index}
              code={input.expression.code}
              error={input.expression.error}
              label={indexToArgLabel(index)}
              onChange={newCode => {
                const newInputs = this.props.inputs.map(
                  (input, i) =>
                    index === i
                      ? { ...input, expression: { code: newCode } }
                      : input
                );
                this.props.onChange(newInputs);
              }}
            />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default InputsForm;
