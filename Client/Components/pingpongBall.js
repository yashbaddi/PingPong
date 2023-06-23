import { createDOMElement } from "../Services/createDOMElement.js";

export function createPingpongBall() {
  const ball = createDOMElement("div", ["ball"], [], {});
  return ball;
}

export function ballAnimate(
  ball,
  gameHandler,
  interval = 20,
  speed = 4,
  speedIncrementRate = 0.001
) {
  const direction = {
    vertical: 1,
    horizontal: 1,
  };
  console.log(direction);

  const intervalID = setInterval(() => {
    const computedStyle = window.getComputedStyle(ball);

    changeDirection(computedStyle, direction, intervalID, gameHandler);

    speed = speed + speed * speedIncrementRate;

    ball.style.left = calcSpeed(computedStyle.left, speed, direction.vertical);
    ball.style.top = calcSpeed(computedStyle.top, speed, direction.horizontal);
    console.log(ball.style.top, ball.style.left);
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

export function animateBall(ball) {
  const direction = {
    vertical: 1,
    horizontal: 1,
  };
  speed = 10;
  speedIncrementRate = 0.001;

  function animate() {
    const computedStyle = window.getComputedStyle(ball);
    changeDirection(computedStyle, direction, intervalID, gameHandler);
    speed = speed + speed * speedIncrementRate;
    ball.style.left = calcSpeed(computedStyle.left, speed, direction.vertical);
    ball.style.top = calcSpeed(computedStyle.top, speed, direction.horizontal);
    requestAnimationFrame(animate);
  }
  animate();
}

export function setBall(ball, positionTop, positionLeft) {
  ball.style.top = positionTop;
  ball.style.left = positionLeft;
}
