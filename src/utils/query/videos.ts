import axios from "axios";

export default {
  getAllVideos: async (): Promise<Video[]> => {
    const videos = await axios.get('/api/v1/videos');
    return videos.data;
  },
  getVideo: async (game: string, gpu: string): Promise<Video> => {
    console.log("game", game)
    console.log("gpu", gpu)
    const game_gpu = await axios.get(`/api/v1/game_gpu/${encodeURIComponent(`${game}_${gpu}`)}`);
    console.log("game_gpu", game_gpu.data)
    const videoId = game_gpu.data.videoIds[0];
    console.log("videoId", videoId)
    const video = await axios.get(`/api/v1/videos/${encodeURIComponent(videoId)}`);
    console.log("video", video.data)
    const videoData: Video = video.data;
    
    return videoData;
  }
}
