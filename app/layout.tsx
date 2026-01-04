import './globals.css'
import {Montserrat, Inder } from 'next/font/google'
import Navbar from './components/navbar'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-montserrat',
})

const inder = Inder({
  weight: '400',
  variable: '--font-inder',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Galaxie Barev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${inder.variable} ${montserrat.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
