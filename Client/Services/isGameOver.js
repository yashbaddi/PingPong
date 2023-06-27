import { game } from "../Store/gameStatus.js";

export function isGameOver() {
  const ball = game.ball.pos;
  const paddleLeftEdge = game.paddle.mainPaddle;
  const ballWidth = 20;
  const paddleWidth = 190;
  const paddleRightEdge = paddleLeftEdge + paddleWidth;
  const ballLeftEdge = ball.x - ballWidth / 2;
  const ballRightEdge = ball.x - ballWidth / 2;
  if (ballRightEdge >= paddleLeftEdge) return false;
  if (ballLeftEdge >= paddleRightEdge) return false;
  return true;
}
