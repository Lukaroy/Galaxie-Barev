'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (<>
      <nav className="navbar">
        <div className="nav-left">
          <img src="/naicon.svg" alt="Logo" width={32} height={32} />
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

        {!open && (
          <button className="hamburger" onClick={() => setOpen(true)}>
            ☰
          </button>
        )}
      </nav>

      <div
        className={`blur-overlay ${open ? 'active' : ''}`}
        onClick={() => setOpen(false)}
      ></div>

      <div className={`slide-menu ${open ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          &times;
        </button>
        <ul className="slide-links">
          <li><Link href="/" onClick={() => setOpen(false)}>Domů</Link></li>
          <li><Link href="/color" onClick={() => setOpen(false)}>Barvy</Link></li>
          <li><Link href="/fonts" onClick={() => setOpen(false)}>Fonty</Link></li>
          <li><Link href="/moodboard" onClick={() => setOpen(false)}>Moodboard</Link></li>
          <li><Link href="/galery" onClick={() => setOpen(false)}>Galerie</Link></li>

          <li className="mobile-login">
            <Link href="/login" onClick={() => setOpen(false)}>Přihlášení</Link>
          </li>
        </ul>
      </div>
    </>
  )
}
