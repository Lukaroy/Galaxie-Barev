import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/naicon.svg" alt="Logo" width={24} height={24} />
          <span className="footer-brand-name">Galaxie Barev</span>
        </div>

        <nav className="footer-links">
          <Link href="/barvy">Barvy</Link>
          <Link href="/fonty">Fonty</Link>
          <Link href="/moodboard">Moodboard</Link>
          <Link href="/galerie">Galerie</Link>
          <Link href="/uceni">Učení</Link>
        </nav>

        <div className="footer-legal">
          <Link href="/podminky">Podmínky použití</Link>
        </div>

        <p className="footer-copy">
          &copy; {currentYear} Galaxie Barev. Všechna práva vyhrazena.
        </p>
      </div>
    </footer>
  )
}
