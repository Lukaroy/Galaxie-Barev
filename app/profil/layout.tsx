import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profil',
  description: 'Spravujte svůj profil, nastavení a kreativní projekty v Galaxii Barev.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  return children
}
