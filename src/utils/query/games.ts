import axios from 'axios';

const GAMES = [
  "Cyberpunk 2077",
  "Witcher 3",
  "Valorant"
];

export default {
  getAllGames: async () => {
    const games = await axios.get('/api/v1/games');
    return games.data.map((games: any) => games.id);
    // return GAMES;
  }

};

