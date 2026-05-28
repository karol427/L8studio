import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Eye, Edit, X, Upload, ChevronRight, ChevronDown, Save } from 'lucide-react'
import { MODELE_MAGAZYN, EGZEMPLARZE, ZALACZNIKI_MODELI, KATEGORIE_TREE } from './warehouseData'
import WarehouseCatHeader from './WarehouseCatHeader'
import './Warehouse.css'

// ─── MODELE ───────────────────────────────────────────────────────────────────
export function Modele() {
  const [items, setItems] = useState(MODELE_MAGAZYN)
  const [filterNazwa, setFilterNazwa] = useState('')
  const [filterWidocznosc] = useState('Widoczność')
  const filtered = items.filter(i => !filterNazwa || i.nazwa.toLowerCase().includes(filterNazwa.toLowerCase()))
  const del = (id,n) => { if(window.confirm(`Usunąć "${n}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }

  return (
    <div className="wh-wrap animate-in">
      <div className="wh-toolbar">
        <Link to="/magazyn/modele/nowy" className="btn btn-primary"><Plus size={13}/> Dodaj</Link>
        <button className="btn btn-ghost"><Upload size={13}/> Import</button>
        <button className="btn btn-ghost" style={{background:'rgba(239,68,68,0.1)',color:'var(--red)',border:'1px solid rgba(239,68,68,0.2)'}}>Lista usuniętych</button>
        <button className="btn btn-ghost">PDF - cały magazyn</button>
        <button className="btn btn-ghost">Excel</button>
        <button className="btn btn-ghost" style={{marginLeft:'auto'}}>✏ Wyświetl wszystko</button>
      </div>
      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead><tr>
            <th style={{width:36}}>#</th>
            <th><div className="wh-th-col">Nazwa<input className="wh-col-filter" value={filterNazwa} onChange={e=>setFilterNazwa(e.target.value)} /></div></th>
            <th>Sztuk na stanie</th>
            <th>
              <div className="wh-th-col">Widoczny w magazynie
                <select className="wh-col-filter"><option>Widoczność</option><option>TAK</option><option>NIE</option></select>
              </div>
            </th>
            <th>
              <div className="wh-th-col">Widoczny w ofercie
                <select className="wh-col-filter"><option>Widoczność</option><option>TAK</option><option>NIE</option></select>
              </div>
            </th>
            <th>
              <div className="wh-th-col">Kategoria
                <select className="wh-col-filter"><option>Kategoria</option></select>
              </div>
            </th>
            <th style={{width:90}}></th>
          </tr></thead>
          <tbody>
            {filtered.map((item,idx) => (
              <tr key={item.id}>
                <td className="wh-num">{idx+1}</td>
                <td><Link to={`/magazyn/modele/${item.id}`} className="wh-link">{item.nazwa}</Link></td>
                <td className="wh-cell" style={{textAlign:'center'}}>{item.sztuki}</td>
                <td><span className="wh-bool wh-bool--yes">TAK</span></td>
                <td><span className="wh-bool wh-bool--yes">TAK</span></td>
                <td className="wh-cell">{item.kategoria}</td>
                <td><div className="wh-actions">
                  <Link to={`/magazyn/modele/${item.id}`} className="wh-act-btn"><Eye size={12}/></Link>
                  <Link to={`/magazyn/modele/${item.id}/edytuj`} className="wh-act-btn"><Edit size={12}/></Link>
                  <button className="wh-act-btn wh-act-btn--del" onClick={()=>del(item.id,item.nazwa)}><X size={12}/></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{fontSize:12,color:'var(--text-muted)',padding:'6px 0'}}>Strona 1 z 5</div>
    </div>
  )
}

// ─── DODAJ MODEL ──────────────────────────────────────────────────────────────
export function DodajModel() {
  const navigate = useNavigate()
  const fileRef = useRef()
  const [zdjecie, setZdjecie] = useState(null)
  const [form, setForm] = useState({
    kategoria:'',nazwa:'',gear:'',dzial:'',typ:'Sprzęt',brakEgzemplarzy:false,
    minStan:'',maxStan:'',jednostka:'SZT',magazyn:'',miejsce:'',
    widocznyOfercie:'Widoczny',widocznyMagazynie:'Widoczny',jasnosc:'',
    producent:'',szerokosc:'',wysokosc:'',glebokosc:'',objetosc:'',waga:'',
    wartosc:'',urlOpis:'',
  })
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  return (
    <div className="wh-form-wrap animate-in">
      <div className="wh-form-topbar">
        <button className="btn btn-ghost" onClick={()=>navigate('/magazyn/modele')}> ← Wróć</button>
      </div>
      <div className="wh-form-layout">
        <div className="wh-form-left">
          <div className="wh-field"><label>Kategoria</label><select value={form.kategoria} onChange={e=>set('kategoria',e.target.value)}><option value="">Wybierz...</option><option>Projektory</option><option>Ekrany LED</option><option>Miksery AV</option><option>Komputery</option></select></div>
          <div className="wh-field"><label>Nazwa</label><input value={form.nazwa} onChange={e=>set('nazwa',e.target.value)} /></div>
          <div className="wh-field"><label>Gear</label><select value={form.gear} onChange={e=>set('gear',e.target.value)}><option value="">Wybierz model</option></select></div>
          <div className="wh-field"><label>Dział</label><select value={form.dzial} onChange={e=>set('dzial',e.target.value)}><option value="">Wybierz...</option><option>Multimedia</option><option>Oświetlenie</option><option>Nagłośnienie</option></select></div>
          <div className="wh-field"><label>Typ</label><select value={form.typ} onChange={e=>set('typ',e.target.value)}><option>Sprzęt</option><option>Usługa</option><option>Materiał</option></select></div>
          <label className="wh-checkbox"><input type="checkbox" checked={form.brakEgzemplarzy} onChange={e=>set('brakEgzemplarzy',e.target.checked)} /> Brak egzemplarzy</label>
          <div className="wh-field"><label>Minimalny stan magazynowy</label><input type="number" value={form.minStan} onChange={e=>set('minStan',e.target.value)} /></div>
          <div className="wh-field"><label>Maksymalny stan magazynowy</label><input type="number" value={form.maxStan} onChange={e=>set('maxStan',e.target.value)} /></div>
          <div className="wh-field"><label>Jednostka</label><input value={form.jednostka} onChange={e=>set('jednostka',e.target.value)} /></div>
          <div className="wh-field"><label>Magazyn</label><input value={form.magazyn} onChange={e=>set('magazyn',e.target.value)} /></div>
          <div className="wh-field"><label>Miejsce w magazynie</label><input value={form.miejsce} onChange={e=>set('miejsce',e.target.value)} /></div>
          <div className="wh-field"><label>Widoczny w ofercie</label><select value={form.widocznyOfercie} onChange={e=>set('widocznyOfercie',e.target.value)}><option>Widoczny</option><option>Ukryty</option></select></div>
          <div className="wh-field"><label>Widoczny w magazynie</label><select value={form.widocznyMagazynie} onChange={e=>set('widocznyMagazynie',e.target.value)}><option>Widoczny</option><option>Ukryty</option></select></div>
          <div className="wh-field"><label>Jasność</label><input value={form.jasnosc} onChange={e=>set('jasnosc',e.target.value)} /></div>
        </div>
        <div className="wh-form-right">
          <div className="wh-section-title">Wymiar urządzenia netto (bez case)</div>
          <div className="wh-field"><label>Producent</label><select value={form.producent} onChange={e=>set('producent',e.target.value)}><option value="">Wybierz albo utwórz producenta</option></select></div>
          <div className="wh-field"><label>Szerokość [cm]</label><input type="number" value={form.szerokosc} onChange={e=>set('szerokosc',e.target.value)} /></div>
          <div className="wh-field"><label>Wysokość [cm]</label><input type="number" value={form.wysokosc} onChange={e=>set('wysokosc',e.target.value)} /></div>
          <div className="wh-field"><label>Głębokość [cm]</label><input type="number" value={form.glebokosc} onChange={e=>set('glebokosc',e.target.value)} /></div>
          <div className="wh-field"><label>Objętość [m3]</label><input type="number" value={form.objetosc} onChange={e=>set('objetosc',e.target.value)} /></div>
          <div className="wh-field"><label>Waga [kg]</label><input type="number" value={form.waga} onChange={e=>set('waga',e.target.value)} /></div>
          <div className="wh-field"><label>Wartość</label><input type="number" value={form.wartosc} onChange={e=>set('wartosc',e.target.value)} /></div>
          <div className="wh-field"><label>Adres URL z opisem sprzętu [łącznie z http]</label><input value={form.urlOpis} onChange={e=>set('urlOpis',e.target.value)} /></div>
          <div className="wh-field">
            <label>Zdjęcie</label>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <button className="btn btn-ghost" style={{fontSize:12}} onClick={()=>fileRef.current?.click()}>Wybierz plik</button>
              <span style={{fontSize:12,color:'var(--text-muted)'}}>{zdjecie?'Wybrano':'Nie wybrano pliku'}</span>
              <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files[0];if(f)setZdjecie(URL.createObjectURL(f))}} />
            </div>
            <div style={{marginTop:8,background:'#000',borderRadius:4,overflow:'hidden',minHeight:120,display:'flex',alignItems:'center',justifyContent:'center'}}>
              {zdjecie ? <img src={zdjecie} alt="" style={{maxWidth:'100%',maxHeight:200,objectFit:'contain'}} /> : <span style={{color:'var(--text-muted)',fontSize:12}}>Podgląd zdjęcia</span>}
            </div>
          </div>
          <button className="wh-save-btn" onClick={()=>{alert('Model zapisany!');navigate('/magazyn/modele')}}>Zapisz</button>
        </div>
      </div>
    </div>
  )
}

// ─── EGZEMPLARZE ──────────────────────────────────────────────────────────────
function QRCode() {
  return (
    <div className="wh-qr">
      <svg viewBox="0 0 20 20" width="36" height="36">
        <rect x="0" y="0" width="8" height="8" fill="none" stroke="#000" strokeWidth="1.5"/>
        <rect x="2" y="2" width="4" height="4" fill="#000"/>
        <rect x="12" y="0" width="8" height="8" fill="none" stroke="#000" strokeWidth="1.5"/>
        <rect x="14" y="2" width="4" height="4" fill="#000"/>
        <rect x="0" y="12" width="8" height="8" fill="none" stroke="#000" strokeWidth="1.5"/>
        <rect x="2" y="14" width="4" height="4" fill="#000"/>
        <rect x="11" y="9" width="2" height="2" fill="#000"/>
        <rect x="14" y="11" width="2" height="2" fill="#000"/>
        <rect x="11" y="14" width="2" height="2" fill="#000"/>
        <rect x="14" y="14" width="2" height="2" fill="#000"/>
        <rect x="17" y="11" width="2" height="8" fill="#000"/>
      </svg>
    </div>
  )
}
function BarCode({ num }) {
  const lines = Array.from({length:20},(_,i)=>({w:i%3===0?3:i%5===0?2:1,gap:i%4===0?2:1}))
  return (
    <div style={{background:'#fff',padding:'2px 4px',borderRadius:2,display:'inline-flex',flexDirection:'column',alignItems:'center',minWidth:80}}>
      <div style={{display:'flex',gap:1,height:20,alignItems:'flex-end'}}>
        {lines.map((l,i)=><div key={i} style={{width:l.w,height:14+Math.sin(i)*3,background:'#000',marginRight:l.gap}}/>)}
      </div>
      <span style={{fontSize:7,color:'#000',fontFamily:'monospace'}}>{num}</span>
    </div>
  )
}

export function Egzemplarze() {
  const [items, setItems] = useState(EGZEMPLARZE)
  const [filters, setFilters] = useState({nazwa:'',model:'',kategoria:''})
  const setF = (k,v) => setFilters(f=>({...f,[k]:v}))
  const del = (id,n) => { if(window.confirm(`Usunąć "${n}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }
  const filtered = items.filter(i =>
    (!filters.nazwa || i.nazwa.toLowerCase().includes(filters.nazwa.toLowerCase())) &&
    (!filters.model || i.model.toLowerCase().includes(filters.model.toLowerCase())) &&
    (!filters.kategoria || i.kategoria.toLowerCase().includes(filters.kategoria.toLowerCase()))
  )
  return (
    <div className="wh-wrap animate-in">
      <div className="wh-toolbar">
        <Link to="/magazyn/egzemplarze/nowy" className="btn btn-primary"><Plus size={13}/> Dodaj</Link>
        <button className="btn btn-ghost" style={{background:'rgba(239,68,68,0.1)',color:'var(--red)',border:'1px solid rgba(239,68,68,0.2)'}}>Lista usuniętych</button>
      </div>
      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead><tr>
            <th style={{width:36}}>#</th>
            <th><div className="wh-th-col">Nazwa<input className="wh-col-filter" value={filters.nazwa} onChange={e=>setF('nazwa',e.target.value)} /></div></th>
            <th><div className="wh-th-col">Nazwa modelu<input className="wh-col-filter" value={filters.model} onChange={e=>setF('model',e.target.value)} /></div></th>
            <th><div className="wh-th-col">Kategoria<input className="wh-col-filter" value={filters.kategoria} onChange={e=>setF('kategoria',e.target.value)} /></div></th>
            <th>Kod RFID</th>
            <th>Numer urządzenia</th>
            <th>Kod Qr</th>
            <th>BarCode</th>
            <th>Wydaj z magazynu</th>
            <th style={{width:80}}></th>
          </tr></thead>
          <tbody>
            {filtered.map((item,idx) => (
              <tr key={item.id}>
                <td className="wh-num">{idx+1}</td>
                <td>
                  <div style={{display:'flex',flexDirection:'column',gap:3}}>
                    <Link to={`/magazyn/egzemplarze/${item.id}`} className="wh-link">{item.nazwa}</Link>
                    {item.status && <span className="wh-status" style={{background:item.statusKolor==='#22c55e'?'rgba(34,197,94,0.15)':'rgba(239,68,68,0.15)',color:item.statusKolor,border:`1px solid ${item.statusKolor}40`}}>{item.status}</span>}
                  </div>
                </td>
                <td className="wh-cell">{item.model}</td>
                <td className="wh-cell">{item.kategoria}</td>
                <td className="wh-mono" style={{fontSize:10}}>{item.rfid}</td>
                <td className="wh-cell" style={{textAlign:'center'}}>{item.nrUrzadzenia}</td>
                <td><QRCode /></td>
                <td><BarCode num={item.barcode} /></td>
                <td>
                  <div style={{display:'flex',flexDirection:'column',gap:3}}>
                    <button className="wh-act-btn wh-act-btn--issue">Wydaj sprzęt</button>
                    <button className="wh-act-btn wh-act-btn--receive">Przyjmij sprzęt</button>
                  </div>
                </td>
                <td><div className="wh-actions">
                  <Link to={`/magazyn/egzemplarze/${item.id}`} className="wh-act-btn"><Eye size={12}/></Link>
                  <Link to={`/magazyn/egzemplarze/${item.id}/edytuj`} className="wh-act-btn"><Edit size={12}/></Link>
                  <button className="wh-act-btn wh-act-btn--del" onClick={()=>del(item.id,item.nazwa)}><X size={12}/></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── DODAJ EGZEMPLARZ ─────────────────────────────────────────────────────────
export function DodajEgzemplarz() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ model:'',nazwa:'',nrUrzadzenia:'',nrSeryjny:'',magazyn:'',miejsce:'',opis:'',pakowany:false,cenaZakupu:'',case:'' })
  const set = (k,v) => setForm(f=>({...f,[k]:v}))
  return (
    <div className="wh-form-wrap animate-in">
      <div className="wh-form-topbar"><button className="btn btn-ghost" onClick={()=>navigate('/magazyn/egzemplarze')}>← Wróć</button></div>
      <div className="wh-form-layout">
        <div className="wh-form-left">
          <div className="wh-field"><label>Model</label><select value={form.model} onChange={e=>set('model',e.target.value)}><option value="">Wybierz...</option>{MODELE_MAGAZYN.map(m=><option key={m.id}>{m.nazwa}</option>)}</select></div>
          <div className="wh-field"><label>Nazwa</label><input value={form.nazwa} onChange={e=>set('nazwa',e.target.value)} /></div>
          <div className="wh-field"><label>Numer urządzenia</label><input value={form.nrUrzadzenia} onChange={e=>set('nrUrzadzenia',e.target.value)} /></div>
          <div className="wh-field"><label>Numer seryjny</label><input value={form.nrSeryjny} onChange={e=>set('nrSeryjny',e.target.value)} /></div>
          <div className="wh-field"><label>Magazyn</label><input value={form.magazyn} onChange={e=>set('magazyn',e.target.value)} /></div>
          <div className="wh-field"><label>Miejsce w magazynie</label><input value={form.miejsce} onChange={e=>set('miejsce',e.target.value)} /></div>
          <div className="wh-field">
            <label>Opis</label>
            <div className="wh-editor-bar">
              <button className="wh-editor-btn">◇</button><button className="wh-editor-btn">¶</button>
              <button className="wh-editor-btn"><strong>B</strong></button><button className="wh-editor-btn"><em>I</em></button>
              <button className="wh-editor-btn"><s>S</s></button>
            </div>
            <textarea value={form.opis} onChange={e=>set('opis',e.target.value)} rows={4} style={{borderTop:'none',borderRadius:'0 0 var(--radius) var(--radius)'}} />
          </div>
          <button className="wh-save-btn" onClick={()=>{alert('Egzemplarz zapisany!');navigate('/magazyn/egzemplarze')}}>Zapisz</button>
        </div>
        <div className="wh-form-right">
          <label className="wh-checkbox"><input type="checkbox" checked={form.pakowany} onChange={e=>set('pakowany',e.target.checked)} /> Pakowany pojedynczo</label>
          <div className="wh-field"><label>Cena zakupu</label><input type="number" value={form.cenaZakupu} onChange={e=>set('cenaZakupu',e.target.value)} /></div>
          <div className="wh-field"><label>Case</label><select value={form.case} onChange={e=>set('case',e.target.value)}><option value="">Wybierz...</option></select></div>
        </div>
      </div>
    </div>
  )
}

// ─── PRZYJĘCIE DO MAGAZYNU ────────────────────────────────────────────────────
export function PrzyjecieMagazyn() {
  return (
    <div className="wh-wrap animate-in">
      <div className="wh-przyjecie-filter">
        <select className="wh-year-select"><option>2026</option><option>2025</option></select>
        <select className="wh-month-select"><option>Maj</option>{['Styczeń','Luty','Marzec','Kwiecień','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'].map(m=><option key={m}>{m}</option>)}</select>
      </div>
      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead><tr>
            <th><div className="wh-th-col">Numer<input className="wh-col-filter" /></div></th>
            <th><div className="wh-th-col">Nazwa imprezy<input className="wh-col-filter" /></div></th>
            <th>Typ imprezy</th>
            <th>Przyjęty sprzęt</th>
            <th><div className="wh-th-col">Data przyjęcia ↕<input className="wh-col-filter" /></div></th>
            <th><div className="wh-th-col">Przyjął<select className="wh-col-filter"><option></option></select></div></th>
            <th>Komentarz</th>
            <th>Dokument</th>
          </tr></thead>
          <tbody><tr><td colSpan={8} className="wh-empty">Brak wyników.</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}

// ─── WYDANIE Z MAGAZYNU ───────────────────────────────────────────────────────
export function WydanieMagazyn() {
  return (
    <div className="wh-wrap animate-in">
      <div className="wh-przyjecie-filter">
        <select className="wh-year-select"><option>2026</option></select>
        <select className="wh-month-select"><option>Maj</option></select>
      </div>
      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead><tr>
            <th>Numer</th><th>Nazwa imprezy</th><th>Typ imprezy</th>
            <th>Wydany sprzęt</th><th>Data wydania</th><th>Wydał</th><th>Komentarz</th><th>Dokument</th>
          </tr></thead>
          <tbody><tr><td colSpan={8} className="wh-empty">Brak wyników.</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}

// ─── NIEZWRÓCONY SPRZĘT ───────────────────────────────────────────────────────
export function NiezwroconySprzet() {
  return (
    <div className="wh-wrap animate-in">
      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead><tr><th>#</th><th>Egzemplarz</th><th>Wydarzenie</th><th>Data wydania</th><th>Ilość dni</th></tr></thead>
          <tbody><tr><td colSpan={5} className="wh-empty">Brak niezwróconego sprzętu.</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}

// ─── OPAKOWANIA ───────────────────────────────────────────────────────────────
export function Opakowania() {
  return (
    <div className="wh-wrap animate-in">
      <div className="wh-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj</button></div>
      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead><tr><th>#</th><th>Nazwa</th><th>Model</th><th>Pojemność</th><th>Wymiary</th><th style={{width:80}}></th></tr></thead>
          <tbody><tr><td colSpan={6} className="wh-empty">Brak opakowań.</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}

// ─── TYPY OPAKOWAŃ ────────────────────────────────────────────────────────────
export function TypyOpakowan() {
  const [items, setItems] = useState([
    {id:1,nazwa:'Skrzynka',kolor:'#3b82f6'},{id:2,nazwa:'Torba',kolor:'#22c55e'},{id:3,nazwa:'Case',kolor:'#f97316'},
  ])
  return (
    <div className="wh-wrap animate-in">
      <div className="wh-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj</button></div>
      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead><tr><th>#</th><th>Nazwa</th><th>Kolor</th><th style={{width:80}}></th></tr></thead>
          <tbody>{items.map((item,idx)=>(
            <tr key={item.id}>
              <td className="wh-num">{idx+1}</td>
              <td className="wh-cell" style={{fontWeight:500,color:'var(--text-primary)'}}>{item.nazwa}</td>
              <td><div style={{width:24,height:24,borderRadius:4,background:item.kolor}}/></td>
              <td><div className="wh-actions">
                <button className="wh-act-btn"><Edit size={12}/></button>
                <button className="wh-act-btn wh-act-btn--del" onClick={()=>setItems(p=>p.filter(i=>i.id!==item.id))}><X size={12}/></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}

// ─── ZESTAWY ──────────────────────────────────────────────────────────────────
export function Zestawy() {
  return (
    <div className="wh-wrap animate-in">
      <div className="wh-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj</button></div>
      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead><tr><th>#</th><th>Nazwa</th><th>Elementy</th><th style={{width:80}}></th></tr></thead>
          <tbody><tr><td colSpan={4} className="wh-empty">Brak zestawów.</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}

// ─── MAGAZYN DOSTAWCÓW ────────────────────────────────────────────────────────
export function MagazynDostawcow() {
  return (
    <div className="wh-wrap animate-in">
      <WarehouseCatHeader />
      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead><tr><th>#</th><th>Nazwa</th><th>Dostawca</th><th>Na stanie</th><th>Cena</th><th style={{width:80}}></th></tr></thead>
          <tbody><tr><td colSpan={6} className="wh-empty">Brak sprzętu dostawców.</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}

// ─── KATEGORIE ────────────────────────────────────────────────────────────────
export function KategorieSprzetu() {
  const [selectedKat, setSelectedKat] = useState(null)
  const [expanded, setExpanded] = useState({1:true,2:true,4:true,9:true})
  const toggleExpand = (id) => setExpanded(p=>({...p,[id]:!p[id]}))

  return (
    <div className="wh-form-wrap animate-in">
      <div style={{display:'flex',gap:8,marginBottom:10}}>
        <button className="btn btn-ghost" style={{fontSize:12}}>Tłumaczenia</button>
      </div>
      <div className="wh-kat-warning">
        ⚠ Uwaga! Główne kategorie magazynu używane są jako sekcje w ofertach i finansach. Zmiana ich nazwy, usunięcie, bądź przesunięcie na niższy poziom może skutkować zmianami w ofertach i raportach finansowych.
      </div>
      <div className="wh-kat-wrap">
        <div className="wh-kat-tree">
          <div className="wh-kat-tree-header">
            <span>Kategorie</span>
            <div className="wh-kat-search">
              <input placeholder="Wyszukaj..." className="wh-col-filter" style={{width:140}} />
              <button className="wh-kat-search-close">✕</button>
            </div>
          </div>
          <div className="wh-kat-tree-body">
            <div className="wh-kat-item" onClick={()=>setSelectedKat(null)}>
              <span style={{fontSize:12,color:'var(--text-muted)'}}>▸ Start</span>
            </div>
            {KATEGORIE_TREE.map(cat => (
              <div key={cat.id}>
                <div className={`wh-kat-item ${selectedKat?.id===cat.id?'wh-kat-item--active':''}`}
                  onClick={()=>{setSelectedKat(cat);toggleExpand(cat.id)}}>
                  <span className="wh-kat-folder wh-kat-folder--orange">📁</span>
                  <span className="wh-kat-name">{cat.nazwa}</span>
                </div>
                {expanded[cat.id] && cat.children?.map(child => (
                  <div key={child.id} className={`wh-kat-item wh-kat-item--child ${selectedKat?.id===child.id?'wh-kat-item--active':''}`}
                    onClick={()=>setSelectedKat(child)}>
                    <span className="wh-kat-folder wh-kat-folder--blue">📄</span>
                    <span className="wh-kat-name">{child.nazwa}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="wh-kat-tree-actions">
            {['+','□','↑','↓','←','→','↺'].map(a=>(
              <button key={a} className="wh-kat-action">{a}</button>
            ))}
          </div>
        </div>
        <div className="wh-kat-detail">
          <div className="wh-kat-detail-header">
            <span>KATEGORIE</span>
            <div style={{display:'flex',gap:6}}>
              <button className="wh-kat-action">↺</button>
              <button className="wh-kat-save">💾</button>
            </div>
          </div>
          <div className="wh-kat-detail-body">
            <table className="wh-kat-detail-table">
              <thead><tr>
                <th>Unikatowy identyfikator węzła drzewa</th>
                <th>Nazwa węzła drzewa / etykieta <span style={{color:'var(--red)'}}>*</span></th>
              </tr></thead>
              <tbody><tr>
                <td>1</td>
                <td><input defaultValue={selectedKat?.nazwa || 'KATEGORIE'} /></td>
              </tr></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ZAŁĄCZNIKI MODELI ────────────────────────────────────────────────────────
export function ZalaczkiModeli() {
  const [items, setItems] = useState(ZALACZNIKI_MODELI)
  const [filters, setFilters] = useState({plik:'',rozszerzenie:'',model:''})
  const setF = (k,v) => setFilters(f=>({...f,[k]:v}))
  const filtered = items.filter(i =>
    (!filters.plik || i.plik.toLowerCase().includes(filters.plik.toLowerCase())) &&
    (!filters.rozszerzenie || i.rozszerzenie.includes(filters.rozszerzenie)) &&
    (!filters.model || i.model.toLowerCase().includes(filters.model.toLowerCase()))
  )
  const del = (id) => { if(window.confirm('Usunąć załącznik?')) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="wh-wrap animate-in">
      <div className="wh-toolbar">
        <button className="btn btn-primary"><Plus size={13}/> Dodaj</button>
        <button className="btn btn-ghost" style={{marginLeft:'auto'}}>✏ Wyświetl wszystko</button>
      </div>
      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead><tr>
            <th style={{width:36}}>#</th>
            <th><div className="wh-th-col">Plik<input className="wh-col-filter" value={filters.plik} onChange={e=>setF('plik',e.target.value)} /></div></th>
            <th><div className="wh-th-col">Rozszerzenie<input className="wh-col-filter" value={filters.rozszerzenie} onChange={e=>setF('rozszerzenie',e.target.value)} /></div></th>
            <th><div className="wh-th-col">Model<input className="wh-col-filter" value={filters.model} onChange={e=>setF('model',e.target.value)} /></div></th>
            <th style={{width:100}}></th>
          </tr></thead>
          <tbody>
            {filtered.map((item,idx) => (
              <tr key={item.id}>
                <td className="wh-num">{idx+1}</td>
                <td className="wh-cell" style={{fontFamily:'var(--font-mono)',fontSize:11}}>{item.plik}</td>
                <td className="wh-cell">{item.rozszerzenie}</td>
                <td><a href="#" className="wh-link">{item.model}</a></td>
                <td><div className="wh-actions">
                  <button className="wh-act-btn"><Eye size={12}/></button>
                  <button className="wh-act-btn"><Edit size={12}/></button>
                  <button className="wh-act-btn wh-act-btn--del" onClick={()=>del(item.id)}><X size={12}/></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
