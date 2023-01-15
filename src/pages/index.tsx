import { useState, useEffect, useContext, useMemo, Dispatch, SetStateAction } from 'react'
import Head from 'next/head'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import styles from '@/styles/Home.module.css'
import { Autocomplete, Button } from '@mui/material';
import query from '@/utils/query'
import { VideosContext } from '@/components/context/VideosContext';

type GameDetails = null | {
  game: string | null,
  gpus: string[]
}

export default function Home() {
  const videos = useContext(VideosContext)

  const [gameDetails, setGameDetails] = useState<GameDetails>(null)
  const [gpuLeft, setGpuLeft] = useState<string | null>(null)
  const [gpuRight, setGpuRight] = useState<string | null>(null)

  // update gpuRight and gpuLeft if the gameDetails changes
  useEffect(() => {
    console.log("gpuLeft: ", gpuLeft)
    if (gpuLeft && (gameDetails && !gameDetails?.gpus.includes(gpuLeft))) {
      console.log("gpuLeft unset in useEffect")
      setGpuLeft(null)
    }
    if (gpuRight && !gameDetails?.gpus.includes(gpuRight)) {
      setGpuRight(null)
    }
  }, [gameDetails, gpuLeft, setGpuLeft, gpuRight, setGpuRight ])

  // updates the context for the videos
  useEffect(() => {
    if (gpuLeft && gameDetails?.game) {
      const newVideo = query.videos.getVideo(gameDetails?.game, gpuLeft)
      videos[0] = newVideo ? newVideo : null
    } else {
      videos[0] = null
    }
  }, [gameDetails, gpuLeft])
  useEffect(() => {
    if (gpuRight && gameDetails?.game) {
      const newVideo = query.videos.getVideo(gameDetails?.game, gpuRight)
      videos[1] = newVideo ? newVideo : null
    } else {
      videos[1] = null
    }
  }, [gameDetails, gpuRight])

  const allGames = query.games.getAllGames()
  const allGpus = query.gpus.getAllGpus()

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

  const handleGpuSet = (value: string | null, state: string | null, stateSet: Dispatch<SetStateAction<string | null>>, contextIdx: number) => {
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

  

  const videoSize = {
    width: 560,
    height: 315
  }

  const isGpuOptionDisabled = (option: string, gpusInUse: any[]): boolean => {
    const isGpuInUse = gpusInUse.includes(option)
    const isGpuInGame = Boolean(gameDetails?.gpus && !gameDetails?.gpus?.includes(option))
    return  isGpuInUse || isGpuInGame
  }

  return (
    <>
      <Head>
        <title>gpus</title>
        <meta name="description" content="thing that compares performance benchmarks via video" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div id="player"></div>
        {/* add game field */}
        <Autocomplete
          disablePortal
          className={styles.field}
          onChange={(e, value) => handleSetGame(value)}
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
              onChange={(e, value) => handleGpuSet(value, gpuLeft, setGpuLeft, 0)}
              options={allGpus}
              getOptionDisabled={(option) => isGpuOptionDisabled(option, [gpuRight])}
              renderInput={(params) => <TextField {...params} label="GPU Left" variant="standard" />}
            />
            <h3>Details</h3>
            <List className={styles.details}>
              <ListItem>
                <ListItemText primary="Manufacturer" secondary="Nvidia" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Cores" secondary="2" />
              </ListItem>
            </List>
          </div>
          {/* right inputAndData */}
          <div className={styles.inputAndDataContainer}>
            <Autocomplete
              disablePortal
              className={styles.field}
              options={allGpus}
              value={gpuRight}
              onChange={(e, value) => handleGpuSet(value, gpuRight, setGpuRight, 1)}
              getOptionDisabled={(option) => isGpuOptionDisabled(option, [gpuLeft])}
              renderInput={(params) => <TextField {...params} label="GPU Right" variant="standard" />}
            />
            <h3>Details</h3>
            <List className={styles.details}>
              <ListItem>
                <ListItemText primary="Manufacturer" secondary="AMD" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Cores" secondary="4" />
              </ListItem>
            </List>
          </div>
        </div>
        {/* video container */}
        <div className={styles.videoWrapper}>
          <div style={{width: videoSize.width/2}} className={styles.videoContainer}>
              <iframe className={styles.videoIframe} width="560" height="315" src="https://www.youtube.com/embed/5hPfvflvK0c" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
          <div style={{width: videoSize.width/2}} className={styles.videoContainer}>
            <iframe style={{left: "-100%"}} className={styles.videoIframe} width="560" height="315" src="https://www.youtube.com/embed/KxCh78tscHU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </>
  )
}
