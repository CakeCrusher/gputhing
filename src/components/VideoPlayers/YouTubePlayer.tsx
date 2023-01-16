import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import YouTube from "react-youtube";
import type { YouTubePlayer, YouTubeEvent } from "react-youtube";
import {Box} from '@mui/material';

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

  const Box2 = styled(Box)(({ theme }) => ({
    height: "100%",
    width: `${width}%`,
    overflow: "hidden",
    pointerEvents: "none",
    userSelect: "none",
    '& div': {
      height: '100%'
    },
    '& iframe': {
      height: '100%'
    }
  }));

  return (
    <Box2>
      <YouTube
        opts={{
          height: 'auto',
          width: '100%'
        }}
        videoId={videoId}
        onStateChange={(e) => console.log(e.target.getCurrentTime())}
        onReady={handlePlayerReady}
      />
    </Box2>
  )
}
