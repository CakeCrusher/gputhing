import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { VideosContext } from "@/components/context/VideosContext";
import styles from "@/styles/Home.module.css";
import query from "@/utils/query";

import VideoPlayers from "@/components/VideoPlayers";
import VideoQuerySelectors from "@/components/VideoQuerySelectors";
import { Box, styled } from "@mui/material";

export default function Home() {
  const { videos, setVideos } = useContext(VideosContext);

  const [gameDetails, setGameDetails] = useState<GameDetails>(null);
  const [gpuLeft, setGpuLeft] = useState<string | null>(null);
  const [gpuRight, setGpuRight] = useState<string | null>(null);

  const [allGames, setAllGames] = useState<Game[]>([]);
  const [allGpus, setAllGpus] = useState<Gpu[]>([]);

  // whenever gameDetails changes update the url to include params in the form "?game=gameName&gpuLeft=gpuName&gpuRight=gpuName"
  useEffect(() => {
    const params = new URLSearchParams();
    if (gameDetails?.game?.id) {
      params.append("game", gameDetails.game.id);
    }
    if (gpuLeft) {
      params.append("gpuLeft", gpuLeft);
    }
    if (gpuRight) {
      params.append("gpuRight", gpuRight);
    }
    // change params without rerender or reload
    const urlReplace = params.toString() ? `?${params.toString()}` : "/";
    window.history.replaceState({}, "", urlReplace);
  }, [gameDetails, gpuLeft, gpuRight]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gameName = decodeURIComponent(params.get("game") || "");
    const gpuLeft = decodeURIComponent(params.get("gpuLeft") || "");
    const gpuRight = decodeURIComponent(params.get("gpuRight") || "");

    const getGamesAndGpus = async () => {
      const allGames = await query.games.getAllGames();
      console.log("allGames: ", allGames);
      setAllGames(allGames);
      const allGpus = await query.gpus.getAllGpus();
      console.log("allGpus: ", allGpus);
      setAllGpus(allGpus);

      // if the url params are valid, set the gameDetails and gpus
      const currentGame = allGames.find(
        (currGame: Game) => currGame.id === gameName
      );
      if (
        gameName &&
        currentGame &&
        (!gameDetails?.game || gameName !== gameDetails?.game.id)
      ) {
        const gpusForGame = await query.gpus.getGpusForGame(gameName);
        setGameDetails({
          game: currentGame,
          gpus: gpusForGame,
        });
      }
      if (gpuLeft && allGpus.find((gpu: Gpu) => gpu.id === gpuLeft)) {
        setGpuLeft(gpuLeft);
      }
      if (gpuRight && allGpus.find((gpu: Gpu) => gpu.id === gpuRight)) {
        setGpuRight(gpuRight);
      }
    };
    getGamesAndGpus();
  }, []);

  // update gpuRight and gpuLeft if the gameDetails changes
  useEffect(() => {
    console.log("gpuLeft: ", gpuLeft);
    if (
      gpuLeft &&
      gameDetails &&
      !gameDetails?.gpus.find((gpu) => gpu.id === gpuLeft)
    ) {
      console.log("gpuLeft unset in useEffect");
      setGpuLeft(null);
    }
    if (
      gpuRight &&
      gameDetails &&
      !gameDetails?.gpus.find((gpu) => gpu.id === gpuRight)
    ) {
      setGpuRight(null);
    }
  }, [gameDetails, gpuLeft, setGpuLeft, gpuRight, setGpuRight]);

  // updates the context for the videos
  useEffect(() => {
    const setNewVideos = async () => {
      // left
      let newVideos: (VideoExt | null)[] = [...videos];
      if (gpuLeft && gameDetails?.game) {
        console.log("videos[0] SET in useEffect");
        const newVideo = await query.videos.getVideo(
          gameDetails?.game.id,
          gpuLeft
        );
        if (newVideo) {
          newVideos[0] = newVideo ? { ...newVideo, gpu: gpuLeft } : null;
        }
      } else {
        console.log("videos[0] unset in useEffect");
        newVideos[0] = null;
      }
      // right
      if (gpuRight && gameDetails?.game) {
        console.log("videos[1] SET in useEffect");
        const newVideo = await query.videos.getVideo(
          gameDetails?.game.id,
          gpuRight
        );
        if (newVideo) {
          newVideos[1] = newVideo ? { ...newVideo, gpu: gpuRight } : null;
        }
      } else {
        console.log("videos[1] unset in useEffect");
        newVideos[1] = null;
      }

      if (setVideos) setVideos(newVideos);
    };
    setNewVideos();
    console.log("videos updated in useEffect");
  }, [gameDetails, gpuLeft, gpuRight, setVideos]);

  const videoSize = {
    width: 560,
    height: 315,
  };

  const PlayerWrapperBox = styled(Box)(({ theme }) => ({
    height: "60%",
    width: "90%",
    position: "relative",
    overflow: "hidden",
    "& #controls": {
      zIndex: 999,
      position: "absolute",
      bottom: 0,
    },
    "&:hover": {
      "& #controls": {
        bottom: 0,
      },
    },
  }));

  let backgroundImage =
    "http://blog.logicalincrements.com/wp-content/uploads/2014/09/gtx980release.jpg";
  if (gameDetails?.game?.imageUrl) {
    backgroundImage = gameDetails.game.imageUrl;
  }

  return (
    <>
      <Head>
        <title>gpus</title>
        <meta
          name="description"
          content="thing that compares performance benchmarks via video"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div
          className={styles.bg}
          style={{ backgroundImage: `url("${backgroundImage}")` }}
        />
        <div id="selector">
          <VideoQuerySelectors
            {...{
              gameDetails,
              setGameDetails,
              allGames,
              allGpus,
              setGpuLeft,
              setGpuRight,
              gpuLeft,
              gpuRight,
            }}
          />
        </div>
        <Box sx={{ height: "10%" }} />
        <PlayerWrapperBox id="player">
          <VideoPlayers videoData1={videos[0]} videoData2={videos[1]} />
        </PlayerWrapperBox>
      </div>
    </>
  );
}
