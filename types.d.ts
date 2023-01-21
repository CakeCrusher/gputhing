type GameDetails = null | {
  game: Game | null,
  gpus: Gpu[]
}

type VideoExt = {
  id: string;
  gpu: string;
  offset: string;
  width: number;
  start: string;
  duration: number;
  dlss: string;
};

type VideoData = {
  [key: string]: {
    title: string;
    gpus: {
      [key: string]: VideoExt;
    };
  };
};

type Game = {
  id: string;
};

type Gpu = {
  id: string;
};

type GameGpu = {
  id: string;
  game: string;
  gpu: string;
  videoIds: string[];
};

type Video = {
  id: string;
  offset: string;
  width: number;
  start: string;
  duration: number;
  dlss: string;
};
