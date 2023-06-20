class Bar {
  constructor(position = "bottom") {
    this.#bar = createDOMElement("rect", ["bar", "bar-" + position], [], {});
    this.#bar;
    this.style = window.getComputedStyle(this.#bar);
    if (position == "bottom") {
      this.#bar.tabIndex = 0;
      this.#bar.autofocus = true;
      this.#bar.addEventListener("keydown", this.#barEventHandler);
    }
  }
  #barEventHandler() {}
}
