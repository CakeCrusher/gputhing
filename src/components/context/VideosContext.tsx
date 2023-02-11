import React, { Context, createContext, Ref, useRef, useState } from 'react';
import { initializeVideos  } from './videos'

type VideosContextProviderProps = {
  children: React.ReactNode
}

type VideosContextValue = {
  videos: (GpuData | null)[],
  videoRefs: TwoVideoRefs,
  setVideos: React.Dispatch<React.SetStateAction<(GpuData | null)[]>> | null
}

export const VideosContext: Context<VideosContextValue> = createContext({videos: initializeVideos, setVideos: null} as VideosContextValue)

export const VideosContextProvider = ({ children }: VideosContextProviderProps) => {
  const [videos, setVideos] = useState<(GpuData | null)[]>(initializeVideos)

  const videoRefs: TwoVideoRefs = {
    video1: {
      player: useRef<HTMLDivElement>(null),
      container: useRef<HTMLDivElement>(null),
    },
    video2: {
      player: useRef<HTMLDivElement>(null),
      container: useRef<HTMLDivElement>(null),
    }
  };

  return (
    <VideosContext.Provider value={{videos, setVideos, videoRefs}}>
      {children}
    </VideosContext.Provider>
  )
}
