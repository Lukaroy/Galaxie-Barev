import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Procházejte galerii kreativních prací, designových projektů a inspirativních děl od naší komunity designérů a umělců.',
  keywords: ['design galerie', 'kreativní práce', 'designová inspirace', 'portfolio', 'umění'],
  openGraph: {
    title: 'Galerie | Galaxie Barev',
    description: 'Procházejte galerii kreativních prací a designové inspirace.',
  },
}

export default function GalerieLayout({ children }: { children: React.ReactNode }) {
  return children
}
