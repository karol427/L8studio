import { useState, useEffect } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('logo') // logo | loading | done

  useEffect(() => {
    // Phase 1: logo glow (0.9s), then show bar
    const t1 = setTimeout(() => setPhase('loading'), 900)

    // Phase 2: fill bar over ~2.1s
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 3.5 + 1.5
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => setPhase('done'), 350)
        setTimeout(() => onDone(), 700)
      } else {
        setProgress(current)
      }
    }, 55)

    return () => { clearTimeout(t1); clearInterval(interval) }
  }, [onDone])

  const loadingMsg =
    progress < 30 ? 'Inicjalizacja systemu...' :
    progress < 60 ? 'Ładowanie modułów...' :
    progress < 90 ? 'Przygotowywanie interfejsu...' : 'Gotowy!'

  return (
    <div className={`splash ${phase === 'done' ? 'splash--exit' : ''}`}>
      <div className="splash-bg" />
      <div className="splash-scanlines" />
      <div className="splash-grid" />

      <div className="splash-center">
        {/* Logo with glow */}
        <div className={`splash-logo-wrap ${phase === 'logo' ? 'splash-logo-wrap--pulse' : 'splash-logo-wrap--stable'}`}>
          <div className="splash-logo-outer-glow" />
          <img src="/logo-l8.png" alt="L8 Studio" className="splash-logo-img" />
          <div className="splash-logo-inner-glow" />
        </div>

        {/* Title — fades in after logo pulse */}
        <div className={`splash-titles ${phase !== 'logo' ? 'splash-titles--show' : ''}`}>
          <div className="splash-title-l8">L8 STUDIO</div>
          <div className="splash-title-sub">EVENT MANAGEMENT SYSTEM</div>
          <div className="splash-version">v 1.0</div>
        </div>

        {/* Loading bar */}
        <div className={`splash-loader ${phase !== 'logo' ? 'splash-loader--show' : ''}`}>
          <div className="splash-bar-track">
            <div className="splash-bar-fill" style={{ width: `${progress}%` }} />
            <div className="splash-bar-head" style={{ left: `${Math.min(progress, 99.5)}%` }} />
          </div>
          <div className="splash-bar-footer">
            <span className="splash-bar-msg">{loadingMsg}</span>
            <span className="splash-bar-pct">{Math.floor(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Corner HUD decorations */}
      <div className="splash-corner splash-corner--tl" />
      <div className="splash-corner splash-corner--tr" />
      <div className="splash-corner splash-corner--bl" />
      <div className="splash-corner splash-corner--br" />
    </div>
  )
}
