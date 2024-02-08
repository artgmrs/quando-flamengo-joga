import axios from "axios";

const url = 'https://flascrapper.vercel.app/api/nextgame';

async function getNextGame() {
  const { data: data } = await axios.get(url, {
    headers: {
      Accept: 'application/json', 
    },
  }, []);

  return data;
}

export default getNextGame;
