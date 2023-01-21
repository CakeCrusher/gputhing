import axios from 'axios';

export default {
  getAllGpus: async (): Promise<Gpu[]> => {
    const gpus = await axios.get('/api/v1/gpus');
    return gpus.data;
  },
  getGpusForGame: async (game: string): Promise<Gpu[]> => {
    const gpus = await axios.get(`/api/v1/gpus?game=${encodeURIComponent(game)}`);
    return gpus.data;
  }
};

