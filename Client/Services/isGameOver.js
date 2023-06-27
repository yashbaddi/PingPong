import { game } from "../Store/gameStatus.js";

export function isGameOver() {
  console.log("Game over check");
  const ball = game.ball.pos;
  const paddleLeftEdge = game.paddle.mainPaddle;
  const ballWidth = 20;
  const paddleWidth = 190;
  const paddleRightEdge = paddleLeftEdge + paddleWidth;
  const ballLeftEdge = ball.x - ballWidth / 2;
  const ballRightEdge = ball.x + ballWidth / 2;
  if (ballRightEdge >= paddleLeftEdge && ballRightEdge <= paddleRightEdge) {
    return false;
  }
  if (ballLeftEdge <= paddleRightEdge && ballLeftEdge >= paddleLeftEdge) {
    return false;
  }
  return true;
}
