import { game } from "../Store/gameStatus.js";

export function didPaddleBallColide() {
  console.log("Game over check");
  const ball = game.ball.pos;
  const paddlePos = game.paddle.firstPersonPaddlePos;
  const ballWidth = 20;
  const paddleWidth = 190;

  const paddleLeftEdge = paddlePos - paddleWidth / 2;
  const paddleRightEdge = paddlePos + paddleWidth / 2;

  const ballLeftEdge = ball.x - ballWidth / 2;
  const ballRightEdge = ball.x + ballWidth / 2;

  if (ballRightEdge >= paddleLeftEdge && ballRightEdge <= paddleRightEdge) {
    return true;
  }
  if (ballLeftEdge <= paddleRightEdge && ballLeftEdge >= paddleLeftEdge) {
    return true;
  }
  return false;
}
