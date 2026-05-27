import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Plus, Eye, Edit, X, Check } from 'lucide-react'
import { MODELE, JEDNOSTKI, WALUTY, JEZYKI } from './fleetData'
import './Fleet.css'

// ─── LIST ─────────────────────────────────────────────────────────────────────
export function ModeleList() {
  const [items, setItems] = useState(MODELE)
  const deleteItem = (id, nazwa) => {
    if (window.confirm(`Usunąć model "${nazwa}"?`)) setItems(p => p.filter(i => i.id !== id))
  }
  return (
    <div className="fl-wrap animate-in">
      <div className="fl-toolbar">
        <Link to="/flota/modele/nowy" className="btn btn-primary"><Plus size={13}/> Dodaj</Link>
      </div>
      <div className="fl-table-wrap">
        <table className="fl-table">
          <thead>
            <tr>
              <th style={{width:36}}>#</th>
              <th>Nazwa</th>
              <th>Ładowność [kg]</th>
              <th>Objętość [m3]</th>
              <th>Liczba pasażerów</th>
              <th style={{width:90}}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id}>
                <td className="fl-num">{idx+1}</td>
                <td><Link to={`/flota/modele/${item.id}`} className="fl-name-link">{item.nazwa}</Link></td>
                <td className="fl-cell">{item.ladownosc ?? '–'}</td>
                <td className="fl-cell">{item.objetosc ? item.objetosc.toFixed(2) : '–'}</td>
                <td className="fl-cell">{item.pasazerowie ?? '–'}</td>
                <td>
                  <div className="fl-actions">
                    <Link to={`/flota/modele/${item.id}`} className="fl-act-btn"><Eye size={13}/></Link>
                    <Link to={`/flota/modele/${item.id}/edytuj`} className="fl-act-btn"><Edit size={13}/></Link>
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

// ─── DETAIL ───────────────────────────────────────────────────────────────────
export function ModelDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [model, setModel] = useState(MODELE.find(m => m.id === +id) || MODELE[0])
  const [stawki, setStawki] = useState(model.stawki || [])
  const [tlumaczenia, setTlumaczenia] = useState(model.tlumaczenia || [])
  const [showTlumAll, setShowTlumAll] = useState(false)

  const addStawka = () => {
    setStawki(p => [...p, { id: Date.now(), nazwa: '', cena: 0, koszt: 0, waluta: 'PLN', jednostka: 'KM', domyslna: false }])
  }
  const updateStawka = (id, k, v) => setStawki(p => p.map(s => s.id === id ? { ...s, [k]: v } : s))
  const deleteStawka = (id) => setStawki(p => p.filter(s => s.id !== id))

  const addTlumaczenie = () => {
    setTlumaczenia(p => [...p, { id: Date.now(), nazwa: '', jezyk: 'Angielski' }])
  }
  const deleteTlumaczenie = (id) => setTlumaczenia(p => p.filter(t => t.id !== id))

  return (
    <div className="fl-detail-wrap animate-in">
      <div className="fl-detail-topbar">
        <h2 className="fl-detail-title">{model.nazwa}</h2>
        <div className="fl-detail-actions">
          <button className="fl-detail-edit-btn" onClick={() => navigate(`/flota/modele/${id}/edytuj`)}><Edit size={14}/></button>
          <button className="fl-detail-close-btn" onClick={() => navigate('/flota/modele')}><X size={14}/></button>
        </div>
      </div>

      {/* Info table */}
      <div className="fl-detail-info">
        <div className="fl-detail-row"><span>Nazwa</span><span>{model.nazwa}</span></div>
        <div className="fl-detail-row"><span>Ładowność [kg]</span><span>{model.ladownosc ?? '–'}</span></div>
        <div className="fl-detail-row"><span>Objętość [m3]</span><span>{model.objetosc ? model.objetosc.toFixed(2) : '–'}</span></div>
        <div className="fl-detail-row"><span>Liczba pasażerów</span><span>{model.pasazerowie ?? '–'}</span></div>
      </div>

      {/* Stawki */}
      <div className="fl-section">
        <h3 className="fl-section-title">Stawki</h3>
        <table className="fl-table fl-table--compact">
          <thead>
            <tr>
              <th style={{width:36}}>#</th>
              <th>Nazwa</th>
              <th>Cena</th>
              <th>Koszt</th>
              <th>Waluta</th>
              <th>Jednostka</th>
              <th>Domyślna</th>
              <th style={{width:36}}></th>
            </tr>
          </thead>
          <tbody>
            {stawki.map((s, idx) => (
              <tr key={s.id}>
                <td className="fl-num">{idx+1}</td>
                <td><input className="fl-inline-input" value={s.nazwa} onChange={e=>updateStawka(s.id,'nazwa',e.target.value)} /></td>
                <td><input className="fl-inline-input fl-inline-input--num" type="number" value={s.cena} onChange={e=>updateStawka(s.id,'cena',e.target.value)} /></td>
                <td><input className="fl-inline-input fl-inline-input--num" type="number" value={s.koszt} onChange={e=>updateStawka(s.id,'koszt',e.target.value)} /></td>
                <td>
                  <select className="fl-inline-select" value={s.waluta} onChange={e=>updateStawka(s.id,'waluta',e.target.value)}>
                    {WALUTY.map(w=><option key={w}>{w}</option>)}
                  </select>
                </td>
                <td>
                  <select className="fl-inline-select" value={s.jednostka} onChange={e=>updateStawka(s.id,'jednostka',e.target.value)}>
                    {JEDNOSTKI.map(j=><option key={j}>{j}</option>)}
                  </select>
                </td>
                <td>
                  <select className="fl-inline-select" value={s.domyslna ? 'Tak' : 'Nie'} onChange={e=>updateStawka(s.id,'domyslna',e.target.value==='Tak')}>
                    <option>Tak</option><option>Nie</option>
                  </select>
                </td>
                <td><button className="fl-act-btn fl-act-btn--del" onClick={()=>deleteStawka(s.id)}><X size={12}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-ghost" style={{fontSize:12,marginTop:8}} onClick={addStawka}>
          <Plus size={12}/> Dodaj stawkę
        </button>
        <button className="btn btn-primary" style={{fontSize:12,marginTop:8,marginLeft:8}} onClick={()=>alert('Stawki zapisane!')}>
          Zapisz
        </button>
      </div>

      {/* Tłumaczenia */}
      <div className="fl-section">
        <div className="fl-section-header">
          <h3 className="fl-section-title">Tłumaczenia</h3>
          <div className="fl-section-actions">
            <button className="btn btn-ghost" style={{fontSize:12}} onClick={()=>setShowTlumAll(!showTlumAll)}>
              ✏ Wyświetl wszystko
            </button>
          </div>
        </div>
        <button className="btn btn-ghost" style={{fontSize:12,marginBottom:8}} onClick={addTlumaczenie}>
          <Plus size={12}/> Dodaj tłumaczenie
        </button>
        <table className="fl-table fl-table--compact">
          <thead>
            <tr>
              <th style={{width:36}}>#</th>
              <th>Nazwa</th>
              <th>Język</th>
              <th style={{width:70}}></th>
            </tr>
          </thead>
          <tbody>
            {tlumaczenia.map((t, idx) => (
              <tr key={t.id}>
                <td className="fl-num">{idx+1}</td>
                <td className="fl-cell fl-bold">{t.nazwa}</td>
                <td className="fl-cell">{t.jezyk}</td>
                <td>
                  <div className="fl-actions">
                    <button className="fl-act-btn"><Edit size={12}/></button>
                    <button className="fl-act-btn fl-act-btn--del" onClick={()=>deleteTlumaczenie(t.id)}><X size={12}/></button>
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

// ─── PRZEJAZDY ────────────────────────────────────────────────────────────────
import { PRZEJAZDY } from './fleetData'

export function Przejazdy() {
  const [items] = useState(PRZEJAZDY)
  return (
    <div className="fl-wrap animate-in">
      <div className="fl-toolbar">
        <button className="btn btn-primary"><Plus size={13}/> Dodaj</button>
      </div>
      <div className="fl-table-wrap">
        <table className="fl-table">
          <thead>
            <tr>
              <th>#</th><th>Pojazd</th><th>Kierowca</th><th>Wydarzenie</th>
              <th>Od</th><th>Do</th><th>KM</th><th>Koszt</th><th>Status</th><th style={{width:80}}></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={10} className="fl-empty">Brak przejazdów.</td></tr>}
            {items.map((item, idx) => (
              <tr key={item.id}>
                <td className="fl-num">{idx+1}</td>
                <td className="fl-cell fl-bold">{item.pojazd}</td>
                <td className="fl-cell">{item.kierowca}</td>
                <td><Link to="/wydarzenia" className="fl-name-link">{item.wydarzenie}</Link></td>
                <td className="fl-cell fl-mono">{item.od}</td>
                <td className="fl-cell fl-mono">{item.do}</td>
                <td className="fl-cell">{item.km}</td>
                <td className="fl-cell fl-mono">{item.koszt.toLocaleString('pl')} zł</td>
                <td><span className="fl-status fl-status--ok">{item.status}</span></td>
                <td>
                  <div className="fl-actions">
                    <button className="fl-act-btn"><Eye size={12}/></button>
                    <button className="fl-act-btn"><Edit size={12}/></button>
                    <button className="fl-act-btn fl-act-btn--del"><X size={12}/></button>
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

// ─── ZAŁĄCZNIKI ───────────────────────────────────────────────────────────────
export function FlotaZalaczniki() {
  return (
    <div className="fl-wrap animate-in">
      <div className="fl-toolbar">
        <button className="btn btn-primary"><Plus size={13}/> Dodaj załącznik</button>
      </div>
      <div className="fl-empty-box">
        <p>Brak załączników.</p>
      </div>
    </div>
  )
}
