import { useState, useEffect } from 'react'
import Head from 'next/head'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import YouTubePlayer from '../components/YouTubePlayer'
import styles from '@/styles/Home.module.css'
import { Button } from '@mui/material';

export default function Home() {
  const [videoId, setVideoId] = useState('5hPfvflvK0c')
  const changeVideoId = () => {
    if (videoId === "KxCh78tscHU") {
      setVideoId("5hPfvflvK0c")
    } else {
      setVideoId("KxCh78tscHU")
    }
  }
  const videoSize = {
    width: 560,
    height: 315
  }

  // create a style for inputsAndDataWrapper
  const inputsAndDataWrapperStyle = {
    display: 'flex',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  }

  return (
    <>
      <Head>
        <title>gpus</title>
        <meta name="description" content="thing that compares performance benchmarks via video" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={changeVideoId}>Change Video</Button>
      <YouTubePlayer videoId={"KxCh78tscHU"} />
      <YouTubePlayer videoId={videoId} />
      <div className={styles.container}>
        <div id="player"></div>
        {/* add game field */}
        <TextField id="standard-basic" label="Game" variant="standard" />
        {/* add flex horizontal container */}
        <div className={styles.inputsAndDataWrapper}>
          {/* left inputAndData*/}
          <div className={styles.inputAndDataContainer}>
            <TextField id="standard-basic" label="Left GPU" variant="standard" />
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
            <TextField id="standard-basic" label="Right GPU" variant="standard" />
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
