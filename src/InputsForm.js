import React, { Component } from "react";

class InputsForm extends Component {
  render() {
    return (
      <div>
        <h4>Inputs</h4>
        {this.props.inputs.map((input, index) =>
          <input
            key={"input" + index}
            value={input}
            onChange={event => {
              const newInputs = this.props.inputs.map(
                (input, i) => (index === i ? event.target.value : input)
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
