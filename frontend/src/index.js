const app = document.querySelector("#app");

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = "News!";

  return element;
}

app.appendChild(component());
