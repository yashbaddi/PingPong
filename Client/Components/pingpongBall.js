import { createDOMElement } from "../Services/createDOMElement.js";

const ball = {
  pos: {
    x: 560,
    y: 560,
  },
  direction: {
    horizontal: 1,
    vertical: 1,
  },
};
export function createPingpongBall() {
  const ballDOM = createDOMElement("div", ["ball"], [], {});
  updateBallDOM(ballDOM);
  return ballDOM;
}

function borderColisionHandler(gameHandler = () => {}) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  if (ball.pos.y <= 5 || ball.pos >= windowHeight - 5) {
    //Horizontal Handle
    gameHandler();
    ball.direction.horizontal *= -1;
  }
  if (ball.pos.x <= 5 || ball.pos >= windowWidth - 5) {
    //Vertical Handle
    ball.direction.vertical *= -1;
  }
}

export function setBall(ballDOM, newBall) {
  ball.pos = newBall.pos;
  ball.direction = newBall.direction;
  updateBallDOM(ballDOM);
}

function updateBallDOM(ballDOM) {
  ballDOM.style.left = ball.pos.x + "px";
  ballDOM.style.top = ball.pos.y + "px";
}

export function animateBall(ballDOM) {
  ball.pos.x += 5 * ball.direction.vertical;
  ball.pos.y += 5 * ball.direction.horizontal;
  updateBallDOM(ballDOM);
  borderColisionHandler();
  requestAnimationFrame(animateBall.bind(this, ballDOM));
}
