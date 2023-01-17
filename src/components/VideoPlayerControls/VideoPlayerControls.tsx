import { Box, IconButton, SxProps } from "@mui/material";
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';
import { PlayArrowSharp } from "@mui/icons-material";

import CustomSlider from "./CustomSlider";

type Props = {
  isPaused: boolean
  playVideos: () => void
  pauseVideos: () => void
}

export default function VideoPlayerControls({ isPaused, playVideos, pauseVideos }: Props) {
  const sx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }

  return (
    <Box sx={sx} id="controls" style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
      <Box sx={{flex: '1'}}>
        <CustomSlider/>
      </Box>
      <Box sx={{flex: '2', display: 'flex'}}>
        <IconButton sx={{padding: '2', color: 'white'}}>
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
