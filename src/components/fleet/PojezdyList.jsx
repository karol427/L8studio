import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, Edit, X, Wrench } from 'lucide-react'
import { POJAZDY, STATUSY_POJAZDOW } from './fleetData'
import './Fleet.css'

export default function PojezdyList() {
  const [items, setItems] = useState(POJAZDY)
  const [filters, setFilters] = useState({ nazwa: '', opis: '', nrRej: '', nrVin: '', typ: '', status: '' })
  const setF = (k, v) => setFilters(f => ({ ...f, [k]: v }))

  const filtered = items.filter(i =>
    (!filters.nazwa || i.nazwa.toLowerCase().includes(filters.nazwa.toLowerCase())) &&
    (!filters.nrRej || i.nrRej.toLowerCase().includes(filters.nrRej.toLowerCase())) &&
    (!filters.nrVin || i.nrVin.toLowerCase().includes(filters.nrVin.toLowerCase())) &&
    (!filters.typ || i.typ === filters.typ) &&
    (!filters.status || i.status === filters.status)
  )

  const deleteItem = (id, nazwa) => {
    if (window.confirm(`Usunąć pojazd "${nazwa}"?`)) setItems(p => p.filter(i => i.id !== id))
  }

  return (
    <div className="fl-wrap animate-in">
      <div className="fl-toolbar">
        <Link to="/flota/nowy" className="btn btn-primary"><Plus size={13} /> Dodaj</Link>
        <button className="btn btn-ghost"><Wrench size={13} /> Zgłoszenia</button>
        <button className="btn" style={{background:'#22c55e',color:'#000',fontSize:12,fontWeight:700}}>
          Zobacz jak zgłosić usterkę
        </button>
      </div>

      <div className="fl-table-wrap">
        <table className="fl-table">
          <thead>
            <tr>
              <th style={{width:36}}>#</th>
              <th style={{width:60}}>Zdjęcie</th>
              <th><div className="fl-th-col">Nazwa<input className="fl-col-filter" value={filters.nazwa} onChange={e=>setF('nazwa',e.target.value)} /></div></th>
              <th><div className="fl-th-col">Opis<input className="fl-col-filter" value={filters.opis} onChange={e=>setF('opis',e.target.value)} /></div></th>
              <th><div className="fl-th-col">Numer rejestracyjny<input className="fl-col-filter" value={filters.nrRej} onChange={e=>setF('nrRej',e.target.value)} /></div></th>
              <th><div className="fl-th-col">Numer VIN<input className="fl-col-filter" value={filters.nrVin} onChange={e=>setF('nrVin',e.target.value)} /></div></th>
              <th>
                <div className="fl-th-col">Typ
                  <select className="fl-col-filter" value={filters.typ} onChange={e=>setF('typ',e.target.value)}>
                    <option value=""></option>
                    {['Firmowy','Wynajęty','Prywatny'].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </th>
              <th>Data przeglądu</th>
              <th>OC ważne do</th>
              <th>
                <div className="fl-th-col">Status
                  <select className="fl-col-filter" value={filters.status} onChange={e=>setF('status',e.target.value)}>
                    <option value=""></option>
                    {STATUSY_POJAZDOW.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
              </th>
              <th>Przebieg</th>
              <th>Przypomnienie sms</th>
              <th>Przypomnienie mailowe</th>
              <th>Najbliższe wydarzenia</th>
              <th style={{width:90}}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={15} className="fl-empty">Brak pojazdów.</td></tr>}
            {filtered.map((item, idx) => (
              <tr key={item.id}>
                <td className="fl-num">{idx+1}</td>
                <td>
                  {item.zdjecie
                    ? <img src={item.zdjecie} alt="" className="fl-thumb" />
                    : <div className="fl-thumb-placeholder">–</div>
                  }
                </td>
                <td><Link to={`/flota/${item.id}`} className="fl-name-link">{item.nazwa}</Link></td>
                <td className="fl-cell">{item.opis || '–'}</td>
                <td className="fl-cell fl-mono">{item.nrRej || '–'}</td>
                <td className="fl-cell fl-mono">{item.nrVin || '–'}</td>
                <td className="fl-cell">{item.typ}</td>
                <td className="fl-cell fl-mono">{item.dataPrzegladu || '–'}</td>
                <td className="fl-cell fl-mono">{item.ocWazneDo || '–'}</td>
                <td>
                  <span className={`fl-status fl-status--${item.status === 'Sprawny' ? 'ok' : 'warn'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="fl-cell">{item.przebieg || '–'}</td>
                <td className="fl-cell">–</td>
                <td className="fl-cell">–</td>
                <td className="fl-cell">–</td>
                <td>
                  <div className="fl-actions">
                    <Link to={`/flota/${item.id}`} className="fl-act-btn"><Eye size={13}/></Link>
                    <Link to={`/flota/${item.id}/edytuj`} className="fl-act-btn"><Edit size={13}/></Link>
                    <button className="fl-act-btn fl-act-btn--del" onClick={()=>deleteItem(item.id,item.nazwa)}><X size={13}/></button>
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
