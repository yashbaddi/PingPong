export function createDOMElement(
  elementName,
  classArray = [],
  childNodesArray = [],
  customDomObject = {}
) {
  const element = document.createElement(elementName);
  assignAttributes(element, customDomObject);
  element.classList.add(...classArray);
  element.append(...childNodesArray);
  return element;
}

function assignAttributes(element, object1) {
  for (const [key, value] of Object.entries(object1)) {
    if (element[key] !== undefined) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  }
}

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

function changeDirection(style, direction, intervalID, gameHandler, speed = 2) {
  if (parseInt(style.left) <= speed) direction.vertical = 1;
  if (parseInt(style.right) <= speed) direction.vertical = -1;
  if (parseInt(style.top) <= speed) direction.horizontal = 1;
  if (parseInt(style.bottom) <= speed) gameHandler(direction, intervalID);
}

export function linearAnimate(
  div,
  gameHandler,
  interval = 20,
  speed = 5,
  speedIncrementRate = 0.0001
) {
  const direction = {
    vertical: 1,
    horizontal: 1,
  };

  const intervalID = setInterval(() => {
    const computedStyle = window.getComputedStyle(div);

    changeDirection(computedStyle, direction, intervalID, gameHandler);

    speed = speed + speed * speedIncrementRate;

    div.style.left =
      parseInt(computedStyle.left) + speed * direction.vertical + "px";

    div.style.top =
      parseInt(computedStyle.top) + speed * direction.horizontal + "px";
  }, interval);
}
