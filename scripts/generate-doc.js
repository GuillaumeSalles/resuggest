const axios = require("axios");
const fs = require("fs");
const { JSDOM } = require("jsdom");
const functions = require("../packages/resuggest/scripts/functions");
const functionNameToReasonApiAnchorId = require("../src/functionNameToReasonApiAnchorId");

function makeFnToDocMap(functionNameAndDocTuples) {
  return `
let map = new Map([
  ${functionNameAndDocTuples.map(([fn, doc]) => `["${fn}",\`${doc}\`]`)}
]);

export default map;`;
}

function escapeCodeElementContent(jsDom) {
  for (let codeElem of jsDom.window.document.getElementsByClassName("code")) {
    codeElem.innerHTML = codeElem.innerHTML.replace("\\", "\\\\");
  }
}

function transformExternalLink(jsDom) {
  for (let a of jsDom.window.document.getElementsByTagName("a")) {
    a.setAttribute(
      "href",
      "https://reasonml.github.io/api/" + a.getAttribute("href")
    );
    a.setAttribute("target", "_blank");
  }
}

function moduleNameToJsDom(moduleName) {
  return axios
    .get(`https://reasonml.github.io/api/${moduleName}.html`)
    .then(res => {
      let dom = new JSDOM(res.data);
      escapeCodeElementContent(dom);
      transformExternalLink(dom);
      return [moduleName, dom];
    });
}

function functionNameToModuleName(name) {
  if (name.startsWith("(")) {
    return "Pervasives"; // Operators are all in Pervasives
  }
  var words = name.split(".");
  if (words.length === 1) {
    return "Pervasives";
  } else if (words.length === 2) {
    return words[0];
  } else if (words.length === 3) {
    // Belt
    return `${words[0]}.${words[1]}`;
  }
}

function extractDoc(functionName, moduleNameToJsDomMap) {
  console.log("Extract " + functionName);
  let dom = moduleNameToJsDomMap.get(functionNameToModuleName(functionName));

  if (dom === undefined) {
    return "";
  }

  return dom.window.document.getElementById(
    "VAL" + functionNameToReasonApiAnchorId(functionName)
  ).nextSibling.innerHTML;
}

let docsToFetch = ["Pervasives", "String", "Char", "List", "Array"];

Promise.all(docsToFetch.map(moduleNameToJsDom))
  .then(modulesJsDoms => {
    let moduleNameToJsDomMap = new Map(modulesJsDoms);

    let documentation = makeFnToDocMap(
      functions.map(fn => [fn, extractDoc(fn, moduleNameToJsDomMap)])
    );

    fs.writeFileSync("./src/generated/doc.js", documentation);
  })
  .catch(er => console.error(er));
