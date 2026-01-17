import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registrace',
  description: 'Zaregistrujte se do Galaxie Barev zdarma a začněte tvořit. Získejte přístup ke generátoru palet, moodboardům, galerii a dalším kreativním nástrojům.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function RegistraceLayout({ children }: { children: React.ReactNode }) {
  return children
}
