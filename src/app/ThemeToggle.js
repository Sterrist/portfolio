'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

export default function ThemeToggle() {
  const buttonRef = useRef(null)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark')
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    const button = buttonRef.current

    const applyTheme = () => {
      root.dataset.theme = nextTheme
      root.style.colorScheme = nextTheme
      try {
        localStorage.setItem('theme', nextTheme)
      } catch (_) {}
      setTheme(nextTheme)
    }

    if (!button || !document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyTheme()
      return
    }

    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    root.style.setProperty('--theme-x', x + 'px')
    root.style.setProperty('--theme-y', y + 'px')
    root.style.setProperty('--theme-radius', radius + 'px')
    root.classList.add('theme-transition')

    const transition = document.startViewTransition(applyTheme)

    transition.finished.finally(() => {
      root.classList.remove('theme-transition')
      root.style.removeProperty('--theme-x')
      root.style.removeProperty('--theme-y')
      root.style.removeProperty('--theme-radius')
    })
  }

  const nextThemeLabel = theme === 'dark' ? 'Light — включить светлую тему' : 'Dark — включить тёмную тему'

  return (
    <button
      ref={buttonRef}
      className={styles.themeToggle}
      type="button"
      aria-label={nextThemeLabel}
      title={nextThemeLabel}
      onClick={toggleTheme}
    >
      <span className={styles.themeIcon} aria-hidden="true">
        {theme === 'dark' ? '☼' : '◐'}
      </span>
      <span className={styles.themeLabel}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  )
}