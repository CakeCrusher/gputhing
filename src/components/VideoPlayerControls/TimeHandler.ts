import { useEffect, useRef, useState } from 'react';

const useTimestampHandler = (time: number = 0): TimestampHandler => {
  const [timestamp, setTimestamp] = useState(time);
  const [isPaused, _setIsPaused] = useState(true);
  const previousTimeRef = useRef<number>();
  const requestRef = useRef<number>();

  //useEffect(() => {
  //  if(!isPaused) {
  //    interval = requestAnimationFrame(_incrementTimestamp);
  //  }
  //  return () => cancelAnimationFrame(interval);
  //}, [])

  const _incrementTimestamp = (time: number) => {
    if(previousTimeRef.current != undefined) {
      const delta = time - previousTimeRef.current;
      setTimestamp(state => state + delta);
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(_incrementTimestamp);
  }

  useEffect(() => {
    return () => {
      if(requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
  }, [])

  const pause = () => {
    _setIsPaused(true);
    previousTimeRef.current = undefined;
    cancelAnimationFrame(requestRef.current!);
  };
  const play = () => {
    _setIsPaused(false)
    requestRef.current = requestAnimationFrame(_incrementTimestamp);
  };

  return {
    timestamp,
    setTimestamp,
    isPaused,
    pause,
    play,
    valueOf: () => timestamp,
  }

}

export default useTimestampHandler;
