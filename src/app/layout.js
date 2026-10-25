import { IBM_Plex_Mono, Unbounded } from 'next/font/google'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NODE_ENV === 'production' ? 'https://sterrist.dev' : 'http://localhost:3000')

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

const title = 'Sterrist — разработчик ботов, бэкенда и веб-продуктов'
const description = 'Портфолио Sterrist: Telegram-боты, бэкенд на Python, веб-приложения, автоматизация и Android-проекты на Kotlin.'

export const viewport = {
  themeColor: '#0a0a0a',
}

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'Sterrist',
  authors: [{ name: 'Sterrist', url: siteUrl }],
  creator: 'Sterrist',
  keywords: ['Sterrist', 'портфолио разработчика', 'Telegram-боты', 'разработка ботов', 'backend', 'Python', 'Kotlin', 'Next.js', 'автоматизация', 'парсеры'],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Sterrist',
    locale: 'ru_RU',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script defer src="https://umami.sterrist.dev/script.js" data-website-id="f8835a0d-1fe9-49da-a1c4-fe75c27e3918" />
      </head>
      <body className={unbounded.className}>{children}</body>
    </html>
  )
}
