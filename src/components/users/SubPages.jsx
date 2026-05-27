import { useState } from 'react'
import { Plus, Edit, X, Check } from 'lucide-react'
import { CHRONOLOGIA_DATA, GRUPY_PROWIZYJNE, STAWKI, STATUSY_ROZLICZEN } from './usersData'
import './SubPages.css'

// ─── CHRONOLOGIA ─────────────────────────────────────────────────────────────
export function ChronologiaRozliczen() {
  const [data] = useState(CHRONOLOGIA_DATA)
  return (
    <div className="sp-wrap animate-in">
      <div className="sp-filters">
        <div className="sp-filter-row">
          <select className="sp-select"><option>Data dodania wydarzenia</option><option>Data zdarzenia</option></select>
          <select className="sp-select"><option>2026</option><option>2025</option></select>
          <select className="sp-select"><option>Maj</option>{['Styczeń','Luty','Marzec','Kwiecień','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'].map(m=><option key={m}>{m}</option>)}</select>
        </div>
        <div className="sp-filter-row">
          {['Typ','Użytkownik','EventManager','Wydarzenie','Status'].map(f => (
            <div key={f} className="sp-filter-item">
              <label>{f}</label>
              <select className="sp-select"><option>Wszystkie</option></select>
            </div>
          ))}
        </div>
      </div>

      <div className="sp-chron-header">
        <span>Użytkownik</span>
        <span>Wydarzenie/Project manager</span>
        <span>Kwota</span>
        <span>Status</span>
      </div>

      {data.map(item => (
        <div key={item.id} className="sp-chron-row">
          <div className="sp-chron-left">
            <div className="sp-chron-user">
              <a href="#" className="sp-user-link">{item.user}</a>
              <span className="sp-chron-date">{item.data}</span>
            </div>
            <div className="sp-chron-avatars">
              {item.avatarSub.split('\n').map((n,i) => (
                <div key={i} className="sp-avatar-mini">{n.charAt(0)}</div>
              ))}
            </div>
            <div className="sp-chron-details">
              <div><strong>Typ:</strong> {item.typ}</div>
              <div><strong>Od:</strong> {item.od} {item.alert && <span className="sp-alert">⚠</span>}</div>
              <div><strong>Do:</strong> {item.do}</div>
              <div><strong>Etap:</strong> {item.etap}</div>
              <div><strong>Stawka:</strong> {item.stawka}</div>
              <div><strong>Dodany czas pracy:</strong> <strong>{item.dodanyCzas}</strong></div>
            </div>
          </div>
          <div className="sp-chron-event">
            <a href="#" className="sp-event-link">{item.wydarzenie}</a>
            <div className="sp-event-manager">{item.manager}</div>
          </div>
          <div className="sp-chron-kwota">{item.kwota.toLocaleString('pl')},00 zł</div>
          <div className="sp-chron-status">
            <span className="sp-status-pill" style={{background:'#f97316'}}>{item.status}</span>
            <div className="sp-chron-actions">
              <button className="sp-act-btn"><Edit size={12} /></button>
              <button className="sp-act-btn sp-act-btn--del"><X size={12} /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── GRUPY PROWIZYJNE ─────────────────────────────────────────────────────────
export function GrupyProwizyjne() {
  const [items, setItems] = useState(GRUPY_PROWIZYJNE)
  const deleteItem = (id) => { if(window.confirm('Usunąć grupę?')) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="sp-wrap animate-in">
      <div className="sp-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj</button></div>
      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead><tr>
            <th>#</th><th>Nazwa</th><th>Team</th><th>Poziom</th><th>Wartość %</th><th>Typ</th><th style={{width:80}}></th>
          </tr></thead>
          <tbody>
            {items.map((item,idx) => (
              <tr key={item.id}>
                <td className="sp-num">{idx+1}</td>
                <td className="sp-cell sp-bold">{item.nazwa}</td>
                <td className="sp-cell">{item.team}</td>
                <td className="sp-cell">{item.poziom}</td>
                <td className="sp-cell">{item.wartosc.toFixed(2)}</td>
                <td className="sp-cell">{item.typ}</td>
                <td>
                  <div className="sp-actions">
                    <button className="sp-act-btn"><Eye size={12}/></button>
                    <button className="sp-act-btn"><Edit size={12}/></button>
                    <button className="sp-act-btn sp-act-btn--del" onClick={()=>deleteItem(item.id)}><X size={12}/></button>
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

// need Eye import
import { Eye } from 'lucide-react'

// ─── STAWKI PRACOWNIKÓW ───────────────────────────────────────────────────────
export function StawkiPracownikow() {
  const [items, setItems] = useState(STAWKI)
  const deleteItem = (id) => { if(window.confirm('Usunąć stawkę?')) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="sp-wrap animate-in">
      <div className="sp-toolbar">
        <button className="btn btn-primary"><Plus size={13}/> Dodaj</button>
        <button className="btn" style={{background:'#14b8a6',color:'#fff',fontSize:12}}>Matryca pracowników</button>
      </div>
      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead><tr>
            <th>#</th><th>Nazwa</th><th>Typ</th><th>Waluta</th><th>Liczba godzin</th><th style={{width:80}}></th>
          </tr></thead>
          <tbody>
            {items.map((item,idx) => (
              <tr key={item.id}>
                <td className="sp-num">{idx+1}</td>
                <td className="sp-cell sp-bold">{item.nazwa}</td>
                <td className="sp-cell">{item.typ}</td>
                <td className="sp-cell">{item.waluta}</td>
                <td className="sp-cell">{item.liczbaGodzin}</td>
                <td>
                  <div className="sp-actions">
                    <button className="sp-act-btn"><Edit size={12}/></button>
                    <button className="sp-act-btn sp-act-btn--del" onClick={()=>deleteItem(item.id)}><X size={12}/></button>
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

// ─── STATUSY ROZLICZEŃ ────────────────────────────────────────────────────────
export function StatusyRozliczen() {
  const [items, setItems] = useState(STATUSY_ROZLICZEN)
  const deleteItem = (id,n) => { if(window.confirm(`Usunąć status "${n}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="sp-wrap animate-in">
      <div className="sp-toolbar">
        <button className="btn btn-primary"><Plus size={13}/> Dodaj status</button>
      </div>
      <div className="sp-statusy">
        {items.map(item => (
          <div key={item.id} className="sp-status-row">
            <div className="sp-status-drag">
              <div className="sp-status-icon" style={{background: item.kolor}}>+</div>
            </div>
            <span className="sp-status-name">{item.nazwa}</span>
            <span className="sp-status-wlicza">{item.wlicza ? 'Wlicza do rozliczenia' : 'Nie wlicza do rozliczenia'}</span>
            <div className="sp-actions">
              <button className="sp-act-btn"><Edit size={12}/></button>
              <button className="sp-act-btn sp-act-btn--del" onClick={()=>deleteItem(item.id, item.nazwa)}><X size={12}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ZESPOŁY ─────────────────────────────────────────────────────────────────
export function Zespoly() {
  const [items, setItems] = useState([
    {id:1, nazwa:'Ekipa Montażowa', czlonkowie: 3},
    {id:2, nazwa:'Kierowcy', czlonkowie: 2},
  ])
  return (
    <div className="sp-wrap animate-in">
      <div className="sp-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj</button></div>
      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead><tr><th>#</th><th>Nazwa</th><th>Członkowie</th><th style={{width:80}}></th></tr></thead>
          <tbody>
            {items.map((item,idx) => (
              <tr key={item.id}>
                <td className="sp-num">{idx+1}</td>
                <td className="sp-cell sp-bold">{item.nazwa}</td>
                <td className="sp-cell">{item.czlonkowie}</td>
                <td><div className="sp-actions">
                  <button className="sp-act-btn"><Edit size={12}/></button>
                  <button className="sp-act-btn sp-act-btn--del" onClick={()=>setItems(p=>p.filter(i=>i.id!==item.id))}><X size={12}/></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── UMIEJĘTNOŚCI ─────────────────────────────────────────────────────────────
export function Umiejetnosci() {
  const [items, setItems] = useState([
    {id:1, nazwa:'Elektryk'},{id:2, nazwa:'Stolarz'},{id:3, nazwa:'Kierowca'},{id:4, nazwa:'Operator dźwigu'},
  ])
  return (
    <div className="sp-wrap animate-in">
      <div className="sp-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj</button></div>
      <div className="sp-table-wrap">
        <table className="sp-table">
          <thead><tr><th>#</th><th>Nazwa</th><th style={{width:80}}></th></tr></thead>
          <tbody>
            {items.map((item,idx) => (
              <tr key={item.id}>
                <td className="sp-num">{idx+1}</td>
                <td className="sp-cell sp-bold">{item.nazwa}</td>
                <td><div className="sp-actions">
                  <button className="sp-act-btn"><Edit size={12}/></button>
                  <button className="sp-act-btn sp-act-btn--del" onClick={()=>setItems(p=>p.filter(i=>i.id!==item.id))}><X size={12}/></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
