//Random Number Generator from 1-10

var random;
var max = 10;
function findRandom() {
  random = Math.floor(Math.random() * max) + 1; //Finds number between 0 - max
  return random;
}

module.exports = findRandom;
