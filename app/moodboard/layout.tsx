import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moodboard',
  description: 'Vytvářejte a spravujte své kreativní moodboardy. Sbírejte inspiraci, kombinujte barvy, obrázky a texty na jednom místě. Ideální pro designéry, umělce a kreativce.',
  keywords: ['moodboard', 'inspirace', 'design board', 'kreativní nástroje', 'sbírka inspirace'],
  openGraph: {
    title: 'Moodboard | Galaxie Barev',
    description: 'Vytvářejte a spravujte své kreativní moodboardy a sbírejte inspiraci.',
  },
}

export default function MoodboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
