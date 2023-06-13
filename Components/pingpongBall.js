function pingpongBall() {
  const ball = createDOMElement("div", ["ball"], [], {});
}

function changeAngle(div, angle) {
  const computedStyle = getComputedStyle(div);
  console.log(computedStyle);
}
