import { pingpongBar } from "./Components/pingpongBar.js";
import { createDOMElement } from "./utils.js";

const app = document.getElementById("app");

const bar = pingpongBar();
// bar.focus();

const ball = createDOMElement("div", ["ball"], [], {});

app.append(bar, ball);
