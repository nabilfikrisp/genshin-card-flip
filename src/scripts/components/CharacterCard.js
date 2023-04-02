class CharacterCard extends HTMLElement {
  set character(character) {
    this._character = character;
    this.render();
  }

  render() {
    this.innerHTML = /* HTML */ `
      <div class="group h-[450px] w-[300px] perspective">
        <div
          class="relative flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-slate-400 bg-[#353847] py-4 text-center duration-1000 preserve-3d group-hover:flip-card"
        >
          <div
            class="card-back absolute h-full w-full rounded-xl bg-inherit backface-hidden"
          >
            ${renderCardBack(this._character.name)}
          </div>
          <div
            class="card-front absolute flex w-full flex-col bg-inherit flip-card backface-hidden"
          >
            <div
              class="flex h-full w-full flex-col items-center justify-center"
            >
              <img
                src="${this._character.imagesrc}"
                alt=""
                class="object-scale-fit mb-4 rounded-full border-2 border-slate-400"
                onerror="this.onerror=null; this.src='./assets/traveler_face.png'"
              />
              <h1
                class="w-full bg-[#deb76c] py-1 text-center text-xl font-semibold"
              >
                ${this._character.name}
              </h1>
            </div>

            <div
              class="grid grid-cols-3 divide-x-2 divide-slate-400 border-b-2 border-slate-400 text-xs font-semibold text-[#deb76c]"
            >
              <p class="p-2">
                Vision
                <span
                  class="flex items-center justify-center gap-x-1 font-normal"
                >
                  ${renderVisionIcon(this._character.vision)}
                  ${this._character.vision}
                </span>
              </p>
              <p class="p-2">
                Weapon
                <span
                  class="flex items-center justify-center gap-x-1 font-normal"
                >
                  ${renderWeaponIcon(this._character.weapon)}
                  ${this._character.weapon}
                </span>
              </p>
              <p class="p-2">
                Nation
                <span
                  class="flex items-center justify-center gap-x-1 overflow-hidden font-normal"
                >
                  ${renderEmblemIcon(this._character.nation)}
                  ${this._character.nation}
                </span>
              </p>
            </div>
            <p
              class="flex w-full flex-col items-center justify-center self-center p-2 text-xs font-semibold text-slate-300"
            >
              Rarity
              <span class="flex w-full justify-center"
                >${renderRarityStar(this._character.rarity)}</span
              >
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

function renderRarityStar(rarity) {
  let svg = ``;
  for (let i = 0; i < rarity; i++) {
    svg += /* HTML */ `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-jewish-star-filled fill-yellow-500"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M8.433 6h-5.433l-.114 .006a1 1 0 0 0 -.743 1.508l2.69 4.486l-2.69 4.486l-.054 .1a1 1 0 0 0 .911 1.414h5.434l2.709 4.514l.074 .108a1 1 0 0 0 1.64 -.108l2.708 -4.514h5.435l.114 -.006a1 1 0 0 0 .743 -1.508l-2.691 -4.486l2.691 -4.486l.054 -.1a1 1 0 0 0 -.911 -1.414h-5.434l-2.709 -4.514a1 1 0 0 0 -1.714 0l-2.71 4.514z"
        stroke-width="0"
      ></path>
    </svg>`;
  }
  return svg;
}

function renderVisionIcon(vision) {
  let img = /* HTML */ `<img
    src="./assets/vision/${vision}.png"
    alt=""
    class="h-5 w-5"
    onerror="this.onerror=null; this.src='./assets/vision/anemo.png'"
  />`;
  return img;
}

function renderWeaponIcon(weapon) {
  let img = /* HTML */ `<img
    src="./assets/weapon/Weapon-class-${weapon}-icon.webp"
    alt=""
    class="h-5 w-5"
    onerror="this.onerror=null; this.src=''"
  />`;
  return img;
}

function renderEmblemIcon(nation) {
  let img = /* HTML */ `<img
    src="./assets/nation/Emblem_${nation}.webp"
    alt=""
    class="h-5 w-5"
    onerror="this.onerror=null; this.src='./assets/nation/Emblem_Nation_Unknown.webp'"
  />`;
  return img;
}

function renderCardBack(name) {
  let thisName = name;
  let img = ``;

  thisName = thisName.replace(/\s+/g, "_").toLowerCase();

  img = /* HTML */ `<img
    src="./assets/${thisName}.png"
    alt=""
    class="h-full w-full object-contain"
    onerror="this.onerror=null; this.src='./assets/traveler.png'"
  />`;

  return img;
}

customElements.define("character-card", CharacterCard);
