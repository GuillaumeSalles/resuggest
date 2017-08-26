import $$String from "bs-platform/lib/js/string.js";
import Char from "bs-platform/lib/js/char.js";

const makeModuleFunctions = (_module, prefix) => {
  return Object.entries(_module)
    .map(([key,value]) => ({
      name: prefix + '.' + key,
      func: value
    }))
}

const makeFunctionsDataBase = () => {
  return makeModuleFunctions($$String, 'String')
    .concat(makeModuleFunctions(Char, 'Char'))
    .concat({ name: '^', func: (a,b) => a + b });
}

export default makeFunctionsDataBase();