export default Env => {
  // module.exports = Env => {
  const final = {}; // eslint-disable-line
  const inputValues = Object.values(Env).map(value => JSON.stringify(value));
  const inputKeys = Object.keys(Env);
  let i = 0;
  for (i; i < inputValues.length; i++) {
    final[inputKeys[i]] = inputValues[i];
  }

  return final;
};
