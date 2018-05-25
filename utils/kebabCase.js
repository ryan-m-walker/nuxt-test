module.exports = (input) =>
  input
  .toLowerCase()
  .trim()
  .split(' ')
  .join('-');
