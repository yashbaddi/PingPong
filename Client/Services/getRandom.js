export function getRandom(firstNumber, secondNumber) {
  return Math.ceil(Math.random() * firstNumber) + secondNumber;
}

export function boolRandom() {
  return Math.round(Math.random());
}
