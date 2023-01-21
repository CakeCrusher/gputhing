import { RefObject, useRef, useState } from "react";
import { Box } from "@mui/system";
import type { YouTubePlayer, YouTubeEvent } from "react-youtube";

import YouTubePlayerComponent from "./YouTubePlayer";
import VideoPlayerControls from "@/components/VideoPlayerControls";
import { backdropClasses } from "@mui/material";

const p: any = {
  player1: {},
  player2: {},
};

//TODO: replace any
type Props = {
  videoData1: VideoExt | null;
  videoData2: VideoExt | null;
};

/* TODO: Replace CONTROLS_COMPONENT & VIDEO_CONTEXT
 *
 * PlayerWrapper handles getting the YouTubePlayer embedded target elements
 *   from the YouTubePlayer component as well as controlling the "Split"
 *   between the two. It does not control the actual embeds.
 * See CONTROLS_COMPONENT for controlling the videos.
 * See VIDEO_CONTEXT for the state management for the videos.
 */
export default function PlayerWrapper({ videoData1, videoData2 }: Props) {
  const player1Ref = useRef<HTMLDivElement>(null);
  const player2Ref = useRef<HTMLDivElement>(null);

  const changeSplit = (e: any) => {
    const root = document.getElementsByTagName("body")[0];
    const players = document.getElementById("players");

    if (!root) {
      console.error("No body");
      return;
    }
    if (!players) {
      console.error("No players");
      return;
    }

    const playersBox = players.getBoundingClientRect();

    const mouseMove = (e: any) => {
      if (e.clientX < playersBox.right && e.clientX > playersBox.left) {
        let x1 = e.clientX - playersBox.left;
        let x2 = playersBox.width;
        let result = x1 / x2;
        result = Math.max(result, 0.1);
        result = Math.min(result, 0.9);

        if (player1Ref.current && player2Ref.current) {
          player1Ref.current.style.width = `${result * 99}%`;
          player2Ref.current.style.width = `${99 - result * 99}%`;
        }
      }
    };
    const mouseUp = (e: any) => {
      root.removeEventListener("mousemove", mouseMove);
      root.removeEventListener("mouseup", mouseUp);
    };
    root.addEventListener("mousemove", mouseMove);
    root.addEventListener("mouseup", mouseUp);
    //setSplitPosition(25.25);
  };

  const handlePlayerReady = (id: 1 | 2) => (e: YouTubeEvent) => {
    console.log("Player Ready: " + id);
    switch (id) {
      case 1:
        p.player1 = e.target;
      case 2:
        p.player2 = e.target;
      default:
        console.warn("Invalid player id: " + id);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "black",
      }}
    >
      {/* TODO: Remove this when we add controls */}
      {/*
      <Button onClick={changeVideoId}>Change Video</Button>
      <Button onClick={playVideos}>Play</Button>
      <Button onClick={changeSplit}>Change Split</Button>
      */}

      <div
        id="players"
        style={{
          display: "flex",
          height: "100%",
        }}
      >
        <YouTubePlayerComponent
          ref={player1Ref}
          handlePlayerReady={handlePlayerReady(1)}
          videoId={videoData1 ? videoData1.id : ""}
        />
        <div
          onMouseDown={changeSplit}
          style={{ width: "1%", backgroundColor: "black", cursor: "crosshair" }}
        />
        <YouTubePlayerComponent
          ref={player2Ref}
          handlePlayerReady={handlePlayerReady(2)}
          videoId={videoData2 ? videoData2.id : ""}
        />
      </div>
      <VideoPlayerControls p={p} />
    </Box>
  );
}
