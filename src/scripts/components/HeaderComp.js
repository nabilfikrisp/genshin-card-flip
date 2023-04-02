class HeaderItem extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* HTML */ `<h1
        class="mb-2 pt-8 text-center text-4xl font-semibold text-[#deb76c]"
      >
        Genshinku
      </h1>
      <p class="pb-8 text-center text-xl text-gray-400">
        Flip the card to see character details
      </p>`;
  }
}

customElements.define("header-item", HeaderItem);
