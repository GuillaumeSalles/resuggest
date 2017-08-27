import Caml_obj from "bs-platform/lib/js/caml_obj.js";
import $$String from "bs-platform/lib/js/string.js";
import Caml_string from "bs-platform/lib/js/caml_string.js";
import Char from "bs-platform/lib/js/char.js";
import Pervasives from "bs-platform/lib/js/pervasives.js";
import Curry from "bs-platform/lib/js/curry.js";

import functions from "./generated/functions";
import generics from "./generated/genericFunctions";

const flatten = arrOfArr => {
  var result = [];
  for (var arr of arrOfArr) {
    for (var item of arr) {
      result.push(item);
    }
  }
  return result;
};

const makeFunctionsDataBase = () => {
  return flatten(Object.values(functions))
    .concat(Object.values(generics))
    .map(t => ({
      name: t[1],
      func: t[0]
    }));
};

export default makeFunctionsDataBase();
