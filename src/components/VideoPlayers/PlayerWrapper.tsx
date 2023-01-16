import { useState } from "react"
import { Button } from "@mui/material"
import { Box } from "@mui/system"
import type { YouTubePlayer, YouTubeEvent } from "react-youtube";

import YouTubePlayerComponent from "./YouTubePlayer"

let player1: null | YouTubePlayer = null
let player2: null | YouTubePlayer = null

//TODO: replace any
type Props = {
  videoData1: GpuData | null, 
  videoData2: GpuData | null
}

/* TODO: Replace CONTROLS_COMPONENT & VIDEO_CONTEXT
 *
 * PlayerWrapper handles getting the YouTubePlayer embedded target elements
 *   from the YouTubePlayer component as well as controlling the "Split"
 *   between the two. It does not control the actual embeds.
 * See CONTROLS_COMPONENT for controlling the videos.
 * See VIDEO_CONTEXT for the state management for the videos.
 */
export default function PlayerWrapper({
  videoData1,
  videoData2
}: Props){
  const [videoId, setVideoId] = useState('5hPfvflvK0c');
  const [splitPosition, setSplitPosition] = useState(.5); 

  const changeSplit = (e: any) => {
    const root = document.getElementsByTagName("body")[0];
    const players = document.getElementById("players");
    if(!root) {
      console.warn("No body");
      return;
    }
    if(!players) {
      console.warn("No players");
      return;
    }

    const playersBox = players.getBoundingClientRect();

    const mouseMove = (e: any) => {
      if(e.clientX < playersBox.right && e.clientX > playersBox.left) {
        let x1 = e.clientX - playersBox.left;
        let x2 = playersBox.width;
        let result = x1 / x2;
        result = Math.max(result, .1);
        result = Math.min(result, .9);
        
        setSplitPosition(result);
      }
    };
    const mouseUp = (e: any) => {
      root.removeEventListener("mousemove", mouseMove);
      root.removeEventListener("mouseup", mouseUp);
    }
    root.addEventListener("mousemove", mouseMove);
    root.addEventListener("mouseup", mouseUp);
    //setSplitPosition(25.25);
  }

  const handlePlayerReady = (id: 1 | 2) => (e: YouTubeEvent) => {
    console.log("Player Ready: " + id)
    switch(id) {
      case 1:
        player1 = e.target
      case 2:
        player2 = e.target
      default:
        console.warn("Invalid player id: " + id);
    }
  }

  // TODO: Tweak or remove this with controls
  const playVideos = () => {
    if (!player1) {
      console.log("Null player: player1")
      return
    }
    if (!player2) {
      console.log("Null player: player2")
      return
    }
    console.log("PLAY");
    if(player1.getPlayerState() == 1) {
      player1.pauseVideo();
      player2.pauseVideo();
      return;
    }
    player1.playVideo()
    player2.playVideo()
  }

  const changeVideoId = () => {
    if (videoId === "KxCh78tscHU") {
      setVideoId("5hPfvflvK0c")
    } else {
      setVideoId("KxCh78tscHU")
    }
  }

  return (
    <Box sx={{
      height: '100%',
      width: '100%'
    }}>
      {/* TODO: Remove this when we add controls */}
      {/*
      <Button onClick={changeVideoId}>Change Video</Button>
      <Button onClick={playVideos}>Play</Button>
      <Button onClick={changeSplit}>Change Split</Button>
      */}

      <div
        id="players"
        style={{
          display: 'flex',
          height: '100%',
          }}
      >
        <YouTubePlayerComponent
          handlePlayerReady={handlePlayerReady(1)}
          videoId={videoData1 ? videoData1.videoId : ""}
          width={splitPosition * 99}
        />
        <div 
          onMouseDown={changeSplit}
          style={{width: "1%", backgroundColor: "black", cursor: "crosshair"}}
        />
        <YouTubePlayerComponent
          handlePlayerReady={handlePlayerReady(2)} 
          videoId={videoData2 ? videoData2.videoId : ""}
          width={99 - splitPosition * 99}
        />
      </div>
    </Box>
  )
}
