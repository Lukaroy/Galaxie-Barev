import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fonty a Typografie',
  description: 'Objevte a spravujte fonty pro vaše designové projekty. Prohlížejte, testujte a kombinujte různé typografické styly pro dokonalý výsledek.',
  keywords: ['fonty', 'typografie', 'písma', 'font manager', 'typography', 'typeface'],
  openGraph: {
    title: 'Fonty a Typografie | Galaxie Barev',
    description: 'Objevte a spravujte fonty pro vaše designové projekty.',
  },
}

export default function FontyLayout({ children }: { children: React.ReactNode }) {
  return children
}
