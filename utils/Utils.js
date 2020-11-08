const capitalize = (text) => {
  let word = text.toLowerCase();
  word = word.charAt(0).toUpperCase() + word.slice(1);
  return word;
};

const getLength = (string) => {
  if (string == null) return 0;
  else return string.trim().length;
};

const omit = (key, object) => {
  let copy = Object.assign({}, object);
  delete copy[key];
  return copy;
};

export { capitalize, getLength, omit };
