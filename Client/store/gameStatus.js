export const game = {
  ball: {
    pos: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    },
    direction: {
      horizontal: 1,
      vertical: 1,
    },
  },
  paddle: {
    firstPersonPaddlePos: window.innerWidth / 2,
    secondPersonPaddlePos: window.innerWidth / 2,
  },
  isMainPlayer: false,
  isGameOver: false,
};
