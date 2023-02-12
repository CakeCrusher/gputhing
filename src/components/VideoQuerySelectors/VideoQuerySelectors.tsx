import {Dispatch, SetStateAction, useMemo} from 'react';
import { Autocomplete, Box } from '@mui/material';
import styles from '@/styles/Home.module.css'
import query from '@/utils/query'
import {
  List,
  ListItem,
  ListItemText,
  TextField
} from '@mui/material';



type Props = {
  gameDetails: GameDetails;
  setGameDetails: Dispatch<SetStateAction<GameDetails>>;
  gpuLeft: string | null;
  setGpuLeft: Dispatch<SetStateAction<string | null>>;
  setGpuRight: Dispatch<SetStateAction<string | null>>;
  gpuRight: string | null;
  allGames: Game[];
  allGpus: Gpu[];
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
  const allGameIds = useMemo(() => allGames.map((game) => game.id), [allGames]);
  const allGpuIds = useMemo(() => allGpus.map((gpu) => gpu.id), [allGpus]);

  const handleSetGame = async (value: string | null) => {
    const currentGame = allGames.find((game: Game) => game.id === value)
    if (value && currentGame && (!gameDetails?.game || value !== gameDetails?.game.id)) {
      console.log("game set")
      console.log("setting game", allGames, value)
      const gpusForGame = await query.gpus.getGpusForGame(value)
      setGameDetails({
        game: currentGame,
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
    const currentGpu = allGpus.find((gpu: Gpu) => gpu.id === value)
    if (value && currentGpu) {
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
    const isGpuInGame = Boolean(gameDetails?.gpus && !gameDetails?.gpus?.find((gpu: Gpu) => gpu.id === option))
    return  isGpuInUse || isGpuInGame
  }

  return (
    <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center"}}>
      <Autocomplete
        disablePortal
        value={gameDetails?.game?.id || null}
        className={styles.field}
        onChange={(_e, value: string | null) => handleSetGame(value)}
        options={allGameIds}
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
            options={allGpuIds}
            getOptionDisabled={(option) => isGpuOptionDisabled(option, [gpuRight])}
            renderInput={(params) => <TextField {...params} label="GPU Left" variant="standard" />}
          />
        </div>
        {/* right inputAndData */}
        <div className={styles.inputAndDataContainer}>
          <Autocomplete
            disablePortal
            className={styles.field}
            options={allGpuIds}
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
