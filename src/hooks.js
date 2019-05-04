import { useState, useEffect } from 'react';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const cache = new Map()

export function useFile(relativeSrc) {
  let [file, setFile] = useState('')

  useEffect(function() {
    if (cache.has(relativeSrc)) {
      setFile(cache.get(relativeSrc))
    } else {
      const text = readFileSync(resolve(__dirname, relativeSrc)).toString()
      
      cache.set(relativeSrc, text)

      setFile(text)
    }
  }, [relativeSrc])

  return file
}

export function useRange(min, max, interval) {
  let [count, setCount] = useState(min)
  let [direction, setDirection] = useState(1)

  useEffect(() => {
    if (count >= max) {
      setDirection(-1)
    } else if (count <= min) {
      setDirection(1)
    } 
  }, [count])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + direction)
    }, interval);

    return () => clearTimeout(timer);
  }, [min, max, interval, count, direction])

  return count
}