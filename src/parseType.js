import typeKinds from "./typeKinds";

const simpleTypes = ["bool", "int", "float", "string", "char"];

const tokenKinds = {
  simple: "simple",
  list: "list",
  arrow: "arrow",
  generic: "generic",
  openParenthesis: "openParenthesis",
  closeParenthesis: "closeParenthesis"
};

function tokenStream(str) {
  const words = [];
  let lastEnd = 0;

  for (var i = 0; i < str.length; i++) {
    switch (str[i]) {
      case " ":
        words.push(str.substring(lastEnd, i));
        lastEnd = i + 1;
        break;
      case "(":
        if (i !== 0) {
          words.push(str.substring(lastEnd, i));
        }
        words.push("(");
        lastEnd = i + 1;
        break;
      case ")":
        words.push(str.substring(lastEnd, i));
        words.push(str[i]);
        i++;
        lastEnd = i + 1;
        break;
    }
  }
  words.push(str.substring(lastEnd, str.length));

  let current = null;
  let pos = 0;

  function isSimpleType(word) {
    return simpleTypes.includes(word);
  }

  function readNext() {
    if (pos === words.length) {
      return null;
    }
    const word = words[pos++];
    if (isSimpleType(word)) {
      return { kind: tokenKinds.simple, value: word };
    } else if (word === "list") {
      return { kind: tokenKinds.list };
    } else if (word === "->") {
      return { kind: tokenKinds.arrow };
    } else if (word[0] === "'") {
      return { kind: tokenKinds.generic, value: word };
    } else if (word === "(") {
      return { kind: tokenKinds.openParenthesis };
    } else if (word === ")") {
      return { kind: tokenKinds.closeParenthesis };
    }

    throw new Error("Unkown word: '" + word + "' words: " + words);
  }

  function peek() {
    return current || (current = readNext());
  }

  return {
    peek: peek,
    next: () => {
      var tok = current;
      current = null;
      return tok || readNext();
    }
  };
}

function makeType(tokenStream, currentType) {
  const token = tokenStream.next();

  if (token === null) {
    return currentType;
  }
  if (token.kind === tokenKinds.simple) {
    return makeType(tokenStream, { kind: typeKinds.simple, type: token.value });
  }
  if (token.kind === tokenKinds.generic) {
    return makeType(tokenStream, {
      kind: typeKinds.generic,
      type: token.value
    });
  }
  if (token.kind === tokenKinds.list) {
    return makeType(tokenStream, {
      kind: typeKinds.list,
      itemType: currentType
    });
  }
  if (token.kind === tokenKinds.arrow) {
    return {
      kind: typeKinds.func,
      input: currentType,
      output: makeType(tokenStream, null)
    };
  }
  if (token.kind === tokenKinds.openParenthesis) {
    return makeType(tokenStream, makeType(tokenStream, null));
  }
  if (token.kind === tokenKinds.closeParenthesis) {
    return currentType;
  }

  throw new Error("Unknown token: " + JSON.stringify(token));
}

// Parse type extracted from compilation error
export default function parseType(str) {
  return makeType(tokenStream(str));
}
