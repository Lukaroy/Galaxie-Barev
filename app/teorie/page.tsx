"use client"

import { useState } from 'react'
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'

type Chapter = {
  id: number
  title: string
  content: {
    subtitle: string
    text: string[]
    image?: string
  }[]
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Kapitola 1: Design plakátu',
    content: [
      {
        subtitle: 'Základy posterového designu',
        text: [
          'Plakát má jeden hlavní cíl: zaujmout pozornost během 3 sekund. Musí být čitelný na dálku a mít jasnou vizuální hierarchii. Nejdůležitější informace musí být největší.',
          'Pravidlo „less is more" platí dvojnásob. Omez se na 2-3 fonty a 3-4 barvy. Jeden hlavní vizuální prvek má větší dopad než kompozice z mnoha menších prvků.',
          'Vždy mysli na kontext: bude plakát venku nebo uvnitř? Na zdi nebo v ruce? Jak daleko bude divák? Světlé pozadí pro interiér, kontrastní barvy pro exteriér.'
        ],
        image: 'https://images.unsplash.com/photo-1499892477393-f675706cbe6e?w=600&h=400&fit=crop'
      },
      {
        subtitle: 'Vizuální hierarchie',
        text: [
          'Lidské oko skenuje plakát ve tvaru F nebo Z. Umísti nejdůležitější prvky (nadpis, datum, místo) do těchto oblastí. Levý horní roh vidíme první.',
          'Velikost, barva a pozice určují důležitost. Hlavní nadpis by měl zabírat 20-30% plochy. Call-to-action (URL, datum) musí být kontrastní a snadno čitelný.',
          'Používej whitespace pro oddělení sekcí. Přeplněný plakát vypadá amatérsky. Prázdný prostor kolem prvků jim dává důležitost a působí profesionálně.'
        ]
      },
      {
        subtitle: 'Typografie pro plakáty',
        text: [
          'Pro plakáty volte výrazné sans-serif fonty nebo display fonty. Tloušťka písma musí být minimálně semi-bold, aby byla vidět na dálku.',
          'Kombinuj max 2 fonty: jeden pro nadpis (výrazný, personální), druhý pro tělo textu (čitelný, neutrální). Nikdy nekombinuj dva výrazné display fonty.',
          'Kontras velikostí je klíčový. Hlavní nadpis 120-200pt, podnadpis 60-80pt, tělo textu 36-48pt. Na distance 3 metrů musí být čitelné.'
        ],
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'
      }
    ]
  },
  {
    id: 2,
    title: 'Kapitola 2: Design mobilních aplikací',
    content: [
      {
        subtitle: 'Uživatelské rozhraní (UI)',
        text: [
          'Mobile-first je standard. Začni s nejmenším displejem (375×667px iPhone SE) a postupně přidávej funkce pro větší displeje. Thumb zone: nejdůležitější prvky do středu a spodní části displeje.',
          'Touch targets minimálně 44×44px (iOS) nebo 48×48dp (Android). Mezi interaktivními prvky minimálně 8px mezera. Prst je méně přesný než kurzor myši.',
          'Navigace: Tab bar dole pro 3-5 hlavních sekcí. Burger menu jen pokud máš více než 5 sekcí. Floating action button (FAB) pro primární akci.'
        ],
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop'
      },
      {
        subtitle: 'Uživatelská zkušenost (UX)',
        text: [
          'Snižuj cognitive load. Každá obrazovka by měla mít jednu primární akci. Formuláře rozhodni do kroků, neházej na uživatele 15 polí najednou.',
          'Loading states, skeleton screens a optimistické UI. Uživatel nesmí čekat na prázdné obrazovce. Animace přechodu mezi stavy max 300ms.',
          'Error handling: jasná chybová hlášení s řešením. "Špatné heslo" ❌ → "Heslo musí mít alespoň 8 znaků" ✓. Empty states s ilustrací a CTA.'
        ]
      },
      {
        subtitle: 'Design systém a konzistence',
        text: [
          'Jeden design systém napříč celou aplikací. Definuj komponenty: buttons (primary, secondary, text), inputs, cards, modals. Storybook pro dokumentaci.',
          'Spacing systém: 4px, 8px, 16px, 24px, 32px, 48px, 64px. Všechny marginy a paddingy by měly být násobky 8px (nebo 4px pro jemné úpravy).',
          'Barevný systém: primary color (branding), secondary (akcentová), neutral (šedé pro text a pozadí), semantic (success, warning, error, info).'
        ],
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop'
      }
    ]
  },
  {
    id: 3,
    title: 'Kapitola 3: Výběr barev',
    content: [
      {
        subtitle: 'Barevné schéma',
        text: [
          'Monochromatické schéma: jedna barva v různých odstínech. Nejjednodušší a nejbezpečnější. Ideální pro minimalistický design nebo když chceš vyniknout typografií.',
          'Komplementární schéma: dvě barvy naproti sobě na barevném kruhu (modrá-oranžová, fialová-žlutá). Vysoký kontrast, hodí se pro call-to-action.',
          'Analogické schéma: 3 sousední barvy (modrá-azurová-zelená). Harmonické, příjemné oku. Ideální pro přírodní nebo relaxační témata.'
        ],
        image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=600&h=400&fit=crop'
      },
      {
        subtitle: '60-30-10 pravidlo',
        text: [
          '60% dominantní barva (obvykle neutrální pozadí), 30% sekundární barva (branding), 10% akcentová (CTA, důležité prvky).',
          'Příklad: 60% bílá/světle šedá (pozadí), 30% tmavě modrá (texty, navigace), 10% oranžová (tlačítka, odkazy).',
          'Toto pravidlo zajišťuje vizuální rovnováhu. Více než 3 výrazné barvy vytváří chaos. Neutralní barvy (bílá, šedá, černá) se nepočítají.'
        ]
      },
      {
        subtitle: 'Kontrast a přístupnost',
        text: [
          'WCAG 2.1: minimální kontrast 4.5:1 pro normální text, 3:1 pro velký text (18pt+ nebo 14pt bold+). Použij nástroje jako WebAIM Contrast Checker.',
          'Nespoléhej jen na barvu: "Červená = chyba, zelená = úspěch" nefunguje pro barvoslepé (8% mužů). Přidej ikony nebo text.',
          'Dark mode: tmavě šedá (#1a1a1a) místo černé (#000), aby se snížilo namáhání očí. Snížená saturace barev (modrá #2196F3 → #64B5F6).'
        ],
        image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=400&fit=crop'
      }
    ]
  },
  {
    id: 4,
    title: 'Kapitola 4: Praktické tipy',
    content: [
      {
        subtitle: 'Inspirace a zdroje',
        text: [
          'Dribbble, Behance, Awwwards pro inspiraci. Ale nekopitruj slepě - pochop proč design funguje a adaptuj pro svůj projekt.',
          'Color Hunt, Coolors, Adobe Color pro barevné palety. Unsplash, Pexels pro obrázky. Google Fonts, Adobe Fonts pro typografii.',
          'Figma, Adobe XD pro UI/UX design. Canva pro rychlé grafiky. Procreate pro ilustrace. Používej správný nástroj pro správnou práci.'
        ],
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'
      },
      {
        subtitle: 'Časté chyby',
        text: [
          'Příliš mnoho fontů (max 2-3), příliš mnoho barev (max 3-4 + neutralní), nedostatečný kontrast, špatné zarovnání.',
          'Používání Comic Sans nebo Papyrus v profesionálním kontextu. Roztažené nebo stlačené fotky. Pixelované loga. Nečitelný text na pozadí.',
          'Ignorování mobilní verze, pomalé načítání, neklikatelné prvky na touch zařízeních. Testuj na reálných zařízeních!'
        ]
      },
      {
        subtitle: 'Proces designu',
        text: [
          '1. Research: kdo je cílová skupina, co potřebují, co dělá konkurence. 2. Wireframes: nízká věrnost, fokus na strukturu a flow.',
          '3. Mockups: vysoká věrnost, finální barvy a typography. 4. Prototype: interaktivní, testuj s uživateli. 5. Iterace: opakuj založené na feedbacku.',
          'Design není umění - je to řešení problému. Každé rozhodnutí musí mít důvod. "Líbí se mi to" není dobrý důvod. "Zvyšuje to konverze o 15%" je.'
        ],
        image: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=600&h=400&fit=crop'
      }
    ]
  }
]

