let skipPixels = 4;
const IncrRate = 0.001;
const direction = {
  vertical: 1,
  horizontal: 1,
};

export function ballAnimate(game) {
  changeDirection(game.ball, direction);

  skipPixels = skipPixels + skipPixels * IncrRate;

  game.ball.left = calcSpeed(game.ball.left, skipPixels, direction.vertical);

  game.ball.top = calcSpeed(game.ball.top, skipPixels, direction.horizontal);
}

function calcSpeed(initial, speed, direction) {
  return Math.ceil(parseInt(initial) + speed * direction) + "px";
}

function changeDirection(ball, direction) {
  if (parseInt(ball.left) <= 2) direction.vertical = 1;
  if (parseInt(ball.left) > 1180) direction.vertical = -1;
  if (parseInt(ball.top) <= 2) direction.horizontal = 1;
  if (parseInt(ball.top) > 1180) direction.horizontal = -1;
}
