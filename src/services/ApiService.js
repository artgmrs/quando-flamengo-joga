import axios from "axios";

const url = 'https://fla-scrapper.vercel.app/games/next-game';

async function getNextGame() {
  const { data: data } = await axios.get(url, {
    headers: {
      Accept: 'application/json', 
    },
  }, []);

  return data;
}

export default getNextGame;
