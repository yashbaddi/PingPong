export function createSVGElement(
  elementName,
  classArray = [],
  childNodesArray = [],
  attributes = {}
) {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    elementName
  );
  assignNonStandard(element, attributes);
  element.classList.add(...classArray);
  element.append(...childNodesArray);
  return element;
}

function assignNonStandard(element, obj) {
  for (const [key, value] of Object.entries(obj)) {
    element.setAttribute(key, value);
  }
}
