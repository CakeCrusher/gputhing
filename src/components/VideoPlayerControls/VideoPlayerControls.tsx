import { Box, IconButton, SxProps } from "@mui/material";
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';
import { PlayArrowSharp } from "@mui/icons-material";

import CustomSlider from "./CustomSlider";

type Props = {
  id: string | undefined
}
export default function VideoPlayerControls({ id }: Props) {
  const sx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }

  return (
    <Box sx={sx} id={id} style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
      <Box sx={{flex: '1'}}>
        <CustomSlider/>
      </Box>
      <Box sx={{flex: '2', display: 'flex'}}>
        <IconButton sx={{padding: '2', color: 'white'}}>
          <ReplaySharpIcon />
        </IconButton>
        <IconButton sx={{padding: '2', color: 'white'}}>
          <PlayArrowSharp />
        </IconButton>
      </Box>
    </Box>
  )
}
