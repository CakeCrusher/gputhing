import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import YouTube from "react-youtube";
import type { YouTubePlayer, YouTubeEvent } from "react-youtube";
import {Box} from '@mui/material';
import {forwardRef, Ref} from 'react';

type Props = {
  videoId: string
  handlePlayerReady: (e: YouTubeEvent) => void;
}

function YouTubePlayer({
  videoId,
  handlePlayerReady,
}: Props, ref: Ref<HTMLDivElement>) {

  const Box2 = styled(Box)(({ theme }) => ({
    height: "100%",
    width: `49.5%`,
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
    <Box2 id={videoId} ref={ref}>
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

export default forwardRef(YouTubePlayer)
