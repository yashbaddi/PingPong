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
