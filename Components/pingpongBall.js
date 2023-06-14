export function changeAngle(div, angle) {
  const computedStyle = getComputedStyle(div);
  console.log(computedStyle);
}

export function linearAnimate(div, interval = 20) {
  let leftGrowthRate = 1;
  let topGrowthRate = 1;
  setInterval(() => {
    const computedStyle = getComputedStyle(div);
    if (parseInt(computedStyle.left) <= 2) leftGrowthRate = 1;
    if (parseInt(computedStyle.right) <= 2) leftGrowthRate = -1;
    if (parseInt(computedStyle.top) <= 2) topGrowthRate = 1;
    if (parseInt(computedStyle.bottom) <= 2) topGrowthRate = -1;

    div.style.left = parseInt(computedStyle.left) + leftGrowthRate + "px";
    div.style.top = parseInt(computedStyle.top) + topGrowthRate + "px";
  }, interval);
}
