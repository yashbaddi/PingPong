export function createPingpongBall() {
  const ball = createDOMElement("div", ["ball"], [], {});
  return ball;
}

export function ballAnimate(
  div,
  gameHandler,
  interval = 20,
  speed = 4,
  speedIncrementRate = 0.001
) {
  const direction = {
    vertical: 1,
    horizontal: 1,
  };

  const intervalID = setInterval(() => {
    const computedStyle = window.getComputedStyle(div);

    changeDirection(computedStyle, direction, intervalID, gameHandler);

    speed = speed + speed * speedIncrementRate;

    div.style.left = calcSpeed(computedStyle.left, speed, direction.vertical);
    div.style.top = calcSpeed(computedStyle.top, speed, direction.horizontal);
  }, interval);
}

function calcSpeed(initial, speed, direction) {
  return parseInt(initial) + speed * direction + "px";
}

function changeDirection(style, direction, intervalID, gameHandler, speed = 2) {
  if (parseInt(style.left) <= speed) direction.vertical = 1;
  if (parseInt(style.right) <= speed) direction.vertical = -1;
  if (parseInt(style.top) <= speed) direction.horizontal = 1;
  if (parseInt(style.bottom) <= speed) gameHandler(direction, intervalID);
}

export function resetBall(ball) {
  ball.style.left = "50%";
  ball.style.top = "50%";
}
