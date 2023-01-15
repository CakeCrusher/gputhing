import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { VideosContextProvider } from '@/components/context/VideosContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <VideosContextProvider>
      <Component {...pageProps} />
    </VideosContextProvider>
  )
}
