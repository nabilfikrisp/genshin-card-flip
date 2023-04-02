class FooterComp extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* HTML */ `
      <div class="w-full bg-[#280033] py-4">
        <div id="footer-container" class="text-center text-slate-200">
          Created by
          <span class="text-[#deb76c] hover:text-[#FFC500]"
            ><a href="https://www.linkedin.com/in/mnabilfikrisp/"
              >nabilfikrisp</a
            ></span
          >
          with 💗
        </div>
      </div>
    `;
  }
}

customElements.define("footer-item", FooterComp);
