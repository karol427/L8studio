import { useState, useRef, useEffect } from 'react'
import { Calendar, X } from 'lucide-react'
import './DateTimePicker.css'

const DAYS_PL = ['Pon', 'Wt', 'Śr', 'Czw', 'Piąt', 'Sob', 'Nd']
const MONTHS_PL = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Październik','Listopad','Grudzień']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year, month) {
  let d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

export default function DateTimePicker({ value, onChange, placeholder = 'Wybierz datę...' }) {
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [fromDate, setFromDate] = useState(value?.from || null)
  const [toDate, setToDate] = useState(value?.to || null)
  const [fromHour, setFromHour] = useState('0')
  const [fromMin, setFromMin] = useState('00')
  const [toHour, setToHour] = useState('23')
  const [toMin, setToMin] = useState('59')
  const ref = useRef()

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const formatDate = (d, h, m) => {
    if (!d) return ''
    return `${d} ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`
  }

  const displayValue = fromDate
    ? `${formatDate(fromDate, fromHour, fromMin)} - ${formatDate(toDate || fromDate, toHour, toMin)}`
    : ''

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const handleDayClick = (day) => {
    const dateStr = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    if (!fromDate || (fromDate && toDate)) {
      setFromDate(dateStr); setToDate(null)
    } else {
      if (dateStr < fromDate) { setToDate(fromDate); setFromDate(dateStr) }
      else setToDate(dateStr)
    }
  }

  const handleOk = () => {
    const from = formatDate(fromDate, fromHour, fromMin)
    const to = formatDate(toDate || fromDate, toHour, toMin)
    onChange?.({ from, to, display: `${from} - ${to}` })
    setOpen(false)
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`

  const isInRange = (day) => {
    if (!fromDate || !toDate || !day) return false
    const s = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    return s > fromDate && s < toDate
  }
  const isFrom = (day) => {
    if (!day) return false
    return `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}` === fromDate
  }
  const isTo = (day) => {
    if (!day) return false
    return `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}` === toDate
  }

  const hours = Array.from({length:24},(_,i)=>String(i))
  const mins = ['00','15','30','45']

  return (
    <div className="dtp-wrapper" ref={ref}>
      <div className="dtp-input-row">
        <button className="dtp-cal-btn" onClick={() => setOpen(!open)} type="button">
          <Calendar size={14} />
        </button>
        <button className="dtp-clear-btn" onClick={() => { setFromDate(null); setToDate(null); onChange?.(null) }} type="button">
          <X size={12} />
        </button>
        <input
          readOnly
          value={displayValue}
          placeholder={placeholder}
          className="dtp-input"
          onClick={() => setOpen(!open)}
        />
      </div>

      {open && (
        <div className="dtp-popover">
          <div className="dtp-left">
            <div className="dtp-nav">
              <button onClick={prevMonth} type="button">‹</button>
              <span>{MONTHS_PL[viewMonth]} {viewYear}</span>
              <button onClick={nextMonth} type="button">›</button>
            </div>
            <div className="dtp-grid">
              {DAYS_PL.map(d => <div key={d} className="dtp-day-name">{d}</div>)}
              {cells.map((day, i) => (
                <div
                  key={i}
                  className={[
                    'dtp-day',
                    !day ? 'dtp-day--empty' : '',
                    day && isFrom(day) ? 'dtp-day--from' : '',
                    day && isTo(day) ? 'dtp-day--to' : '',
                    day && isInRange(day) ? 'dtp-day--range' : '',
                    day && `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}` === todayStr ? 'dtp-day--today' : '',
                  ].join(' ')}
                  onClick={() => day && handleDayClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          <div className="dtp-right">
            <div className="dtp-time-block">
              <div className="dtp-time-label">
                <Calendar size={12} />
                <span>{fromDate || '----'} {String(fromHour).padStart(2,'0')}:{fromMin}</span>
              </div>
              <div className="dtp-time-row">
                <span>🕐</span>
                <select value={fromHour} onChange={e => setFromHour(e.target.value)}>
                  {hours.map(h => <option key={h}>{h}</option>)}
                </select>
                <span>:</span>
                <select value={fromMin} onChange={e => setFromMin(e.target.value)}>
                  {mins.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="dtp-time-block">
              <div className="dtp-time-label">
                <Calendar size={12} />
                <span>{toDate || fromDate || '----'} {String(toHour).padStart(2,'0')}:{toMin}</span>
              </div>
              <div className="dtp-time-row">
                <span>🕐</span>
                <select value={toHour} onChange={e => setToHour(e.target.value)}>
                  {hours.map(h => <option key={h}>{h}</option>)}
                </select>
                <span>:</span>
                <select value={toMin} onChange={e => setToMin(e.target.value)}>
                  {mins.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="dtp-actions">
              <button className="dtp-ok" onClick={handleOk} type="button">Ok</button>
              <button className="dtp-cancel" onClick={() => setOpen(false)} type="button">Anuluj</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
