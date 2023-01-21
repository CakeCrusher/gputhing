import axios from 'axios';

const GAMES = [
  "Cyberpunk 2077",
  "Witcher 3",
  "Valorant"
];

export default {
  getAllGames: async (): Promise<Game[]> => {
    const games = await axios.get('/api/v1/games');
    return games.data;
    // return GAMES;
  }

};

