import { Unbounded } from 'next/font/google'
import './globals.css'

const unbounded = Unbounded({ 
  subsets: ['latin'],
})

export const metadata = {
  title: 'STERRIST — ' + ['CODING?', 'DEVELOPMENT?', 'BUSINESS?', 'MAKE MONEY?'][Math.floor(Math.random() * 7)],
  description: 'Разработчик который разрабатывает, а не "кодит"'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={unbounded.className}>
        {children}
      </body>
    </html>
  )
}
