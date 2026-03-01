import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Podmínky použití",
  description: "Podmínky použití platformy Galaxie Barev — pravidla, práva a povinnosti uživatelů.",
}

export default function PodminkyPage() {
  return (
    <div className="terms-page">
      <div className="terms-container">

        <div className="page-header-unified">
          <h1 className="page-title-gradient">Podmínky použití</h1>
          <p className="page-subtitle">
            Přečti si prosím tato pravidla před použitím platformy.
            Platné od 1. března 2026.
          </p>
        </div>

        <div className="terms-content">

          <section className="terms-section">
            <h2>1. Úvodní ustanovení</h2>
            <p>
              Tyto podmínky použití (dále jen „Podmínky") upravují vztah mezi provozovatelem
              platformy <strong>Galaxie Barev</strong> (dále jen „Platforma") a jejími uživateli.
              Používáním Platformy souhlasíš s těmito Podmínkami v plném rozsahu.
            </p>
            <p>
              Pokud s Podmínkami nesouhlasíš, prosíme tě, abys Platformu nepoužíval/a.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Popis služby</h2>
            <p>
              Galaxie Barev je kreativní platforma určená designérům a kreativcům. Nabízí:
            </p>
            <ul>
              <li>Generátor a správu barevných palet</li>
              <li>Průzkum a porovnávání fontů</li>
              <li>Tvorbu a sdílení moodboardů</li>
              <li>Komunitní galerii inspirace</li>
              <li>Vzdělávací obsah a lekce o designu</li>
            </ul>
            <p>
              Platforma je poskytována ve stavu „jak stojí a leží" a provozovatel si vyhrazuje
              právo kdykoli změnit, pozastavit nebo ukončit jakoukoli část služby.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Registrace a uživatelský účet</h2>
            <p>
              Pro přístup k plné funkčnosti Platformy je nutná registrace. Při registraci se
              zavazuješ:
            </p>
            <ul>
              <li>Uvádět pravdivé, přesné a aktuální informace</li>
              <li>Chránit přihlašovací údaje a nesdílet je s třetími osobami</li>
              <li>Neprodleně nás informovat o neoprávněném přístupu na svůj účet</li>
              <li>Být starší 13 let, případně mít souhlas zákonného zástupce</li>
            </ul>
            <p>
              Za veškerou aktivitu provedenou pod tvým účtem neseš odpovědnost ty.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Práva duševního vlastnictví</h2>
            <p>
              Veškerý obsah Platformy — včetně grafiky, kódu, textů, loga a vzdělávacích
              materiálů — je chráněn autorským právem a je výhradním vlastnictvím provozovatele
              nebo příslušných třetích stran.
            </p>
            <p>
              <strong>Tvůj obsah:</strong> Obsah, který na Platformu nahraješ nebo vytvoříš
              (moodboardy, palety, příspěvky do galerie), zůstává tvým vlastnictvím.
              Nahráním obsahu nám udělují nevýhradní, bezplatnou licenci k jeho zobrazení
              v rámci Platformy.
            </p>
            <p>
              Nesmíš kopírovat, distribuovat ani komerčně využívat obsah Platformy bez
              předchozího písemného souhlasu provozovatele.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Pravidla chování</h2>
            <p>
              Při používání Platformy je zakázáno:
            </p>
            <ul>
              <li>Nahrávat obsah porušující autorská práva třetích stran</li>
              <li>Šířit nevhodný, urážlivý nebo nenávistný obsah</li>
              <li>Pokoušet se narušit bezpečnost nebo funkčnost Platformy</li>
              <li>Vytvářet falešné účty nebo se vydávat za jinou osobu</li>
              <li>Používat Platformu k reklamním nebo spamovým účelům bez souhlasu</li>
              <li>Provádět jakékoli automatizované stahování obsahu (scraping)</li>
            </ul>
            <p>
              Porušení těchto pravidel může vést k okamžitému zrušení účtu bez nároku na
              náhradu.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Ochrana osobních údajů</h2>
            <p>
              Zpracování tvých osobních údajů se řídí platnou legislativou, včetně nařízení
              GDPR. Sbíráme pouze údaje nezbytné pro provoz Platformy, zejména:
            </p>
            <ul>
              <li>E-mailovou adresu pro účely přihlášení a komunikace</li>
              <li>Uživatelské jméno a profilové informace, které sám/sama zadáš</li>
              <li>Technické údaje o využívání služby (logy, cookies)</li>
            </ul>
            <p>
              Tvé údaje neprodáváme třetím stranám. Pro přihlášení využíváme službu
              Firebase Authentication od Google, na kterou se vztahují{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                zásady ochrany soukromí Google
              </a>.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Omezení odpovědnosti</h2>
            <p>
              Platforma je poskytována bezplatně a provozovatel nenese odpovědnost za:
            </p>
            <ul>
              <li>Ztrátu dat způsobenou výpadkem služby nebo technickými problémy</li>
              <li>Obsah nahraný uživateli</li>
              <li>Škody vzniklé v důsledku přerušení nebo ukončení provozu Platformy</li>
              <li>Chyby nebo nepřesnosti v automaticky generovaném obsahu</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>8. Změny podmínek</h2>
            <p>
              Provozovatel si vyhrazuje právo tyto Podmínky kdykoli změnit. O podstatných
              změnách budeme uživatele informovat prostřednictvím e-mailu nebo oznámení na
              Platformě. Pokračováním v používání Platformy po zveřejnění změn vyjadřuješ
              souhlas s aktualizovanými Podmínkami.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Rozhodné právo</h2>
            <p>
              Tyto Podmínky se řídí právním řádem České republiky. Veškeré spory vzniklé
              v souvislosti s používáním Platformy budou řešeny příslušnými soudy
              České republiky.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Kontakt</h2>
            <p>
              Máš-li otázky k těmto Podmínkám, kontaktuj nás na adrese{" "}
              <a href="mailto:info@galaxie-barev.cz">info@galaxie-barev.cz</a>.
            </p>
          </section>

          <div className="terms-footer-note">
            <p>
              Zpět na <Link href="/">hlavní stránku</Link> nebo{" "}
              <Link href="/registrace">vytvoř si účet</Link>.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
