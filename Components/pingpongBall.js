export function linearAnimate(
  div,
  interval = 20,
  speed = 3,
  speedIncrementRate = 0.0001
) {
  const direction = {
    vertical: 1,
    horizontal: 1,
  };

  const intervalID = setInterval(() => {
    const computedStyle = window.getComputedStyle(div);

    getDirection(
      computedStyle.left,
      computedStyle.right,
      computedStyle.top,
      computedStyle.bottom,
      direction
    );
    console.log(direction, speed);

    speed = speed + speed * speedIncrementRate;
    div.style.left =
      parseInt(computedStyle.left) + speed * direction.vertical + "px";
    div.style.top =
      parseInt(computedStyle.top) + speed * direction.horizontal + "px";
  }, interval);

  return intervalID;
}

function getDirection(left, right, top, bottom, direction, speed = 2) {
  if (parseInt(left) <= speed) direction.vertical = 1;
  if (parseInt(right) <= speed) direction.vertical = -1;
  if (parseInt(top) <= speed) direction.horizontal = 1;
  if (parseInt(bottom) <= speed) direction.horizontal = -1;
  console.log(direction);
}

export function isOverlapping(div1, div2) {
  const div1Computed = window.getComputedStyle(div1);
  const div2Computed = window.getComputedStyle(div2);

  return !(
    div1Computed.left > div2Computed.right ||
    div1Computed.right > div2Computed.left ||
    div1Computed.top > div2Computed.bottom ||
    div1Computed.bottom > div2Computed.top
  );
}
