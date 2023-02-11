type GameDetails = null | {
  game: Game | null,
  gpus: Gpu[]
}

type FullVideoDetails = {
  video: Video;
  game: Game;
  gpu: Gpu;
}

type VideoExt = Video & {
  gpu: string;
};

type Game = {
  id: string;
  imageUrl: string;
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
  offset: number;
  width: number;
  start: number;
  duration: number;
  dlss: string;
};
