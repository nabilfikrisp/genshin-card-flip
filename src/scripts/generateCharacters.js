import axios from "axios";

function main() {
  async function generateCharacters() {
    try {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      const response = await axios.get(
        "https://api.genshin.dev/characters",
        config
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}

export default main;
