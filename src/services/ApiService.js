import axios from "axios";

const url = 'http://localhost:3000/proximo-jogo';

async function getNextGame() {
  const { data: data } = await axios.get(url, {
    headers: {
      Accept: 'application/json', 
    },
  }, []);

  return data;
}

export default getNextGame;
