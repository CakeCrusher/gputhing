import { Box, SxProps } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

export default function VideoPlayerControls() {
  const sx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <Box sx={sx}>
      <div>
        <button>Rewind</button>
        <button>Play</button>
      </div>
      <div>
        <input type="range" value={0} max={50}/>
      </div>
    </Box>
  )
}
