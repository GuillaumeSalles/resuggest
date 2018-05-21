module.exports = function functionNameToReasonApiAnchorId(functionName) {
  switch (functionName) {
    case "(===)":
      return "(==)";
    case "(!==)":
      return "(!=)";
    case "(==)":
      return "(=)";
    case "(!=)":
      return "(<>)";
    case "(*)":
      return "( * )";
    case "(*.)":
      return "( *. )";
    case "(**)":
      return "( ** )";
    case "(++)":
      return "(^)";
    default:
      let words = functionName.split(".");
      return functionName.startsWith("(") || words.length === 1
        ? functionName
        : words[1];
  }
};
