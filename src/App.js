import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import database from './database';

const waitUntilScriptsLoaded = done => {
  const tout = setInterval(() => {
    if (window.refmt && window.ocaml && window.require) {
      clearInterval(tout);
      done();
    }
  }, 10);
};

const wrapInExports = code =>
  `(function(exports) {${code}})(window.exports = {})`

function reasonToJs(reason) {
  const converted = window.refmt(reason, 'RE', 'implementation', 'ML');
  const ocaml = converted[1];
  const res = JSON.parse(window.ocaml.compile(ocaml));
  return res.js_code;
}

const reasonExpToJs = (reasonExp) => {
  const reasonCode = `let exp = ${reasonExp};`;
  const jsCode = reasonToJs(reasonCode);
  window.eval(wrapInExports(jsCode));
  return window.exports.exp;
}

const suggest = (inputs, output) => {
  console.log('Inputs: ', inputs);
  console.log('Output: ', output);
  return database
    .filter(def => isFunctionMatching(inputs.map(reasonExpToJs), reasonExpToJs(output), def.func));
}

const isFunctionMatching = (inputs, output, func) => {
  console.log(func);
  try {
    const result = func.apply(null, inputs);
    console.log(result);
    return result === output;
  } catch (er) {
    return false
  }
};

class App extends Component {
  componentDidMount() {
    waitUntilScriptsLoaded(() => {
      this.setState({
        inputs: ['"Hello World"', ''],
        output: '"HELLO WORLD"'
      });
    })
  }

  onInputChange = event => {
    this.setState({
      inputs: event.target.value
    });
  }

  onOutputChange = event => {
    this.setState({
      output: event.target.value
    });
  }

  render() {
    if(!this.state) {
      return <div></div>
    }

    return (
      <div className="App">
        <div className="logo">
          <div className="logo-re-container"><div className="logo-re">RE</div></div>
          <div>SUGGEST</div>
        </div>
        <div className="app-form">
          <h4>Inputs</h4>

          {
            this.state.inputs.map((input,index) => 
              <input 
                key={"input"+index} 
                value={this.state.inputs[index]} 
                onChange={(event) => {
                  this.setState((prev) => ({
                    inputs: prev.inputs.map((input,i) => index === i ? event.target.value : input)
                  }));
                }}/>
            )
          }
          

          <h4>Desired Output</h4>
          <input value={this.state.output} onChange={this.onOutputChange}/>

          <h4>Suggestions</h4>
          <pre>
            <code>
              {
                suggest(this.state.inputs, this.state.output)
                  .map(suggestion => (
                      <div key={suggestion.name}>
                        {`${suggestion.name} ${this.state.inputs[0]} => ${this.state.output}`}
                      </div>
                    ))
              }
            </code>
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
