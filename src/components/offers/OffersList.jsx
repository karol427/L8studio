import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Download, Eye, Edit, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { OFERTY_LIST, STATUSY_OFERT_COLORS } from './offersData'
import './Offers.css'

export default function OffersList() {
  const [items, setItems] = useState(OFERTY_LIST)
  const [year, setYear] = useState(2026)
  const [view, setView] = useState('Wszystkie')

  const del = (id, nazwa) => {
    if (window.confirm(`Usunąć ofertę "${nazwa}"?`)) setItems(p => p.filter(i => i.id !== id))
  }

  const totals = items.reduce((acc, i) => ({
    wartosc: acc.wartosc + i.wartosc,
    koszt: acc.koszt + i.koszt,
    zysk: acc.zysk + i.zysk,
  }), { wartosc: 0, koszt: 0, zysk: 0 })

  const fmt = v => v.toLocaleString('pl', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="off-wrap animate-in">
      <div className="off-toolbar">
        <Link to="/oferty/nowa" className="btn btn-primary"><Plus size={13}/> Dodaj</Link>
        <button className="btn btn-ghost"><Download size={13}/> Pobierz zaznaczone</button>
        <button className="btn" style={{background:'#22c55e',color:'#000',fontSize:12,fontWeight:700}}>
          <Calendar size={13}/> Zobacz jak działa kalendarz kosztorysów
        </button>
      </div>

      <div className="off-period">
        <button className="off-nav-btn" onClick={()=>setYear(y=>y-1)}><ChevronLeft size={14}/></button>
        <select value={year} onChange={e=>setYear(+e.target.value)} className="off-select">
          {[2024,2025,2026,2027].map(y=><option key={y}>{y}</option>)}
        </select>
        <select value={view} onChange={e=>setView(e.target.value)} className="off-select">
          <option>Wszystkie</option><option>Moje</option>
        </select>
        <select className="off-select"><option>Data oferty</option></select>
        <input placeholder="Wybierz zakres..." className="off-col-filter" style={{maxWidth:200}} />
        <button className="off-nav-btn"><Calendar size={13}/></button>
        <button className="off-nav-btn"><ChevronRight size={14}/></button>
        <span className="off-suma">Suma</span>
      </div>

      <div className="off-table-wrap">
        <table className="off-table">
          <thead>
            <tr>
              <th style={{width:32}}>#</th>
              <th><input type="checkbox" /></th>
              <th>Nr ↕</th>
              <th>Nr generowany</th>
              <th><div style={{display:'flex',flexDirection:'column',gap:3}}>Status<select className="off-col-filter"><option>Wybierz...</option></select></div></th>
              <th><div style={{display:'flex',flexDirection:'column',gap:3}}>Nazwa<input className="off-col-filter" /></div></th>
              <th><div style={{display:'flex',flexDirection:'column',gap:3}}>Klient<select className="off-col-filter"><option>Wybierz...</option></select></div></th>
              <th>Wartość</th>
              <th>Koszt</th>
              <th>Zysk</th>
              <th><div style={{display:'flex',flexDirection:'column',gap:3}}>Miejsce eventu/dostawy<select className="off-col-filter"><option>Wybierz...</option></select></div></th>
              <th><div style={{display:'flex',flexDirection:'column',gap:3}}>EventManager<select className="off-col-filter"><option>Wybierz...</option></select></div></th>
              <th>Wysłano</th>
              <th>Wydarzenie</th>
              <th>Status wyd.</th>
              <th><div style={{display:'flex',flexDirection:'column',gap:3}}>Data sporządzenia oferty<input className="off-col-filter" placeholder="Data..." /></div></th>
              <th><div style={{display:'flex',flexDirection:'column',gap:3}}>Zaktualizowano<input className="off-col-filter" placeholder="Data..." /></div></th>
              <th><div style={{display:'flex',flexDirection:'column',gap:3}}>Od - do<input className="off-col-filter" placeholder="Wybierz zakres..." /></div></th>
              <th>Duplikuj</th>
              <th style={{width:80}}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id}>
                <td className="off-num">{idx+1}</td>
                <td><input type="checkbox" /></td>
                <td className="off-mono">{item.nr}</td>
                <td className="off-mono">{item.nrGenerowany}</td>
                <td>
                  <span className="off-status" style={{background: STATUSY_OFERT_COLORS[item.status] || '#888'}}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div style={{display:'flex',flexDirection:'column',gap:3}}>
                    <Link to={`/oferty/${item.id}`} className="off-link">{item.nazwa}</Link>
                    {item.notatki > 0 && <button className="off-nota-badge">+ Notatka</button>}
                  </div>
                </td>
                <td><Link to="/kontrahenci" className="off-link">{item.klient}</Link></td>
                <td className="off-mono">{item.wartosc > 0 ? `${fmt(item.wartosc)} zł` : '0,00 zł'}</td>
                <td className="off-mono">{item.koszt > 0 ? `${fmt(item.koszt)} zł` : '0,00 zł'}</td>
                <td className="off-mono">{item.zysk > 0 ? `${fmt(item.zysk)} zł` : '0,00 zł'}</td>
                <td className="off-cell" style={{maxWidth:200,fontSize:11}}>{item.miejsceEventu || '–'}</td>
                <td className="off-cell">{item.eventManager}</td>
                <td className="off-cell">{item.wyslano}</td>
                <td>
                  {item.wydarzenie && item.wydarzenie !== '-'
                    ? <Link to="/wydarzenia" className="off-link" style={{fontSize:11}}>{item.wydarzenie}</Link>
                    : <span className="off-cell">–</span>
                  }
                </td>
                <td>
                  {item.statusWyd && item.statusWyd !== '-'
                    ? <span className="off-status-wd" style={{background:'rgba(239,68,68,0.15)',color:'#ef4444',border:'1px solid rgba(239,68,68,0.3)'}}>{item.statusWyd}</span>
                    : '–'
                  }
                </td>
                <td className="off-mono" style={{fontSize:11}}>{item.dataSporzeadzenia}</td>
                <td className="off-mono" style={{fontSize:11}}>{item.zaktualizowano}</td>
                <td className="off-mono" style={{fontSize:11,whiteSpace:'pre-line'}}>{item.odDo}</td>
                <td>
                  <div className="off-avatar">KL</div>
                </td>
                <td>
                  <div className="off-actions">
                    <Link to={`/oferty/${item.id}`} className="off-act-btn"><Eye size={12}/></Link>
                    <Link to={`/oferty/${item.id}/edytuj`} className="off-act-btn"><Edit size={12}/></Link>
                    <button className="off-act-btn off-act-btn--del" onClick={()=>del(item.id,item.nazwa)}><X size={12}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7}>Wartość: {fmt(totals.wartosc)}</td>
              <td colSpan={2}>Koszt: {fmt(totals.koszt)}</td>
              <td colSpan={2}>Zysk: {fmt(totals.zysk)}</td>
              <td colSpan={9}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
