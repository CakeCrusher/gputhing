import { Ref, RefObject, useContext, useRef, useState } from "react"
import { Box } from "@mui/system"
import type { YouTubePlayer, YouTubeEvent } from "react-youtube";

import YouTubePlayerComponent from "./YouTubePlayer"
import PlayerHelper from "./PlayerHelper";
import VideoPlayerControls from '@/components/VideoPlayerControls';
import {VideosContext} from "../context/VideosContext";

const p: PlayerWrapperObject = {
  player1: null,
  player2: null
}

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
  const { videoRefs } = useContext(VideosContext);
  const containerRef1 = videoRefs.video1.container;
  const containerRef2 = videoRefs.video2.container;
  const playerRef1 = videoRefs.video1.player;
  const playerRef2 = videoRefs.video2.player;

  const changeSplit = (_e: any) => {
    const root = document.getElementsByTagName("body")[0];
    const players = document.getElementById("players");

    if(!root) {
      console.error("No body");
      return;
    }
    if(!players) {
      console.error("No players");
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
        
        if(containerRef1.current && containerRef2.current) {
          containerRef1.current.style.width = `${result * 99}%`;
          containerRef2.current.style.width = `${99 - result * 99}%`;
        }
      }
    };
    const mouseUp = (_e: any) => {
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
        playerRef1.current = e.target;
        PlayerHelper.preparePlayer(playerRef1.current, videoData1);
        break;
      case 2:
        playerRef2.current = e.target
        PlayerHelper.preparePlayer(playerRef2.current, videoData2);
        break;
      default:
        console.warn("Invalid player id: " + id);
    }
  }

  return (
    <Box sx={{
      height: '100%',
      width: '100%',
      backgroundColor: 'black'
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
          ref={containerRef1}
          handlePlayerReady={handlePlayerReady(1)}
          videoId={videoData1 ? videoData1.videoId : ""}
        />
        <div 
          onMouseDown={changeSplit}
          style={{width: "1%", backgroundColor: "black", cursor: "crosshair"}}
        />
        <YouTubePlayerComponent
          ref={containerRef2}
          handlePlayerReady={handlePlayerReady(2)} 
          videoId={videoData2 ? videoData2.videoId : ""}
        />
      </div>
      <VideoPlayerControls startAt={0} endAt={3}/>
    </Box>
  )
}
