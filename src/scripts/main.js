import axios from "axios";
import "../style/style.css";
import "./components/HeaderComp";
import "./components/CharacterCard";
import "./components/MainComp";
import "./components/FooterComp";
// import "regenerator-runtime/runtime";

// const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
const baseUrl = `https://api.genshin.dev/characters`;

const main = () => {
  const getCharacters = async () => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      const mainElement = document.querySelector("main");
      const loadingElement = document.createElement("div");
      loadingElement.innerHTML = `Loading...`;
      loadingElement.classList.add(
        "text-white",
        "text-center",
        "text-xl",
        "font-semibold"
      );
      mainElement.appendChild(loadingElement);

      const nameResponse = await axios.get(`${baseUrl}`, config);
      const charactersName = nameResponse.data;
      const characters = await getCharacterDetail(charactersName);

      mainElement.removeChild(loadingElement);

      renderCharacterList(characters);
    } catch (error) {
      console.log(error);
    }
  };

  const getCharacterDetail = async (charactersName) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      const requests = charactersName.map(async (character) => {
        const response = await axios.get(`${baseUrl}/${character}`, config);
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
  };

  document.addEventListener("DOMContentLoaded", () => {
    getCharacters();
  });

  const renderCharacterList = (characters) => {
    const characterListElement = document.querySelector("main-item");

    characters.forEach((character, i) => {
      const characterCard = document.createElement("character-card");
      characterCard.setAttribute("id", i);
      characterCard.character = character;
      characterListElement.appendChild(characterCard);
    });
  };
};

export default main;
