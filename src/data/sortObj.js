function reorderObject(obj) {
  const booleanKeys = [];
  const stringKeys = [];

  // Separate keys into boolean and string arrays
  for (const key in obj) {
    if (typeof obj[key] === 'boolean') {
      booleanKeys.push({ [key]: obj[key] });
    } else {
      stringKeys.push({ [key]: obj[key] });
    }
  }

  // Merge boolean and string arrays
  const reorderedKeys = booleanKeys.concat(stringKeys);

  // Combine objects into a single object
  const reorderedObj = Object.assign({}, ...reorderedKeys);

  return reorderedObj;
}

module.exports = {
  reorderObject
}