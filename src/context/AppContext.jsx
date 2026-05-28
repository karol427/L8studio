import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

// Każdy schemat nadpisuje WSZYSTKIE zmienne zależne od koloru akcentu
export const COLOR_SCHEMES = {
  'neon-green': {
    label: 'Neon Green', emoji: '🟢',
    vars: {
      '--green-primary':       '#00ff41',
      '--green-dim':           '#00cc33',
      '--green-dark':          '#003310',
      '--green-glow':          'rgba(0,255,65,0.15)',
      '--green-border':        'rgba(0,255,65,0.25)',
      '--green-border-strong': 'rgba(0,255,65,0.5)',
      '--text-accent':         '#00ff41',
      '--text-secondary':      '#7aab7a',
      '--text-muted':          '#3d6b3d',
      '--border-default':      'rgba(0,255,65,0.12)',
      '--border-strong':       'rgba(0,255,65,0.3)',
      '--bg-hover':            '#0f1f0f',
      '--bg-active':           '#122012',
      '--shadow-green':        '0 0 20px rgba(0,255,65,0.08)',
      '--bg-primary':          '#050a05',
      '--bg-secondary':        '#080f08',
      '--bg-card':             '#0c150c',
      '--bg-sidebar':          '#060c06',
    }
  },
  'neon-orange': {
    label: 'Neon Orange', emoji: '🟠',
    vars: {
      '--green-primary':       '#ff8c00',
      '--green-dim':           '#cc7000',
      '--green-dark':          '#1a0800',
      '--green-glow':          'rgba(255,140,0,0.15)',
      '--green-border':        'rgba(255,140,0,0.25)',
      '--green-border-strong': 'rgba(255,140,0,0.5)',
      '--text-accent':         '#ff8c00',
      '--text-secondary':      '#aa7a40',
      '--text-muted':          '#6b4a20',
      '--border-default':      'rgba(255,140,0,0.12)',
      '--border-strong':       'rgba(255,140,0,0.3)',
      '--bg-hover':            '#1a0d00',
      '--bg-active':           '#221200',
      '--shadow-green':        '0 0 20px rgba(255,140,0,0.08)',
      '--bg-primary':          '#0a0500',
      '--bg-secondary':        '#0f0800',
      '--bg-card':             '#150c00',
      '--bg-sidebar':          '#0c0600',
    }
  },
  'neon-pink': {
    label: 'Neon Pink', emoji: '🩷',
    vars: {
      '--green-primary':       '#ff2d78',
      '--green-dim':           '#cc1a5a',
      '--green-dark':          '#1a0010',
      '--green-glow':          'rgba(255,45,120,0.15)',
      '--green-border':        'rgba(255,45,120,0.25)',
      '--green-border-strong': 'rgba(255,45,120,0.5)',
      '--text-accent':         '#ff2d78',
      '--text-secondary':      '#aa5070',
      '--text-muted':          '#6b2040',
      '--border-default':      'rgba(255,45,120,0.12)',
      '--border-strong':       'rgba(255,45,120,0.3)',
      '--bg-hover':            '#1a0010',
      '--bg-active':           '#220015',
      '--shadow-green':        '0 0 20px rgba(255,45,120,0.08)',
      '--bg-primary':          '#09000a',
      '--bg-secondary':        '#0f000f',
      '--bg-card':             '#150015',
      '--bg-sidebar':          '#0c000c',
    }
  },
  'neon-cyan': {
    label: 'Neon Cyan', emoji: '🔵',
    vars: {
      '--green-primary':       '#00d4ff',
      '--green-dim':           '#00aacc',
      '--green-dark':          '#001a20',
      '--green-glow':          'rgba(0,212,255,0.15)',
      '--green-border':        'rgba(0,212,255,0.25)',
      '--green-border-strong': 'rgba(0,212,255,0.5)',
      '--text-accent':         '#00d4ff',
      '--text-secondary':      '#40aacc',
      '--text-muted':          '#206b80',
      '--border-default':      'rgba(0,212,255,0.12)',
      '--border-strong':       'rgba(0,212,255,0.3)',
      '--bg-hover':            '#001a20',
      '--bg-active':           '#002030',
      '--shadow-green':        '0 0 20px rgba(0,212,255,0.08)',
      '--bg-primary':          '#000a0f',
      '--bg-secondary':        '#000f14',
      '--bg-card':             '#00151c',
      '--bg-sidebar':          '#000c10',
    }
  },
  'neon-purple': {
    label: 'Neon Purple', emoji: '🟣',
    vars: {
      '--green-primary':       '#bf5fff',
      '--green-dim':           '#9933cc',
      '--green-dark':          '#150020',
      '--green-glow':          'rgba(191,95,255,0.15)',
      '--green-border':        'rgba(191,95,255,0.25)',
      '--green-border-strong': 'rgba(191,95,255,0.5)',
      '--text-accent':         '#bf5fff',
      '--text-secondary':      '#9060aa',
      '--text-muted':          '#603080',
      '--border-default':      'rgba(191,95,255,0.12)',
      '--border-strong':       'rgba(191,95,255,0.3)',
      '--bg-hover':            '#150020',
      '--bg-active':           '#1f0030',
      '--shadow-green':        '0 0 20px rgba(191,95,255,0.08)',
      '--bg-primary':          '#090010',
      '--bg-secondary':        '#0f0018',
      '--bg-card':             '#150020',
      '--bg-sidebar':          '#0c0015',
    }
  },
}

function applyScheme(key) {
  const scheme = COLOR_SCHEMES[key]
  if (!scheme) return
  const root = document.documentElement
  // Usuń light mode przy zmianie schematu (schematy są dark)
  Object.entries(scheme.vars).forEach(([k, v]) => {
    root.style.setProperty(k, v)
  })
}

export const AppProvider = ({ children }) => {
  const [user] = useState({
    name: 'L8 Studio',
    role: 'Project Manager',
    initials: 'L8',
  })

  const [notifications] = useState({
    tasks: 0, serwis: 0, eventNetwork: 45,
  })

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('l8-theme') !== 'light'
  })

  const [colorScheme, setColorScheme] = useState(() => {
    return localStorage.getItem('l8-color-scheme') || 'neon-green'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light')
      localStorage.setItem('l8-theme', 'dark')
      // Przywróć schemat kolorów po przełączeniu z light
      applyScheme(colorScheme)
    } else {
      document.documentElement.classList.add('light')
      localStorage.setItem('l8-theme', 'light')
      // W light mode wyczyść niestandardowe zmienne — globals.css przejmuje
      const root = document.documentElement
      const scheme = COLOR_SCHEMES[colorScheme]
      if (scheme) {
        Object.keys(scheme.vars).forEach(k => root.style.removeProperty(k))
      }
    }
  }, [darkMode, colorScheme])

  useEffect(() => {
    localStorage.setItem('l8-color-scheme', colorScheme)
    if (darkMode) applyScheme(colorScheme)
  }, [colorScheme, darkMode])

  const toggleDarkMode = () => setDarkMode(d => !d)
  const changeScheme   = (key) => setColorScheme(key)

  return (
    <AppContext.Provider value={{
      user, notifications, sidebarOpen, setSidebarOpen,
      darkMode, toggleDarkMode,
      colorScheme, changeScheme, COLOR_SCHEMES,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
