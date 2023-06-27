import { createDOMElement } from "../Services/createDOMElement.js";
import { game } from "../store/gameStatus.js";

export function createPingpongBall() {
  const ballDOM = createDOMElement("div", ["ball"], [], {});
  updateBallDOM(ballDOM);
  return ballDOM;
}

function borderColisionHandler(gameHandler = () => {}) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  if (game.ball.pos.y <= 5 || game.ball.pos >= windowHeight - 5) {
    //Horizontal Handle
    gameHandler();
    game.ball.direction.horizontal *= -1;
  }
  if (game.ball.pos.x <= 5 || game.ball.pos >= windowWidth - 5) {
    //Vertical Handle
    game.ball.direction.vertical *= -1;
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
  game.ball.pos.x += 5 * game.ball.direction.vertical;
  game.ball.pos.y += 5 * game.ball.direction.horizontal;
  updateBallDOM(ballDOM);
  borderColisionHandler();
  requestAnimationFrame(animateBall.bind(this, ballDOM));
}
