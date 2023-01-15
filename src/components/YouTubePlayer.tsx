import Button from '@mui/material/Button';
import YouTube from "react-youtube";
import type { YouTubePlayer, YouTubeEvent } from "react-youtube";

let player: null | YouTubePlayer = null

type Props = {
  videoId: string
}

export default function YouTubePlayer(props: Props) {

  const handlePlayerReady = (e: YouTubeEvent) => {
    // if (player) return
    player = e.target
    return
  }

  const playVideo = () => {
    if (!player) return
    player.playVideo()
  }

  return (
    <>
      <Button onClick={playVideo}>PLAY</Button>
      <YouTube
        videoId={props.videoId}
        onStateChange={(e) => console.log(e.target.getCurrentTime())}
        onReady={handlePlayerReady}
      />
    </>
  )
}