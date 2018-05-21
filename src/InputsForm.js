import React, { Component } from "react";
import ReasonExpressionInput from "./ReasonExpressionInput";

class InputsForm extends Component {
  render() {
    return (
      <div>
        <h4>Arguments</h4>
        {this.props.inputs.map((input, index) => (
          <ReasonExpressionInput
            value={input}
            key={"input" + index}
            code={input.code}
            error={input.error}
            label={"Argument " + (index + 1)}
            onChange={newCode => {
              const newInputs = this.props.inputs.map(
                (input, i) =>
                  index === i ? { ...input, code: newCode } : input
              );
              this.props.onChange(newInputs);
            }}
          />
        ))}
      </div>
    );
  }
}

export default InputsForm;
