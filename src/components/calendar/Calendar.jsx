import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Calendar as CalIcon, User, List, LayoutGrid, RefreshCw } from 'lucide-react'
import {
  CALENDAR_EVENTS, MONTHS_PL, DAYS_SHORT,
  getDaysInMonth, getFirstDayOfWeek, parseDate, dateToStr
} from './calendarData'
import './Calendar.css'
import SyncModal from './SyncModal'

const STATUS_COLORS = {
  'Niepotwierdzony': '#f59e0b',
  'Potwierdzony': '#22c55e',
  'Gotowy do zafakturowania': '#3b82f6',
  'Faktura wystawiona': '#8b5cf6',
  'Zamknięty': '#6b7280',
  'Anulowana Impreza': '#ef4444',
}

export default function CalendarView() {
  const today = new Date()
  const navigate = useNavigate()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMode, setViewMode] = useState('month')
  const [activeTab, setActiveTab] = useState('calendar')
  const [tooltip, setTooltip] = useState(null)
  const [clickTimer, setClickTimer] = useState(null)
  const [showSync, setShowSync] = useState(false)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }
  const goToday = () => { setViewMonth(today.getMonth()); setViewYear(today.getFullYear()) }

  // Single click = tooltip, double click = navigate to event
  const handleBarClick = (e, event) => {
    e.stopPropagation()
    if (clickTimer) {
      // Double click
      clearTimeout(clickTimer)
      setClickTimer(null)
      setTooltip(null)
      if (event.type === 'event' && event.id) {
        navigate(`/wydarzenia/${event.id}`)
      }
    } else {
      // Single click — show tooltip, wait for possible second click
      const timer = setTimeout(() => {
        setTooltip(event)
        setClickTimer(null)
      }, 220)
      setClickTimer(timer)
    }
  }

  // Build weeks
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth)
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const prevMonthDays = getDaysInMonth(viewYear, viewMonth === 0 ? 11 : viewMonth - 1)
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7

  const allDays = []
  for (let i = 0; i < totalCells; i++) {
    if (i < firstDay) {
      const d = prevMonthDays - firstDay + i + 1
      const m = viewMonth === 0 ? 11 : viewMonth - 1
      const y = viewMonth === 0 ? viewYear - 1 : viewYear
      allDays.push({ day: d, month: m, year: y, current: false })
    } else if (i < firstDay + daysInMonth) {
      allDays.push({ day: i - firstDay + 1, month: viewMonth, year: viewYear, current: true })
    } else {
      const d = i - firstDay - daysInMonth + 1
      const m = viewMonth === 11 ? 0 : viewMonth + 1
      const y = viewMonth === 11 ? viewYear + 1 : viewYear
      allDays.push({ day: d, month: m, year: y, current: false })
    }
  }

  const weeks = []
  for (let i = 0; i < allDays.length; i += 7) weeks.push(allDays.slice(i, i + 7))

  const getWeekBars = (week) => {
    const weekStart = `${week[0].year}-${String(week[0].month+1).padStart(2,'0')}-${String(week[0].day).padStart(2,'0')}`
    const weekEnd = `${week[6].year}-${String(week[6].month+1).padStart(2,'0')}-${String(week[6].day).padStart(2,'0')}`
    const bars = []
    const seen = new Set()

    CALENDAR_EVENTS.forEach(ev => {
      const processBar = (uid, label, dateFrom, dateTo, color, textColor) => {
        if (seen.has(uid)) return
        const evFrom = parseDate(dateFrom)
        const evTo = parseDate(dateTo)
        const wFrom = parseDate(weekStart)
        const wTo = parseDate(weekEnd)
        if (!evFrom || !evTo || evTo < wFrom || evFrom > wTo) return
        seen.add(uid)

        const startCol = evFrom <= wFrom ? 1 : Math.round((evFrom - wFrom) / 86400000) + 1
        const endCol = evTo >= wTo ? 7 : Math.round((evTo - wFrom) / 86400000) + 1
        const spanCols = Math.max(1, endCol - startCol + 1)

        bars.push({ uid, label, color, textColor, startCol, spanCols, event: ev })
      }

      if (ev.type === 'event' && ev.stages) {
        ev.stages.forEach((stage, si) => {
          processBar(
            `${ev.id}-stage-${si}`,
            `${ev.name} [${ev.code}]`,
            stage.dateFrom, stage.dateTo,
            stage.color, '#fff'
          )
        })
      } else {
        processBar(ev.id, ev.name, ev.dateFrom, ev.dateTo, ev.color || '#22c55e', ev.textColor || '#fff')
      }
    })

    return bars
  }

  const todayStr = dateToStr(today)

  return (
    <div className="cal-wrap animate-in" onClick={() => setTooltip(null)}>

      {/* Sync */}
      <div className="cal-sync-row">
        <button className="cal-sync-btn" onClick={() => setShowSync(true)}>
          <RefreshCw size={13} /> Synchronizuj z kalendarzami zewnętrznymi
          <span className="cal-sync-badge">31</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="cal-toolbar">
        <div className="cal-tabs">
          <button className={`cal-tab-btn ${activeTab==='calendar' ? 'cal-tab-btn--active' : ''}`} onClick={() => setActiveTab('calendar')}>
            <CalIcon size={13} /> Kalendarz
          </button>
          <button className={`cal-tab-btn cal-tab-btn--blue ${activeTab==='terminarz' ? 'cal-tab-btn--active' : ''}`} onClick={() => setActiveTab('terminarz')}>
            <User size={13} /> Twój terminarz
          </button>
          <button className={`cal-tab-btn cal-tab-btn--teal ${activeTab==='zadania' ? 'cal-tab-btn--active' : ''}`} onClick={() => setActiveTab('zadania')}>
            <List size={13} /> Zadania
          </button>
          <button className={`cal-tab-btn cal-tab-btn--pink ${activeTab==='plan' ? 'cal-tab-btn--active' : ''}`} onClick={() => setActiveTab('plan')}>
            <LayoutGrid size={13} /> Plan zadań
          </button>
        </div>

        <div className="cal-nav">
          <select value={viewMonth} onChange={e => setViewMonth(+e.target.value)} className="cal-select">
            {MONTHS_PL.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
          <select value={viewYear} onChange={e => setViewYear(+e.target.value)} className="cal-select">
            {[2024,2025,2026,2027,2028].map(y => <option key={y}>{y}</option>)}
          </select>
          <button className="cal-filter-btn">Pokaż/ukryj filtry</button>
        </div>

        <div className="cal-view-switcher">
          <button className="cal-nav-arrow" onClick={prevMonth}><ChevronLeft size={16} /></button>
          <button className="cal-view-btn" onClick={goToday}>Dziś</button>
          <button className={`cal-view-btn ${viewMode==='month' ? 'cal-view-btn--active' : ''}`} onClick={() => setViewMode('month')}>Miesiąc</button>
          <button className={`cal-view-btn ${viewMode==='7days' ? 'cal-view-btn--active' : ''}`} onClick={() => setViewMode('7days')}>7 dni</button>
          <button className={`cal-view-btn ${viewMode==='30days' ? 'cal-view-btn--active' : ''}`} onClick={() => setViewMode('30days')}>30 dni</button>
          <button className="cal-nav-arrow" onClick={nextMonth}><ChevronRight size={16} /></button>
        </div>
      </div>

      {/* Grid */}
      <div className="cal-grid-wrap">
        <div className="cal-day-headers">
          {DAYS_SHORT.map(d => <div key={d} className="cal-day-header">{d}</div>)}
        </div>

        <div className="cal-weeks">
          {weeks.map((week, wi) => {
            const bars = getWeekBars(week)
            return (
              <div key={wi} className="cal-week-row">
                <div className="cal-week-days">
                  {week.map((dayObj, di) => {
                    const ds = `${dayObj.year}-${String(dayObj.month+1).padStart(2,'0')}-${String(dayObj.day).padStart(2,'0')}`
                    return (
                      <div key={di} className={[
                        'cal-day-cell',
                        !dayObj.current ? 'cal-day-cell--other' : '',
                        ds === todayStr ? 'cal-day-cell--today' : '',
                        di >= 5 ? 'cal-day-cell--weekend' : '',
                      ].join(' ')}>
                        <span className="cal-day-num">{dayObj.day}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="cal-week-bars">
                  {bars.map((bar) => (
                    <div
                      key={bar.uid}
                      className="cal-bar"
                      style={{
                        gridColumn: `${bar.startCol} / span ${bar.spanCols}`,
                        background: bar.color,
                        color: bar.textColor,
                      }}
                      onClick={(e) => handleBarClick(e, bar.event)}
                      title="Kliknij raz — info | Kliknij dwa razy — otwórz wydarzenie"
                    >
                      <span className="cal-bar-text">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showSync && <SyncModal onClose={() => setShowSync(false)} />}

      {/* Tooltip */}
      {tooltip && (
        <div className="cal-tooltip-overlay" onClick={() => setTooltip(null)}>
          <div className="cal-tooltip" onClick={e => e.stopPropagation()}>
            <div className="cal-tooltip-title">{tooltip.name}</div>
            {tooltip.type === 'event' && <>
              <div><strong>{tooltip.name}</strong> (ID: {tooltip.code})</div>
              <div>Manager: {tooltip.manager}</div>
              <div>Termin: {tooltip.dateFrom} – {tooltip.dateTo}</div>
              <div>Klient: {tooltip.client}</div>
              {tooltip.status && (
                <div className="cal-tooltip-status-row">
                  Status:
                  <span className="cal-status-pill" style={{ background: STATUS_COLORS[tooltip.status] || '#888' }}>
                    {tooltip.status}
                  </span>
                </div>
              )}
              <div className="cal-tooltip-hint">⚡ Kliknij dwa razy aby otworzyć</div>
            </>}
            {tooltip.type !== 'event' && (
              <div>{tooltip.dateFrom} – {tooltip.dateTo}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
