export function getRandom(firstNumber, secondNumber) {
  return Math.ceil(Math.random() * firstNumber) + secondNumber;
}

console.log(getRandom(1, 0.5));

export function boolRandom() {
  return Math.round(Math.random());
}
