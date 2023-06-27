import { updatePos } from "../Services/Socket/requests.js";
import { createDOMElement } from "../Services/createDOMElement.js";
import { game } from "../Store/gameStatus.js";

export function createPingpongBall() {
  const ballDOM = createDOMElement("div", ["ball"], [], {});
  updateBallDOM(ballDOM);
  return ballDOM;
}

function borderColisionHandler(gameHandler = () => {}) {
  const containerWidth = window.innerWidth - 5;
  const containerHeight = window.innerHeight - 5;
  console.log(game.ball.pos);
  if (game.ball.pos.y <= 5 || game.ball.pos.y >= containerHeight) {
    //Horizontal Handle
    console.log(" vertical Handle");
    game.ball.direction.vertical *= -1;
    updatePos();
  }
  if (game.ball.pos.x <= 5 || game.ball.pos.x >= containerWidth) {
    //Vertical Handle
    console.log("horizontal Handle");
    gameHandler();

    game.ball.direction.horizontal *= -1;
    updatePos();
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
  requestAnimationFrame(animateBall.bind(this, ballDOM));
}
