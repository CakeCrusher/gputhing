import { Box, IconButton, SxProps, Typography } from "@mui/material";
import { PauseSharp, PlayArrowSharp, SkipPreviousSharp } from "@mui/icons-material";

import CustomSlider from "./CustomSlider";
import {useContext, useEffect, useState} from "react";
import {VideosContext} from "../context/VideosContext";
import useTimestampHandler from "./TimeHandler";

type Props = {
  startAt: number
  endAt: number
}

var timer: any = null;

export default function VideoPlayerControls({ startAt, endAt }: Props) {
  const { timestamp, setTimestamp, isPaused, pause, play } = useTimestampHandler(0);
  const { videoRefs } = useContext(VideosContext);
  let playerRef1 = videoRefs.video1.player.current;
  let playerRef2 = videoRefs.video2.player.current;

  const sx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }

  function checkVideosLoaded(): boolean {
    playerRef1 = videoRefs.video1.player.current;
    playerRef2 = videoRefs.video2.player.current;
    if (!playerRef1) {
      console.log("Null player: player1", playerRef1);
      return false;
    }
    if (!playerRef2) {
      console.log("Null player: player2", playerRef2);
      return false;
    }
    return true;
  }

  function playVideos() {
    if(checkVideosLoaded()) {
      playerRef1.playVideo();
      playerRef2.playVideo();
      play();
    }
  }

  function pauseVideos() {
    if(checkVideosLoaded()) {
      playerRef1.pauseVideo();
      playerRef2.pauseVideo();
      pause();
    }
  }

  function restart() {
    if(checkVideosLoaded()) {
      playerRef1.seekTo(0);
      playerRef2.seekTo(0);
      setTimestamp(0);
    }
  }

  function seekTo(time: number) {
    setTimestamp(time);
    playerRef1.seekTo(Math.floor(time / 1000));
    playerRef2.seekTo(Math.floor(time / 1000));
  }

  return (
    <Box sx={sx} id="controls" style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
      <Box sx={{flex: '1'}}>
        <CustomSlider timeOffset={timestamp} timeLength={(endAt - startAt) * 1000} seekTo={seekTo}/>
      </Box>
      <Box sx={{flex: '2', display: 'flex'}}>
        <IconButton sx={{padding: '2', color: 'white'}} onClick={restart}>
          <SkipPreviousSharp onClick={restart}/>
        </IconButton>
        { isPaused ?
          <IconButton sx={{padding: '2', color: 'white'}} onClick={playVideos}>
            <PlayArrowSharp />
          </IconButton>
          :
          <IconButton sx={{padding: '2', color: 'white'}} onClick={pauseVideos}>
            <PauseSharp />
          </IconButton>
        }
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Typography style={{color: '#d3d3d3', fontSize: "0.625em"}}>
            {`${Math.max(
              0, 
              Math.floor( (timestamp - 200) / 1000)
            )}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
