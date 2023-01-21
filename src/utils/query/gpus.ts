import axios from 'axios';

const GPUS = [
  "Nvidia RTX 4090",
  "Nvidia RTX 4080",
  "Nvidia RTX 4070 TI",
  "Nvidia RTX 4070",
  "Nvidia RTX 4060",
  "Nvidia RTX 3090 TI",
  "Nvidia RTX 3090",
  "Nvidia RTX 3080 TI",
  "Nvidia RTX 3080",
  "Nvidia RTX 3070 TI",
  "Nvidia RTX 3070",
  "Nvidia RTX 3060 TI",
  "Nvidia RTX 3060",
  "Nvidia RTX 3050",
  "Nvidia RTX 2080 TI",
  "Nvidia RTX 2080",
  "Nvidia RTX 2070",
  "Nvidia RTX 2060",
  "Nvidia GTX 2050",
  "Nvidia GTX 1080 TI",
  "Nvidia GTX 1080",
  "Nvidia GTX 1070",
  "Nvidia GTX 1060",
  "Nvidia GTX 1050",
  "AMD RX 7900 XTX",
  "AMD RX 7900 XT",
  "AMD RX 6950 XT",
  "AMD RX 6900",
  "AMD RX 6800 XT",
  "AMD RX 6800",
  "AMD RX 6750 XT",
  "AMD RX 6700 XT",
  "AMD RX 6700",
  "AMD RX 6650 XT",
  "AMD RX 6600 XT",
  "AMD RX 6600",
  "AMD RX 6500 XT",
  "AMD RX 6400",
];

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

