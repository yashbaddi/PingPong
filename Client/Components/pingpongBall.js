import { gameOver, updatePos } from "../Services/Socket/requests.js";
import { createDOMElement } from "../Utils/createDOMElement.js";
import { didPaddleBallColide } from "../Services/didPaddleBallCollide.js";
import { game } from "../Store/gameStatus.js";

export function createPingpongBall() {
  const ballDOM = createDOMElement("div", ["ball"], [], {});
  updateBallDOM(ballDOM); //updates the balldom based on game.ball
  return ballDOM;
}

function borderColisionHandler() {
  const containerWidth = window.innerWidth - 5;
  const containerHeight = window.innerHeight - 5;

  if (game.ball.pos.y <= 5 || game.ball.pos.y >= containerHeight) {
    if (game.ball.pos.y >= containerHeight && !didPaddleBallColide()) {
      gameOver();
    }

    game.ball.direction.vertical *= -1;
    if (game.isMainPlayer) updatePos();
  }
  if (game.ball.pos.x <= 5 || game.ball.pos.x >= containerWidth) {
    game.ball.direction.horizontal *= -1;
    if (game.isMainPlayer) updatePos();
  }
}

export function setBall(ballDOM, newBall) {
  game.ball.pos = newBall.pos;
  game.ball.direction = newBall.direction;
  updateBallDOM(ballDOM);
}

function updateBallDOM(ballDOM) {
  ballDOM.style.left = game.ball.pos.x + "px";
  ballDOM.style.top = game.ball.pos.y + "px";
}

export function animateBall(ballDOM) {
  borderColisionHandler();
  game.ball.pos.x += 3 * game.ball.direction.horizontal;
  game.ball.pos.y += 3 * game.ball.direction.vertical;

  updateBallDOM(ballDOM);
  const animationID = window.requestAnimationFrame(
    animateBall.bind(this, ballDOM)
  );
  if (game.isGameOver === true) window.cancelAnimationFrame(animationID);
}
