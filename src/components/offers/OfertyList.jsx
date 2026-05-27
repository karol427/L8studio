import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Download, Eye, Edit, X, Copy, Calendar } from 'lucide-react'
import { OFERTY_LIST } from './offersData'
import './Offers.css'

export default function OfertyList() {
  const [oferty, setOferty] = useState(OFERTY_LIST)
  const [filterRok, setFilterRok] = useState('2026')
  const [filterStatus, setFilterStatus] = useState('Wszystkie')

  const deleteOferta = (id, nazwa) => {
    if (window.confirm(`Usunąć ofertę "${nazwa}"?`)) setOferty(p => p.filter(o => o.id !== id))
  }

  const totalWartosc = oferty.reduce((s,o) => s + o.wartosc, 0)
  const totalKoszt = oferty.reduce((s,o) => s + o.koszt, 0)
  const totalZysk = oferty.reduce((s,o) => s + o.zysk, 0)

  return (
    <div className="of-wrap animate-in">
      <div className="of-toolbar">
        <Link to="/oferty/nowa" className="btn btn-primary"><Plus size={13}/> Dodaj</Link>
        <button className="btn btn-ghost"><Download size={13}/> Pobierz zaznaczone</button>
        <button className="btn" style={{background:'#22c55e',color:'#000',fontSize:12,fontWeight:700}}>
          <Calendar size={13}/> Zobacz jak działa kalendarz kosztorysów
        </button>
      </div>

      {/* Filters */}
      <div className="of-filters">
        <button className="of-nav-btn">◀</button>
        <select value={filterRok} onChange={e=>setFilterRok(e.target.value)} className="of-select">
          {['2024','2025','2026','2027'].map(y=><option key={y}>{y}</option>)}
        </select>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="of-select">
          <option>Wszystkie</option><option>Nowa</option><option>Zaakceptowana</option><option>Oferta przegrana</option>
        </select>
        <select className="of-select"><option>Data oferty</option></select>
        <input placeholder="Wybierz zakres..." className="of-date-input" />
        <button className="of-cal-btn">📅</button>
        <button className="of-nav-btn">▶</button>
        <span className="of-suma">Suma</span>
      </div>

      {/* Table */}
      <div className="of-table-wrap">
        <table className="of-table">
          <thead>
            <tr>
              <th style={{width:32}}>#</th>
              <th><input type="checkbox" /></th>
              <th><div className="of-th-col">Nr ↕<input className="of-col-filter" /></div></th>
              <th><div className="of-th-col">Nr generowany<input className="of-col-filter" /></div></th>
              <th><div className="of-th-col">Status<select className="of-col-filter"><option>Wybierz...</option></select></div></th>
              <th><div className="of-th-col">Nazwa<input className="of-col-filter" /></div></th>
              <th><div className="of-th-col">Klient<select className="of-col-filter"><option>Wybierz...</option></select></div></th>
              <th>Wartość</th>
              <th>Koszt</th>
              <th>Zysk</th>
              <th><div className="of-th-col">Miejsce eventu/dostawy<select className="of-col-filter"><option>Wybierz...</option></select></div></th>
              <th><div className="of-th-col">EventManager<select className="of-col-filter"><option>Wybierz...</option></select></div></th>
              <th>Wysłano</th>
              <th>Wydarzenie</th>
              <th>Status wyd.</th>
              <th><div className="of-th-col">Data sporządzenia oferty ↕<input className="of-col-filter" placeholder="Data..." /></div></th>
              <th><div className="of-th-col">Zaktualizowano<input className="of-col-filter" placeholder="Data..." /></div></th>
              <th><div className="of-th-col">Od - do<input className="of-col-filter" placeholder="Wybierz zakres..." /></div></th>
              <th>Duplikuj</th>
              <th style={{width:80}}></th>
            </tr>
          </thead>
          <tbody>
            {oferty.map((o, idx) => (
              <tr key={o.id}>
                <td className="of-num">{idx+1}</td>
                <td><input type="checkbox" /></td>
                <td className="of-cell of-mono">{o.nr}</td>
                <td className="of-cell of-mono">{o.nrGenerowany}</td>
                <td>
                  <div style={{display:'flex',flexDirection:'column',gap:3,alignItems:'flex-start'}}>
                    <span className="of-status-badge" style={{background:'#22c55e'}}>{o.status}</span>
                    {o.notatka && <button className="of-nota-btn">+ Notatka</button>}
                    <button className="of-nota-btn">+ Notatka</button>
                  </div>
                </td>
                <td><Link to={`/oferty/${o.id}`} className="of-link">{o.nazwa}</Link></td>
                <td><Link to="/kontrahenci" className="of-link">{o.klient}</Link></td>
                <td className="of-cell of-mono">{o.wartosc.toLocaleString('pl',{minimumFractionDigits:2})} zł</td>
                <td className="of-cell of-mono">{o.koszt.toLocaleString('pl',{minimumFractionDigits:2})} zł</td>
                <td className="of-cell of-mono">{o.zysk.toLocaleString('pl',{minimumFractionDigits:2})} zł</td>
                <td className="of-cell" style={{fontSize:11.5}}>{o.miejsce || '–'}</td>
                <td className="of-cell">{o.eventManager}</td>
                <td className="of-cell">–</td>
                <td>
                  {o.wydarzenie
                    ? <Link to="/wydarzenia" className="of-link">{o.wydarzenie}</Link>
                    : <span className="of-cell">–</span>
                  }
                </td>
                <td>
                  {o.statusWyd
                    ? <span className="of-status-badge" style={{background:'#ef4444'}}>{o.statusWyd}</span>
                    : <span className="of-cell">–</span>
                  }
                </td>
                <td className="of-cell of-mono" style={{fontSize:11}}>{o.dataSporzeadzenia}</td>
                <td className="of-cell of-mono" style={{fontSize:11}}>{o.zaktualizowano}</td>
                <td className="of-cell" style={{fontSize:11}}>
                  {o.od && <>{o.od}<br/>{o.do}</>}
                  {!o.od && '–'}
                </td>
                <td>
                  <button className="of-dup-btn" title="Duplikuj">
                    <div className="of-dup-icon">⊕</div>
                  </button>
                </td>
                <td>
                  <div className="of-actions">
                    <Link to={`/oferty/${o.id}`} className="of-act-btn"><Eye size={12}/></Link>
                    <Link to={`/oferty/${o.id}/edytuj`} className="of-act-btn"><Edit size={12}/></Link>
                    <button className="of-act-btn of-act-btn--del" onClick={()=>deleteOferta(o.id,o.nazwa)}><X size={12}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="of-total-row">
              <td colSpan={7}>Wartość: {totalWartosc.toLocaleString('pl',{minimumFractionDigits:2})}</td>
              <td colSpan={2}>Koszt: {totalKoszt.toLocaleString('pl',{minimumFractionDigits:2})}</td>
              <td>Zysk: {totalZysk.toLocaleString('pl',{minimumFractionDigits:2})}</td>
              <td colSpan={10}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
