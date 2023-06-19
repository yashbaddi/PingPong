export function linearAnimate(
  div,
  gameHandler,
  interval = 20,
  speed = 5,
  speedIncrementRate = 0.0001
) {
  const direction = {
    vertical: 1,
    horizontal: 1,
  };

  const intervalID = setInterval(() => {
    const computedStyle = window.getComputedStyle(div);

    changeDirection(computedStyle, direction, intervalID, gameHandler);

    speed = speed + speed * speedIncrementRate;

    div.style.left =
      parseInt(computedStyle.left) + speed * direction.vertical + "px";

    div.style.top =
      parseInt(computedStyle.top) + speed * direction.horizontal + "px";
  }, interval);
}

function changeDirection(style, direction, intervalID, gameHandler, speed = 2) {
  if (parseInt(style.left) <= speed) direction.vertical = 1;
  if (parseInt(style.right) <= speed) direction.vertical = -1;
  if (parseInt(style.top) <= speed) direction.horizontal = 1;
  if (parseInt(style.bottom) <= speed) gameHandler(direction, intervalID);
}
