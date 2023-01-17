import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { VideosContext } from '@/components/context/VideosContext';
import styles from '@/styles/Home.module.css'
import query from '@/utils/query'

import VideoPlayers from '@/components/VideoPlayers'
import VideoQuerySelectors from '@/components/VideoQuerySelectors'
import {Box, styled} from '@mui/material';

type GameDetails = null | {
  game: string | null,
  gpus: string[]
}

export default function Home() {
  const {videos, setVideos} = useContext(VideosContext)

  const [gameDetails, setGameDetails] = useState<GameDetails>(null)
  const [gpuLeft, setGpuLeft] = useState<string | null>(null)
  const [gpuRight, setGpuRight] = useState<string | null>(null)

  const allGames = query.games.getAllGames()
  const allGpus = query.gpus.getAllGpus()

  // update gpuRight and gpuLeft if the gameDetails changes
  useEffect(() => {
    console.log("gpuLeft: ", gpuLeft)
    if (gpuLeft && gameDetails && !gameDetails?.gpus.includes(gpuLeft)) {
      console.log("gpuLeft unset in useEffect")
      setGpuLeft(null)
    }
    if (gpuRight && gameDetails && !gameDetails?.gpus.includes(gpuRight)) {
      setGpuRight(null)
    }
  }, [gameDetails, gpuLeft, setGpuLeft, gpuRight, setGpuRight ])

  // updates the context for the videos
  useEffect(() => {
    console.log("videos updated in useEffect")
    // left
    let newVideos: (GpuData | null)[] = [...videos]
    if (gpuLeft && gameDetails?.game) {
      console.log("videos[0] SET in useEffect")
      const newVideo = query.videos.getVideo(gameDetails?.game, gpuLeft)
      newVideos[0] = newVideo ? newVideo : null
    } else {
      console.log("videos[0] unset in useEffect")
      newVideos[0] = null
    }
    // right
    if (gpuRight && gameDetails?.game) {
      console.log("videos[1] SET in useEffect")
      const newVideo = query.videos.getVideo(gameDetails?.game, gpuRight)
      newVideos[1] = newVideo ? newVideo : null
    } else {
      console.log("videos[1] unset in useEffect")
      newVideos[1] = null
    }

    if (setVideos) setVideos(newVideos)
  }, [gameDetails, gpuLeft, gpuRight, setVideos])

  const videoSize = {
    width: 560,
    height: 315
  }

  const PlayerWrapperBox = styled(Box)(({ theme }) => ({
    height: '60%',
    width: '90%',
    position: 'relative',
    overflow: 'hidden',
    '& #controls': {
      zIndex: 999,
      position: 'absolute',
      bottom: 0
    },
    '&:hover': {
      '& #controls': {
        bottom: 0,
      }
    }
  }));

  return (
    <>
      <Head>
        <title>gpus</title>
        <meta name="description" content="thing that compares performance benchmarks via video" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div id="selector">
          <VideoQuerySelectors {...{
            gameDetails,
            setGameDetails,
            allGames,
            allGpus,
            setGpuLeft,
            setGpuRight,
            gpuLeft,
            gpuRight
          }}/>
        </div>
        <Box sx={{height: '10%'}}/>
        <PlayerWrapperBox
          id="player"
        >
          <VideoPlayers videoData1={videos[0]} videoData2={videos[1]} />
        </PlayerWrapperBox>
      </div>
    </>
  )
}
