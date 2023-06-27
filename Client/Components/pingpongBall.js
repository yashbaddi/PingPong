import { animate } from "../Services/animate.js";
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

function calcSpeed(initial, speed, direction) {
  return parseInt(initial) + speed * direction + "px";
}

export function resetBall(ballDOM) {
  ballDOM.style.left = "50%";
  ballDOM.style.top = "50%";
}

export function animateBall(ballDOM) {
  const direction = {
    vertical: 1,
    horizontal: 1,
  };
  speed = 10;
  speedIncrementRate = 0.001;

  function animate() {
    const computedStyle = window.getComputedStyle(ballDOM);
    changeDirection(computedStyle, direction, intervalID, gameHandler);
    speed = speed + speed * speedIncrementRate;
    ballDOM.style.left = calcSpeed(
      computedStyle.left,
      speed,
      direction.vertical
    );
    ballDOM.style.top = calcSpeed(
      computedStyle.top,
      speed,
      direction.horizontal
    );
    requestAnimationFrame(animate);
  }
  animate();
}

export function incrBall(ballDOM, positionTop, positionLeft) {
  animate((progress) => {
    ballDOM.style.top = progress * positionTop + "px";
    ballDOM.style.left = progress * positionLeft + "px";
  }, 500);
}

function animateBall() {
  ballDOM.style.top = parseInt(ballDOM.style.top) + 2 + "px";
  ballDOM.style.left = parseInt(ballDOM.style.left) + 2 + "px";
}
