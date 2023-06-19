export function isOverlapping(div1, div2) {
  const div1Computed = div1.getBoundingClientRect();
  const div2Computed = div2.getBoundingClientRect();
  console.log("Bar:", div1Computed);
  console.log("Ball:", div2Computed);

  return !(
    parseInt(div1Computed.left) > parseInt(div2Computed.right) ||
    parseInt(div1Computed.right) < parseInt(div2Computed.left) ||
    parseInt(div1Computed.top) > parseInt(div2Computed.bottom) ||
    parseInt(div1Computed.bottom) < parseInt(div2Computed.top)
  );
}