export default function TheoryPage() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const chapter = chapters[currentChapter]
  const totalChapters = chapters.length
  const totalPages = chapter.content.length

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    } else if (currentChapter < totalChapters - 1) {
      setCurrentChapter(currentChapter + 1)
      setCurrentPage(0)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    } else if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
      setCurrentPage(chapters[currentChapter - 1].content.length - 1)
    }
  }

  const page = chapter.content[currentPage]
  const isFirstPage = currentChapter === 0 && currentPage === 0
  const isLastPage = currentChapter === totalChapters - 1 && currentPage === totalPages - 1

  return (
    <div className="book-container">
      <div className="book-wrapper">
        <div className="book">
          {/* Levá strana knihy */}
          <div className="book-page book-page-left">
            <div className="book-spine"></div>
            <div className="page-content">
              <div className="book-header">
                <BookOpen size={32} className="book-icon" />
                <h1>Design příručka</h1>
              </div>
              
              <div className="chapter-nav">
                <h2>Obsah</h2>
                {chapters.map((ch, idx) => (
                  <div 
                    key={ch.id}
                    className={`chapter-item ${idx === currentChapter ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentChapter(idx)
                      setCurrentPage(0)
                    }}
                  >
                    <span className="chapter-number">{ch.id}</span>
                    <span className="chapter-title">{ch.title}</span>
                  </div>
                ))}
              </div>

              <div className="book-info">
                <p>Design systém Galaxie</p>
                <p>© 2026</p>
              </div>
            </div>
          </div>

          {/* Pravá strana knihy */}
          <div className="book-page book-page-right">
            <div className="page-content">
              <div className="page-header">
                <span className="page-chapter">{chapter.title}</span>
                <span className="page-number">{currentPage + 1} / {totalPages}</span>
              </div>

              <div className="page-body">
                <h2 className="page-subtitle">{page.subtitle}</h2>
                
                {page.image && (
                  <div className="page-image">
                    <img src={page.image} alt={page.subtitle} />
                  </div>
                )}

                <div className="page-text">
                  {page.text.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="page-footer">
                <button 
                  className="page-btn page-btn-prev" 
                  onClick={prevPage}
                  disabled={isFirstPage}
                >
                  <ChevronLeft size={20} />
                  Předchozí
                </button>
                <button 
                  className="page-btn page-btn-next" 
                  onClick={nextPage}
                  disabled={isLastPage}
                >
                  Další
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
