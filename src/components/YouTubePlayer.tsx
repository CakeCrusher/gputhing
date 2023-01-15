import Button from '@mui/material/Button';
import YouTube from "react-youtube";

let player = null

export default function YouTubePlayer() {

  const handlePlayerReady = (e) => {
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
        videoId='LtCMpsAw1Ho'
        onStateChange={(e) => console.log(e.target.getCurrentTime())}
        onReady={handlePlayerReady}
      />
    </>
  )
}
