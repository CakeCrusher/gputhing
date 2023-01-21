import axios from 'axios';

export default {
  getAllGames: async (): Promise<Game[]> => {
    const games = await axios.get('/api/v1/games');
    return games.data;
  }

};

