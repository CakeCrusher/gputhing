import React, { Context, createContext, useState } from "react";
import { initializeVideos } from "./videos";

type VideosContextProviderProps = {
  children: React.ReactNode;
};

type VideosContextValue = {
  videos: (VideoExt | null)[];
  setVideos: React.Dispatch<React.SetStateAction<(VideoExt | null)[]>> | null;
};

export const VideosContext: Context<VideosContextValue> = createContext({
  videos: initializeVideos,
  setVideos: null,
} as VideosContextValue);

export const VideosContextProvider = ({
  children,
}: VideosContextProviderProps) => {
  const [videos, setVideos] = useState<(VideoExt | null)[]>(initializeVideos);
  return (
    <VideosContext.Provider value={{ videos, setVideos }}>
      {children}
    </VideosContext.Provider>
  );
};
