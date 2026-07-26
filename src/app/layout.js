import { IBM_Plex_Mono, Unbounded } from 'next/font/google'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

const unbounded = Unbounded({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-display',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-mono',
  weight: ['400', '600'],
})

const themeScript = "(() => { try { const theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark'; document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme; } catch (_) { document.documentElement.dataset.theme = 'dark'; } })();"

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Sterrist — разработчик ботов, бэкенда и веб-продуктов',
  description: 'Портфолио Sterrist: Telegram-боты, веб-приложения, автоматизация и мобильные проекты.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={unbounded.className}>{children}</body>
    </html>
  )
}
