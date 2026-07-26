'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

const FALLBACK_DURATION = 143.464

function formatTime(seconds) {
  const safeSeconds = Number.isFinite(seconds) ? seconds : 0
  const minutes = Math.floor(safeSeconds / 60)
  const secs = Math.floor(safeSeconds % 60)

  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

export default function AudioPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(FALLBACK_DURATION)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => {
      const mediaDuration = Number.isFinite(audio.duration) && audio.duration > 0
        ? audio.duration
        : audio.seekable.length > 0
          ? audio.seekable.end(audio.seekable.length - 1)
          : FALLBACK_DURATION

      setDuration(mediaDuration)
    }
    const handleEnd = () => {
      audio.currentTime = 0
      setCurrentTime(0)
      setIsPlaying(false)
    }
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('loadeddata', updateDuration)
    audio.addEventListener('durationchange', updateDuration)
    audio.addEventListener('canplaythrough', updateDuration)
    audio.addEventListener('progress', updateDuration)
    audio.addEventListener('ended', handleEnd)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    updateDuration()

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('loadeddata', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
      audio.removeEventListener('canplaythrough', updateDuration)
      audio.removeEventListener('progress', updateDuration)
      audio.removeEventListener('ended', handleEnd)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      return
    }

    try {
      await audio.play()
    } catch {
      setIsPlaying(false)
    }
  }

  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0

  return (
    <div className={styles.player}>
      <audio ref={audioRef} src="/music.mp3" preload="auto" />
      <button className={styles.playButton} onClick={togglePlay} aria-label={isPlaying ? 'Пауза' : 'Включить музыку'}>
        <span className={isPlaying ? styles.pauseIcon : styles.playIcon} aria-hidden="true" />
      </button>
      <div className={styles.trackInfo}>
        <div>
          <strong>SOUND ON</strong>
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
        <div className={styles.progress} aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
