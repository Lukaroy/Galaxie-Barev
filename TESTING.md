# Testování – Galaxie Barev

Tato dokumentace popisuje kompletní testovací stack projektu Galaxie Barev, jeho nastavení, použité nástroje, strukturu testů a co přesně se testuje.

---

## Obsah

1. [Přehled testovacího stacku](#přehled-testovacího-stacku)
2. [Nainstalované závislosti](#nainstalované-závislosti)
3. [Konfigurace Vitest](#konfigurace-vitest)
4. [Konfigurace Playwright](#konfigurace-playwright)
5. [Struktura testů](#struktura-testů)
6. [NPM scripty](#npm-scripty)
7. [Unit testy – lib/](#unit-testy--lib)
8. [Component testy – komponenty](#component-testy--komponenty)
9. [E2E testy – Playwright](#e2e-testy--playwright)
10. [Jak spustit testy](#jak-spustit-testy)
11. [Mockování a setup](#mockování-a-setup)
12. [Poznámky k implementaci](#poznámky-k-implementaci)

---

## Přehled testovacího stacku

Projekt používá **dvouvrstvý testovací přístup**:

| Vrstva | Nástroj | Účel |
|--------|---------|------|
| **Unit + Component testy** | Vitest + Testing Library | Testování izolovaných funkcí a React komponent v paměti (jsdom) |
| **End-to-End testy** | Playwright | Testování celé aplikace v reálném prohlížeči (Chromium) |

### Proč dvě vrstvy?

- **Vitest** je extrémně rychlý (79 testů < 8 sekund) a nevyžaduje běžící server. Ideální pro testování business logiky, validací a chování komponent.
- **Playwright** spouští skutečný prohlížeč a testuje aplikaci tak, jak ji vidí uživatel – rendering, navigace, CSS, interakce. Vyžaduje běžící Next.js dev server.

---

## Nainstalované závislosti

Všechny testovací závislosti jsou v `devDependencies`:

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.1",
    "@types/testing-library__jest-dom": "^5.14.9",
    "jsdom": "^28.1.0",
    "playwright": "^1.58.2",
    "vitest": "^4.0.18"
  }
}
```

### Co která závislost dělá

| Balíček | Účel |
|---------|------|
| `vitest` | Testovací framework kompatibilní s Vite, rychlý a moderní |
| `jsdom` | Simulace DOM prostředí v Node.js (pro renderování React komponent bez prohlížeče) |
| `@testing-library/react` | Utility pro renderování a dotazování React komponent v testech |
| `@testing-library/user-event` | Simulace reálných uživatelských interakcí (klikání, psaní, tab, blur...) |
| `@testing-library/jest-dom` | Rozšířené matchery pro DOM assertions (`toBeInTheDocument`, `toHaveClass`, `toHaveAttribute`...) |
| `@types/testing-library__jest-dom` | TypeScript typy pro jest-dom matchery |
| `playwright` | Framework pro E2E testování v reálných prohlížečích |

### Instalace Playwright prohlížeče

Po instalaci npm závislostí je potřeba stáhnout binárku Chromium:

```bash
npx playwright install chromium
```

---

## Konfigurace Vitest

Soubor: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    css: false,
  },
})
```

### Klíčová nastavení

| Nastavení | Hodnota | Vysvětlení |
|-----------|---------|------------|
| `resolve.alias.@` | kořen projektu | Umožňuje používat `@/lib/validator` importy stejně jako v Next.js |
| `globals: true` | povoleno | `describe`, `it`, `expect` jsou dostupné globálně bez importu |
| `environment: 'jsdom'` | jsdom | Simuluje prohlížečové API (document, window) pro React komponenty |
| `setupFiles` | `./tests/setup.ts` | Spustí se před každým test souborem — nastaví matchery a globální mocky |
| `include` | `tests/**/*.test.{ts,tsx}` | Hledá testy pouze ve složce `tests/` |
| `css: false` | vypnuto | CSS se neparseuje, zrychluje testy |

---

## Konfigurace Playwright

Soubor: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
```

### Klíčová nastavení

| Nastavení | Hodnota | Vysvětlení |
|-----------|---------|------------|
| `testDir` | `./e2e` | E2E testy jsou ve složce `e2e/` |
| `fullyParallel` | `true` | Testy běží paralelně pro rychlost |
| `forbidOnly` | CI only | Na CI zakáže `.only` (aby se nezapomnělo odebrat) |
| `retries` | 2 na CI, 0 lokálně | CI retry pro flaky testy |
| `reporter: 'html'` | HTML report | Generuje interaktivní HTML report v `playwright-report/` |
| `trace: 'on-first-retry'` | při prvním retry | Ukládá trace (timeline, DOM snapshoty) při selhání |
| `screenshot: 'only-on-failure'` | při selhání | Automatický screenshot při selhání testu |
| `webServer.command` | `npm run dev` | Playwright automaticky spustí Next.js dev server před testy |
| `webServer.reuseExistingServer` | lokálně `true` | Pokud server již běží, použije ho (nerestartuje) |
| `projects` | Chromium | Testuje se v Chrome (Desktop) |

---

## Struktura testů

```
Galaxie-Barev/
├── tests/                          # Vitest testy (unit + component)
│   ├── setup.ts                    # Globální setup (matchery, mocky)
│   ├── unit/                       # Unit testy pro utility funkce
│   │   ├── validator.test.ts       # Validace emailu, hesla, jména
│   │   ├── colorUtils.test.ts      # Konverze barev, generování schémat
│   │   └── errorHandling.test.ts   # Zpracování API a auth chyb
│   └── components/                 # Component testy pro React komponenty
│       ├── alert.test.tsx          # Alert komponenta
│       ├── loginform.test.tsx      # Přihlašovací formulář
│       └── registerform.test.tsx   # Registrační formulář
├── e2e/                            # Playwright E2E testy
│   └── app.spec.ts                 # Navigace, formuláře, stránky
├── vitest.config.ts                # Vitest konfigurace
└── playwright.config.ts            # Playwright konfigurace
```

---

## NPM scripty

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "npx playwright test",
    "test:e2e:ui": "npx playwright test --ui"
  }
}
```

| Script | Popis |
|--------|-------|
| `npm test` | Jednorázový běh všech Vitest testů (unit + component) |
| `npm run test:watch` | Watch mode — testy se automaticky pouští při změně souborů |
| `npm run test:ui` | Vitest UI — interaktivní webové rozhraní pro prohlížení testů |
| `npm run test:e2e` | Spustí všechny Playwright E2E testy v headless Chromium |
| `npm run test:e2e:ui` | Playwright UI mode — vizuální debugger pro E2E testy |

---

## Unit testy – lib/

### `tests/unit/validator.test.ts` (19 testů)

Testuje soubor `lib/validator.ts` — tři validační funkce.

#### `isValidEmail` (6 testů)

| Test | Popis | Vstup | Očekávaný výsledek |
|------|-------|-------|-------------------|
| accepts valid emails | Standardní platné emaily | `user@example.com`, `test.name@domain.cz`, `a@b.co`, `user+tag@gmail.com` | `true` |
| rejects emails without @ | Chybí @ | `userexample.com` | `false` |
| rejects emails without domain | Prázdná doména | `user@`, `user@.` | `false` |
| rejects emails without TLD | Chybí TLD | `user@domain` | `false` |
| rejects empty string | Prázdný řetězec | `""` | `false` |
| rejects emails with spaces | Mezery v emailu | `us er@example.com`, ` user@example.com` | `false` |

#### `isValidPassword` (5 testů)

Heslo musí splňovat: min. 8 znaků, velké písmeno, číslo, speciální znak.

| Test | Popis | Vstup | Očekávaný výsledek |
|------|-------|-------|-------------------|
| accepts strong passwords | Splňuje vše | `Heslo123!`, `MyP@ssw0rd`, `Abc!5678` | `true` |
| rejects short passwords | < 8 znaků | `Ab1!`, `Ab1!567` | `false` |
| rejects without uppercase | Bez velkého písmena | `heslo123!` | `false` |
| rejects without digit | Bez čísla | `HesloSilne!` | `false` |
| rejects without special char | Bez speciálního znaku | `Heslo1234` | `false` |
| rejects empty string | Prázdný řetězec | `""` | `false` |

#### `isValidName` (5 testů)

| Test | Popis | Vstup | Očekávaný výsledek |
|------|-------|-------|-------------------|
| accepts alphabetical names | Standardní jména | `Jan`, `Anna Marie` | `true` |
| accepts Czech diacritics | Česká diakritika | `Jiří`, `Kateřina`, `Růžena` | `true` |
| accepts hyphenated names | Pomlčka | `Anne-Marie` | `true` |
| accepts apostrophe | Apostrof | `O'Brien` | `true` |
| rejects names with numbers | Čísla ve jméně | `Jan123` | `false` |
| rejects special characters | Speciální znaky | `Jan@Doe`, `Jan!!` | `false` |
| rejects empty string | Prázdný řetězec | `""` | `false` |

---

### `tests/unit/colorUtils.test.ts` (27 testů)

Testuje soubor `lib/colorUtils.ts` — konverze barev a generování barevných schémat.

#### `hexToHSL` (6 testů)

Konverze z HEX formátu do HSL (Hue, Saturation, Lightness).

| Test | HEX vstup | Očekávané HSL |
|------|-----------|---------------|
| pure red | `#ff0000` | h≈0, s≈100, l≈50 |
| pure green | `#00ff00` | h≈120, s≈100, l≈50 |
| pure blue | `#0000ff` | h≈240, s≈100, l≈50 |
| white | `#ffffff` | s≈0, l≈100 |
| black | `#000000` | s≈0, l≈0 |
| mid-gray | `#808080` | s≈0, l≈50 |

#### `hslToHex` (5 testů)

Zpětná konverze z HSL do HEX.

| Test | HSL vstup | Očekávaný HEX |
|------|-----------|---------------|
| pure red | (0, 100, 50) | `#ff0000` |
| pure green | (120, 100, 50) | `#00ff00` |
| pure blue | (240, 100, 50) | `#0000ff` |
| white | (0, 0, 100) | `#ffffff` |
| black | (0, 0, 0) | `#000000` |

#### `hexToHSL -> hslToHex roundtrip` (7 testů)

Ověření, že konverze HEX → HSL → HEX vrátí stejný výsledek. Testované barvy: `#ff0000`, `#00ff00`, `#0000ff`, `#ffffff`, `#000000`, `#ff8800`, `#8844cc`.

#### `generateColorScheme` (7 testů)

Generování barevných schémat z jedné základní barvy.

| Test | Schéma | Ověření |
|------|--------|---------|
| complementary | Doplňkové | Vrací 2 barvy, první = vstupní |
| monochromatic | Monochromatické | Vrací 5 barev |
| analogous | Analogické | Vrací 3 barvy |
| triadic | Triadické | Vrací 3 barvy |
| tetradic | Tetradické | Vrací 4 barvy |
| valid hex format | Všechna schémata | Všechny barvy odpovídají regexu `#[0-9a-f]{6}` |
| complementary 180° | Doplňkové | Hue rozdíl ≈ 180° |

#### `generateRandomColor` (2 testy)

| Test | Ověření |
|------|---------|
| returns valid hex | Výsledek odpovídá `#[0-9a-f]{6}` |
| returns different colors | 10 volání → více než 1 unikátní barva |

---

### `tests/unit/errorHandling.test.ts` (13 testů)

Testuje soubor `lib/errorHandling.ts` — zpracování chybových kódů z Prisma a Firebase Auth.

#### `handleApiError` (4 testy)

| Test | Vstupní kód | Očekávaná česká zpráva |
|------|-------------|----------------------|
| P2002 (unique constraint) | `{ code: 'P2002' }` | „Záznam s těmito údaji již existuje" |
| P2025 (not found) | `{ code: 'P2025' }` | „Záznam nenalezen" |
| custom message | `{ message: '...' }` | Vrátí `error.message` |
| unknown/null/undefined | `{}`, `null`, `undefined` | „Nastala neočekávaná chyba" |

#### `handleAuthError` (9 testů)

| Test | Firebase kód | Očekávaná česká zpráva |
|------|-------------|----------------------|
| user-not-found | `auth/user-not-found` | „Nesprávný email nebo heslo" |
| wrong-password | `auth/wrong-password` | „Nesprávný email nebo heslo" |
| email-already-in-use | `auth/email-already-in-use` | „Tento email je již používán" |
| weak-password | `auth/weak-password` | „Heslo je příliš slabé" |
| invalid-email | `auth/invalid-email` | „Neplatný formát emailu" |
| network-request-failed | `auth/network-request-failed` | „Chyba připojení k síti" |
| too-many-requests | `auth/too-many-requests` | „Příliš mnoho pokusů, zkuste to později" |
| unknown code with message | `auth/unknown` + message | Vrátí `error.message` |
| no code no message | `{}`, `null` | „Nastala chyba při autentizaci" |

---

## Component testy – komponenty

### `tests/components/alert.test.tsx` (3 testy)

Testuje komponentu `app/components/alert.tsx`.

| Test | Co ověřuje |
|------|-----------|
| renders error message by default | Výchozí typ je `error`, text se zobrazí, má CSS třídy `alert error` |
| renders success message | Typ `success` aplikuje třídu `alert success` |
| renders nothing when empty | Prázdná zpráva = žádný výstup (null) |

---

### `tests/components/loginform.test.tsx` (9 testů)

Testuje komponentu `app/components/auth/loginform.tsx` — přihlašovací formulář.

**Mockované závislosti:**
- `@/lib/auth` → `loginUser` (funkce přihlášení)
- `@/app/loading` → Loading komponenta
- `@/app/components/auth/socialLoginButtons` → Social login tlačítka
- `next/navigation` → `useRouter`, `useSearchParams` (globální mock v setup.ts)
- `@/lib/firebase` → `auth` objekt (globální mock v setup.ts)

| Test | Co ověřuje | Simulovaná interakce |
|------|-----------|---------------------|
| renders all key elements | Email input, heslo input, tlačítko „Přihlásit se", odkaz na registraci, odkaz „Zapomněl heslo" | — |
| shows error for empty email | Alert s textem „Zadej svůj email" | Klik na submit bez vyplnění |
| shows error for invalid email | Alert s textem „Tohle nevypadá jako platný email" | Zadání `user@domain` (bez TLD) + submit |
| shows error for short password | Alert s textem „Heslo musí mít aspoň 8 znaků" | Platný email + krátké heslo + submit |
| calls loginUser on valid submit | `loginUser` voláno se správnými argumenty | `test@example.com` + `password123` + submit |
| shows auth error from failed login | Alert se zobrazí po zamítnutém přihlášení | Mock `loginUser` rejectne s `auth/user-not-found` |
| toggles password visibility | Input type se přepíná mezi `password` a `text` | Klik na ikonu oka |
| warning class on invalid email | CSS třída `input-warning` se přidá po blur | Zadání `invalid` + tab (blur) |
| clears error on typing | Alert zmizí při dalším psaní | Vyvolání chyby → klik+tab (touched) → psaní |

**Poznámka k testování emailu:** HTML5 `type="email"` v jsdom blokuje submit pro zjevně neplatné emaily (bez @). Proto test používá `user@domain` — projde HTML5 validací, ale selže na custom regex `isValidEmail` (vyžaduje TLD).

---

### `tests/components/registerform.test.tsx` (8 testů)

Testuje komponentu `app/components/auth/registerform.tsx` — registrační formulář.

**Mockované závislosti:**
- `@/lib/auth` → `registerUser`
- `firebase/auth` → `signOut`
- `@/app/loading` → Loading komponenta
- `@/app/components/auth/socialLoginButtons` → Social login tlačítka

| Test | Co ověřuje | Simulovaná interakce |
|------|-----------|---------------------|
| renders all form fields | Jméno, příjmení, email, heslo, checkbox podmínek, tlačítko | — |
| error for whitespace-only names | Alert „Vypln celé jméno" | Mezery místo jména + platný zbytek + submit |
| error for name with numbers | Alert „Jméno může obsahovat jen písmena" | `Jan123` jako jméno + submit |
| error for invalid email | Alert „Email není platný" | `user@domain` jako email + submit |
| error for short password | Alert „Heslo musí mít aspoň 8 znaků" | Krátké heslo + submit |
| calls registerUser on valid submit | `registerUser('Jan', 'Novák', 'jan@test.com', 'HesilkoSilne1!')` | Kompletní validní vyplnění + submit |
| toggles password visibility | Input type `password` ↔ `text` | Klik na oko |
| shows auth error on failure | Alert s textem obsahujícím „email" | Mock `registerUser` rejectne s `auth/email-already-in-use` |

**Poznámka k testování prázdných jmen:** HTML5 atribut `required` v jsdom blokuje submit s prázdným polem. Proto test zadá mezeru (` `) — projde `required`, ale `trim()` ji odstraní a validace selže.

---

## E2E testy – Playwright

### `e2e/app.spec.ts`

E2E testy běží ve skutečném prohlížeči Chromium proti živému Next.js dev serveru na `http://localhost:3000`.

#### Navigation & Pages (4 testy)

| Test | URL | Co ověřuje |
|------|-----|-----------|
| homepage loads | `/` | Titulek obsahuje „Galaxie", logo je viditelné |
| navbar links | `/` → `/barvy` → `/fonty` | Navigační odkazy fungují, URL se změní |
| footer visible | `/` | Footer element je viditelný |
| podminky page | `/podminky` | Stránka obsahuje text „podmín" |

#### Login Page (7 testů)

| Test | Co ověřuje |
|------|-----------|
| form renders | Email input, heslo input, submit tlačítko, odkazy viditelné |
| empty form error | Po kliknutí na submit bez dat se zobrazí alert s textem o emailu |
| invalid email error | Alert „platný email" po zadání neplatného emailu |
| short password error | Alert „8 znaků" po zadání krátkého hesla |
| password toggle | `type` atribut hesla se přepíná `password` ↔ `text` |
| link to registration | Klik na „Vytvořit" naviguje na `/registrace` |
| link to forgot password | Klik na „Zapomněl" naviguje na `/zapomenute-heslo` |

#### Registration Page (2 testy)

| Test | Co ověřuje |
|------|-----------|
| form renders | Všechna pole (jméno, příjmení, email, heslo) + checkbox podmínek viditelné |
| link to login | Klik na „Přihlásit se" naviguje na `/prihlaseni` |

#### Barvy Page (1 test)

| Test | Co ověřuje |
|------|-----------|
| color tools load | Stránka `/barvy` obsahuje text „barv" |

#### Fonty Page (1 test)

| Test | Co ověřuje |
|------|-----------|
| fonts page loads | Stránka `/fonty` obsahuje textový input (vyhledávání) |

#### Zapomenuté heslo (1 test)

| Test | Co ověřuje |
|------|-----------|
| page loads | Stránka `/zapomenute-heslo` obsahuje email input |

---

## Jak spustit testy

### Unit + Component testy (Vitest)

```bash
# Jednorázový běh
npm test

# Watch mode (automaticky při změně souborů)
npm run test:watch

# Vitest UI (webové rozhraní)
npm run test:ui
```

Typický výstup:
```
 ✓ tests/unit/colorUtils.test.ts (27 tests) 11ms
 ✓ tests/unit/errorHandling.test.ts (13 tests) 7ms
 ✓ tests/unit/validator.test.ts (19 tests) 7ms
 ✓ tests/components/alert.test.tsx (3 tests) 189ms
 ✓ tests/components/loginform.test.tsx (9 tests) 2506ms
 ✓ tests/components/registerform.test.tsx (8 tests) 4753ms

 Test Files  6 passed (6)
      Tests  79 passed (79)
   Duration  7.61s
```

### E2E testy (Playwright)

```bash
# Headless běh (automaticky startuje dev server)
npm run test:e2e

# S vizuálním UI debuggerem
npm run test:e2e:ui
```

Playwright automaticky:
1. Spustí `npm run dev` (Next.js dev server)
2. Počká až server nastartuje na `http://localhost:3000`
3. Spustí testy v headless Chromium
4. Při selhání pořídí screenshot a uloží trace
5. Vygeneruje HTML report v `playwright-report/`

Pro zobrazení posledního reportu:
```bash
npx playwright show-report
```

---

## Mockování a setup

### Soubor `tests/setup.ts`

Tento soubor se spustí automaticky před každou test suite (díky `setupFiles` v konfiguraci).

```typescript
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Po každém testu vyčistit renderovaný DOM
afterEach(() => {
  cleanup()
})

// Mock next/navigation — simuluje router bez skutečné navigace
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Firebase — bez skutečného připojení k Firebase
vi.mock('@/lib/firebase', () => ({
  auth: {},
}))
```

### Co setup dělá

1. **`@testing-library/jest-dom/vitest`** — Registruje rozšířené DOM matchery:
   - `toBeInTheDocument()` — element existuje v DOM
   - `toHaveTextContent()` — element obsahuje text
   - `toHaveClass()` — element má CSS třídu
   - `toHaveAttribute()` — element má HTML atribut
   - `toBeVisible()` — element je viditelný

2. **`cleanup()`** — Po každém testu odstraní renderovaný DOM, aby testy neovlivňovaly další.

3. **Mock `next/navigation`** — Komponenty používají `useRouter()` a `useSearchParams()`, které bez mock objektu selžou (Next.js kontext neexistuje v test prostředí).

4. **Mock Firebase** — `@/lib/firebase` exportuje `auth` objekt inicializovaný přes Firebase SDK, který vyžaduje konfiguraci a síťové připojení. Mock ho nahrazuje prázdným objektem.

### Mockování v jednotlivých testech

Každý component test přidává vlastní mocky pro závislosti dané komponenty:

```typescript
// loginform.test.tsx
const mockLoginUser = vi.fn()
vi.mock('@/lib/auth', () => ({
  loginUser: (...args) => mockLoginUser(...args),
}))
```

Tím se:
- Izoluje komponenta od skutečné Firebase autentizace
- Umožní ověření, že funkce byla volána se správnými parametry (`expect(mockLoginUser).toHaveBeenCalledWith(...)`)
- Umožní simulace úspěchu (`mockResolvedValue`) i selhání (`mockRejectedValue`)

---

## Poznámky k implementaci

### HTML5 validace vs. custom validace

Prohlížeč (a jsdom) provádí vlastní HTML5 validaci na `<input type="email">` a `<input required>`. To může blokovat `onSubmit` ještě předtím, než se spustí naše custom validační logika.

**Řešení v testech:**
- Pro neplatný email se používá `user@domain` — projde HTML5 validací (obsahuje `@`), ale selže na custom `isValidEmail` regex (chybí TLD `.xyz`)
- Pro prázdné jméno se používá mezera ` ` — projde HTML5 `required`, ale `trim()` ji odstraní

### Asynchronní UI updates

Některé akce (Firebase auth volání) jsou asynchronní. Pro čekání na výsledek se používá:

```typescript
const alert = await screen.findByRole('alert') // Čeká až se element objeví
```

Na rozdíl od `getByRole`, `findByRole` automaticky čeká (do timeout 1 sekundu).

### CSS třídy a test assertions

CSS ani vizuální rendering se v Vitest testech neuplatňuje (`css: false`). Testujeme pouze:
- Přítomnost CSS tříd (`toHaveClass('input-warning')`)
- Přítomnost elementů v DOM
- Text obsah
- HTML atributy (`type="password"`)

Pro ověření skutečného vzhledu slouží Playwright E2E testy.

---

## Souhrnná tabulka pokrytí

| Oblast | Soubor | Funkce/Komponenta | Počet testů |
|--------|--------|-------------------|-------------|
| Validace | `validator.test.ts` | `isValidEmail`, `isValidPassword`, `isValidName` | 19 |
| Barvy | `colorUtils.test.ts` | `hexToHSL`, `hslToHex`, `generateColorScheme`, `generateRandomColor` | 27 |
| Error handling | `errorHandling.test.ts` | `handleApiError`, `handleAuthError` | 13 |
| Alert | `alert.test.tsx` | `<Alert>` | 3 |
| Login | `loginform.test.tsx` | `<LoginForm>` | 9 |
| Registrace | `registerform.test.tsx` | `<RegisterForm>` | 8 |
| **Celkem Vitest** | | | **79** |
| E2E navigace | `app.spec.ts` | Homepage, navbar, footer, podmínky | 4 |
| E2E login | `app.spec.ts` | Login formulář, validace, odkazy | 7 |
| E2E registrace | `app.spec.ts` | Registrační formulář, odkazy | 2 |
| E2E stránky | `app.spec.ts` | Barvy, fonty, zapomenuté heslo | 3 |
| **Celkem Playwright** | | | **16** |
| **Celkem** | | | **95** |
