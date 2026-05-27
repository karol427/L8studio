import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Download, Send, MoveRight, Eye, Edit, X, Filter, SortDesc } from 'lucide-react'
import { EVENTS_LIST, MONTHS_PL } from './eventsData'
import './EventsList.css'

const YEARS = [2024, 2025, 2026, 2027]

export default function EventsList() {
  const [selected, setSelected] = useState([])
  const [filterYear, setFilterYear] = useState(2026)
  const [filterMonth, setFilterMonth] = useState(4)
  const [events, setEvents] = useState(EVENTS_LIST)
  const [filterName, setFilterName] = useState('')

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }
  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map(e => e.id))
  }

  const deleteEvent = (id, name) => {
    if (window.confirm(`Czy na pewno chcesz usunąć wydarzenie:\n"${name}"?`)) {
      setEvents(prev => prev.filter(e => e.id !== id))
      setSelected(prev => prev.filter(x => x !== id))
    }
  }

  const filtered = events.filter(ev =>
    filterName === '' || ev.name.toLowerCase().includes(filterName.toLowerCase())
  )

  return (
    <div className="events-list animate-in">
      {/* Toolbar */}
      <div className="el-toolbar">
        <div className="el-toolbar-left">
          <Link to="/wydarzenia/nowe" className="btn btn-primary">
            <Plus size={14} /> Dodaj
          </Link>
          <button className="btn btn-ghost">
            <Download size={13} /> Raport .xls - finanse
          </button>
          <button className="btn btn-ghost">
            <Download size={13} /> Raport .xls - pracownicy
          </button>
          <button className="btn btn-ghost">
            <Send size={13} /> Wyślij wszystkie powiadomienia
          </button>
          <button className="btn btn-ghost">
            <MoveRight size={13} /> Przenieś sprzęt
          </button>
        </div>
        <div className="el-toolbar-right">
          <span className="el-suma">Suma</span>
        </div>
      </div>

      {/* Period filter */}
      <div className="el-period-bar">
        <span className="el-period-label">Wybierz okres:</span>
        <div className="el-period-value">
          {filterYear}-{String(filterMonth+1).padStart(2,'0')}-01 00:00:00 – {filterYear}-{String(filterMonth+1).padStart(2,'0')}-31 23:59:59
        </div>
        <div className="el-period-right">
          <select value={filterYear} onChange={e => setFilterYear(+e.target.value)} className="el-select">
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
          <select value={filterMonth} onChange={e => setFilterMonth(+e.target.value)} className="el-select">
            {MONTHS_PL.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
          <button className="el-icon-btn"><Filter size={14} /></button>
          <button className="el-icon-btn"><SortDesc size={14} /></button>
        </div>
      </div>

      {/* Table */}
      <div className="el-table-wrap">
        <table className="el-table">
          <thead>
            <tr>
              <th style={{width:32}}>
                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} />
              </th>
              <th style={{width:36}}>#</th>
              <th>
                <div className="el-th-filter">
                  Wydarzenie
                  <input
                    placeholder=""
                    className="el-col-filter"
                    value={filterName}
                    onChange={e => setFilterName(e.target.value)}
                  />
                </div>
              </th>
              <th>
                <div className="el-th-filter">
                  Klient
                  <select className="el-col-filter"><option>Wybierz...</option></select>
                </div>
              </th>
              <th>
                <div className="el-th-filter">
                  EventManager
                  <select className="el-col-filter"><option>Wybierz...</option></select>
                </div>
              </th>
              <th>
                <div className="el-th-filter">
                  Od - do ↕
                  <input placeholder="" className="el-col-filter" />
                </div>
              </th>
              <th>
                <div className="el-th-filter">
                  Data księgowania
                  <select className="el-col-filter"><option>Wybierz...</option></select>
                </div>
              </th>
              <th>Dodano</th>
              <th style={{width:90}}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={9} style={{textAlign:'center', padding:'24px', color:'var(--text-muted)', fontStyle:'italic'}}>Brak wyników.</td></tr>
            )}
            {filtered.map((ev, idx) => (
              <tr key={ev.id} className={selected.includes(ev.id) ? 'el-row--selected' : ''}>
                <td>
                  <input type="checkbox" checked={selected.includes(ev.id)} onChange={() => toggleSelect(ev.id)} />
                </td>
                <td className="el-num">{idx + 1}</td>
                <td>
                  <div className="el-name-cell">
                    <Link to={`/wydarzenia/${ev.id}`} className="el-event-link">
                      {ev.name} <span className="el-code">[{ev.code}]</span>
                    </Link>
                    <div className="el-badges">
                      {ev.notes > 0 && <span className="el-badge el-badge--note">🗒{ev.notes}</span>}
                      <button className="el-badge el-badge--add">+Notatka</button>
                      <button className="el-badge el-badge--add">+Duplikuj</button>
                    </div>
                  </div>
                </td>
                <td>
                  <Link to="/kontrahenci" className="el-client-link">{ev.client}</Link>
                </td>
                <td className="el-manager">{ev.eventManager}</td>
                <td className="el-dates">
                  <span className="el-date-from">Od: {ev.dateFrom}</span><br/>
                  <span className="el-date-to">Do: {ev.dateTo}</span>
                </td>
                <td className="el-booked">–</td>
                <td className="el-added">{ev.dateBooked}</td>
                <td>
                  <div className="el-actions">
                    <Link to={`/wydarzenia/${ev.id}`} className="el-act-btn" title="Podgląd"><Eye size={14} /></Link>
                    <Link to={`/wydarzenia/${ev.id}/edytuj`} className="el-act-btn" title="Edytuj"><Edit size={14} /></Link>
                    <button
                      className="el-act-btn el-act-btn--del"
                      title="Usuń"
                      onClick={() => deleteEvent(ev.id, ev.name)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
