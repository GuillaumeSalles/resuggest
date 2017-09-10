import React, { Component } from "react";

class ReasonExpressionInput extends Component {
  onChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <input value={this.props.code} onChange={this.onChange} />
        <span
          style={{
            color: "red",
            fontSize: "14px",
            fontStyle: "italic",
            marginLeft: "10px"
          }}
        >
          {this.props.error}
        </span>
      </div>
    );
  }
}

export default ReasonExpressionInput;
