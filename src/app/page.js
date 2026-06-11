'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css'

export default function Page() {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [animateTitle, setAnimateTitle] = useState(false);
  const [animateHello, setAnimateHello] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);

    const updateDuration = () => {
      if (!Number.isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnd = () => {
      audio.currentTime = 0;
      setIsPlaying(false);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    updateDuration();

    setAnimateTitle(true);
    const timer = setTimeout(() => setAnimateHello(true), 500);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      clearTimeout(timer);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      console.error('Не удалось запустить аудио:', error);
    }
  };

  const formatTime = (seconds) => {
    const safeSeconds = Number.isFinite(seconds) ? seconds : 0;
    const minutes = Math.floor(safeSeconds / 60);
    const secs = Math.floor(safeSeconds % 60);

    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <section className={styles.top}>
        <div className={`${styles.top_title} ${animateTitle ? styles.visible : ''}`}>
          <h1>STERRIST DEV</h1>
          <h2>МНОГО КОДА</h2>
          <h3>ЩЕПОТКУ ДИЗАЙНА</h3>
          <h4>ЧУТЬ ЧУТЬ БАГОВ (ФИШЕК)</h4>
        </div>

        <div className={`${styles.top_hello} ${animateHello ? styles.visible : ''}`}>
          <h1>Привет, %NAME%!</h1>
          <h4>Меня зовут STERRIST, пишу код, пью чай и иногда сплю</h4>
          <h4>Делаю бек, ботов и фронт</h4>
          <h4>
            Люблю{' '}
            <a
              className="link"
              href="https://ru.wikipedia.org/wiki/Панна-котта"
              rel="noopener noreferrer"
              target="_blank"
            >
              деньги
            </a>
          </h4>
          <h5>Пролистай ниже немного</h5>
        </div>
      </section>

      <section className={styles.bottom}>
        <h1 className={styles.sectionTitle}>Портфолио</h1>

        <div className={styles.portfolio}>
          <h4>TELEGRAM</h4>

          <div className={styles.portfolio_items}>
            <a className={styles.portfolio_item} href="https://t.me/charmmoder_bot" rel="noopener noreferrer" target="_blank">
              <b>CHARM — MODER</b>
              <span>Бот-модератор для Telegram чатов</span>
            </a>

            <a className={styles.portfolio_item} href="https://t.me/m39ru" rel="noopener noreferrer" target="_blank">
              <b>Metro 2039</b>
              <span>Новостной паблик про серию книг и игр Metro</span>
            </a>

            <a className={styles.portfolio_item} href="https://github.com/Sterrist/tg-mailing-bot" rel="noopener noreferrer" target="_blank">
              <b>TG Mailing BOT</b>
              <span>Бот-рассыльщик для Telegram аккаунта (по группам)</span>
            </a>
          </div>

          <h4>WEB</h4>

          <div className={styles.portfolio_items}>
            <a className={styles.portfolio_item} href="https://metro2039.ru" rel="noopener noreferrer" target="_blank">
              <b>Metro 2039</b>
              <span>Лендинг для новостного паблика @m39ru</span>
            </a>

            <a className={styles.portfolio_item} href="https://github.com/Sterrist/portfolio" rel="noopener noreferrer" target="_blank">
              <b>Портфолио</b>
              <span>Вы кстати сейчас смотрите на него</span>
            </a>
          </div>

          <h4>SCRIPTS</h4>

          <div className={styles.portfolio_items}>
            <a className={styles.portfolio_item} href="https://github.com/Sterrist/ikeaparser" rel="noopener noreferrer" target="_blank">
              <b>ikeaparser</b>
              <span>Парсер всех (почти) товаров с IKEA</span>
            </a>

            <a className={styles.portfolio_item} href="https://github.com/Sterrist/fragmentparser" rel="noopener noreferrer" target="_blank">
              <b>FRAGMENT PARSER</b>
              <span>Парсер подарков с fragment.com</span>
            </a>

            <a className={styles.portfolio_item} href="https://github.com/Sterrist/simpleclutchcalculation" rel="noopener noreferrer" target="_blank">
              <b>SIMPLE CLUTCH CALCULATION</b>
              <span>Расчет шанса легендарного клатча s1mple на Cache</span>
            </a>
          </div>

          <h4>MOBILE</h4>

          <div className={styles.portfolio_items}>
            <a className={styles.portfolio_item} href="https://github.com/Sterrist/TODO-List" rel="noopener noreferrer" target="_blank">
              <b>TODO-LIST</b>
              <span>Список задач на Kotlin</span>
            </a>

            <a className={styles.portfolio_item} href="https://github.com/Sterrist/SMSForwarder" rel="noopener noreferrer" target="_blank">
              <b>SMSForwarder</b>
              <span>Пересыльщик SMS с телефона в Telegram</span>
            </a>
          </div>

          <h4>DESKTOP</h4>

          <div className={styles.portfolio_items}>
            <a className={styles.portfolio_item} href="https://github.com/Sterrist/AHKNS" rel="noopener noreferrer" target="_blank">
              <b>AHKNS</b>
              <span>Современная, открытая замена устаревшим биндерам</span>
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <h1>Контакты</h1>

        <div className={styles.footer_links}>
          <a className="link" href="https://t.me/sterrist_dev" rel="noopener noreferrer" target="_blank">
            <b>TELEGRAM</b>
          </a>

          <a className="link" href="https://vk.com/sterrist" rel="noopener noreferrer" target="_blank">
            <b>VK</b>
          </a>

          <a className="link" href="https://github.com/Sterrist" rel="noopener noreferrer" target="_blank">
            <b>GITHUB</b>
          </a>
        </div>
      </footer>

      <div className={styles.player}>
        <audio ref={audioRef} src="/music.mp3" />

        <div className={styles.playerControls}>
          <button className={styles.playButton} onClick={togglePlay} aria-label={isPlaying ? 'Пауза' : 'Играть'}>
            <img
              src={isPlaying ? '/pause.png' : '/play.png'}
              alt=""
              width={24}
              height={24}
            />
          </button>

          <div className={styles.timeDisplay}>
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}