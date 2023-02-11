import { ForwardedRef, forwardRef, Ref, useContext } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import YouTube from "react-youtube";
import type { YouTubePlayer, YouTubeEvent } from "react-youtube";
import { Box } from '@mui/material';
import { VideosContext } from '../context/VideosContext';

type Props = {
  videoId: string
  handlePlayerReady: (e: YouTubeEvent) => void;
}

function YouTubePlayer({
  videoId,
  handlePlayerReady,
}: Props, ref: ForwardedRef<VideoRef>) {
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
    <Box2 id={videoId} ref={ref} style={{overflow: 'hidden'}}>
      <YouTube
        opts={{
          height: 'auto',
          position: 'relative',
          width: '100%'
        }}
        // TODO: Need to rework what app looks like with "no video selected"
        videoId={videoId ? videoId : 'uL6R4XNRQoc'}
        onStateChange={(e) => console.log(e.target.getCurrentTime())}
        onReady={handlePlayerReady}
      />
    </Box2>
  )
}

export default forwardRef(YouTubePlayer)
