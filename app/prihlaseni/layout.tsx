// Layout pro přihlášení - metadata, stránka není indexována

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Přihlášení',
  description: 'Přihlašte se do Galaxie Barev a získejte přístup ke všem kreativním nástrojům, moodboardům a komunitním funkcím.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrihlaseniLayout({ children }: { children: React.ReactNode }) {
  return children
}
