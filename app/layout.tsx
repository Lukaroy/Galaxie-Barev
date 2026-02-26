import './globals.css'
import {Montserrat, Inder } from 'next/font/google'
import Navbar from './components/navbar'
import { ToastProvider } from './components/Toast'

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://galaxie-barev.vercel.app/'),
  title: {
    default: 'Galaxie Barev - Kreativní nástroje pro designéry',
    template: '%s | Galaxie Barev'
  },
  description: 'Objevte Galaxii Barev - moderní platformu pro generování barevných palet, vytváření moodboardů, správu fontů a sdílení kreativní inspirace. Ideální nástroj pro designéry a kreativce.',
  keywords: [
    'barevné palety',
    'generátor barev',
    'moodboard',
    'design',
    'kreativní nástroje',
    'fonty',
    'galerie',
    'color palette',
    'inspirace',
    'design komunita'
  ],
  authors: [{ name: 'Galaxie Barev' }],
  creator: 'Galaxie Barev',
  publisher: 'Galaxie Barev',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: '/',
    title: 'Galaxie Barev - Kreativní nástroje pro designéry',
    description: 'Objevte Galaxii Barev - moderní platformu pro generování barevných palet, vytváření moodboardů, správu fontů a sdílení kreativní inspirace.',
    siteName: 'Galaxie Barev',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Galaxie Barev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galaxie Barev - Kreativní nástroje pro designéry',
    description: 'Objevte Galaxii Barev - moderní platformu pro generování barevných palet, vytváření moodboardů a sdílení kreativní inspirace.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Galaxie Barev',
    description: 'Kreativní nástroje pro designéry - generování barevných palet, moodboardy, fonty a galerie',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://galaxie-barev.vercel.app/',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CZK',
    },
    creator: {
      '@type': 'Organization',
      name: 'Galaxie Barev',
    },
    featureList: [
      'Generování barevných palet',
      'Vytváření moodboardů',
      'Správa fontů',
      'Sdílení designové inspirace',
      'Komunitní galerie'
    ],
  }

  return (
    <html lang="cs" className={`${inder.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ToastProvider>
          <Navbar />
          <main>{children}</main>
        </ToastProvider>
      </body>
    </html>
  )
}
