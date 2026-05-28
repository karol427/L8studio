import { useState, useRef } from 'react'
import { Plus, X, Edit, Eye, Save, Upload, Check, ChevronDown } from 'lucide-react'
import { DZIALY_FIRMY, ROLE_NA_WYDARZENIU, FIRMY, SEGMENTY_OFERT, GRUPY_UPRAWNIEN, UPRAWNIENIA_LIST } from './settingsData'
import './Settings.css'

const TABS = [
  { id: 'dane-firmy', label: 'Dane firmy' },
  { id: 'dzialy', label: 'Działy firmy' },
  { id: 'role', label: 'Rola ne wydarzeniu' },
  { id: 'oferty-tab', label: 'Oferty' },
  { id: 'finanse', label: 'Finanse' },
  { id: 'powiadomienia', label: 'Powiadomienia' },
  { id: 'uprawnienia', label: 'Uprawnienia' },
  { id: 'indywidualne', label: 'Indywidualne ustawienia' },
  { id: 'personalizacja', label: 'Personalizacja' },
  { id: 'jezyki', label: 'Języki' },
  { id: 'firmy', label: 'Firmy' },
  { id: 'cross-rental', label: 'Cross rental' },
  { id: 'wydania', label: 'Wydania/Przyjęcia sprzętu' },
  { id: 'pdf-wydruk', label: '🖨️ Wygląd PDF / Wydruk' },
]

