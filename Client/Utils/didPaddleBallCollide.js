import { game } from "../Store/gameStatus.js";

export function didPaddleBallColide() {
  console.log("Game over check");
  const ball = game.ball.pos;
  const ballWidth = 20;
  const paddleWidth = 190;

  const paddleLeftEdge = game.paddle.firstPersonPaddlePos;
  const paddleRightEdge = paddleLeftEdge + paddleWidth;

  const ballLeftEdge = ball.x - ballWidth / 2;
  const ballRightEdge = ball.x + ballWidth / 2;

  if (ballRightEdge >= paddleLeftEdge && ballRightEdge <= paddleRightEdge) {
    return true;
  }
  if (ballLeftEdge <= paddleRightEdge && ballLeftEdge >= paddleLeftEdge) {
    return true;
  }
  game.isGameOver = true;
  return false;
}
