import axios from "axios";

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
  getAllVideos: async () => {
    const videos = await axios.get('/api/v1/videos');
    return videos.data.map((videos: any) => videos.id);
  },
  getVideo: async (game: string, gpu: string) => {
    const game_gpu = await axios.get(`/api/v1/game_gpu/${encodeURIComponent(`${game}_${gpu}`)}`);
    const videoId = game_gpu.data.videoIds[0];
    console.log("videoId", videoId)
    const video = await axios.get(`/api/v1/videos/${encodeURIComponent(videoId)}`);
    console.log("video", video.data)
    const videoData: GpuData = {
        ...video.data,
        videoId: video.data.id,
        gpu: gpu
    };
    return videoData;
  },
  getGpusForGame: (game: string) => {
    // get the keys of the gpus object
    if (!VIDEOS[game]) return [];
    return Object.keys(VIDEOS[game].gpus);
  }
}
