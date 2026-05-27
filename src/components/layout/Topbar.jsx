import { Search, Bell, HelpCircle, Mail, LogOut, Moon, Sun, Menu } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import './Topbar.css'

export default function Topbar({ pageTitle }) {
  const { user, darkMode, toggleDarkMode } = useApp()

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn">
          <Menu size={18} />
        </button>
        <div className="topbar-search">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Wpisz co najmniej 3 znaki, aby wyszukać..."
            className="search-input"
          />
        </div>
        <span className="topbar-breadcrumb">{pageTitle}</span>
      </div>

      <div className="topbar-right">
        <button
          className={`dark-mode-toggle-btn ${darkMode ? 'dark-mode-toggle-btn--dark' : 'dark-mode-toggle-btn--light'}`}
          onClick={toggleDarkMode}
          title={darkMode ? 'Przełącz na Light Mode' : 'Przełącz na Dark Mode'}
        >
          {darkMode ? <Moon size={14} /> : <Sun size={14} />}
          <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        <button className="topbar-icon-btn" title="Instrukcja">
          <HelpCircle size={15} />
          <span>Instrukcja</span>
        </button>

        <button className="topbar-icon-btn" title="Pomoc techniczna">
          <Bell size={15} />
          <span>Pomoc techniczna</span>
        </button>

        <button className="topbar-icon-btn topbar-icon-btn--mail">
          <Mail size={15} />
        </button>

        <button className="topbar-icon-btn topbar-icon-btn--notif">
          <Bell size={15} />
          <span className="notif-dot" />
        </button>

        <div className="topbar-user">
          <span>Witaj, {user.name}</span>
        </div>

        <button className="topbar-icon-btn topbar-logout" title="Wyloguj">
          <LogOut size={14} />
          <span>Wyloguj</span>
        </button>
      </div>
    </header>
  )
}
