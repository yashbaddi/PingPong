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
