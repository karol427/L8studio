import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Home, CheckSquare, Calendar, Star, Users, MapPin, Mail,
  Package, Settings, ShoppingCart, Truck, BarChart2,
  DollarSign, Wrench, Network, ChevronDown, ChevronRight,
  Plus, List, Layout, AlertCircle
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './Sidebar.css'

const NAV_ITEMS = [
  {
    id: 'kokpit',
    label: 'Kokpit',
    icon: Home,
    path: '/',
    exact: true,
  },
  {
    id: 'zadania',
    label: 'Zadania',
    icon: CheckSquare,
    badge: 'tasks',
    children: [
      { label: 'Zadania', icon: List, path: '/zadania' },
      { label: 'Schematy zadań', icon: Layout, path: '/zadania/schematy' },
      { label: 'Kalendarz', icon: Calendar, path: '/zadania/kalendarz' },
    ],
  },
  {
    id: 'kalendarz',
    label: 'Kalendarz',
    icon: Calendar,
    path: '/kalendarz',
  },
  {
    id: 'wydarzenia',
    label: 'Wydarzenia',
    icon: Star,
    children: [
      { label: 'Lista wydarzeń', icon: List, path: '/wydarzenia' },
      { label: 'Nowe wydarzenie', icon: Plus, path: '/wydarzenia/nowe' },
    ],
  },
  {
    id: 'kontrahenci',
    label: 'Kontrahenci',
    icon: Users,
    children: [
      { label: 'Kontrahenci', icon: Users, path: '/kontrahenci' },
      { label: 'Kontakty', icon: Mail, path: '/kontrahenci/kontakty' },
      { label: 'Grupy kontrahentów', icon: Users, path: '/kontrahenci/grupy' },
    ],
  },
  {
    id: 'miejsca',
    label: 'Miejsca',
    icon: MapPin,
    children: [
      { label: 'Lista miejsc', icon: List, path: '/miejsca' },
      { label: 'Dodaj miejsce', icon: Plus, path: '/miejsca/nowe' },
    ],
  },
  {
    id: 'eventnetwork',
    label: 'Event Network',
    icon: Network,
    badge: 'eventNetwork',
    children: [
      { label: 'Sieć partnerów', icon: Users, path: '/event-network' },
    ],
  },
  {
    id: 'magazyn',
    label: 'Magazyn',
    icon: Package,
    children: [
      { label: 'Magazyn wewnętrzny', icon: Home, path: '/magazyn' },
      { label: 'Magazyn dostawców', icon: Package, path: '/magazyn/dostawcow' },
      { label: 'Ceny', icon: DollarSign, path: '/magazyn/ceny' },
      { label: 'Wydanie z magazynu', icon: Package, path: '/magazyn/wydanie' },
      { label: 'Przyjęcie do magazynu', icon: Package, path: '/magazyn/przyjecie' },
      { label: 'Niezwrócony sprzęt', icon: Package, path: '/magazyn/niezwrocony' },
      { label: 'Modele', icon: Package, path: '/magazyn/modele' },
      { label: 'Egzemplarze', icon: Wrench, path: '/magazyn/egzemplarze' },
      { label: 'Opakowania', icon: Package, path: '/magazyn/opakowania' },
      { label: 'Typy opakowań', icon: Package, path: '/magazyn/typy-opakowan' },
      { label: 'Zestawy', icon: List, path: '/magazyn/zestawy' },
      { label: 'Kategorie', icon: List, path: '/magazyn/kategorie' },
      { label: 'Załączniki modeli', icon: Package, path: '/magazyn/zalaczniki-modeli' },
    ],
  },
  {
    id: 'serwis',
    label: 'Serwis',
    icon: Wrench,
    badge: 'serwis',
    children: [
      { label: 'Zlecenia serwisowe', icon: AlertCircle, path: '/serwis' },
    ],
  },
  {
    id: 'uzytkownicy',
    label: 'Użytkownicy',
    icon: Users,
    children: [
      { label: 'Użytkownicy', icon: Users, path: '/uzytkownicy' },
      { label: 'Zespoły', icon: Users, path: '/uzytkownicy/zespoly' },
      { label: 'Umiejętności', icon: Settings, path: '/uzytkownicy/umiejetnosci' },
      { label: 'Rozliczenia', icon: DollarSign, path: '/uzytkownicy/rozliczenia' },
      { label: 'Chronologia rozliczeń', icon: Calendar, path: '/uzytkownicy/chronologia' },
      { label: 'Grupy prowizyjne', icon: DollarSign, path: '/uzytkownicy/grupy-prowizyjne' },
      { label: 'Stawki pracowników', icon: DollarSign, path: '/uzytkownicy/stawki' },
      { label: 'Statusy rozliczeń', icon: Settings, path: '/uzytkownicy/statusy-rozliczen' },
    ],
  },
  {
    id: 'flota',
    label: 'Flota',
    icon: Truck,
    children: [
      { label: 'Pojazdy', icon: Truck, path: '/flota' },
      { label: 'Modele pojazdów', icon: Truck, path: '/flota/modele' },
      { label: 'Przejazdy', icon: Truck, path: '/flota/przejazdy' },
      { label: 'Załączniki', icon: Package, path: '/flota/zalaczniki' },
    ],
  },
  {
    id: 'ustawienia',
    label: 'Ustawienia',
    icon: Settings,
    children: [
      { label: 'Ustawienia', icon: Settings, path: '/ustawienia' },
      { label: 'Dodatkowe pola w wydarzeniu', icon: Settings, path: '/ustawienia/dodatkowe-pola' },
      { label: 'Rodzaje wydarzeń', icon: Settings, path: '/ustawienia/rodzaje-wydarzen' },
      { label: 'Typy wydarzeń', icon: Settings, path: '/ustawienia/typy-wydarzen' },
      { label: 'Statusy wydarzeń', icon: Settings, path: '/ustawienia/statusy-wydarzen' },
      { label: 'Dodatkowe statusy wydarzeń', icon: Settings, path: '/ustawienia/dodatkowe-statusy' },
      { label: 'Statusy grup sprzętowych', icon: Settings, path: '/ustawienia/statusy-grup' },
      { label: 'Statusy wypożyczeń', icon: Settings, path: '/ustawienia/statusy-wypozyczen' },
      { label: 'Statusy sprzętu', icon: Settings, path: '/ustawienia/statusy-sprzetu' },
      { label: 'Statusy ofert', icon: Settings, path: '/ustawienia/statusy-ofert' },
      { label: 'Schematy Ofert', icon: ShoppingCart, path: '/ustawienia/schematy-ofert' },
      { label: 'Foldery załączników w sprzęcie', icon: Settings, path: '/ustawienia/foldery-zalacznikow' },
      { label: 'Domyślne harmonogramy', icon: Calendar, path: '/ustawienia/harmonogramy' },
      { label: 'Schematy grup sprzętowych', icon: Settings, path: '/ustawienia/schematy-grup' },
      { label: 'Statusy zadań', icon: Settings, path: '/ustawienia/statusy-zadan' },
      { label: 'Typy zadań', icon: Settings, path: '/ustawienia/typy-zadan' },
    ],
  },
  {
    id: 'oferty',
    label: 'Oferty',
    icon: ShoppingCart,
    children: [
      { label: 'Lista ofert', icon: List, path: '/oferty' },
      { label: 'Nowa oferta', icon: Plus, path: '/oferty/nowa' },
    ],
  },
  {
    id: 'wypozyczenia',
    label: 'Wypożyczenia i konflikty',
    icon: AlertCircle,
    badge: null,
    path: '/wypozyczenia',
  },
  {
    id: 'statystyki',
    label: 'Statystyki',
    icon: BarChart2,
    children: [
      { label: 'Przegląd', icon: BarChart2, path: '/statystyki' },
    ],
  },
  {
    id: 'rozliczenia',
    label: 'Rozliczenia projektów',
    icon: DollarSign,
    path: '/rozliczenia',
  },
]

