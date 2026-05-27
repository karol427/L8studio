import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [user] = useState({
    name: 'L8 Studio',
    role: 'Project Manager',
    initials: 'L8',
  })

  const [notifications] = useState({
    tasks: 0,
    serwis: 0,
    eventNetwork: 45,
  })

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('l8-theme') !== 'light'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light')
      localStorage.setItem('l8-theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      localStorage.setItem('l8-theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(d => !d)

  return (
    <AppContext.Provider value={{ user, notifications, sidebarOpen, setSidebarOpen, darkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
