class MainComp extends HTMLElement {
  constructor() {
    super();
    this.setAttribute(
      "class",
      "mx-auto flex flex-wrap items-center justify-center gap-4"
    );
    this.setAttribute("id", "characterList");
    this.innerHTML = /* HTML */ ``;
  }
}

customElements.define("main-item", MainComp);