export default function Sidebar() {
  const { user, notifications } = useApp()
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState({ zadania: false })

  const toggleMenu = (id) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const getBadgeCount = (badgeKey) => {
    if (!badgeKey) return null
    return notifications[badgeKey] ?? null
  }

  const isParentActive = (item) => {
    if (!item.children) return false
    return item.children.some(c => location.pathname.startsWith(c.path))
  }

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-img-wrap">
          <img src="/logo-l8.png" alt="L8 Studio" className="logo-img" />
          <div className="logo-img-glow" />
        </div>
        <div className="logo-text">
          <span className="logo-name">L8 STUDIO</span>
          <span className="logo-sub">EVENT MANAGEMENT</span>
        </div>
      </div>

      {/* User */}
      <div className="sidebar-user">
        <div className="user-avatar">
          <span>{user.initials}</span>
        </div>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-role">
            {user.role}
            <ChevronDown size={11} />
          </span>
        </div>
        <button className="sidebar-add-btn" title="Dodaj nowy">
          <Plus size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const badgeCount = getBadgeCount(item.badge)
          const hasChildren = !!item.children
          const isOpen = openMenus[item.id]
          const parentActive = isParentActive(item)

          if (!hasChildren) {
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'nav-item--active' : ''}`
                }
              >
                <Icon size={15} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                {badgeCount !== null && badgeCount > 0 && (
                  <span className="badge badge-red">{badgeCount}</span>
                )}
                {badgeCount === 0 && (
                  <span className="badge badge-green">0</span>
                )}
              </NavLink>
            )
          }

          return (
            <div key={item.id} className={`nav-group ${parentActive ? 'nav-group--active' : ''}`}>
              <button
                className={`nav-item nav-item--parent ${isOpen || parentActive ? 'nav-item--open' : ''}`}
                onClick={() => toggleMenu(item.id)}
              >
                <Icon size={15} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                {badgeCount !== null && badgeCount > 0 && (
                  <span className="badge badge-red">{badgeCount}</span>
                )}
                {badgeCount === 0 && (
                  <span className="badge badge-green">0</span>
                )}
                <ChevronRight
                  size={13}
                  className={`nav-chevron ${isOpen ? 'nav-chevron--open' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="nav-children">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon
                    return (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `nav-child ${isActive ? 'nav-child--active' : ''}`
                        }
                      >
                        <ChildIcon size={13} className="nav-icon" />
                        <span>{child.label}</span>
                      </NavLink>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
