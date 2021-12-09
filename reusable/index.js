const toCapitalized = myString => {
  return myString
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()));
};
export {toCapitalized};
