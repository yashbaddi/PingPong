export function linearAnimate(
  div,
  interval = 20,
  speed = 3,
  speedIncrementRate = 0.0001
) {
  const intervalID = setInterval(() => {
    const computedStyle = window.getComputedStyle(div);

    const direction = getDirection(
      computedStyle.left,
      computedStyle.right,
      computedStyle.top,
      computedStyle.bottom,
      speed
    );

    speed = speed + speed * speedIncrementRate;
    div.style.left =
      parseInt(computedStyle.left) + speed * direction.right + "px";
    div.style.top =
      parseInt(computedStyle.top) + speed * direction.bottom + "px";
  }, interval);

  return intervalID;
}

function getDirection(left, right, top, bottom, min = 2) {
  const rightDir = 1;
  const bottomDir = 1;

  if (parseInt(left) <= speed) rightDir = 1;
  if (parseInt(right) <= speed) rightDir = -1;
  if (parseInt(top) <= speed) bottomDir = 1;
  if (parseInt(bottom) <= speed) bottomDir = -1;

  return { right: rightDir, bottom: bottomDir };
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
