import Button from '@mui/material/Button';
import YouTube from "react-youtube";
import type { YouTubePlayer, YouTubeEvent } from "react-youtube";

type Props = {
  videoId: string
  handlePlayerReady: (e: YouTubeEvent) => void;
  width: number
}

export default function YouTubePlayer({
  videoId,
  handlePlayerReady,
  width
}: Props) {

  return (
    <div style={{width: `${width}%`, overflow: "hidden", pointerEvents: "none", userSelect: "none"}}>
      <YouTube
        videoId={videoId}
        onStateChange={(e) => console.log(e.target.getCurrentTime())}
        onReady={handlePlayerReady}
      />
    </div>
  )
}
