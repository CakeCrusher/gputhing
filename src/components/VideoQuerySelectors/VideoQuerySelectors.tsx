import {Dispatch, SetStateAction} from 'react';
import { Autocomplete, Box } from '@mui/material';
import styles from '@/styles/Home.module.css'
import query from '@/utils/query'
import {
  List,
  ListItem,
  ListItemText,
  TextField
} from '@mui/material';

type GameDetails = null | {
  game: string | null,
  gpus: string[]
}

type Props = {
  gameDetails: GameDetails;
  setGameDetails: any;
  gpuLeft: string | null;
  setGpuLeft: Dispatch<SetStateAction<string | null>>;
  setGpuRight: Dispatch<SetStateAction<string | null>>;
  gpuRight: string | null;
  allGames: any;
  allGpus: any;
}

export default function VideoQuerySelectors({
  gameDetails,
  setGameDetails,
  allGames,
  allGpus,
  setGpuLeft,
  setGpuRight,
  gpuLeft,
  gpuRight
}: Props) {

  const handleSetGame = (value: string | null) => {
    if (value && allGames.includes(value) && value !== gameDetails?.game) {
      console.log("game set")
      const gpusForGame = query.videos.getGpusForGame(value)
      setGameDetails({
        game: value,
        gpus: gpusForGame
      })
    } else {
      if (gameDetails !== null) {
        setGameDetails(null)
      }
    }
  }

  const handleGpuSet = (
    value: string | null,
    state: string | null,
    stateSet: Dispatch<SetStateAction<string | null>>,
    contextIdx: number
  ) => {
    console.log(value)
    if (value && allGpus.includes(value)) {
      console.log("gpu set")
      stateSet(value)
    } else {
      console.log("gpu unset")
      if (state !== null) {
        stateSet(null)
      }
    }
  }

  const isGpuOptionDisabled = (option: string, gpusInUse: any[]): boolean => {
    const isGpuInUse = gpusInUse.includes(option)
    const isGpuInGame = Boolean(gameDetails?.gpus && !gameDetails?.gpus?.includes(option))
    return  isGpuInUse || isGpuInGame
  }

  return (
    <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center"}}>
      <Autocomplete
        disablePortal
        className={styles.field}
        onChange={(_e, value: string | null) => handleSetGame(value)}
        options={allGames}
        renderInput={(params) => <TextField {...params} label="Game" variant="standard" />}
      />
      {/* add flex horizontal container */}
      <div className={styles.inputsAndDataWrapper}>
        {/* left inputAndData*/}
        <div className={styles.inputAndDataContainer}>
          <Autocomplete
            disablePortal
            className={styles.field}
            value={gpuLeft}
            onChange={(_e, value) => handleGpuSet(value, gpuLeft, setGpuLeft, 0)}
            options={allGpus}
            getOptionDisabled={(option) => isGpuOptionDisabled(option, [gpuRight])}
            renderInput={(params) => <TextField {...params} label="GPU Left" variant="standard" />}
          />
        </div>
        {/* right inputAndData */}
        <div className={styles.inputAndDataContainer}>
          <Autocomplete
            disablePortal
            className={styles.field}
            options={allGpus}
            value={gpuRight}
            onChange={(_e, value) => handleGpuSet(value, gpuRight, setGpuRight, 1)}
            getOptionDisabled={(option) => isGpuOptionDisabled(option, [gpuLeft])}
            renderInput={(params) => <TextField {...params} label="GPU Right" variant="standard" />}
          />
        </div>
      </div>
    </Box>
  );
}
