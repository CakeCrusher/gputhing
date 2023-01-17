import { Box, IconButton, SxProps } from "@mui/material";
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';
import { PlayArrowSharp } from "@mui/icons-material";

import CustomSlider from "./CustomSlider";
import {useState} from "react";

type Props = {
  p: any
}

export default function VideoPlayerControls({ p }: Props) {
  const [isPaused, setIsPaused] = useState(true);
  const sx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }

  function checkVideosLoaded(): boolean {
    if (!p.player1) {
      console.log("Null player: player1")
      return false;
    }
    if (!p.player2) {
      console.log("Null player: player2")
      return false;
    }
    return true;
  }

  function playVideos() {
    if(checkVideosLoaded()) {
      p.player1.playVideo();
      p.player2.playVideo();
      setIsPaused(false);
    }
  }

  function pauseVideos() {
    if(checkVideosLoaded()) {
      p.player1.pauseVideo();
      p.player2.pauseVideo();
      setIsPaused(true);
    }
  }

  function restart() {
    if(checkVideosLoaded()) {
      p.player1.seekTo(0);
      p.player2.seekTo(0);
    }
  }

  return (
    <Box sx={sx} id="controls" style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
      <Box sx={{flex: '1'}}>
        <CustomSlider/>
      </Box>
      <Box sx={{flex: '2', display: 'flex'}}>
        <IconButton sx={{padding: '2', color: 'white'}} onClick={restart}>
          <ReplaySharpIcon />
        </IconButton>
        { isPaused ?
          <IconButton sx={{padding: '2', color: 'white'}} onClick={playVideos}>
            <PlayArrowSharp />
          </IconButton>
          :
          <IconButton sx={{padding: '2', color: 'yellow'}} onClick={pauseVideos}>
            <PlayArrowSharp />
          </IconButton>
        }
      </Box>
    </Box>
  )
}
