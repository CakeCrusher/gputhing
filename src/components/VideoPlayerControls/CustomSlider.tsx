import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

function ValueLabelComponent(props: any) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={Math.round(value)}>
      {children}
    </Tooltip>
  );
}

const AirbnbSlider2 = styled(Slider)((_x: any) => ({
  color: 'red',
  height: 3,
  padding: 0,
  borderRadius: 0,
  '& .MuiSlider-thumb': {
    height: 1,
    width: 1,
    backgroundColor: 'currentColor',

    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 4,
    border: 'none',
  },
  '& .MuiSlider-rail': {
    color: '#d8d8d8',
    opacity: 1,
    height: 4,
  },
  '&:hover': {
    '& .MuiSlider-thumb': {
      height: 16,
      width: 16,
    }
  }
}));

function AirbnbThumbComponent(props: any) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

type Props = {
  timeOffset: number
  timeLength: number
  seekTo: any
}

export default function CustomSlider({ timeLength, timeOffset, seekTo }: Props) {
  console.log("TIMELENGTH", timeLength);
  const handleChange = (evt: any) => {
    seekTo(evt.target.value);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <AirbnbSlider2
        valueLabelDisplay="auto"
        slots={{
          thumb: AirbnbThumbComponent,
        }}
        aria-label="custom thumb label"
        defaultValue={0}
        min={0}
        max={timeLength} // TODO: Still need to verify this works
        step={1} // TODO: Rounding errors when using floating points
        value={timeOffset}
        onChange={handleChange}
      />
    </Box>
  );
}
