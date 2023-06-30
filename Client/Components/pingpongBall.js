import { gameOver, updateBallPos } from "../Services/Socket/requests.js";
import { createDOMElement } from "../Utils/createDOMElement.js";
import { didPaddleBallColide } from "../Utils/didPaddleBallCollide.js";
import { game } from "../Store/gameStatus.js";

const padding = 3;

export function createPingpongBall() {
  const ballDOM = createDOMElement("div", ["ball"], [], {});
  updateBallDOM(ballDOM); //updates the balldom based on game.ball
  return ballDOM;
}

function borderColisionHandler() {
  const containerWidth = window.innerWidth - padding;
  const containerHeight = window.innerHeight - padding;

  if (game.ball.pos.y < padding || game.ball.pos.y > containerHeight) {
    if (game.ball.pos.y >= containerHeight && !didPaddleBallColide()) {
      gameOver();
    }
    console.log("in vertical=", game);
    game.ball.direction.vertical *= -1;
    sendBallPos();
  }
  if (game.ball.pos.x < padding || game.ball.pos.x > containerWidth) {
    game.ball.direction.horizontal *= -1;
    sendBallPos();
  }
}

function sendBallPos() {
  if (game.isMainPlayer) {
    game.ball.pos.x += padding * game.ball.direction.horizontal;
    game.ball.pos.y += padding * game.ball.direction.vertical;

    updateBallPos();
  }
}

export function setBall(ballDOM, newBall) {
  if (!isMainPlayer) borderColisionHandler();
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
  game.ball.pos.x += padding * game.ball.direction.horizontal;
  game.ball.pos.y += padding * game.ball.direction.vertical;

  updateBallDOM(ballDOM);
  const animationID = window.requestAnimationFrame(
    animateBall.bind(this, ballDOM)
  );
  if (game.isGameOver === true) window.cancelAnimationFrame(animationID);
}

export function setInitalBallDirections() {
  if (game.isMainPlayer == true) {
    game.ball.direction = {
      vertical: 1,
      horizontal: 1,
    };
  } else {
    game.ball.direction = {
      vertical: -1,
      horizontal: -1,
    };
  }
}
