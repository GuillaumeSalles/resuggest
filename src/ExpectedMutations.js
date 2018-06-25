import React, { Component } from "react";
import ReasonExpressionInput from "./ReasonExpressionInput";

function indexToArgLabel(index) {
  switch (index) {
    case 0:
      return "1st argument mutation";
    case 1:
      return "2nd argument mutation";
    case 2:
      return "3rd argument mutation";
    default:
      throw new Error(`${index} not supported`);
  }
}

function isMutationInvisible(input) {
  return input.expression.type == null || input.expression.type.kind !== 1;
}

class ExpectedMutations extends Component {
  renderMutation(input, index) {
    if (isMutationInvisible(input)) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        <div>{indexToArgLabel(index)}</div>
        <ReasonExpressionInput
          value={input}
          key={"input" + index}
          code={input.expectedMutation.code}
          error={input.expectedMutation.error}
          label={indexToArgLabel(index)}
          onChange={newCode => {
            const newInputs = this.props.inputs.map(
              (input, i) =>
                index === i
                  ? { ...input, expectedMutation: { code: newCode } }
                  : input
            );
            this.props.onChange(newInputs);
          }}
        />
      </React.Fragment>
    );
  }

  render() {
    const areAllMutationsInvisible = this.props.inputs.every(
      isMutationInvisible
    );
    return (
      <div>
        {areAllMutationsInvisible && (
          <p className="info">No arguments given are mutable.</p>
        )}
        {this.props.inputs.map((input, index) =>
          this.renderMutation(input, index)
        )}
      </div>
    );
  }
}

export default ExpectedMutations;
