import type { YouTubePlayer, YouTubeEvent } from "react-youtube";

export default {
  preparePlayer: (player: YouTubePlayer, data: GpuData | null) => {
    player.mute();
  }
}
