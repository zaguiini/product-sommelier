export const el = (tagName, attributes = {}, ...children) => {
  const element =
    tagName === "svg" || tagName === "path"
      ? document.createElementNS("http://www.w3.org/2000/svg", tagName)
      : document.createElement(tagName);

  const events = ["click", "change", "mouseenter"];

  for (const attribute in attributes) {
    if (events.includes(attribute)) {
      element.addEventListener(attribute, attributes[attribute]);
    } else {
      element.setAttribute(attribute, attributes[attribute]);
    }
  }

  for (const child of children) {
    if (child) {
      element.appendChild(child);
    }
  }

  return element;
};

export const text = (content) => document.createTextNode(content);
