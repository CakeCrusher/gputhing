import React, { createContext } from 'react';
import { videos } from './videos'

type VideosContextProviderProps = {
  children: React.ReactNode
}

export const VideosContext = createContext(videos)

export const VideosContextProvider = ({ children }: VideosContextProviderProps) => {
  return (
    <VideosContext.Provider value={videos}>
      {children}
    </VideosContext.Provider>
  )
}
