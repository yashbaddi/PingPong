import { gameOver, updatePos } from "../Services/Socket/requests.js";
import { createDOMElement } from "../Services/createDOMElement.js";
import { isGameOver } from "../Services/isGameOver.js";
import { game } from "../Store/gameStatus.js";

export function createPingpongBall() {
  const ballDOM = createDOMElement("div", ["ball"], [], {});
  updateBallDOM(ballDOM);
  return ballDOM;
}

function borderColisionHandler() {
  const containerWidth = window.innerWidth - 5;
  const containerHeight = window.innerHeight - 5;
  console.log(game.ball.pos);
  if (game.ball.pos.y <= 5 || game.ball.pos.y >= containerHeight) {
    //Horizontal Handle
    console.log(" vertical Handle");
    if (game.ball.pos.y >= containerHeight && isGameOver()) {
      gameOver();
    }

    game.ball.direction.vertical *= -1;
  }
  if (game.ball.pos.x <= 5 || game.ball.pos.x >= containerWidth) {
    //Vertical Handle
    console.log("horizontal Handle");
    game.ball.direction.horizontal *= -1;
  }
  updatePos();
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
  requestAnimationFrame(animateBall.bind(this, ballDOM));
}
