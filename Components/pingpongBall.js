export function linearAnimate(
  div,
  interval = 20,
  speed = 3,
  speedIncrementRate = 0.0001
) {
  let rightDirection = 1;
  let bottomDirection = 1;
  const intervalID = setInterval(() => {
    const computedStyle = window.getComputedStyle(div);
    console.log(computedStyle);
    if (parseInt(computedStyle.left) <= 2) rightDirection = 1;
    if (parseInt(computedStyle.right) <= 2) rightDirection = -1;
    if (parseInt(computedStyle.top) <= 2) bottomDirection = 1;
    if (parseInt(computedStyle.bottom) <= 2) bottomDirection = -1;
    speed = speed + speed * speedIncrementRate;

    div.style.left =
      parseInt(computedStyle.left) + speed * rightDirection + "px";
    div.style.top =
      parseInt(computedStyle.top) + speed * bottomDirection + "px";
  }, interval);
  return intervalID;
}
