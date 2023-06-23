export function ballAnimate(
  game,
  interval = 20,
  skipPixels = 4,
  IncrRate = 0.001
) {
  const direction = {
    vertical: 1,
    horizontal: 1,
  };
  console.log(direction);

  const intervalID = setInterval(() => {
    changeDirection(game.ball, direction, intervalID);

    skipPixels = skipPixels + skipPixels * IncrRate;

    game.ball.left = calcSpeed(
      computedStyle.left,
      skipPixels,
      direction.vertical
    );

    game.ball.top = calcSpeed(
      computedStyle.top,
      skipPixels,
      direction.horizontal
    );
  }, interval);
  return intervalID;
}

function calcSpeed(initial, speed, direction) {
  return parseInt(initial) + speed * direction + "px";
}

function changeDirection(ball, direction, speed = 2) {
  if (parseInt(ball.left) <= speed) direction.vertical = 1;
  if (parseInt(ball.right) <= speed) direction.vertical = -1;
  if (parseInt(ball.top) <= speed) direction.horizontal = 1;
  if (parseInt(ball.bottom) <= speed) direction.horizontal = -1;
}
