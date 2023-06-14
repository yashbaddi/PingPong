export function changeAngle(div, angle) {
  const computedStyle = getComputedStyle(div);
  console.log(computedStyle);
}

export function linearAnimate(div, interval = 20) {
  let leftGrowthRate = 1;
  let topGrowthRate = 1;
  setInterval(() => {
    const computedStyle = getComputedStyle(div);
    console.log(
      computedStyle.left,
      computedStyle.right,
      computedStyle.top,
      computedStyle.bottom
    );
    if (computedStyle.left === "1px") leftGrowthRate = 1;
    if (computedStyle.right === "1px") leftGrowthRate = -1;
    if (computedStyle.top === "1px") topGrowthRate = 1;
    if (computedStyle.bottom === "1px") topGrowthRate = -1;

    div.style.left = parseInt(computedStyle.left) + leftGrowthRate + "px";
    div.style.top = parseInt(computedStyle.top) + topGrowthRate + "px";
  }, interval);
}
