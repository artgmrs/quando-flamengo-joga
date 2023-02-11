import axios from "axios";

const url = 'https://fla-scrapper.vercel.app/proximo-jogo';

async function getNextGame() {
  const { data: data } = await axios.get(url, {
    headers: {
      Accept: 'application/json', 
    },
  }, []);

  return data;
}

export default getNextGame;
