import axios from "axios";
import "../style/style.css";

// const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
const baseUrl = `https://api.genshin.dev/characters`;
function main() {
  async function getCharacters() {
    try {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      const nameResponse = await axios.get(`${baseUrl}`, config);
      const charactersName = nameResponse.data;
      const characters = await getCharacterDetail(charactersName);
      console.log(characters);
      renderCharacterList(characters);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCharacterDetail(charactersName) {
    try {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      const requests = charactersName.map(async (character) => {
        const response = await axios.get(`${baseUrl}/${character}`, config);
        let name = response.data.name;
        let imagesrc = response.data.name;

        imagesrc = imagesrc.replace(/\s+/g, "_").toLowerCase();
        return {
          name:
            response.data.name === "Traveler"
              ? `${response.data.vision} ${response.data.name}`
              : response.data.name,
          vision: response.data.vision,
          weapon: response.data.weapon,
          nation: response.data.nation,
          rarity: response.data.rarity,
          imagesrc: `./assets/${imagesrc}_face.png`,
        };
      });
      const responses = await Promise.all(requests);
      return responses;
    } catch (error) {
      console.log(error);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    getCharacters();
  });

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
      onerror="this.onerror=null; this.src=''"
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
      class="w-full h-full object-cover"
      onerror="this.onerror=null; this.src='./assets/traveler.png'"
    />`;

    return img;
  }

  function renderCharacterList(characters) {
    let characterListElement = document.querySelector("#characterList");

    characterListElement.innerHTML = "";

    characters.forEach((character, i) => {
      characterListElement.innerHTML += /* HTML */ `<div
        class="flex w-[300px] h-[450px] flex-col items-center justify-center rounded-xl border-2 border-slate-400 bg-[#353847] py-4 text-center"
      >
        <div class="card-front flex w-full flex-col hidden">
          <div class="flex w-full flex-col items-center justify-center">
            <img
              src="${character.imagesrc}"
              alt=""
              class=""
              onerror="this.onerror=null; this.src='./assets/characters/Empty/icon-front.png'"
            />
            <h1 class="w-full bg-[#deb76c] text-center text-xl font-semibold py-1">
              ${character.name}
            </h1>
          </div>

          <div class="grid grid-cols-3 font-semibold text-[#deb76c] divide-x-2 border-b-2 border-slate-400 divide-slate-400 text-xs">
            <p class="p-2">
              Vision <span class="font-normal flex items-center justify-center gap-x-1">
                ${renderVisionIcon(character.vision)}${character.vision}
              </span>
            </p>
            <p class="p-2">
              Weapon <span class="font-normal flex items-center justify-center gap-x-1">
              ${renderWeaponIcon(character.weapon)}${character.weapon}
              </span>
            </p>
            <p class="p-2">
              Nation <span class="font-normal flex items-center justify-center gap-x-1 overflow-hidden">
              ${renderEmblemIcon(character.nation)}${character.nation}
            </span>
            </p>
          </div>
          <p
            class="flex w-full flex-col items-center justify-center self-center font-semibold text-slate-300 p-2 text-xs"
          >
            Rarity: 
            <div id="stars" class="flex w-full justify-center">
              ${renderRarityStar(character.rarity)}
            </div>
          </p>
        </div>

        <div class="card-back w-full h-full">
          ${renderCardBack(character.name)}
        </div>
      </div>`;
    });
  }
}

export default main;
