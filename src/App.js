import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import database from "./database";
import InputsForm from "./InputsForm";

import Caml_obj from "bs-platform/lib/js/caml_obj.js";

const waitUntilScriptsLoaded = done => {
  const tout = setInterval(() => {
    if (window.refmt && window.ocaml && window.require) {
      clearInterval(tout);
      done();
    }
  }, 10);
};

const wrapInExports = code =>
  `(function(exports) {${code}})(window.exports = {})`;

function reasonToJs(reason) {
  const converted = window.refmt(reason, "RE", "implementation", "ML");
  const ocaml = converted[1];
  const res = JSON.parse(window.ocaml.compile(ocaml));
  return res.js_code;
}

const reasonExpToJs = reasonExp => {
  const reasonCode = `let exp = ${reasonExp};`;
  const jsCode = reasonToJs(reasonCode);
  window.eval(wrapInExports(jsCode));
  return window.exports.exp;
};

const isValidInput = str => str !== "";

const suggest = (inputs, output) => {
  // console.log("Inputs: ", inputs);
  // console.log("Output: ", output);
  const jsInputs = inputs.filter(isValidInput).map(reasonExpToJs);
  const jsOutput = reasonExpToJs(output);
  return database.filter(def =>
    isFunctionMatching(jsInputs, jsOutput, def.func)
  );
};

const isFunctionMatching = (inputs, output, func) => {
  if (func.length !== inputs.length) {
    return false;
  }
  try {
    const result = func.apply(null, inputs);
    return Caml_obj.caml_equal(result, output) === 1;
  } catch (er) {
    return false;
  }
};

const renderSuggestion = (suggestion, inputs, output) => {
  return [suggestion.name]
    .concat(inputs.filter(isValidInput))
    .concat("=>")
    .concat(output)
    .join(" ");
};

class App extends Component {
  componentDidMount() {
    waitUntilScriptsLoaded(() => {
      this.setState({
        inputs: ['"Hello World"', "", ""],
        output: '"HELLO WORLD"'
      });
    });
  }

  onInputChange = event => {
    this.setState({
      inputs: event.target.value
    });
  };

  onOutputChange = event => {
    this.setState({
      output: event.target.value
    });
  };

  render() {
    if (!this.state) {
      return <div />;
    }

    return (
      <div className="App">
        <div className="logo">
          <div className="logo-re-container">
            <div className="logo-re">RE</div>
          </div>
          <div>SUGGEST</div>
        </div>
        <div className="app-form">
          <InputsForm
            inputs={this.state.inputs}
            onChange={newInputs => this.setState({ inputs: newInputs })}
          />

          <h4>Desired Output</h4>
          <input value={this.state.output} onChange={this.onOutputChange} />

          <h4>Suggestions</h4>
          <pre>
            <code>
              {suggest(this.state.inputs, this.state.output).map(suggestion =>
                <div key={suggestion.name}>
                  {renderSuggestion(
                    suggestion,
                    this.state.inputs,
                    this.state.output
                  )}
                </div>
              )}
            </code>
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
