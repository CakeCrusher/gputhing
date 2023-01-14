import { useState } from 'react'
import Head from 'next/head'
import useStyles from './index.style'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import YouTube from "react-youtube";

export default function Home() {
  const classes = useStyles()
  const [player, setPlayer] = useState(null)

  const videoSize = {
    width: 560,
    height: 315
  }

  const handlePlayerReady = (e) => {
    if (player) return
    setPlayer(e.target)
    return
  }

  const playVideo = () => {
    console.log("try to play", player)
    if (!player) return
    player.playVideo()
  }

  return (
    <>
      <Head>
        <title>gpus</title>
        <meta name="description" content="thing that compares performance benchmarks via video" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Button onClick={playVideo}>PLAY</Button>
      <YouTube
        videoId='LtCMpsAw1Ho'
        onStateChange={(e) => console.log(e.target.getCurrentTime())}
        onReady={handlePlayerReady}
      /> */}
      <div className={classes.container}>
        <div id="player"></div>
        {/* add game field */}
        <TextField id="standard-basic" label="Game" variant="standard" />
        {/* add flex horizontal container */}
        <div className={classes.inputsAndDataWrapper}>
          {/* left inputAndData*/}
          <div className={classes.inputAndDataContainer}>
            <TextField id="standard-basic" label="Left GPU" variant="standard" />
            <h3>Details</h3>
            <List className={classes.details}>
              <ListItem>
                <ListItemText primary="Manufacturer" secondary="Nvidia" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Cores" secondary="2" />
              </ListItem>
            </List>
          </div>
          {/* right inputAndData */}
          <div className={classes.inputAndDataContainer}>
            <TextField id="standard-basic" label="Right GPU" variant="standard" />
            <h3>Details</h3>
            <List className={classes.details}>
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
        <div className={classes.videoWrapper}>
          <div style={{width: videoSize.width/2}} className={classes.videoContainer}>
              <iframe className={classes.videoIframe} width="560" height="315" src="https://www.youtube.com/embed/5hPfvflvK0c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
          <div style={{width: videoSize.width/2}} className={classes.videoContainer}>
            <iframe style={{left: "-100%"}} className={classes.videoIframe} width="560" height="315" src="https://www.youtube.com/embed/KxCh78tscHU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            
          </div>
        </div>
            
      </div>
    </>
  )
}
