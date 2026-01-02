import './globals.css'
import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Galaxie Barev',
  description: 'Moje první webová aplikace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body>
        <nav className="navbar">
          <div className="nav-left">
            <img src="/icon.svg" alt="Logo" width={32} height={32} />
          </div>
          <div className="nav-center">
            <ul className="nav-links">
              <li><Link href="/">Domů</Link></li>
              <li><Link href="/color">Barvy</Link></li>
              <li><Link href="/fonts">Fonty</Link></li>
              <li><Link href="/moodboard">Moodboard</Link></li>
              <li><Link href="/galery">Galerie</Link></li>
            </ul>
          </div>
          <div className="nav-right">
            <Link href="/login">Přihlásit</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}