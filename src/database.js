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
