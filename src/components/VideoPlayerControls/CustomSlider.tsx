import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

function ValueLabelComponent(props: any) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}


const AirbnbSlider2 = styled(Slider)(({ theme }) => ({
  color: 'red',
  height: 3,
  padding: '13px 0',
  borderRadius: 0,
  '& .MuiSlider-thumb': {
    height: 1,
    width: 1,
    backgroundColor: 'currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
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
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

export default function CustomSlider() {
  return (
    <Box sx={{ width: 320 }}>
      <AirbnbSlider2
        valueLabelDisplay="auto"
        slots={{
          thumb: AirbnbThumbComponent,
          valueLabel: ValueLabelComponent,
        }}
        aria-label="custom thumb label"
        defaultValue={20}
      />
    </Box>
  );
}
