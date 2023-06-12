import { createDOMElement } from "./utils.js";

const app = document.getElementById("app");

const bar = createDOMElement("div", ["bar"], [], {});

const ball = createDOMElement("div", ["ball"], [], {});

app.append(bar, ball);
