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

const VIDEOS: VideoData = {
    "Cyberpunk 2077": {
        title: "Cyberpunk 2077",
        gpus: {
            "Nvidia RTX 4080": {
                gpu: "Nvidia RTX 4080",
                videoId: "U1CuB-YGa9c",
                offset: "Left",
                width: 0,
                start: "4:41",
                duration: 281,
                dlss: "QUALITY"
            },
            "Nvidia RTX 4070 TI": {
                gpu: "Nvidia RTX 4070 TI",
                videoId: "GjdWdNOprnc",
                offset: "Left",
                width: 0,
                start: "4:06",
                duration: 246,
                dlss: "QUALITY"
            },
            "Nvidia RTX 3090 TI": {
                gpu: "Nvidia RTX 3090 TI",
                videoId: "VpZPRxMAzXs",
                offset: "Left",
                width: 0,
                start: "5:13",
                duration: 313,
                dlss: "QUALITY"
            },
            "Nvidia RTX 3090": {
                gpu: "Nvidia RTX 3090",
                videoId: "1rYWxAtE3V8",
                offset: "Left",
                width: 0,
                start: "6:08",
                duration: 368,
                dlss: "QUALITY"
            },
            "Nvidia RTX 3080 TI": {
                gpu: "Nvidia RTX 3080 TI",
                videoId: "6GqnfqWXR3A",
                offset: "Left",
                width: 0,
                start: "4:30",
                duration: 270,
                dlss: "QUALITY"
            },
            "AMD RX 7900 XTX": {
                gpu: "AMD RX 7900 XTX",
                videoId: "b-1D3jbL1Vs",
                offset: "Left",
                width: 50,
                start: "3:14",
                duration: 194,
                dlss: "NONE"
            },
            "AMD RX 7900 XT": {
                gpu: "AMD RX 7900 XT",
                videoId: "b-1D3jbL1Vs",
                offset: "Left",
                width: 0,
                start: "3:14",
                duration: 194,
                dlss: "NONE"
            }
        }
    }
} 

// http://localhost:3000/api/v1/query?game=Cyberpunk+2077&gpus=Nvidia+RTX+4080&gpus=Nvidia+RTX+4070+TI

export default {
  getVideo: (game: string, gpu: string) => {
    return VIDEOS[game].gpus[gpu];
  }
}
