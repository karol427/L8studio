import { useState, useRef, useEffect } from 'react'
import { Search, Bell, HelpCircle, Mail, LogOut, Moon, Sun, Menu, Palette } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './Topbar.css'

export default function Topbar({ pageTitle }) {
  const { user, darkMode, toggleDarkMode, colorScheme, changeScheme, COLOR_SCHEMES } = useApp()
  const [schemeOpen, setSchemeOpen] = useState(false)
  const schemeRef = useRef(null)

  // Zamknij dropdown po kliknięciu poza
  useEffect(() => {
    const h = (e) => { if (schemeRef.current && !schemeRef.current.contains(e.target)) setSchemeOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const current = COLOR_SCHEMES[colorScheme]

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn"><Menu size={18} /></button>
        <div className="topbar-search">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Wpisz co najmniej 3 znaki, aby wyszukać..." className="search-input" />
        </div>
        <span className="topbar-breadcrumb">{pageTitle}</span>
      </div>

      <div className="topbar-right">

        {/* ── COLOR SCHEME PICKER ── */}
        <div ref={schemeRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setSchemeOpen(o => !o)}
            className="topbar-scheme-btn"
            title="Zmień schemat kolorów"
            style={{ '--accent': `rgb(${COLOR_SCHEMES[colorScheme]?.['--accent-rgb'] || '0,255,65'})` }}
          >
            <Palette size={14} />
            <span className="topbar-scheme-dot" style={{ background: current?.['--green-primary'] }} />
            <span>{current?.label}</span>
          </button>

          {schemeOpen && (
            <div className="topbar-scheme-dropdown">
              <div className="topbar-scheme-title">Schemat kolorów</div>
              {Object.entries(COLOR_SCHEMES).map(([key, s]) => (
                <button
                  key={key}
                  className={`topbar-scheme-item ${colorScheme === key ? 'topbar-scheme-item--active' : ''}`}
                  onClick={() => { changeScheme(key); setSchemeOpen(false) }}
                >
                  <span className="topbar-scheme-swatch" style={{ background: s['--green-primary'] }} />
                  <span>{s.emoji} {s.label}</span>
                  {colorScheme === key && <span style={{ marginLeft: 'auto', fontSize: 12 }}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── DARK/LIGHT MODE ── */}
        <button
          className={`dark-mode-toggle-btn ${darkMode ? 'dark-mode-toggle-btn--dark' : 'dark-mode-toggle-btn--light'}`}
          onClick={toggleDarkMode}
          title={darkMode ? 'Przełącz na Light Mode' : 'Przełącz na Dark Mode'}
        >
          {darkMode ? <Moon size={14} /> : <Sun size={14} />}
          <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        <button className="topbar-icon-btn" title="Instrukcja">
          <HelpCircle size={15} /><span>Instrukcja</span>
        </button>
        <button className="topbar-icon-btn" title="Pomoc techniczna">
          <Bell size={15} /><span>Pomoc techniczna</span>
        </button>
        <button className="topbar-icon-btn topbar-icon-btn--mail"><Mail size={15} /></button>
        <button className="topbar-icon-btn topbar-icon-btn--notif">
          <Bell size={15} /><span className="notif-dot" />
        </button>
        <div className="topbar-user"><span>Witaj, {user.name}</span></div>
        <button className="topbar-icon-btn topbar-logout" title="Wyloguj">
          <LogOut size={14} /><span>Wyloguj</span>
        </button>
      </div>
    </header>
  )
}
