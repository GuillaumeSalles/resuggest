import React, { Component } from "react";
import ReasonExpressionInput from "./ReasonExpressionInput";

class InputsForm extends Component {
  render() {
    return (
      <div>
        <h4>Inputs</h4>
        {this.props.inputs.map((input, index) =>
          <ReasonExpressionInput
            value={input}
            key={"input" + index}
            code={input.code}
            error={input.error}
            onChange={newCode => {
              const newInputs = this.props.inputs.map(
                (input, i) =>
                  index === i ? { code: newCode, error: null } : input
              );
              this.props.onChange(newInputs);
            }}
          />
        )}
      </div>
    );
  }
}

export default InputsForm;
