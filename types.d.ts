type GpuData = {
  gpu: string,
  videoId: string,
  offset: string,
  width: number,
  start: string,
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