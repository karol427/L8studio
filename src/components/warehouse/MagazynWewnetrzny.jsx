import { useState } from 'react'
import { Eye, Edit, X } from 'lucide-react'
import WarehouseCatHeader from './WarehouseCatHeader'
import './Warehouse.css'

const today = new Date().toISOString().slice(0,10)

export default function MagazynWewnetrzny() {
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState(`${today} 00:00:00`)
  const [dateTo, setDateTo] = useState(`${today} 23:59:59`)

  return (
    <div className="wh-wrap animate-in">
      <WarehouseCatHeader />

      <div className="wh-search-bar">
        <input className="wh-search-input" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Szukaj" />
        <button onClick={()=>setSearch('')} style={{background:'none',color:'var(--red)',border:'none',cursor:'pointer',fontSize:16}}>✕</button>
        <div className="wh-date-range">
          <input value={dateFrom} onChange={e=>setDateFrom(e.target.value)} />
          <span>to</span>
          <input value={dateTo} onChange={e=>setDateTo(e.target.value)} />
        </div>
        <button className="wh-search-btn">Szukaj</button>
        <button className="btn btn-ghost" style={{fontSize:12,marginLeft:'auto'}}>
          Zobacz jak działają opakowania
        </button>
      </div>

      <div className="wh-action-btns">
        {[
          {label:'Kalendarz',cls:'wh-btn--blue'},
          {label:'Zestawienie',cls:'wh-btn--teal'},
          {label:'Inwentaryzacja',cls:'wh-btn--teal'},
          {label:'Dodaj opakowanie',cls:'wh-btn--teal'},
          {label:'Utwórz zestaw',cls:'wh-btn--teal'},
          {label:'Dodaj model',cls:'wh-btn--teal'},
          {label:'Stwórz zadanie',cls:'wh-btn--teal'},
          {label:'Eksport do .xls',cls:'wh-btn--outline'},
          {label:'Eksport do .pdf',cls:'wh-btn--outline'},
          {label:'Naklejki z kodami',cls:'wh-btn--outline'},
          {label:'Ukryj zdjęcia',cls:'wh-btn--outline'},
          {label:'Eksport magazynu (ilości)',cls:'wh-btn--orange'},
          {label:'Eksport egzemplarzy',cls:'wh-btn--orange'},
        ].map(b => (
          <button key={b.label} className={`wh-btn ${b.cls}`}>{b.label}</button>
        ))}
        <button className="wh-btn wh-btn--outline" style={{display:'flex',alignItems:'center',gap:4}}>
          🔍 Znajdź sprzęt w event network
        </button>
      </div>

      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead>
            <tr>
              <th style={{width:32}}><input type="checkbox" /></th>
              <th style={{width:20}}>↕</th>
              <th style={{width:20}}>S</th>
              <th style={{width:20}}>U</th>
              <th>Zdjęcie</th>
              <th>Nazwa</th>
              <th>Typ</th>
              <th>Kategoria</th>
              <th>Na stanie</th>
              <th>Dostępnych</th>
              <th>Rezerwacje</th>
              <th>Cena</th>
              <th>Kod kreskowy</th>
              <th>Uwagi</th>
              <th>Konflikty</th>
              <th>Cross Rental Network</th>
              <th>Status CRN</th>
              <th>Magazyny</th>
              <th>Notatka</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={19} className="wh-empty">Brak wyników.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