export default function UstawieniaMain() {
  const [activeTab, setActiveTab] = useState('dane-firmy')
  return (
    <div className="set-wrap animate-in">
      <div className="set-tabs">
        {TABS.map(t => (
          <button key={t.id}
            className={`set-tab ${activeTab===t.id?'set-tab--active':''}`}
            onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="set-content">
        {activeTab==='dane-firmy'    && <DaneFirmy />}
        {activeTab==='dzialy'        && <DzialyFirmy />}
        {activeTab==='role'          && <RoleNaWydarzeniu />}
        {activeTab==='oferty-tab'    && <OfertyUstawienia />}
        {activeTab==='finanse'       && <FinanseUstawienia />}
        {activeTab==='powiadomienia' && <PowiadomieniaUstawienia />}
        {activeTab==='uprawnienia'   && <UprawieniaUstawienia />}
        {activeTab==='indywidualne'  && <IndywidualneUstawienia />}
        {activeTab==='personalizacja'&& <PersonalizacjaUstawienia />}
        {activeTab==='jezyki'        && <JezykiUstawienia />}
        {activeTab==='firmy'         && <FirmyUstawienia />}
        {activeTab==='cross-rental'  && <CrossRentalUstawienia />}
        {activeTab==='wydania'       && <WydaniaUstawienia />}
        {activeTab==='pdf-wydruk'    && <PDFWydrukUstawienia />}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   HELPER COMPONENTS
═══════════════════════════════════════════════ */
function Field({ label, children }) {
  return (
    <div className="set-field">
      {label && <label>{label}</label>}
      {children}
    </div>
  )
}
function Input({ label, value, onChange, type='text', placeholder='' }) {
  return (
    <Field label={label}>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'7px 10px',fontSize:13,width:'100%'}} />
    </Field>
  )
}
function Select({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'7px 10px',fontSize:13,width:'100%'}}>
        {options.map(o => typeof o==='string'
          ? <option key={o} value={o}>{o}</option>
          : <option key={o.value} value={o.value}>{o.label}</option>
        )}
      </select>
    </Field>
  )
}
function SaveBtn({ onClick, label='Zapisz' }) {
  const [saved, setSaved] = useState(false)
  const handle = () => { setSaved(true); setTimeout(()=>setSaved(false),1800); onClick?.() }
  return (
    <button onClick={handle}
      style={{background:saved?'#22c55e':'#14b8a6',color:'#fff',padding:'8px 22px',borderRadius:'var(--radius)',
        fontSize:13,fontWeight:700,display:'flex',alignItems:'center',gap:6,transition:'all 0.3s',alignSelf:'flex-start'}}>
      {saved ? <><Check size={14}/> Zapisano!</> : <><Save size={14}/> {label}</>}
    </button>
  )
}

/* ═══════════════════════════════════════════════
   1. DANE FIRMY
═══════════════════════════════════════════════ */
function DaneFirmy() {
  const fileRef = useRef()
  const [logo, setLogo] = useState(null)
  const [f, sf] = useState({
    nazwa:'L8 Studio', skrocona:'L8 Studio', adres:'', kod:'', miasto:'', kraj:'Polska',
    nip:'', bank:'', konto:'', swift:'', dzialTel:'', dzialEmail:'',
    crossTel:'', crossEmail:'', magSamJak:true, magAdres:'', magKod:'', magMiasto:'',
    stopkaText:'', stopkaWysokosc:'', widocznosc:'Widoczna',
    ekipaPotwierdzenie:'TAK', pokrywanieCzasow:'NIE',
  })
  const s = (k,v) => sf(p=>({...p,[k]:v}))

  return (
    <div className="set-form">
      <div className="set-3col">
        <div className="set-col">
          <Input label="Nazwa Firmy" value={f.nazwa} onChange={v=>s('nazwa',v)} />
          <Input label="Skrócona Nazwa" value={f.skrocona} onChange={v=>s('skrocona',v)} />
          <Input label="Adres" value={f.adres} onChange={v=>s('adres',v)} />
          <Input label="Kod pocztowy" value={f.kod} onChange={v=>s('kod',v)} />
          <Input label="Miasto" value={f.miasto} onChange={v=>s('miasto',v)} />
          <Input label="Kraj" value={f.kraj} onChange={v=>s('kraj',v)} />
          <Input label="NIP" value={f.nip} onChange={v=>s('nip',v)} />
          <Input label="Nazwa Banku" value={f.bank} onChange={v=>s('bank',v)} />
          <Input label="Konto Bankowe" value={f.konto} onChange={v=>s('konto',v)} />
          <Input label="Swift" value={f.swift} onChange={v=>s('swift',v)} />
          <Select label="Ekipa potwierdza przypisanie do wydarzenia"
            value={f.ekipaPotwierdzenie} onChange={v=>s('ekipaPotwierdzenie',v)}
            options={['TAK','NIE']} />
          <Select label="Pozwól na pokrywające się czasy pracy ekipy"
            value={f.pokrywanieCzasow} onChange={v=>s('pokrywanieCzasow',v)}
            options={['NIE','TAK']} />
        </div>
        <div className="set-col">
          <div style={{fontSize:12,fontWeight:700,color:'var(--text-muted)',padding:'6px 0',borderBottom:'1px solid var(--border-default)',marginBottom:4}}>Dział handlowy</div>
          <Input label="Tel" value={f.dzialTel} onChange={v=>s('dzialTel',v)} />
          <Input label="E-mail" value={f.dzialEmail} onChange={v=>s('dzialEmail',v)} type="email" />
          <div style={{fontSize:12,fontWeight:700,color:'var(--text-muted)',padding:'10px 0 6px',borderBottom:'1px solid var(--border-default)',marginBottom:4}}>Cross Rental Network</div>
          <Input label="Tel" value={f.crossTel} onChange={v=>s('crossTel',v)} />
          <Input label="E-mail" value={f.crossEmail} onChange={v=>s('crossEmail',v)} type="email" />
          <div style={{fontSize:12,fontWeight:700,color:'var(--text-muted)',padding:'10px 0 6px',borderBottom:'1px solid var(--border-default)',marginBottom:4}}>Adres magazynu</div>
          <label className="set-checkbox">
            <input type="checkbox" checked={f.magSamJak} onChange={e=>s('magSamJak',e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
            Taki sam jak adres siedziby
          </label>
          {!f.magSamJak && <>
            <Input label="Adres" value={f.magAdres} onChange={v=>s('magAdres',v)} />
            <Input label="Kod pocztowy" value={f.magKod} onChange={v=>s('magKod',v)} />
            <Input label="Miasto" value={f.magMiasto} onChange={v=>s('magMiasto',v)} />
          </>}
        </div>
        <div className="set-col">
          <Field label="Dodatkowy tekst w stopce">
            <textarea value={f.stopkaText} onChange={e=>s('stopkaText',e.target.value)} rows={3}
              style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'7px 10px',fontSize:13,width:'100%',resize:'vertical'}} />
          </Field>
          <Input label="Wysokość stopki [mm]" value={f.stopkaWysokosc} onChange={v=>s('stopkaWysokosc',v)} type="number" />
          <Field label="Logo Firmy">
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {logo && <img src={logo} alt="Logo" style={{maxWidth:120,maxHeight:60,objectFit:'contain',background:'var(--bg-secondary)',padding:6,borderRadius:4}} />}
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <button onClick={()=>fileRef.current?.click()}
                  style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',padding:'6px 12px',borderRadius:'var(--radius)',fontSize:12,cursor:'pointer'}}>
                  <Upload size={12} style={{marginRight:4}}/>Wybierz plik
                </button>
                {logo && <button onClick={()=>setLogo(null)} style={{color:'var(--red)',background:'none',border:'none',cursor:'pointer',fontSize:12}}>Usuń logo</button>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}}
                onChange={e=>{const f=e.target.files[0];if(f)setLogo(URL.createObjectURL(f))}} />
            </div>
          </Field>
          <Select label="Widoczność firmy" value={f.widocznosc} onChange={v=>s('widocznosc',v)} options={['Widoczna','Ukryta']} />
        </div>
      </div>
      <SaveBtn />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   2. DZIAŁY FIRMY
═══════════════════════════════════════════════ */
function DzialyFirmy() {
  const [items, setItems] = useState(DZIALY_FIRMY)
  const [filterNazwa, setFilterNazwa] = useState('')
  const [adding, setAdding] = useState(false)
  const [newNazwa, setNewNazwa] = useState('')
  const [newKolor, setNewKolor] = useState('#00ff41')
  const [editing, setEditing] = useState(null)

  const active = items.filter(i => i.aktywny && (!filterNazwa || i.nazwa.toLowerCase().includes(filterNazwa.toLowerCase())))
  const inactive = items.filter(i => !i.aktywny)

  const add = () => {
    if (!newNazwa.trim()) return
    setItems(p => [...p, { id: Date.now(), nazwa: newNazwa.trim(), kolor: newKolor, aktywny: true }])
    setNewNazwa(''); setNewKolor('#00ff41'); setAdding(false)
  }
  const del = (id, n) => { if(window.confirm(`Usunąć dział "${n}"?`)) setItems(p => p.filter(i => i.id !== id)) }
  const toggleActive = (id) => setItems(p => p.map(i => i.id===id ? {...i, aktywny:!i.aktywny} : i))

  return (
    <div className="set-form">
      <div className="set-toolbar">
        <button className="btn btn-primary" style={{fontSize:12}} onClick={()=>setAdding(true)}><Plus size={12}/> Dodaj</button>
        <button className="set-btn-link" style={{marginLeft:'auto'}}>✏ Wyświetl wszystko</button>
      </div>

      {adding && (
        <div style={{display:'flex',gap:10,alignItems:'center',padding:'10px',background:'var(--bg-card)',border:'1px solid var(--green-border)',borderRadius:'var(--radius)',marginBottom:8}}>
          <input value={newNazwa} onChange={e=>setNewNazwa(e.target.value)} placeholder="Nazwa działu..."
            style={{flex:1,background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'6px 10px',fontSize:13}}
            onKeyDown={e=>e.key==='Enter'&&add()} autoFocus />
          <input type="color" value={newKolor} onChange={e=>setNewKolor(e.target.value)} style={{width:36,height:34,border:'none',cursor:'pointer',borderRadius:4}} />
          <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--text-muted)',width:70}}>{newKolor}</span>
          <button onClick={add} style={{background:'#22c55e',color:'#000',padding:'6px 12px',borderRadius:'var(--radius)',fontSize:12,fontWeight:700}}>✓ Dodaj</button>
          <button onClick={()=>setAdding(false)} style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-muted)',padding:'6px 10px',borderRadius:'var(--radius)',fontSize:12}}>Anuluj</button>
        </div>
      )}

      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr>
            <th style={{width:36}}>#</th>
            <th><div className="set-th-col">Nazwa<input className="set-col-filter" value={filterNazwa} onChange={e=>setFilterNazwa(e.target.value)} placeholder="Szukaj..." /></div></th>
            <th>Kolor</th>
            <th style={{width:100}}></th>
          </tr></thead>
          <tbody>
            {active.map((item,idx) => (
              <tr key={item.id}>
                <td className="set-num">{idx+1}</td>
                <td>
                  {editing===item.id
                    ? <input autoFocus value={item.nazwa}
                        onChange={e=>setItems(p=>p.map(i=>i.id===item.id?{...i,nazwa:e.target.value}:i))}
                        onBlur={()=>setEditing(null)} onKeyDown={e=>e.key==='Enter'&&setEditing(null)}
                        style={{background:'var(--bg-secondary)',border:'1px solid var(--green-border)',color:'var(--text-primary)',borderRadius:3,padding:'3px 8px',fontSize:13,width:'100%'}} />
                    : <span className="set-bold">{item.nazwa}</span>
                  }
                </td>
                <td>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{background:item.kolor,flex:1,height:28,borderRadius:3,display:'flex',alignItems:'center',paddingLeft:8}}>
                      <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'#fff',mixBlendMode:'difference'}}>{item.kolor}</span>
                    </div>
                    <input type="color" value={item.kolor}
                      onChange={e=>setItems(p=>p.map(i=>i.id===item.id?{...i,kolor:e.target.value}:i))}
                      style={{width:28,height:28,border:'none',cursor:'pointer',borderRadius:3}} />
                  </div>
                </td>
                <td><div className="set-actions">
                  <button className="set-act-btn" title="Dezaktywuj" onClick={()=>toggleActive(item.id)}><Eye size={12}/></button>
                  <button className="set-act-btn" onClick={()=>setEditing(item.id)}><Edit size={12}/></button>
                  <button className="set-act-btn set-act-btn--del" onClick={()=>del(item.id,item.nazwa)}><X size={12}/></button>
                </div></td>
              </tr>
            ))}
            {active.length===0 && <tr><td colSpan={4} className="set-empty">Brak aktywnych działów.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="set-section-label">Nieaktywne działy</div>
      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr><th>#</th><th>Nazwa</th><th>Kolor</th><th></th></tr></thead>
          <tbody>
            {inactive.length===0
              ? <tr><td colSpan={4} className="set-empty">Brak wyników.</td></tr>
              : inactive.map((item,idx)=>(
                <tr key={item.id} style={{opacity:0.6}}>
                  <td className="set-num">{idx+1}</td>
                  <td className="set-cell">{item.nazwa}</td>
                  <td><div style={{background:item.kolor,width:60,height:20,borderRadius:3}} /></td>
                  <td><button className="set-act-btn" onClick={()=>toggleActive(item.id)} title="Aktywuj">▶</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   3. ROLE NA WYDARZENIU
═══════════════════════════════════════════════ */
function RoleNaWydarzeniu() {
  const [items, setItems] = useState(ROLE_NA_WYDARZENIU)
  const [adding, setAdding] = useState(false)
  const [newNazwa, setNewNazwa] = useState('')
  const [newZgodnosc, setNewZgodnosc] = useState('Nie')
  const [filterNazwa, setFilterNazwa] = useState('')

  const filtered = items.filter(i => !filterNazwa || i.nazwa.toLowerCase().includes(filterNazwa.toLowerCase()))
  const add = () => {
    if (!newNazwa.trim()) return
    setItems(p=>[...p,{id:Date.now(),nazwa:newNazwa.trim(),wymagajZgodnosci:newZgodnosc==='Tak',stawka:'-'}])
    setNewNazwa(''); setAdding(false)
  }
  const del = (id,n) => { if(window.confirm(`Usunąć rolę "${n}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }

  return (
    <div className="set-form">
      <div className="set-toolbar">
        <button className="btn btn-primary" style={{fontSize:12}} onClick={()=>setAdding(true)}><Plus size={12}/> Dodaj</button>
        <button className="set-btn-link" style={{marginLeft:'auto'}}>✏ Wyświetl wszystko</button>
      </div>
      {adding && (
        <div style={{display:'flex',gap:10,alignItems:'center',padding:10,background:'var(--bg-card)',border:'1px solid var(--green-border)',borderRadius:'var(--radius)',marginBottom:8}}>
          <input value={newNazwa} onChange={e=>setNewNazwa(e.target.value)} placeholder="Nazwa roli..."
            style={{flex:1,background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'6px 10px',fontSize:13}}
            onKeyDown={e=>e.key==='Enter'&&add()} autoFocus />
          <select value={newZgodnosc} onChange={e=>setNewZgodnosc(e.target.value)}
            style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'6px 8px',fontSize:13}}>
            <option>Tak</option><option>Nie</option>
          </select>
          <button onClick={add} style={{background:'#22c55e',color:'#000',padding:'6px 12px',borderRadius:'var(--radius)',fontSize:12,fontWeight:700}}>✓ Dodaj</button>
          <button onClick={()=>setAdding(false)} style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-muted)',padding:'6px 10px',borderRadius:'var(--radius)',fontSize:12}}>Anuluj</button>
        </div>
      )}
      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr>
            <th style={{width:36}}>#</th>
            <th><div className="set-th-col">Nazwa<input className="set-col-filter" value={filterNazwa} onChange={e=>setFilterNazwa(e.target.value)} /></div></th>
            <th><div className="set-th-col">Wymagaj zgodności<select className="set-col-filter"><option></option><option>Tak</option><option>Nie</option></select></div></th>
            <th>Domyślna stawka przy rozliczaniu pracownika</th>
            <th style={{width:90}}></th>
          </tr></thead>
          <tbody>
            {filtered.map((item,idx) => (
              <tr key={item.id}>
                <td className="set-num">{idx+1}</td>
                <td><a href="#" className="set-link">{item.nazwa}</a></td>
                <td className="set-cell">
                  <span style={{color:item.wymagajZgodnosci?'var(--green-primary)':'var(--text-muted)'}}>{item.wymagajZgodnosci?'Tak':'Nie'}</span>
                </td>
                <td className="set-cell">{item.stawka}</td>
                <td><div className="set-actions">
                  <button className="set-act-btn"><Eye size={12}/></button>
                  <button className="set-act-btn"><Edit size={12}/></button>
                  <button className="set-act-btn set-act-btn--del" onClick={()=>del(item.id,item.nazwa)}><X size={12}/></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   4. OFERTY
═══════════════════════════════════════════════ */
function OfertyUstawienia() {
  const [segmenty, setSegmenty] = useState(SEGMENTY_OFERT)
  const [procentDnia, setProcentDnia] = useState('60')
  const [termin, setTermin] = useState('')
  const [warunki, setWarunki] = useState('BARDZO WAŻNE WARUNKI, PRACOWNICY PRACUJĄ 8H, PRZERWA 2H, POTEM MAX 4 H, PRZERWA 6H')
  const [aktywnyJezyk, setAktywnyJezyk] = useState('Polski')

  return (
    <div className="set-form">
      <div className="set-oferty-top">
        <div className="set-field" style={{maxWidth:220}}>
          <label>Procent dnia pierwszego</label>
          <div className="set-input-suffix"><input value={procentDnia} onChange={e=>setProcentDnia(e.target.value)} style={{width:'100%'}} /><span>%</span></div>
        </div>
        <div className="set-field" style={{maxWidth:220}}>
          <label>Domyślny termin płatności</label>
          <div className="set-input-suffix"><input value={termin} onChange={e=>setTermin(e.target.value)} /><span>dni</span></div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <label style={{fontSize:12,color:'var(--text-muted)'}}>Język warunków</label>
          <div className="set-lang-btns">
            {['Polski','Angielski','Niemiecki','Rosyjski','Węgierski'].map(l=>(
              <button key={l} className={`set-lang-btn ${aktywnyJezyk===l?'set-lang-btn--active':''}`} onClick={()=>setAktywnyJezyk(l)}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{marginTop:8}}>
        <label style={{fontSize:13,fontWeight:600,color:'var(--text-secondary)',display:'block',marginBottom:6}}>Kolory segmentów oferty</label>
        <div className="set-segmenty-table">
          <div className="set-segmenty-header">
            <span>Segment</span><span>Kolor segmentu</span><span>Kolor czcionki</span>
          </div>
          {segmenty.map((s,i) => (
            <div key={i} className="set-segment-row">
              <span className="set-segment-name">{s.nazwa}</span>
              <div className="set-color-input">
                <input type="color" value={s.kolor||'#e6b8af'}
                  onChange={e=>{const n=[...segmenty];n[i]={...n[i],kolor:e.target.value};setSegmenty(n)}}
                  style={{width:24,height:24,border:'none',cursor:'pointer',borderRadius:3}} />
                <input value={s.kolor||''} onChange={e=>{const n=[...segmenty];n[i]={...n[i],kolor:e.target.value};setSegmenty(n)}}
                  placeholder="Wybierz kolor..." className="set-color-text" />
              </div>
              <div className="set-color-input">
                <input type="color" value={s.kolorCzcionki||'#000000'}
                  onChange={e=>{const n=[...segmenty];n[i]={...n[i],kolorCzcionki:e.target.value};setSegmenty(n)}}
                  style={{width:24,height:24,border:'none',cursor:'pointer',borderRadius:3}} />
                <input value={s.kolorCzcionki||''} onChange={e=>{const n=[...segmenty];n[i]={...n[i],kolorCzcionki:e.target.value};setSegmenty(n)}}
                  placeholder="Wybierz kolor..." className="set-color-text" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="set-field" style={{marginTop:8}}>
        <label>Warunki zamówienia ({aktywnyJezyk})</label>
        <textarea value={warunki} onChange={e=>setWarunki(e.target.value)} rows={5}
          style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'8px 10px',fontSize:13,width:'100%',resize:'vertical'}} />
      </div>
      <SaveBtn />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   5. FINANSE
═══════════════════════════════════════════════ */
const FINANSE_TABS = ['Waluta','Serie faktur','Metody płatności','Stawki VAT','Ustawienia rozliczeń','Grupy cenowe','KSEF','Konta firmowe','Opisy FV']
function FinanseUstawienia() {
  const [ft, setFt] = useState('Waluta')
  const [waluta, setWaluta] = useState('złoty')
  const [walutaFaktur, setWalutaFaktur] = useState('PLN')
  const [serieFaktur, setSerieFaktur] = useState([
    {id:1,prefiks:'FV',rok:true,miesiac:false,numeracja:'rocznie',aktywna:true},
  ])
  const [stawkiVat, setStawkiVat] = useState([
    {id:1,nazwa:'23%',wartosc:23,domyslna:true},
    {id:2,nazwa:'8%',wartosc:8,domyslna:false},
    {id:3,nazwa:'5%',wartosc:5,domyslna:false},
    {id:4,nazwa:'0%',wartosc:0,domyslna:false},
    {id:5,nazwa:'ZW',wartosc:null,domyslna:false},
  ])
  const [metodPlatnosci, setMetodPlatnosci] = useState([
    {id:1,nazwa:'Przelew',domyslna:true},{id:2,nazwa:'Gotówka',domyslna:false},{id:3,nazwa:'Karta',domyslna:false},
  ])
  const [grupyCenowe, setGrupyCenowe] = useState([
    {id:1,nazwa:'Imprezy w Polsce',waluta:'PLN'},
    {id:2,nazwa:'Imprezy za Granicą',waluta:'EUR'},
  ])

  return (
    <div className="set-form">
      <div className="set-sub-tabs">
        {FINANSE_TABS.map(t=>(
          <button key={t} className={`set-sub-tab ${ft===t?'set-sub-tab--active':''}`} onClick={()=>setFt(t)}>{t}</button>
        ))}
      </div>

      {ft==='Waluta' && (
        <div style={{display:'flex',flexDirection:'column',gap:12,maxWidth:380}}>
          <Select label="Domyślna waluta systemowa" value={waluta} onChange={setWaluta} options={['złoty','euro','dolar','frank szwajcarski','funt brytyjski']} />
          <Select label="Domyślna waluta faktur" value={walutaFaktur} onChange={setWalutaFaktur} options={['PLN','EUR','USD','CHF','GBP']} />
          <SaveBtn />
        </div>
      )}

      {ft==='Serie faktur' && (
        <div>
          <div className="set-toolbar" style={{marginBottom:8}}>
            <button className="btn btn-primary" style={{fontSize:12}} onClick={()=>setSerieFaktur(p=>[...p,{id:Date.now(),prefiks:'',rok:true,miesiac:false,numeracja:'rocznie',aktywna:true}])}>
              <Plus size={12}/> Dodaj serię
            </button>
          </div>
          <div className="set-table-wrap">
            <table className="set-table">
              <thead><tr><th>#</th><th>Prefiks</th><th>Zawiera rok</th><th>Zawiera miesiąc</th><th>Numeracja</th><th>Aktywna</th><th style={{width:60}}></th></tr></thead>
              <tbody>
                {serieFaktur.map((s,i)=>(
                  <tr key={s.id}>
                    <td className="set-num">{i+1}</td>
                    <td><input value={s.prefiks} onChange={e=>setSerieFaktur(p=>p.map(x=>x.id===s.id?{...x,prefiks:e.target.value}:x))}
                      style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:3,padding:'4px 8px',fontSize:13,width:80}} /></td>
                    <td><input type="checkbox" checked={s.rok} onChange={e=>setSerieFaktur(p=>p.map(x=>x.id===s.id?{...x,rok:e.target.checked}:x))} style={{accentColor:'var(--green-primary)'}}/></td>
                    <td><input type="checkbox" checked={s.miesiac} onChange={e=>setSerieFaktur(p=>p.map(x=>x.id===s.id?{...x,miesiac:e.target.checked}:x))} style={{accentColor:'var(--green-primary)'}}/></td>
                    <td>
                      <select value={s.numeracja} onChange={e=>setSerieFaktur(p=>p.map(x=>x.id===s.id?{...x,numeracja:e.target.value}:x))}
                        style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:3,padding:'4px 6px',fontSize:12}}>
                        <option value="rocznie">Rocznie</option><option value="miesiecznie">Miesięcznie</option><option value="ciagla">Ciągła</option>
                      </select>
                    </td>
                    <td><input type="checkbox" checked={s.aktywna} onChange={e=>setSerieFaktur(p=>p.map(x=>x.id===s.id?{...x,aktywna:e.target.checked}:x))} style={{accentColor:'var(--green-primary)'}}/></td>
                    <td><button className="set-act-btn set-act-btn--del" onClick={()=>setSerieFaktur(p=>p.filter(x=>x.id!==s.id))}><X size={12}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{marginTop:10}}><SaveBtn /></div>
        </div>
      )}

      {ft==='Stawki VAT' && (
        <div>
          <div className="set-toolbar" style={{marginBottom:8}}>
            <button className="btn btn-primary" style={{fontSize:12}} onClick={()=>setStawkiVat(p=>[...p,{id:Date.now(),nazwa:'',wartosc:0,domyslna:false}])}>
              <Plus size={12}/> Dodaj stawkę
            </button>
          </div>
          <div className="set-table-wrap">
            <table className="set-table">
              <thead><tr><th>#</th><th>Nazwa</th><th>Wartość %</th><th>Domyślna</th><th style={{width:60}}></th></tr></thead>
              <tbody>
                {stawkiVat.map((s,i)=>(
                  <tr key={s.id}>
                    <td className="set-num">{i+1}</td>
                    <td><input value={s.nazwa} onChange={e=>setStawkiVat(p=>p.map(x=>x.id===s.id?{...x,nazwa:e.target.value}:x))}
                      style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:3,padding:'4px 8px',fontSize:13,width:80}} /></td>
                    <td><input type="number" value={s.wartosc??''} onChange={e=>setStawkiVat(p=>p.map(x=>x.id===s.id?{...x,wartosc:+e.target.value}:x))}
                      style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:3,padding:'4px 8px',fontSize:13,width:70,textAlign:'right'}} /></td>
                    <td>
                      <input type="radio" name="vat-default" checked={s.domyslna}
                        onChange={()=>setStawkiVat(p=>p.map(x=>({...x,domyslna:x.id===s.id})))}
                        style={{accentColor:'var(--green-primary)'}} />
                    </td>
                    <td><button className="set-act-btn set-act-btn--del" onClick={()=>setStawkiVat(p=>p.filter(x=>x.id!==s.id))}><X size={12}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{marginTop:10}}><SaveBtn /></div>
        </div>
      )}

      {ft==='Metody płatności' && (
        <div>
          <div className="set-toolbar" style={{marginBottom:8}}>
            <button className="btn btn-primary" style={{fontSize:12}} onClick={()=>setMetodPlatnosci(p=>[...p,{id:Date.now(),nazwa:'',domyslna:false}])}>
              <Plus size={12}/> Dodaj metodę
            </button>
          </div>
          <div className="set-table-wrap">
            <table className="set-table">
              <thead><tr><th>#</th><th>Nazwa</th><th>Domyślna</th><th style={{width:60}}></th></tr></thead>
              <tbody>
                {metodPlatnosci.map((m,i)=>(
                  <tr key={m.id}>
                    <td className="set-num">{i+1}</td>
                    <td><input value={m.nazwa} onChange={e=>setMetodPlatnosci(p=>p.map(x=>x.id===m.id?{...x,nazwa:e.target.value}:x))}
                      style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:3,padding:'4px 8px',fontSize:13,width:'100%'}} /></td>
                    <td><input type="radio" name="metoda-default" checked={m.domyslna}
                      onChange={()=>setMetodPlatnosci(p=>p.map(x=>({...x,domyslna:x.id===m.id})))}
                      style={{accentColor:'var(--green-primary)'}} /></td>
                    <td><button className="set-act-btn set-act-btn--del" onClick={()=>setMetodPlatnosci(p=>p.filter(x=>x.id!==m.id))}><X size={12}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{marginTop:10}}><SaveBtn /></div>
        </div>
      )}

      {ft==='Grupy cenowe' && (
        <div>
          <div className="set-toolbar" style={{marginBottom:8}}>
            <button className="btn btn-primary" style={{fontSize:12}} onClick={()=>setGrupyCenowe(p=>[...p,{id:Date.now(),nazwa:'',waluta:'PLN'}])}>
              <Plus size={12}/> Dodaj grupę
            </button>
          </div>
          <div className="set-table-wrap">
            <table className="set-table">
              <thead><tr><th>#</th><th>Nazwa grupy</th><th>Waluta</th><th style={{width:60}}></th></tr></thead>
              <tbody>
                {grupyCenowe.map((g,i)=>(
                  <tr key={g.id}>
                    <td className="set-num">{i+1}</td>
                    <td><input value={g.nazwa} onChange={e=>setGrupyCenowe(p=>p.map(x=>x.id===g.id?{...x,nazwa:e.target.value}:x))}
                      style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:3,padding:'4px 8px',fontSize:13,width:'100%'}} /></td>
                    <td>
                      <select value={g.waluta} onChange={e=>setGrupyCenowe(p=>p.map(x=>x.id===g.id?{...x,waluta:e.target.value}:x))}
                        style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:3,padding:'4px 6px',fontSize:12}}>
                        {['PLN','EUR','USD','GBP','CHF'].map(w=><option key={w}>{w}</option>)}
                      </select>
                    </td>
                    <td><button className="set-act-btn set-act-btn--del" onClick={()=>setGrupyCenowe(p=>p.filter(x=>x.id!==g.id))}><X size={12}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{marginTop:10}}><SaveBtn /></div>
        </div>
      )}

      {(ft==='Ustawienia rozliczeń'||ft==='KSEF'||ft==='Konta firmowe'||ft==='Opisy FV') && (
        <div style={{padding:'20px',background:'var(--bg-card)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)'}}>
          <h3 style={{color:'var(--text-primary)',marginBottom:12,fontFamily:'var(--font-display)'}}>{ft}</h3>
          <p style={{color:'var(--text-muted)',fontSize:13,marginBottom:16}}>Konfiguracja zakładki {ft}.</p>
          <SaveBtn />
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   6. POWIADOMIENIA
═══════════════════════════════════════════════ */
const POW_TEMPLATES = [
  { id:'konto', tytul:'Utworzenie konta', zmienne:'{username}, {imie}, {nazwisko}, {tel}, {mail}, {password}, {link}',
    defaultTresc:'Witaj {imie} {nazwisko}\n\nW systemie New Event Management zostało utworzone dla Ciebie konto.\n\nTwój login to: {username}\nTwoje tymczasowe hasło to: {password}\n\nZmienisz je przy pierwszym logowaniu {link}' },
  { id:'dodanie', tytul:'Dodanie użytkownika do eventu', zmienne:'{crewCreator}, {name}, {timeStart}, {timeEnd}, {link}',
    defaultTresc:'Witaj:) Zostałeś dodany do eventu {name}, który trwa od {timeStart} do {timeEnd}. Sprawdź w zakładce "kalendarz" czy nie został wyznaczony inny termin pakowania.\n\nZobacz swój event ({link})' },
  { id:'usuniecie', tytul:'Usunięcie użytkownika z eventu', zmienne:'Event: {name}, {timeStart}, {timeEnd}, {link}. User: {username}, {imie}, {nazwisko}, {tel}, {mail}',
    defaultTresc:'Witaj:) Zostałeś usunięty z eventu {name}, który trwa od {timeStart} do {timeEnd}.\n\nZobacz event ({link})' },
  { id:'zadanie', tytul:'Dodanie zadania dla użytkownika', zmienne:'Task: {tytul}, {opis}, {termin}. User: {username}, {imie}, {nazwisko}',
    defaultTresc:'Witaj:) {crewCreator} dodał/a dla Ciebie zadanie {name},\n\nZobacz swoje zadanie ({link})' },
]
function PowiadomieniaUstawienia() {
  const [autoWysylanie, setAutoWysylanie] = useState(false)
  const [wysylanie, setWysylanie] = useState(false)
  const [szablony, setSzablony] = useState(POW_TEMPLATES.map(t=>({...t,tresc:t.defaultTresc,email:true,sms:false,push:false})))
  const update = (id,k,v) => setSzablony(p=>p.map(s=>s.id===id?{...s,[k]:v}:s))

  return (
    <div className="set-form">
      <label className="set-checkbox set-checkbox--top">
        <input type="checkbox" checked={autoWysylanie} onChange={e=>setAutoWysylanie(e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
        Automatyczne wysyłanie powiadomień do eventów
      </label>
      <label className="set-checkbox">
        <input type="checkbox" checked={wysylanie} onChange={e=>setWysylanie(e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
        Wysyłanie powiadomień
      </label>
      <div className="set-pow-grid">
        {szablony.map(tmpl => (
          <div key={tmpl.id} className="set-pow-card">
            <div className="set-pow-header">{tmpl.tytul}</div>
            <div className="set-pow-vars">{tmpl.zmienne}</div>
            <div className="set-pow-label">Treść</div>
            <div className="set-pow-editor-bar">
              {['◇','¶','B','I','S'].map(b=><button key={b} className="set-pow-editor-btn">{b}</button>)}
            </div>
            <textarea className="set-pow-textarea" value={tmpl.tresc}
              onChange={e=>update(tmpl.id,'tresc',e.target.value)} rows={5} />
            <div className="set-pow-channels">
              {[['email','E-mail'],['sms','SMS'],['push','PUSH']].map(([k,l])=>(
                <label key={k} className="set-checkbox">
                  <input type="checkbox" checked={tmpl[k]} onChange={e=>update(tmpl.id,k,e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
                  {l}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <SaveBtn />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   7. UPRAWNIENIA
═══════════════════════════════════════════════ */
function UprawieniaUstawienia() {
  const [grupy, setGrupy] = useState(GRUPY_UPRAWNIEN)
  const [activeGrupa, setActiveGrupa] = useState(grupy[0])
  const [uprawnienia, setUprawnienia] = useState(
    UPRAWNIENIA_LIST.reduce((acc,u)=>({...acc,[u]:true}),{})
  )
  const toggle = (k) => setUprawnienia(p=>({...p,[k]:!p[k]}))
  const addGrupa = () => {
    const n = prompt('Nazwa nowej grupy:')
    if(n) setGrupy(p=>[...p,{id:Date.now(),nazwa:n,typ:'U'}])
  }

  return (
    <div className="set-form">
      <div className="set-perm-info">
        <span style={{fontSize:12.5,color:'var(--text-muted)'}}>Limit kont User: 6/</span>
        <span style={{fontSize:12.5,color:'var(--red)',fontWeight:700}}>Limit kont typu SuperUser: 3/</span>
      </div>
      <div className="set-perm-layout">
        <div className="set-perm-groups">
          <div className="set-perm-groups-label">Grupy użytkowników</div>
          {grupy.map(g=>(
            <div key={g.id} className={`set-perm-group-item ${activeGrupa.id===g.id?'set-perm-group-item--active':''}`}
              onClick={()=>setActiveGrupa(g)}>
              {g.nazwa}
            </div>
          ))}
          <button className="btn btn-primary" style={{fontSize:12,marginTop:8}} onClick={addGrupa}><Plus size={12}/> Dodaj</button>
          <button className="btn btn-ghost" style={{fontSize:12,marginTop:4}}>☰ Zarządzaj</button>
          <SaveBtn label="Zapisz" />
        </div>
        <div className="set-perm-users">
          <select style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'6px 10px',fontSize:13,width:'100%',marginBottom:6}}>
            <option>Wybierz użytkownika</option>
            {['Igor Dutczak','Karol L8 Studio','Project Manager','Support'].map(u=><option key={u}>{u}</option>)}
          </select>
          <div className="set-perm-users-label">Przypisani użytkownicy</div>
          {['Igor Dutczak','Karol L8 Studio','Project Manager','Support Newsystems'].map(u=>(
            <div key={u} className="set-perm-user-item">{u}</div>
          ))}
        </div>
        <div className="set-perm-checkboxes">
          {UPRAWNIENIA_LIST.map(u=>(
            <label key={u} className="set-perm-check">
              <input type="checkbox" checked={uprawnienia[u]||false} onChange={()=>toggle(u)} style={{accentColor:'var(--green-primary)'}}/>
              {u}
            </label>
          ))}
        </div>
        <div className="set-perm-su-users">
          <select style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'6px 10px',fontSize:13,width:'100%',marginBottom:6}}>
            <option>Wybierz użytkownika</option>
          </select>
          <div className="set-perm-users-label">Użytkownicy SuperUser</div>
          {['Fikuski Marcel','Kowalska Anna','Mańko Waldek','Piotrowski Łukasz','Rozłucki Włodzimierz','Wiśniewski Michał'].map(u=>(
            <div key={u} className="set-perm-user-item">{u}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   8. INDYWIDUALNE USTAWIENIA
═══════════════════════════════════════════════ */
function IndywidualneUstawienia() {
  const [crossRentalOsoba, setCrossRentalOsoba] = useState(['Dutczak Igor'])
  const [blokadaEdycji, setBlokadaEdycji] = useState([])
  const [domyslnaGrupa, setDomyslnaGrupa] = useState('Technicy (U)')
  const [autoZapis, setAutoZapis] = useState(true)
  const [sesjaTimeout, setSesjaTimeout] = useState('60')

  return (
    <div className="set-form" style={{maxWidth:600}}>
      <div className="set-field">
        <label>Osoba odpowiedzialna za Cross Rental</label>
        <div className="set-tag-input">
          {crossRentalOsoba.map(o=>(
            <span key={o} className="set-tag">{o}
              <button onClick={()=>setCrossRentalOsoba(p=>p.filter(x=>x!==o))}>×</button>
            </span>
          ))}
          <select onChange={e=>{if(e.target.value&&!crossRentalOsoba.includes(e.target.value)){setCrossRentalOsoba(p=>[...p,e.target.value]);e.target.value=''}}}
            style={{background:'none',border:'none',color:'var(--text-muted)',fontSize:13,cursor:'pointer',outline:'none'}}>
            <option value="">+ Dodaj osobę</option>
            {['Karol L8 Studio','Igor Dutczak','Anna Kowalska'].map(u=><option key={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <Select label="Użytkownicy mogący blokować edycję zakładek Flota i Ekipa"
        value={blokadaEdycji[0]||''}
        onChange={v=>setBlokadaEdycji(v?[v]:[])}
        options={[{value:'',label:'Wybierz...'},'Karol L8 Studio','Igor Dutczak','Anna Kowalska']} />
      <Select label="Domyślna grupa uprawnień dla nowych użytkowników"
        value={domyslnaGrupa} onChange={setDomyslnaGrupa}
        options={['Administrator (SU)','Project Managers (SU)','Technicy (U)','Technik minimum (U)']} />
      <div className="set-field">
        <label className="set-checkbox">
          <input type="checkbox" checked={autoZapis} onChange={e=>setAutoZapis(e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
          Automatyczny zapis formularzy
        </label>
      </div>
      <Input label="Czas sesji (minuty)" value={sesjaTimeout} onChange={setSesjaTimeout} type="number" />
      <SaveBtn />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   9. PERSONALIZACJA
═══════════════════════════════════════════════ */
const TYPY_EVENTU = [
  {nazwa:'SPOTKANIE',kolor:'#fff2cc',pasek:'#fff2cc',czcionka:'#000000'},
  {nazwa:'WYDARZENIE PRYWATNE',kolor:'#c27ba0',pasek:'',czcionka:'#000000'},
  {nazwa:'WYPOŻYCZENIE',kolor:'#d9d9d9',pasek:'#b3cbf1',czcionka:'#000000'},
  {nazwa:'URLOP NOWY',kolor:'#fafafa',pasek:'',czcionka:'#000000'},
  {nazwa:'URLOP ZAAKCEPTOWANY',kolor:'#90cb97',pasek:'',czcionka:'#000000'},
  {nazwa:'URLOP ODRZUCONY',kolor:'#f66767',pasek:'',czcionka:'#000000'},
  {nazwa:'PRODUKCJA',kolor:'',pasek:'',czcionka:'#000000'},
  {nazwa:'PRACE BIUROWE',kolor:'',pasek:'',czcionka:'#000000'},
  {nazwa:'PRACE MAGAZYNOWE',kolor:'',pasek:'',czcionka:'#000000'},
]
function PersonalizacjaUstawienia() {
  const [oddzialy, setOddzialy] = useState(['#ff0000','#00ff00','#0000ff'])
  const [typy, setTypy] = useState(TYPY_EVENTU)
  const [numeracjaEvent, setNumeracjaEvent] = useState('E[rok]/[miesiac]/[numer]')
  const [numeracjaWydanie, setNumeracjaWydanie] = useState('W/[rok]/[numer]')
  const [numeracjaOferta, setNumeracjaOferta] = useState('O/[rok]/[numer]')
  const updTyp = (i,k,v) => setTypy(p=>{ const n=[...p]; n[i]={...n[i],[k]:v}; return n })

  return (
    <div className="set-form">
      <div className="set-field">
        <label>Kolory oddziałów</label>
        <div className="set-oddzialy-row">
          {oddzialy.map((k,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:6,background:'var(--bg-secondary)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'4px 10px'}}>
              <input type="color" value={k} onChange={e=>{const n=[...oddzialy];n[i]=e.target.value;setOddzialy(n)}}
                style={{width:28,height:28,border:'none',cursor:'pointer',borderRadius:3}} />
              <input value={k} onChange={e=>{const n=[...oddzialy];n[i]=e.target.value;setOddzialy(n)}} className="set-color-text" />
            </div>
          ))}
          <button onClick={()=>setOddzialy(p=>[...p,'#888888'])}
            style={{background:'var(--bg-secondary)',border:'1px dashed var(--border-default)',color:'var(--text-muted)',padding:'4px 12px',borderRadius:'var(--radius)',fontSize:12,cursor:'pointer'}}>
            <Plus size={12}/> Dodaj oddział
          </button>
        </div>
      </div>

      <div className="set-field">
        <label>Kolory typów wydarzeń w kalendarzu</label>
        <div className="set-pers-table">
          <div className="set-pers-header">
            <span>Typ Eventu</span><span>Kolor segmentu</span><span>Kolor paska</span><span>Kolor czcionki</span>
          </div>
          {typy.map((t,i)=>(
            <div key={i} className="set-pers-row">
              <span className="set-pers-nazwa">{t.nazwa}</span>
              {['kolor','pasek','czcionka'].map(pole=>(
                <div key={pole} className="set-color-input">
                  <input type="color" value={t[pole]||'#ffffff'} onChange={e=>updTyp(i,pole,e.target.value)}
                    style={{width:22,height:22,border:'none',cursor:'pointer',borderRadius:3,flexShrink:0}} />
                  <input value={t[pole]||''} onChange={e=>updTyp(i,pole,e.target.value)}
                    placeholder="kolor..." className="set-color-text" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginTop:8}}>
        <Input label="Numeracja wydarzeń" value={numeracjaEvent} onChange={setNumeracjaEvent} />
        <Input label="Numeracja wydań" value={numeracjaWydanie} onChange={setNumeracjaWydanie} />
        <Input label="Numeracja ofert" value={numeracjaOferta} onChange={setNumeracjaOferta} />
      </div>
      <div style={{fontSize:11,color:'var(--text-muted)',marginTop:4,fontFamily:'var(--font-mono)'}}>
        Dostępne znaczniki: [numer] [dzien] [miesiac] [rok] [rok:format_dwucyfrowy]
      </div>
      <SaveBtn />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   10. JĘZYKI
═══════════════════════════════════════════════ */
function JezykiUstawienia() {
  const [jezyki, setJezyki] = useState([
    {id:1,kod:'pl',nazwa:'Polski',aktywny:true,domyslny:true},
    {id:2,kod:'en',nazwa:'Angielski',aktywny:true,domyslny:false},
    {id:3,kod:'de',nazwa:'Niemiecki',aktywny:false,domyslny:false},
    {id:4,kod:'ru',nazwa:'Rosyjski',aktywny:false,domyslny:false},
    {id:5,kod:'hu',nazwa:'Węgierski',aktywny:false,domyslny:false},
    {id:6,kod:'fr',nazwa:'Francuski',aktywny:false,domyslny:false},
  ])
  const toggle = (id,k) => setJezyki(p=>p.map(j=>j.id===id?{...j,[k]:!j[k]}:j))
  const setDomyslny = (id) => setJezyki(p=>p.map(j=>({...j,domyslny:j.id===id})))

  return (
    <div className="set-form">
      <div style={{marginBottom:8,fontSize:13,color:'var(--text-muted)'}}>
        Zaznacz języki dostępne w systemie. Język domyślny jest używany gdy brak tłumaczenia.
      </div>
      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr>
            <th style={{width:36}}>#</th>
            <th style={{width:60}}>Kod</th>
            <th>Język</th>
            <th>Aktywny</th>
            <th>Domyślny</th>
          </tr></thead>
          <tbody>
            {jezyki.map((j,i)=>(
              <tr key={j.id}>
                <td className="set-num">{i+1}</td>
                <td className="set-mono">{j.kod}</td>
                <td className="set-bold">{j.nazwa}</td>
                <td>
                  <label className="set-checkbox">
                    <input type="checkbox" checked={j.aktywny} onChange={()=>toggle(j.id,'aktywny')} style={{accentColor:'var(--green-primary)'}}/>
                    {j.aktywny?'TAK':'NIE'}
                  </label>
                </td>
                <td>
                  <input type="radio" name="jezyk-domyslny" checked={j.domyslny} onChange={()=>setDomyslny(j.id)} style={{accentColor:'var(--green-primary)'}}/>
                  {j.domyslny && <span style={{marginLeft:6,fontSize:11,color:'var(--green-primary)',fontWeight:700}}>Domyślny</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SaveBtn />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   11. FIRMY
═══════════════════════════════════════════════ */
function FirmyUstawienia() {
  const [items, setItems] = useState(FIRMY)
  const [search, setSearch] = useState('')
  const [adding, setAdding] = useState(false)
  const [newF, setNewF] = useState({nazwa:'',adres:'',kodPocztowy:'',miejscowosc:'',nip:''})
  const filtered = items.filter(i => !search || i.nazwa.toLowerCase().includes(search.toLowerCase()))

  const add = () => {
    if (!newF.nazwa.trim()) return
    setItems(p=>[...p,{id:Date.now(),...newF,glowna:false}])
    setNewF({nazwa:'',adres:'',kodPocztowy:'',miejscowosc:'',nip:''}); setAdding(false)
  }

  return (
    <div className="set-form">
      <div className="set-toolbar">
        <button className="btn btn-primary" style={{fontSize:12}} onClick={()=>setAdding(true)}><Plus size={12}/> Dodaj</button>
        <span style={{fontSize:12,color:'var(--text-muted)',fontStyle:'italic',marginLeft:8}}>Firma wiodąca - uprawnienia</span>
        <input placeholder="Wyszukaj użytkownika..." value={search} onChange={e=>setSearch(e.target.value)}
          style={{marginLeft:'auto',width:220,background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'5px 10px',fontSize:12}} />
      </div>

      {adding && (
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr auto',gap:8,alignItems:'end',padding:12,background:'var(--bg-card)',border:'1px solid var(--green-border)',borderRadius:'var(--radius)',marginBottom:8}}>
          {[['nazwa','Nazwa *'],['adres','Adres'],['kodPocztowy','Kod'],['miejscowosc','Miasto'],['nip','NIP']].map(([k,l])=>(
            <div key={k} style={{display:'flex',flexDirection:'column',gap:3}}>
              <label style={{fontSize:11,color:'var(--text-muted)'}}>{l}</label>
              <input value={newF[k]} onChange={e=>setNewF(p=>({...p,[k]:e.target.value}))} placeholder={l}
                style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:3,padding:'5px 8px',fontSize:13}} />
            </div>
          ))}
          <div style={{display:'flex',gap:6}}>
            <button onClick={add} style={{background:'#22c55e',color:'#000',padding:'6px 12px',borderRadius:'var(--radius)',fontSize:12,fontWeight:700,whiteSpace:'nowrap'}}>✓ Dodaj</button>
            <button onClick={()=>setAdding(false)} style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-muted)',padding:'6px 8px',borderRadius:'var(--radius)',fontSize:12}}>✕</button>
          </div>
        </div>
      )}

      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr>
            <th style={{width:36}}>#</th><th style={{width:50}}></th>
            <th>Nazwa</th><th>Adres</th><th>Kod pocztowy</th><th>Miejscowość</th><th>NIP</th>
            <th style={{width:90}}></th>
          </tr></thead>
          <tbody>
            {filtered.map((item,idx)=>(
              <tr key={item.id}>
                <td className="set-num">{idx+1}</td>
                <td>
                  {item.glowna
                    ? <div style={{width:40,height:28,background:'var(--green-primary)',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:700,color:'#000',textAlign:'center',lineHeight:1.1}}>L8<br/>Studio</div>
                    : <div style={{width:40,height:28,background:'var(--bg-secondary)',border:'1px solid var(--border-default)',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--text-muted)',fontSize:11}}>—</div>
                  }
                </td>
                <td className="set-bold">{item.nazwa}</td>
                <td className="set-cell">{item.adres||''}</td>
                <td className="set-mono">{item.kodPocztowy||''}</td>
                <td className="set-cell">{item.miejscowosc||''}</td>
                <td className="set-mono">{item.nip||''}</td>
                <td><div className="set-actions">
                  <button className="set-act-btn"><Eye size={12}/></button>
                  {!item.glowna && <>
                    <button className="set-act-btn"><Edit size={12}/></button>
                    <button className="set-act-btn set-act-btn--del" onClick={()=>setItems(p=>p.filter(i=>i.id!==item.id))}><X size={12}/></button>
                  </>}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   12. CROSS RENTAL
═══════════════════════════════════════════════ */
function CrossRentalUstawienia() {
  const [enabled, setEnabled] = useState(false)
  const [partnerzy, setPartnerzy] = useState([
    {id:1,nazwa:'RENTAL PRO Sp. z o.o.',nip:'123-456-78-90',email:'rental@pro.pl',status:'Aktywny'},
    {id:2,nazwa:'EventTech SA',nip:'987-654-32-10',email:'info@eventtech.pl',status:'Oczekujący'},
  ])
  const [autoAkceptacja, setAutoAkceptacja] = useState(false)
  const [widocznosc, setWidocznosc] = useState('Wszystkie kategorie')

  return (
    <div className="set-form">
      <div style={{background:'var(--bg-card)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:16,marginBottom:16}}>
        <h3 style={{fontFamily:'var(--font-display)',fontSize:15,color:'var(--text-primary)',marginBottom:12}}>Cross Rental Network</h3>
        <label className="set-checkbox" style={{marginBottom:10}}>
          <input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
          Włącz Cross Rental Network (wymiana sprzętu z partnerami)
        </label>
        {enabled && (
          <>
            <label className="set-checkbox" style={{marginBottom:10}}>
              <input type="checkbox" checked={autoAkceptacja} onChange={e=>setAutoAkceptacja(e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
              Automatyczna akceptacja zapytań od zaufanych partnerów
            </label>
            <Select label="Widoczność sprzętu dla partnerów" value={widocznosc} onChange={setWidocznosc}
              options={['Wszystkie kategorie','Wybrane kategorie','Tylko sprzęt oznaczony','Wyłączona']} />
          </>
        )}
      </div>

      {enabled && (
        <>
          <div className="set-toolbar">
            <button className="btn btn-primary" style={{fontSize:12}} onClick={()=>setPartnerzy(p=>[...p,{id:Date.now(),nazwa:'Nowy partner',nip:'',email:'',status:'Oczekujący'}])}>
              <Plus size={12}/> Dodaj partnera
            </button>
          </div>
          <div className="set-table-wrap">
            <table className="set-table">
              <thead><tr><th>#</th><th>Nazwa firmy</th><th>NIP</th><th>E-mail</th><th>Status</th><th style={{width:90}}></th></tr></thead>
              <tbody>
                {partnerzy.map((p,i)=>(
                  <tr key={p.id}>
                    <td className="set-num">{i+1}</td>
                    <td className="set-bold">{p.nazwa}</td>
                    <td className="set-mono">{p.nip}</td>
                    <td className="set-cell">{p.email}</td>
                    <td>
                      <span style={{fontSize:11,padding:'2px 8px',borderRadius:10,fontWeight:700,
                        background:p.status==='Aktywny'?'rgba(34,197,94,0.15)':'rgba(251,191,36,0.15)',
                        color:p.status==='Aktywny'?'#22c55e':'#fbbf24',
                        border:`1px solid ${p.status==='Aktywny'?'rgba(34,197,94,0.3)':'rgba(251,191,36,0.3)'}`}}>
                        {p.status}
                      </span>
                    </td>
                    <td><div className="set-actions">
                      <button className="set-act-btn"><Edit size={12}/></button>
                      <button className="set-act-btn set-act-btn--del" onClick={()=>setPartnerzy(pp=>pp.filter(x=>x.id!==p.id))}><X size={12}/></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <SaveBtn />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   13. WYDANIA / PRZYJĘCIA SPRZĘTU
═══════════════════════════════════════════════ */
function WydaniaUstawienia() {
  const [autoNumer, setAutoNumer] = useState(true)
  const [formatWydania, setFormatWydania] = useState('W/[rok]/[numer]')
  const [formatPrzyjecia, setFormatPrzyjecia] = useState('P/[rok]/[numer]')
  const [wymagajPotwierdzenia, setWymagajPotwierdzenia] = useState(true)
  const [drukujPokwitowanie, setDrukujPokwitowanie] = useState(true)
  const [statusy, setStatusy] = useState([
    {id:1,nazwa:'Wydano',kolor:'#f97316',typ:'wydanie'},
    {id:2,nazwa:'Przyjęto',kolor:'#22c55e',typ:'przyjecie'},
    {id:3,nazwa:'Częściowo przyjęto',kolor:'#fbbf24',typ:'przyjecie'},
    {id:4,nazwa:'Niezwrócony',kolor:'#ef4444',typ:'wydanie'},
  ])

  return (
    <div className="set-form">
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
        <div style={{background:'var(--bg-card)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:14}}>
          <h4 style={{fontFamily:'var(--font-display)',fontSize:13,color:'var(--text-primary)',marginBottom:10,letterSpacing:'0.05em'}}>USTAWIENIA OGÓLNE</h4>
          <label className="set-checkbox" style={{marginBottom:8}}>
            <input type="checkbox" checked={autoNumer} onChange={e=>setAutoNumer(e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
            Automatyczna numeracja dokumentów
          </label>
          <Input label="Format numeracji — Wydania" value={formatWydania} onChange={setFormatWydania} />
          <Input label="Format numeracji — Przyjęcia" value={formatPrzyjecia} onChange={setFormatPrzyjecia} />
          <div style={{fontSize:11,color:'var(--text-muted)',fontFamily:'var(--font-mono)',marginBottom:8}}>
            Znaczniki: [rok] [miesiac] [dzien] [numer]
          </div>
          <label className="set-checkbox" style={{marginBottom:8}}>
            <input type="checkbox" checked={wymagajPotwierdzenia} onChange={e=>setWymagajPotwierdzenia(e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
            Wymagaj potwierdzenia przed wydaniem/przyjęciem
          </label>
          <label className="set-checkbox">
            <input type="checkbox" checked={drukujPokwitowanie} onChange={e=>setDrukujPokwitowanie(e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
            Generuj pokwitowanie PDF po każdej operacji
          </label>
        </div>

        <div style={{background:'var(--bg-card)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:14}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <h4 style={{fontFamily:'var(--font-display)',fontSize:13,color:'var(--text-primary)',letterSpacing:'0.05em'}}>STATUSY OPERACJI</h4>
            <button className="btn btn-primary" style={{fontSize:11}} onClick={()=>setStatusy(p=>[...p,{id:Date.now(),nazwa:'Nowy status',kolor:'#888',typ:'wydanie'}])}>
              <Plus size={11}/> Dodaj
            </button>
          </div>
          {statusy.map(s=>(
            <div key={s.id} style={{display:'flex',alignItems:'center',gap:8,marginBottom:6,padding:'6px 10px',background:'var(--bg-secondary)',borderRadius:'var(--radius)',border:'1px solid var(--border-default)'}}>
              <input type="color" value={s.kolor} onChange={e=>setStatusy(p=>p.map(x=>x.id===s.id?{...x,kolor:e.target.value}:x))}
                style={{width:26,height:26,border:'none',cursor:'pointer',borderRadius:3}} />
              <input value={s.nazwa} onChange={e=>setStatusy(p=>p.map(x=>x.id===s.id?{...x,nazwa:e.target.value}:x))}
                style={{flex:1,background:'none',border:'none',color:'var(--text-primary)',fontSize:13,outline:'none'}} />
              <select value={s.typ} onChange={e=>setStatusy(p=>p.map(x=>x.id===s.id?{...x,typ:e.target.value}:x))}
                style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-muted)',borderRadius:3,padding:'3px 6px',fontSize:11}}>
                <option value="wydanie">Wydanie</option><option value="przyjecie">Przyjęcie</option>
              </select>
              <button className="set-act-btn set-act-btn--del" onClick={()=>setStatusy(p=>p.filter(x=>x.id!==s.id))}><X size={11}/></button>
            </div>
          ))}
        </div>
      </div>
      <SaveBtn />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   PDF / WYDRUK — pełna personalizacja
═══════════════════════════════════════════════ */
function PDFWydrukUstawienia() {
  const fileLogoRef = useRef()
  const fileWodRef  = useRef()

  const [logo,       setLogo]       = useState(null)
  const [wodoznak,   setWodoznak]   = useState(null)
  const [preview,    setPreview]    = useState(false)

  // ── KOLORY I CZCIONKI ──
  const [kolorNaglowek,  setKolorNaglowek]  = useState('#1a1a2e')
  const [kolorAkcent,    setKolorAkcent]    = useState('#007a1e')
  const [kolorTekst,     setKolorTekst]     = useState('#222222')
  const [kolorTabela,    setKolorTabela]    = useState('#f0f7f0')
  const [kolorStopka,    setKolorStopka]    = useState('#f5f5f5')
  const [czcionka,       setCzcionka]       = useState('Arial')
  const [rozmiarTytul,   setRozmiarTytul]   = useState('18')
  const [rozmiarTekst,   setRozmiarTekst]   = useState('11')
  const [rozmiarTabela,  setRozmiarTabela]  = useState('10')

  // ── NAGŁÓWEK ──
  const [pokazLogo,      setPokazLogo]      = useState(true)
  const [pozycjaLogo,    setPozycjaLogo]    = useState('lewo')
  const [rozmiarLogo,    setRozmiarLogo]    = useState('sredni')
  const [tytulPDF,       setTytulPDF]       = useState('OFERTA')
  const [podtytul,       setPodtytul]       = useState('L8 Studio — Event Management')
  const [pokazNrOferty,  setPokazNrOferty]  = useState(true)
  const [pokazDate,      setPokazDate]      = useState(true)
  const [pokazKierownika,setPokazKierownika]= useState(true)

  // ── SEKCJE ──
  const [pokazTransport, setPokazTransport] = useState(true)
  const [pokazObsluge,   setPokazObsluge]   = useState(true)
  const [pokazInne,      setPokazInne]      = useState(true)
  const [pokazPodsumowanie, setPokazPodsumowanie] = useState(true)
  const [pokazWarunki,   setPokazWarunki]   = useState(true)

  // ── KOLORY SEKCJI ──
  const [kolorTransport, setKolorTransport] = useState('#1d4ed8')
  const [kolorObsluga,   setKolorObsluga]   = useState('#dc2626')
  const [kolorInne,      setKolorInne]      = useState('#f97316')
  const [kolorSprzet,    setKolorSprzet]    = useState('#7c3aed')

  // ── KOLUMNY W TABELI ──
  const [kolumny, setKolumny] = useState([
    { id:'nazwa',       label:'Nazwa pozycji',    show:true,  obowiazkowa:true },
    { id:'opis',        label:'Opis',              show:true,  obowiazkowa:false },
    { id:'ilosc',       label:'Ilość',             show:true,  obowiazkowa:false },
    { id:'cena',        label:'Cena jedn.',        show:true,  obowiazkowa:false },
    { id:'przelicznik', label:'Przelicznik',       show:false, obowiazkowa:false },
    { id:'vat',         label:'VAT',               show:true,  obowiazkowa:false },
    { id:'razem',       label:'Razem netto',       show:true,  obowiazkowa:true },
    { id:'razem_brutto',label:'Razem brutto',      show:false, obowiazkowa:false },
  ])
  const toggleKolumna = (id) => setKolumny(p=>p.map(k=>k.id===id&&!k.obowiazkowa?{...k,show:!k.show}:k))

  // ── STOPKA ──
  const [pokazStopke,    setPokazStopke]    = useState(true)
  const [stopkaTekst,    setStopkaTekst]    = useState('L8 Studio | ul. Przykładowa 1, 00-001 Warszawa | tel: +48 729 911 512 | karol@l8studio.pl')
  const [pokazNrStrony,  setPokazNrStrony]  = useState(true)
  const [pokazWodoznak,  setPokazWodoznak]  = useState(false)

  // ── WARUNKI ZAMÓWIENIA ──
  const [warunkiTekst,   setWarunkiTekst]   = useState('BARDZO WAŻNE WARUNKI, PRACOWNICY PRACUJĄ 8H, PRZERWA 2H, POTEM MAX 4H, PRZERWA 6H')
  const [pokazWarunkiNaKoncu, setPokazWarunkiNaKoncu] = useState(true)

  // ── MARGINESY ──
  const [marginesGora,   setMarginesGora]   = useState('20')
  const [marginesDol,    setMarginesDol]    = useState('20')
  const [marginesLewo,   setMarginesLewo]   = useState('15')
  const [marginesPrawo,  setMarginesPrawo]  = useState('15')

  const CZCIONKI = ['Arial','Helvetica','Times New Roman','Georgia','Trebuchet MS','Verdana']
  const POZYCJE_LOGO = [{v:'lewo',l:'Do lewej'},{v:'prawo',l:'Do prawej'},{v:'srodek',l:'Na środku'}]
  const ROZMIARY_LOGO = [{v:'maly',l:'Mały (30px)'},{v:'sredni',l:'Średni (50px)'},{v:'duzy',l:'Duży (70px)'}]

  const ColorRow = ({label, value, onChange}) => (
    <div style={{display:'flex',alignItems:'center',gap:10,padding:'7px 0',borderBottom:'1px solid rgba(0,255,65,0.04)'}}>
      <span style={{flex:1,fontSize:13,color:'var(--text-secondary)'}}>{label}</span>
      <input type="color" value={value} onChange={e=>onChange(e.target.value)}
        style={{width:36,height:32,border:'1px solid var(--border-default)',cursor:'pointer',borderRadius:4,background:'none'}}/>
      <input value={value} onChange={e=>onChange(e.target.value)}
        style={{width:90,background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'5px 8px',fontSize:12,fontFamily:'var(--font-mono)'}}/>
    </div>
  )

  const SectionTitle = ({children}) => (
    <div style={{fontFamily:'var(--font-display)',fontSize:13,fontWeight:700,color:'var(--green-primary)',
      letterSpacing:'0.06em',padding:'12px 0 6px',borderBottom:'1px solid var(--border-default)',marginBottom:8,marginTop:16}}>
      {children}
    </div>
  )

  const Toggle = ({label, value, onChange, desc}) => (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(0,255,65,0.04)'}}>
      <div>
        <div style={{fontSize:13,color:'var(--text-secondary)'}}>{label}</div>
        {desc && <div style={{fontSize:11,color:'var(--text-muted)'}}>{desc}</div>}
      </div>
      <label style={{position:'relative',display:'inline-flex',alignItems:'center',cursor:'pointer',gap:8}}>
        <input type="checkbox" checked={value} onChange={e=>onChange(e.target.checked)}
          style={{width:16,height:16,accentColor:'var(--green-primary)'}}/>
        <span style={{fontSize:12,color:value?'var(--green-primary)':'var(--text-muted)',fontWeight:600}}>{value?'TAK':'NIE'}</span>
      </label>
    </div>
  )

  return (
    <div className="set-form">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:8}}>
        <div>
          <h3 style={{fontFamily:'var(--font-display)',fontSize:16,fontWeight:700,color:'var(--text-primary)'}}>Personalizacja wydruku PDF</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginTop:3}}>Dostosuj wygląd oferty wysyłanej do klientów</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>setPreview(!preview)}
            style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',
              padding:'8px 16px',borderRadius:'var(--radius)',fontSize:12,fontWeight:600,cursor:'pointer'}}>
            {preview ? '✕ Zamknij podgląd' : '👁 Podgląd PDF'}
          </button>
          <SaveBtn />
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:preview?'1fr 1fr':'1fr',gap:24}}>

        {/* ── LEWA: USTAWIENIA ── */}
        <div>

          {/* LOGO I NAGŁÓWEK */}
          <SectionTitle>📄 Nagłówek dokumentu</SectionTitle>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div>
              <Toggle label="Pokaż logo firmy" value={pokazLogo} onChange={setPokazLogo} />
              {pokazLogo && (
                <>
                  <div style={{margin:'8px 0'}}>
                    <label style={{fontSize:12,color:'var(--text-muted)',display:'block',marginBottom:4}}>Plik logo</label>
                    <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
                      {logo && <img src={logo} alt="logo" style={{height:40,maxWidth:120,objectFit:'contain',background:'var(--bg-secondary)',padding:4,borderRadius:4}}/>}
                      <button onClick={()=>fileLogoRef.current?.click()}
                        style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',padding:'6px 12px',borderRadius:'var(--radius)',fontSize:12,cursor:'pointer'}}>
                        ⬆ {logo?'Zmień logo':'Wybierz logo'}
                      </button>
                      {logo && <button onClick={()=>setLogo(null)} style={{background:'none',color:'var(--red)',border:'none',cursor:'pointer',fontSize:12}}>Usuń</button>}
                      <input ref={fileLogoRef} type="file" accept="image/*" style={{display:'none'}}
                        onChange={e=>{const f=e.target.files[0];if(f)setLogo(URL.createObjectURL(f))}}/>
                    </div>
                  </div>
                  <div className="set-field">
                    <label>Pozycja logo</label>
                    <select value={pozycjaLogo} onChange={e=>setPozycjaLogo(e.target.value)}>
                      {POZYCJE_LOGO.map(p=><option key={p.v} value={p.v}>{p.l}</option>)}
                    </select>
                  </div>
                  <div className="set-field">
                    <label>Rozmiar logo</label>
                    <select value={rozmiarLogo} onChange={e=>setRozmiarLogo(e.target.value)}>
                      {ROZMIARY_LOGO.map(r=><option key={r.v} value={r.v}>{r.l}</option>)}
                    </select>
                  </div>
                </>
              )}
            </div>
            <div>
              <div className="set-field"><label>Tytuł dokumentu</label>
                <input value={tytulPDF} onChange={e=>setTytulPDF(e.target.value)}
                  style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'7px 10px',fontSize:13}}/>
              </div>
              <div className="set-field"><label>Podtytuł / nazwa firmy</label>
                <input value={podtytul} onChange={e=>setPodtytul(e.target.value)}
                  style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'7px 10px',fontSize:13}}/>
              </div>
              <Toggle label="Nr oferty w nagłówku"   value={pokazNrOferty}   onChange={setPokazNrOferty} />
              <Toggle label="Data sporządzenia"       value={pokazDate}       onChange={setPokazDate} />
              <Toggle label="Dane kierownika projektu"value={pokazKierownika} onChange={setPokazKierownika} />
            </div>
          </div>

          {/* CZCIONKI */}
          <SectionTitle>🔤 Czcionki i rozmiary</SectionTitle>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:10}}>
            <div className="set-field">
              <label>Czcionka główna</label>
              <select value={czcionka} onChange={e=>setCzcionka(e.target.value)}>
                {CZCIONKI.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="set-field">
              <label>Rozmiar tytułu</label>
              <input type="number" value={rozmiarTytul} onChange={e=>setRozmiarTytul(e.target.value)} min="12" max="32"/>
            </div>
            <div className="set-field">
              <label>Rozmiar tekstu</label>
              <input type="number" value={rozmiarTekst} onChange={e=>setRozmiarTekst(e.target.value)} min="8" max="16"/>
            </div>
            <div className="set-field">
              <label>Rozmiar tabeli</label>
              <input type="number" value={rozmiarTabela} onChange={e=>setRozmiarTabela(e.target.value)} min="7" max="14"/>
            </div>
          </div>

          {/* KOLORY */}
          <SectionTitle>🎨 Paleta kolorów</SectionTitle>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px'}}>
            <div>
              <ColorRow label="Kolor nagłówka"     value={kolorNaglowek}  onChange={setKolorNaglowek}/>
              <ColorRow label="Kolor akcentów"      value={kolorAkcent}    onChange={setKolorAkcent}/>
              <ColorRow label="Kolor tekstu"        value={kolorTekst}     onChange={setKolorTekst}/>
              <ColorRow label="Tło tabel (parzyste)"value={kolorTabela}    onChange={setKolorTabela}/>
              <ColorRow label="Tło stopki"          value={kolorStopka}    onChange={setKolorStopka}/>
            </div>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:'var(--text-muted)',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.08em'}}>Kolory nagłówków sekcji</div>
              <ColorRow label="Transport"           value={kolorTransport} onChange={setKolorTransport}/>
              <ColorRow label="Obsługa techniczna"  value={kolorObsluga}   onChange={setKolorObsluga}/>
              <ColorRow label="Inne / Scenografia"  value={kolorInne}      onChange={setKolorInne}/>
              <ColorRow label="Sprzęt"              value={kolorSprzet}    onChange={setKolorSprzet}/>
            </div>
          </div>

          {/* SEKCJE DOKUMENTU */}
          <SectionTitle>📋 Sekcje dokumentu</SectionTitle>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px'}}>
            <div>
              <Toggle label="Sekcja Transport"       value={pokazTransport}   onChange={setPokazTransport}/>
              <Toggle label="Sekcja Obsługa"         value={pokazObsluge}     onChange={setPokazObsluge}/>
              <Toggle label="Sekcja Inne/Scenografia"value={pokazInne}        onChange={setPokazInne}/>
            </div>
            <div>
              <Toggle label="Podsumowanie kosztów"   value={pokazPodsumowanie}onChange={setPokazPodsumowanie}/>
              <Toggle label="Warunki zamówienia"      value={pokazWarunki}     onChange={setPokazWarunki}/>
              <Toggle label="Warunki na końcu dok."   value={pokazWarunkiNaKoncu} onChange={setPokazWarunkiNaKoncu}/>
            </div>
          </div>

          {/* KOLUMNY TABELI */}
          <SectionTitle>📊 Kolumny w tabelach</SectionTitle>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6}}>
            {kolumny.map(k=>(
              <label key={k.id} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 10px',
                background:'var(--bg-card)',border:`1px solid ${k.show?'var(--green-border)':'var(--border-default)'}`,
                borderRadius:'var(--radius)',cursor:k.obowiazkowa?'not-allowed':'pointer',
                opacity:k.obowiazkowa?0.6:1,fontSize:12,color:'var(--text-secondary)'}}>
                <input type="checkbox" checked={k.show} onChange={()=>toggleKolumna(k.id)}
                  disabled={k.obowiazkowa} style={{accentColor:'var(--green-primary)'}}/>
                {k.label}
                {k.obowiazkowa && <span style={{fontSize:9,color:'var(--text-muted)',marginLeft:'auto'}}>obowiązkowa</span>}
              </label>
            ))}
          </div>

          {/* STOPKA */}
          <SectionTitle>📎 Stopka dokumentu</SectionTitle>
          <Toggle label="Pokaż stopkę"       value={pokazStopke}   onChange={setPokazStopke}/>
          {pokazStopke && (
            <div className="set-field" style={{marginTop:8}}>
              <label>Tekst stopki</label>
              <textarea value={stopkaTekst} onChange={e=>setStopkaTekst(e.target.value)} rows={2}
                style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',
                  borderRadius:'var(--radius)',padding:'7px 10px',fontSize:13,width:'100%',resize:'vertical'}}/>
              <div style={{fontSize:11,color:'var(--text-muted)',marginTop:3}}>
                Dostępne znaczniki: {'{{nazwa_firmy}}'} {'{{nip}}'} {'{{email}}'} {'{{telefon}}'} {'{{adres}}'}
              </div>
            </div>
          )}
          <Toggle label="Numer strony w stopce" value={pokazNrStrony} onChange={setPokazNrStrony}/>
          <div style={{marginTop:8}}>
            <Toggle label="Znak wodny na dokumentach PRÓBA" value={pokazWodoznak} onChange={setPokazWodoznak}
              desc="Nakłada półprzezroczysty napis PRÓBA na każdej stronie"/>
            {pokazWodoznak && (
              <div style={{marginTop:8,display:'flex',gap:8,alignItems:'center'}}>
                {wodoznak
                  ? <img src={wodoznak} alt="" style={{height:30,opacity:0.4}}/>
                  : <span style={{fontSize:12,color:'var(--text-muted)'}}>Domyślny tekst "PRÓBA"</span>
                }
                <button onClick={()=>fileWodRef.current?.click()}
                  style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',padding:'5px 10px',borderRadius:'var(--radius)',fontSize:12,cursor:'pointer'}}>
                  Własny obraz znaku wodnego
                </button>
                <input ref={fileWodRef} type="file" accept="image/*" style={{display:'none'}}
                  onChange={e=>{const f=e.target.files[0];if(f)setWodoznak(URL.createObjectURL(f))}}/>
              </div>
            )}
          </div>

          {/* WARUNKI */}
          <SectionTitle>📝 Warunki zamówienia</SectionTitle>
          <div className="set-field">
            <label>Domyślny tekst warunków (drukowany na ofercie)</label>
            <textarea value={warunkiTekst} onChange={e=>setWarunkiTekst(e.target.value)} rows={4}
              style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',
                borderRadius:'var(--radius)',padding:'8px 10px',fontSize:13,width:'100%',resize:'vertical'}}/>
          </div>

          {/* MARGINESY */}
          <SectionTitle>📐 Marginesy strony [mm]</SectionTitle>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:10}}>
            {[['Góra',marginesGora,setMarginesGora],['Dół',marginesDol,setMarginesDol],
              ['Lewy',marginesLewo,setMarginesLewo],['Prawy',marginesPrawo,setMarginesPrawo]].map(([l,v,fn])=>(
              <div key={l} className="set-field">
                <label>{l}</label>
                <input type="number" value={v} onChange={e=>fn(e.target.value)} min="5" max="50"
                  style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'7px 10px',fontSize:13,textAlign:'center'}}/>
              </div>
            ))}
          </div>

          <div style={{marginTop:16}}>
            <SaveBtn label="Zapisz ustawienia PDF" />
          </div>
        </div>

        {/* ── PRAWA: PODGLĄD ── */}
        {preview && (
          <div style={{position:'sticky',top:10,maxHeight:'90vh',overflowY:'auto'}}>
            <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:8,textAlign:'center'}}>PODGLĄD — przybliżony wygląd wydruku</div>
            <div style={{
              background:'#fff', color:'#000', padding:`${marginesGora}px ${marginesPrawo}px ${marginesDol}px ${marginesLewo}px`,
              fontFamily:czcionka, fontSize:`${rozmiarTekst}px`, borderRadius:4,
              boxShadow:'0 4px 20px rgba(0,0,0,0.4)', minHeight:500,
            }}>
              {/* Nagłówek */}
              <div style={{display:'flex',alignItems:pozycjaLogo==='srodek'?'center':'flex-start',
                justifyContent:pozycjaLogo==='prawo'?'space-between':pozycjaLogo==='srodek'?'center':'flex-start',
                gap:12,marginBottom:20,paddingBottom:12,borderBottom:`2px solid ${kolorAkcent}`}}>
                {pokazLogo && logo && (
                  <img src={logo} alt="logo"
                    style={{height:rozmiarLogo==='maly'?30:rozmiarLogo==='sredni'?50:70,objectFit:'contain'}}/>
                )}
                <div style={{textAlign:pozycjaLogo==='prawo'?'right':pozycjaLogo==='srodek'?'center':'left'}}>
                  <div style={{fontSize:`${rozmiarTytul}px`,fontWeight:700,color:kolorNaglowek,letterSpacing:'0.05em'}}>{tytulPDF}</div>
                  <div style={{fontSize:12,color:'#666',marginTop:2}}>{podtytul}</div>
                </div>
                {pozycjaLogo==='prawo' && pokazLogo && logo && <img src={logo} alt="" style={{height:50,objectFit:'contain'}}/>}
              </div>

              {/* Info */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16,fontSize:11}}>
                <div>
                  <div style={{fontWeight:700,marginBottom:4,color:kolorNaglowek}}>Klient:</div>
                  <div>Przykładowy Klient Sp. z o.o.</div>
                  <div>ul. Testowa 1, 00-001 Warszawa</div>
                </div>
                <div style={{textAlign:'right'}}>
                  {pokazNrOferty && <div><strong>Nr oferty:</strong> O/2026/1</div>}
                  {pokazDate     && <div><strong>Data:</strong> {new Date().toLocaleDateString('pl-PL')}</div>}
                  {pokazKierownika && <div style={{marginTop:4}}><strong>Kierownik:</strong> Karol Dutczak</div>}
                </div>
              </div>

              {/* Sekcje */}
              {pokazTransport && (
                <div style={{marginBottom:10}}>
                  <div style={{background:kolorTransport,color:'#fff',padding:'4px 8px',fontWeight:700,fontSize:11}}>TRANSPORT</div>
                  <table style={{width:'100%',borderCollapse:'collapse',fontSize:`${rozmiarTabela}px`}}>
                    <thead><tr style={{background:kolorTabela}}>
                      {kolumny.filter(k=>k.show).map(k=>(
                        <th key={k.id} style={{padding:'3px 6px',textAlign:'left',borderBottom:`1px solid ${kolorAkcent}`,fontSize:10}}>{k.label.toUpperCase()}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {[['Samochód dostawczy — Montaż','',1,'1.00 d','23%','700,00 zł'],
                        ['Samochód osobowy — Montaż','',1,'1.00 d','23%','300,00 zł']].map((r,i)=>(
                        <tr key={i} style={{background:i%2===0?'#fff':kolorTabela}}>
                          {kolumny.filter(k=>k.show).map((k,j)=>(
                            <td key={k.id} style={{padding:'3px 6px',borderBottom:'1px solid #eee',color:kolorTekst}}>
                              {r[j]||'—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr style={{fontWeight:700,background:kolorTabela}}>
                        <td colSpan={kolumny.filter(k=>k.show).length-1} style={{padding:'3px 6px',fontSize:10}}>Łącznie Transport</td>
                        <td style={{padding:'3px 6px',textAlign:'right',fontWeight:700}}>1 000,00 zł</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {pokazObsluge && (
                <div style={{marginBottom:10}}>
                  <div style={{background:kolorObsluga,color:'#fff',padding:'4px 8px',fontWeight:700,fontSize:11}}>OBSŁUGA TECHNICZNA</div>
                  <table style={{width:'100%',borderCollapse:'collapse',fontSize:`${rozmiarTabela}px`}}>
                    <thead><tr style={{background:kolorTabela}}>
                      {kolumny.filter(k=>k.show).map(k=>(
                        <th key={k.id} style={{padding:'3px 6px',textAlign:'left',borderBottom:`1px solid ${kolorAkcent}`,fontSize:10}}>{k.label.toUpperCase()}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      <tr style={{background:'#fff'}}>
                        {kolumny.filter(k=>k.show).map((k,j)=>(
                          <td key={k.id} style={{padding:'3px 6px',color:kolorTekst}}>
                            {['Technik Scenografii','Montaż',4,'1.00','23%','3 200,00 zł'][j]||'—'}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {pokazPodsumowanie && (
                <div style={{marginTop:16,padding:'8px 10px',background:kolorTabela,border:`1px solid ${kolorAkcent}`,fontSize:11}}>
                  <div style={{fontWeight:700,marginBottom:6,color:kolorNaglowek}}>PODSUMOWANIE</div>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:2}}><span>Koszt transportu:</span><span style={{fontWeight:700}}>1 000,00 zł</span></div>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:2}}><span>Koszt obsługi:</span><span style={{fontWeight:700}}>3 200,00 zł</span></div>
                  <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #ccc',paddingTop:4,marginTop:4}}><strong>RAZEM NETTO:</strong><strong>4 200,00 zł</strong></div>
                </div>
              )}

              {pokazWarunki && pokazWarunkiNaKoncu && (
                <div style={{marginTop:16,padding:'8px 10px',background:'#f9f9f9',border:'1px solid #ddd',fontSize:10,color:'#555'}}>
                  <strong>WARUNKI ZAMÓWIENIA:</strong><br/>{warunkiTekst}
                </div>
              )}

              {pokazStopke && (
                <div style={{marginTop:20,paddingTop:8,borderTop:`1px solid ${kolorAkcent}`,
                  fontSize:10,color:'#666',display:'flex',justifyContent:'space-between',background:kolorStopka,padding:'6px 8px'}}>
                  <span>{stopkaTekst}</span>
                  {pokazNrStrony && <span>Strona 1 / 1</span>}
                </div>
              )}

              {pokazWodoznak && (
                <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%) rotate(-35deg)',
                  fontSize:60,fontWeight:900,color:'rgba(0,0,0,0.06)',pointerEvents:'none',userSelect:'none',zIndex:0}}>
                  PRÓBA
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
