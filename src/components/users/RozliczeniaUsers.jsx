import { useState } from 'react'
import { ChevronLeft, ChevronRight, Download, AlertTriangle } from 'lucide-react'
import { ROZLICZENIA_DATA, MONTHS_PL } from './usersData'
import './Rozliczenia.css'

export default function RozliczeniaUsers() {
  const [month, setMonth] = useState(4) // Maj
  const [year, setYear] = useState(2026)
  const [data] = useState(ROZLICZENIA_DATA)

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y=>y-1) } else setMonth(m=>m-1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y=>y+1) } else setMonth(m=>m+1) }

  const fmt = (v) => v > 0 ? `${v.toLocaleString('pl')},00 zł` : '0,00 zł'

  return (
    <div className="roz-wrap animate-in">
      {/* Period nav */}
      <div className="roz-period">
        <button className="roz-nav-btn" onClick={prevMonth}><ChevronLeft size={16} /></button>
        <select value={month} onChange={e => setMonth(+e.target.value)} className="roz-select">
          {MONTHS_PL.map((m,i) => <option key={i} value={i}>{m}</option>)}
        </select>
        <select value={year} onChange={e => setYear(+e.target.value)} className="roz-select">
          {[2024,2025,2026,2027].map(y => <option key={y}>{y}</option>)}
        </select>
        <button className="roz-nav-btn" onClick={nextMonth}><ChevronRight size={16} /></button>

        <div className="roz-filters">
          <input className="roz-search" placeholder="Szukaj..." />
          <div className="roz-date-range">
            <input type="text" defaultValue="2026-04-01" className="roz-date-input" />
            <input type="text" defaultValue="2026-06-01" className="roz-date-input" />
          </div>
          <button className="btn btn-ghost" style={{fontSize:12}}><Download size={13} /> Excel</button>
        </div>
      </div>

      <div className="roz-sub-filters">
        <button className="roz-przelicz-btn">Przelicz rozliczenie</button>
        <select className="roz-select"><option>Pracownik</option><option>Podwykonawca</option></select>
        <select className="roz-select"><option>Wszyscy</option></select>
        <select className="roz-select"><option>Wszyscy</option></select>
      </div>

      {/* Legenda */}
      <div className="roz-legenda">
        <span>LEGENDA</span>
        <div className="roz-legenda-items">
          <span>Statusy:</span>
          <span className="roz-status-pill" style={{background:'#f97316'}}>Oczekujące</span>
          <span className="roz-status-pill" style={{background:'#22c55e'}}>Zaakceptowane</span>
          <span className="roz-status-pill" style={{background:'#ef4444'}}>Odrzucone</span>
          <span style={{marginLeft:16}}>Nakładają się czasy pracy:</span>
          <span className="roz-alert-icon">⚠</span>
          <span style={{marginLeft:16}}>Czasy pracy wykraczające ponad 4h poza planowany harmonogram:</span>
          <span className="roz-alert-icon roz-alert-icon--orange">⚠</span>
          <span style={{marginLeft:16}}>Urlop:</span>
          <span className="roz-status-pill" style={{background:'#6b7280'}}>Wnioski</span>
          <span className="roz-status-pill" style={{background:'#ef4444'}}>Odrzucony</span>
          <span className="roz-status-pill" style={{background:'#22c55e'}}>Zaakceptowany</span>
        </div>
      </div>

      {/* Status indicators */}
      <div className="roz-indicators">
        <div className="roz-indicator roz-indicator--green">Miesiąc rozliczony</div>
        <div className="roz-indicator roz-indicator--blue">Posiada zaplanowane godziny</div>
        <div className="roz-indicator roz-indicator--outline">Miesiąc zamknięty</div>
      </div>

      {/* Table */}
      <div className="roz-table-wrap">
        {data.map(row => (
          <div key={row.id} className={`roz-row ${row.alert ? 'roz-row--alert' : ''}`}>
            <div className="roz-row-header">
              <div className="roz-row-name">
                <a href={`/uzytkownicy/${row.id}`} className="roz-user-link">{row.imie} {row.nazwisko}</a>
                {row.alert && <span className="roz-warn"><AlertTriangle size={13} /></span>}
              </div>
              <div className="roz-row-times">
                <span>Zaplanowane: {row.zaplanowane}</span>
                <span>Dodane: {row.dodane}</span>
              </div>
              {row.pensja > 0 && <span className="roz-pensja-badge">{fmt(row.pensja)}</span>}
            </div>

            <div className="roz-row-cols">
              {['Pensja','Prowizja','Diety','Koszty','Premie','Suma','Suma zaakc.','Brutto','Zapłacono','Pozostało'].map(col => (
                <div key={col} className="roz-col">
                  <div className="roz-col-label">{col}</div>
                  <div className="roz-col-val">
                    {col === 'Suma' && row.sumaZaakc > 0
                      ? <span className="roz-sum-badge">{fmt(row.sumaZaakc)}</span>
                      : <span className={row[col.toLowerCase().replace(' zaakc.','Zaakc').replace(' ','').toLowerCase()] > 0 ? 'roz-val--green' : ''}>
                          {fmt(0)}
                        </span>
                    }
                  </div>
                </div>
              ))}
              <div className="roz-col">
                <div className="roz-col-label">FV</div>
                <div className="roz-col-val">
                  <span className="roz-fv-link">0,00 zł</span><br/>
                  <a href="#" className="roz-fv-action">Dodaj fakturę</a><br/>
                  <a href="#" className="roz-fv-action">Zaznacz fakturę aby powiązać</a>
                </div>
              </div>
              <div className="roz-col">
                <div className="roz-col-label">Urlopy</div>
                <div className="roz-col-val">–</div>
              </div>
              <div className="roz-col">
                <div className="roz-col-label">Notatki</div>
                <div className="roz-col-val"><button className="roz-nota-btn">+ Notatka</button></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
