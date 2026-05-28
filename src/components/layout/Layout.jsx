import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useLocation } from 'react-router-dom'

const PAGE_TITLES = {
  '/': 'Kokpit',
  '/kalendarz': 'Kalendarz',
  '/zadania': 'Zadania',
  '/zadania/schematy': 'Schematy zadań',
  '/zadania/kalendarz': 'Kalendarz zadań',
  '/wydarzenia': 'Wydarzenia',
  '/wydarzenia/nowe': 'Nowe wydarzenie',
  '/kontrahenci': 'Kontrahenci',
  '/kontrahenci/nowy': 'Nowy kontrahent',
  '/miejsca': 'Miejsca',
  '/miejsca/nowe': 'Nowe miejsce',
  '/event-network': 'Event Network',
  '/magazyn': 'Magazyn',
  '/magazyn/stolarnia': 'Magazyn — Stolarnia',
  '/magazyn/slusarnia': 'Magazyn — Ślusarnia',
  '/magazyn/tekstylia': 'Magazyn — Tekstylia',
  '/magazyn/elektryka': 'Magazyn — Elektryka',
  '/serwis': 'Serwis',
  '/uzytkownicy': 'Użytkownicy',
  '/uzytkownicy/role': 'Role i uprawnienia',
  '/flota': 'Flota',
  '/ustawienia': 'Ustawienia',
  '/oferty': 'Oferty',
  '/oferty/nowa': 'Nowa oferta',
  '/wypozyczenia': 'Wypożyczenia i konflikty',
  '/statystyki': 'Statystyki',
  '/rozliczenia': 'Rozliczenia',
  '/rozliczenia/koszty': 'Rozliczenia — Koszty',
}

export default function Layout({ children }) {
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] ?? 'L8 Studio'

  return (
    <div className="app-shell scanlines">
      <Sidebar />
      <div className="main-area">
        <Topbar pageTitle={title} />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}
