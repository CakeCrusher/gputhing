type GpuData = {
  gpu: string,
  videoId: string,
  offset: number,
  width: number,
  start: number,
  duration: number,
  dlss: string
}

type VideoData = {
  [key: string]: {
    title: string,
    gpus: {
      [key: string]: GpuData
    }
  }
}

type PlayerWrapperObject = {
  player1: YouTubePlayer | null,
  player2: YouTubePlayer | null,
}

type VideoRef = {
  player: Ref<HTMLDivElement>,
  container: Ref<HTMLDivElement>,
}

type TwoVideoRefs = {
  video1: VideoRef,
  video2: VideoRef,
}

type TimestampHandler = {
  timestamp: number,
  setTimestamp: (n: number) => void,
  isPaused: boolean,
  pause: () => void,
  play: () => void,
  valueOf: () => number,
}
