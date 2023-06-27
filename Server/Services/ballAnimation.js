let skipPixels = 50;
const IncrRate = 0.001;
const direction = {
  vertical: 1,
  horizontal: 1,
};

export function ballAnimate(game) {
  changeDirection(game.ball, direction);

  // skipPixels = skipPixels + skipPixels * IncrRate;

  game.ball.left = calcSpeed(game.ball.left, skipPixels, direction.vertical);

  game.ball.top = calcSpeed(game.ball.top, skipPixels, direction.horizontal);
}

function calcSpeed(initial, speed, direction) {
  return Math.ceil(parseInt(initial) + speed * direction);
}

function changeDirection(ball, direction) {
  if (parseInt(ball.left) <= 5) direction.vertical = 1;
  if (parseInt(ball.left) > 1430) direction.vertical = -1;
  if (parseInt(ball.top) <= 5) direction.horizontal = 1;
  if (parseInt(ball.top) > 760) direction.horizontal = -1;
}
