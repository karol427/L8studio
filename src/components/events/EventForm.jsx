import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, X, Save, ChevronLeft, Check, Upload } from 'lucide-react'
import DateTimePicker from './DateTimePicker'
import { EVENT_TYPES, SCHEDULE_TEMPLATES, CLIENTS, PLACES, MANAGERS } from './eventsData'
import { TYPY_GRUP } from '../crm/crmData'
import PlacesAutocomplete from './PlacesAutocomplete'
import './EventForm.css'

const scheduleKeys   = ['montaz','montaz2','event','event2','demontaz','data']
const scheduleLabels = ['Montaż','Montaż dzień 2','Event','Event 2','Demontaż','Data']

/* ═══════════════════════════════════════════════
   SLIDE-OVER PANEL — pełny formularz kontrahenta
═══════════════════════════════════════════════ */
function KontrahentPanel({ onSave, onClose }) {
  const [form, setForm] = useState({
    nip:'', nazwa:'', typ:'', panstwo:'PL', adres:'', miasto:'', kodPocztowy:'',
    telefon:'', email:'', prefiks:'', glownyNrKonta:'', terminPlatnosci:'',
    dostawca:true, klient:true, dodatkoweInfo:'',
  })
  const s = (k,v) => setForm(p=>({...p,[k]:v}))

  const fetchGUS = () => {
    if (!form.nip) { alert('Wpisz NIP'); return }
    // Mock — w realu fetch do API MF
    setForm(p=>({...p, nazwa:'Przykładowa Firma Sp. z o.o.', adres:'ul. Przykładowa 1', miasto:'Warszawa', kodPocztowy:'00-001'}))
  }

  const handleSave = () => {
    if (!form.nazwa.trim()) { alert('Podaj nazwę firmy'); return }
    onSave({ id: Date.now(), name: form.nazwa, nip: form.nip, email: form.email, phone: form.telefon, ...form })
  }

  return (
    <div style={{position:'fixed',inset:0,zIndex:450,display:'flex'}}>
      {/* Overlay */}
      <div style={{flex:1,background:'rgba(0,0,0,0.6)'}} onClick={onClose}/>
      {/* Panel */}
      <div style={{
        width: 620, background:'var(--bg-secondary)', borderLeft:'1px solid var(--green-border)',
        overflow:'auto', display:'flex', flexDirection:'column',
        boxShadow:'-8px 0 32px rgba(0,0,0,0.5), -2px 0 20px var(--green-glow)',
        animation:'slideInRight 0.25s ease both',
      }}>
        {/* Header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',
          borderBottom:'1px solid var(--border-default)',background:'rgba(0,0,0,0.2)',flexShrink:0}}>
          <div>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:16,fontWeight:700,color:'var(--green-primary)',letterSpacing:'0.05em'}}>
              Nowy kontrahent
            </h3>
            <p style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>Zostanie dodany do modułu Kontrahenci</p>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer',padding:4}}>
            <X size={20}/>
          </button>
        </div>

        {/* Body */}
        <div style={{padding:20,display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px',flex:1}}>

          {/* LEWA */}
          <div>
            <PField label="Numer NIP">
              <div style={{display:'flex',gap:8}}>
                <input value={form.nip} onChange={e=>s('nip',e.target.value)} placeholder="000-000-00-00"
                  style={inputStyle}/>
                <button onClick={fetchGUS}
                  style={{background:'#3b82f6',color:'#fff',padding:'7px 12px',borderRadius:'var(--radius)',
                    fontSize:12,fontWeight:700,whiteSpace:'nowrap',cursor:'pointer',border:'none'}}>
                  Pobierz z GUS
                </button>
              </div>
            </PField>
            <PField label="Nazwa firmy *">
              <input value={form.nazwa} onChange={e=>s('nazwa',e.target.value)} placeholder="Nazwa firmy" style={inputStyle}/>
            </PField>
            <PField label="Typ/Grupa">
              <select value={form.typ} onChange={e=>s('typ',e.target.value)} style={inputStyle}>
                <option value="">Wybierz...</option>
                {(TYPY_GRUP||['Klient','Dostawca','Partner']).map(t=><option key={t}>{t}</option>)}
              </select>
            </PField>
            <PField label="Państwo">
              <select value={form.panstwo} onChange={e=>s('panstwo',e.target.value)} style={inputStyle}>
                {['PL','DE','FR','GB','CZ','SK','UA','US'].map(p=><option key={p}>{p}</option>)}
              </select>
            </PField>
            <PField label="Adres">
              <input value={form.adres} onChange={e=>s('adres',e.target.value)} style={inputStyle}/>
            </PField>
            <PField label="Miasto">
              <input value={form.miasto} onChange={e=>s('miasto',e.target.value)} style={inputStyle}/>
            </PField>
            <PField label="Kod pocztowy">
              <input value={form.kodPocztowy} onChange={e=>s('kodPocztowy',e.target.value)} placeholder="00-000" style={inputStyle}/>
            </PField>
            <PField label="Telefon">
              <input value={form.telefon} onChange={e=>s('telefon',e.target.value)} placeholder="+48 600 000 000" style={inputStyle}/>
            </PField>
            <PField label="Adres e-mail">
              <input type="email" value={form.email} onChange={e=>s('email',e.target.value)} style={inputStyle}/>
            </PField>
            <PField label="Prefiks do numeracji">
              <input value={form.prefiks} onChange={e=>s('prefiks',e.target.value)} style={inputStyle}/>
            </PField>
            <PField label="Główny numer konta">
              <input value={form.glownyNrKonta} onChange={e=>s('glownyNrKonta',e.target.value)} style={inputStyle}/>
            </PField>
            <PField label="Domyślny termin płatności [dni]">
              <input type="number" value={form.terminPlatnosci} onChange={e=>s('terminPlatnosci',e.target.value)} style={inputStyle}/>
            </PField>
          </div>

          {/* PRAWA */}
          <div>
            <PField label="Opiekunowie">
              <select style={inputStyle}><option>Wybierz...</option><option>Karol L8 Studio</option><option>Igor Dutczak</option></select>
            </PField>
            <PField label="Zespoły opiekunów">
              <select style={inputStyle}><option>Wybierz...</option></select>
            </PField>
            <div style={{display:'flex',flexDirection:'column',gap:8,padding:'8px 0',borderBottom:'1px solid rgba(0,255,65,0.04)'}}>
              <label style={checkLabel}>
                <input type="checkbox" checked={form.dostawca} onChange={e=>s('dostawca',e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
                Dostawca
              </label>
              <label style={checkLabel}>
                <input type="checkbox" checked={form.klient} onChange={e=>s('klient',e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>
                Klient
              </label>
            </div>
            <PField label="Domyślny typ kosztu">
              <select style={inputStyle}><option>Wybierz...</option></select>
            </PField>
            <PField label="Domyślny numer konta na FV">
              <select style={inputStyle}><option>Wybierz...</option></select>
            </PField>
            <PField label="Domyślny opis na FV">
              <select style={inputStyle}><option>Wybierz...</option></select>
            </PField>
            <PField label="Logo">
              <div style={{border:'2px dashed var(--border-default)',borderRadius:'var(--radius)',padding:'20px',textAlign:'center',
                color:'var(--text-muted)',fontSize:12,cursor:'pointer',background:'var(--bg-primary)'}}>
                Przeciągnij i upuść plik tutaj...<br/>
                <button style={{marginTop:8,background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',
                  padding:'5px 12px',borderRadius:'var(--radius)',fontSize:12,cursor:'pointer'}}>
                  <Upload size={12} style={{marginRight:4,verticalAlign:'middle'}}/>Przeglądaj...
                </button>
              </div>
            </PField>
            <PField label="Dodatkowe informacje">
              <textarea value={form.dodatkoweInfo} onChange={e=>s('dodatkoweInfo',e.target.value)} rows={4}
                style={{...inputStyle,resize:'vertical'}}/>
            </PField>
          </div>
        </div>

        {/* Footer */}
        <div style={{padding:'14px 20px',borderTop:'1px solid var(--border-default)',display:'flex',gap:10,
          background:'rgba(0,0,0,0.2)',flexShrink:0}}>
          <button onClick={handleSave}
            style={{background:'var(--green-primary)',color:'#000',padding:'9px 24px',borderRadius:'var(--radius)',
              fontSize:13,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:6,border:'none'}}>
            <Check size={14}/> Zapisz kontrahenta
          </button>
          <button onClick={onClose}
            style={{background:'var(--bg-primary)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',
              padding:'9px 16px',borderRadius:'var(--radius)',fontSize:13,cursor:'pointer'}}>
            Anuluj
          </button>
        </div>
      </div>
      <style>{`@keyframes slideInRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SLIDE-OVER PANEL — Dodaj miejsce z autocomplete
═══════════════════════════════════════════════ */
function MiejscePanel({ onSave, onClose }) {
  const [selected, setSelected] = useState(null)
  const [manual, setManual]     = useState({ nazwa:'', adres:'', miasto:'', kodPocztowy:'', opis:'' })
  const s = (k,v) => setManual(p=>({...p,[k]:v}))

  const handlePick = (place) => {
    setSelected(place)
    if (place) {
      const parts = place.shortLabel.split(',')
      setManual(p=>({...p, nazwa: parts[0]?.trim()||'', adres: parts.slice(1,3).join(',').trim(), miasto: parts[parts.length-2]?.trim()||'' }))
    }
  }

  const handleSave = () => {
    if (!manual.nazwa.trim()) { alert('Podaj nazwę miejsca'); return }
    onSave({ id: Date.now(), name: manual.nazwa, address: manual.adres, city: manual.miasto, lat: selected?.lat, lon: selected?.lon })
  }

  return (
    <div style={{position:'fixed',inset:0,zIndex:450,display:'flex'}}>
      <div style={{flex:1,background:'rgba(0,0,0,0.6)'}} onClick={onClose}/>
      <div style={{
        width:520, background:'var(--bg-secondary)', borderLeft:'1px solid var(--green-border)',
        overflow:'auto', display:'flex', flexDirection:'column',
        boxShadow:'-8px 0 32px rgba(0,0,0,0.5)',
        animation:'slideInRight 0.25s ease both',
      }}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',
          borderBottom:'1px solid var(--border-default)',background:'rgba(0,0,0,0.2)',flexShrink:0}}>
          <div>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:16,fontWeight:700,color:'var(--green-primary)',letterSpacing:'0.05em'}}>
              Dodaj miejsce wydarzenia
            </h3>
            <p style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>Wyszukaj na mapie lub wpisz ręcznie</p>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer'}}><X size={20}/></button>
        </div>

        <div style={{padding:20,flex:1,display:'flex',flexDirection:'column',gap:0}}>
          <PField label="🔍 Wyszukaj miejsce (mapa)">
            <PlacesAutocomplete
              value={manual.nazwa}
              onChange={handlePick}
              placeholder="np. Stadion Wrocław, Hala EXPO..."
            />
            {selected && (
              <div style={{marginTop:6,padding:'6px 10px',background:'rgba(0,255,65,0.06)',border:'1px solid var(--green-border)',
                borderRadius:'var(--radius)',fontSize:11,color:'var(--text-muted)',display:'flex',alignItems:'center',gap:6}}>
                <span style={{color:'var(--green-primary)'}}>✓</span>
                <span>Znaleziono: {selected.shortLabel}</span>
                {selected.lat && <span style={{marginLeft:'auto',fontFamily:'var(--font-mono)'}}>📍 {parseFloat(selected.lat).toFixed(4)}, {parseFloat(selected.lon).toFixed(4)}</span>}
              </div>
            )}
          </PField>

          <div style={{height:1,background:'var(--border-default)',margin:'12px 0',position:'relative'}}>
            <span style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
              background:'var(--bg-secondary)',padding:'0 10px',fontSize:11,color:'var(--text-muted)'}}>lub wpisz ręcznie</span>
          </div>

          <PField label="Nazwa miejsca *">
            <input value={manual.nazwa} onChange={e=>s('nazwa',e.target.value)} placeholder="np. Hala EXPO Wrocław" style={inputStyle}/>
          </PField>
          <PField label="Adres">
            <input value={manual.adres} onChange={e=>s('adres',e.target.value)} placeholder="ul. Kowalska 1" style={inputStyle}/>
          </PField>
          <PField label="Miasto">
            <input value={manual.miasto} onChange={e=>s('miasto',e.target.value)} placeholder="Wrocław" style={inputStyle}/>
          </PField>
          <PField label="Kod pocztowy">
            <input value={manual.kodPocztowy} onChange={e=>s('kodPocztowy',e.target.value)} placeholder="50-000" style={inputStyle}/>
          </PField>
          <PField label="Opis / notatka">
            <textarea value={manual.opis} onChange={e=>s('opis',e.target.value)} rows={2}
              style={{...inputStyle,resize:'vertical'}} placeholder="np. wjazd od strony parkingu..."/>
          </PField>
        </div>

        <div style={{padding:'14px 20px',borderTop:'1px solid var(--border-default)',display:'flex',gap:10,
          background:'rgba(0,0,0,0.2)',flexShrink:0}}>
          <button onClick={handleSave}
            style={{background:'var(--green-primary)',color:'#000',padding:'9px 24px',borderRadius:'var(--radius)',
              fontSize:13,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:6,border:'none'}}>
            <Check size={14}/> Zapisz miejsce
          </button>
          <button onClick={onClose}
            style={{background:'var(--bg-primary)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',
              padding:'9px 16px',borderRadius:'var(--radius)',fontSize:13,cursor:'pointer'}}>
            Anuluj
          </button>
        </div>
        <style>{`@keyframes slideInRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
      </div>
    </div>
  )
}

/* Helpers */
const inputStyle = {
  background:'var(--bg-primary)', border:'1px solid var(--border-default)',
  color:'var(--text-primary)', borderRadius:'var(--radius)',
  padding:'7px 10px', fontSize:13, width:'100%',
}
const checkLabel = { display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-secondary)', cursor:'pointer' }
function PField({ label, children }) {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:4,padding:'7px 0',borderBottom:'1px solid rgba(0,255,65,0.04)'}}>
      <label style={{fontSize:12,color:'var(--text-muted)',fontWeight:500}}>{label}</label>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   GŁÓWNY FORMULARZ WYDARZENIA
═══════════════════════════════════════════════ */
export default function EventForm({ event = null, onSave }) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: event?.name || '',
    type: event?.type || 'Wydarzenie',
    scheduleTemplate: 'Event dwudniowy',
    rodzaj: '',
    placeId: '',
    placeManual: '',
    clientId: '',
    contactPerson: '',
    eventManager: 'L8 Studio Karol',
    level: '1',
    departments: '',
    taskSchema: '',
    notes: '',
    eventId: '',
    dateBooked: '',
    travelFrom: '',
    travelTo: '',
  })

  const [schedule, setSchedule] = useState({
    montaz:null, montaz2:null, event:null, event2:null, demontaz:null, data:null,
  })

  const [places,   setPlaces]   = useState(PLACES   || [])
  const [clients,  setClients]  = useState(CLIENTS  || [])
  const [contacts, setContacts] = useState(['Patrycja Barton','Jan Kowalski','Mariusz Niezapominalski'])

  // Który panel jest otwarty
  const [panel, setPanel] = useState(null) // 'klient' | 'miejsce'

  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const handleSave = () => {
    if (!form.name.trim()) { alert('Wypełnij nazwę wydarzenia'); return }
    onSave?.({ ...form, schedule })
    navigate('/wydarzenia')
  }

  const selectedClient = clients.find(c => String(c.id) === String(form.clientId))
  const selectedPlace  = places.find(p  => String(p.id) === String(form.placeId))

  return (
    <div className="event-form animate-in">
      {/* Topbar */}
      <div className="ef-topbar">
        <button className="btn btn-ghost" onClick={()=>navigate('/wydarzenia')}>
          <ChevronLeft size={14}/> Wróć do listy
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={14}/> Zapisz wydarzenie
        </button>
      </div>

      <div className="ef-layout">
        {/* ── LEWA KOLUMNA ── */}
        <div className="ef-left">

          <div className="ef-field ef-field--required">
            <label>Nazwa <span className="ef-required">*</span></label>
            <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Nazwa wydarzenia"/>
          </div>

          <div className="ef-field">
            <label>Typ</label>
            <select value={form.type} onChange={e=>set('type',e.target.value)}>
              {EVENT_TYPES.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="ef-field">
            <label>Schemat harmonogramu</label>
            <div className="ef-select-with-clear">
              <select value={form.scheduleTemplate} onChange={e=>set('scheduleTemplate',e.target.value)}>
                {SCHEDULE_TEMPLATES.map(t=><option key={t}>{t}</option>)}
              </select>
              <button className="ef-clear-btn" onClick={()=>set('scheduleTemplate','')}><X size={12}/></button>
            </div>
          </div>

          <div className="ef-field">
            <label>Rodzaj</label>
            <select value={form.rodzaj} onChange={e=>set('rodzaj',e.target.value)}>
              <option value="">Wybierz...</option>
              {['Konferencja','Koncert','Gala','Targi','Bankiet','Festiwal','Wesele','Piknik'].map(r=><option key={r}>{r}</option>)}
            </select>
          </div>

          {/* ── MIEJSCE z pełnym panelem ── */}
          <div className="ef-field">
            <label>Miejsce</label>
            <div className="ef-select-with-add">
              <select value={form.placeId} onChange={e=>set('placeId',e.target.value)}>
                <option value="">Wybierz lub wyszukaj...</option>
                {places.map(p=><option key={p.id} value={p.id}>{p.name}{p.city?` — ${p.city}`:''}</option>)}
              </select>
              <button className="ef-add-btn" title="Dodaj nowe miejsce" onClick={()=>setPanel('miejsce')}>
                <Plus size={14}/>
              </button>
            </div>
            {selectedPlace && (
              <div style={{fontSize:11,color:'var(--text-muted)',marginTop:3,fontFamily:'var(--font-mono)'}}>
                📍 {selectedPlace.address}{selectedPlace.city?`, ${selectedPlace.city}`:''}
              </div>
            )}
          </div>

          <div className="ef-field">
            <label>Miejsce imprezy — wpisz ręcznie</label>
            <input value={form.placeManual} onChange={e=>set('placeManual',e.target.value)} placeholder="Adres imprezy ręcznie"/>
          </div>

          {/* ── KLIENT z pełnym panelem ── */}
          <div className="ef-field ef-field--required">
            <label>Klient <span className="ef-required">*</span></label>
            <div className="ef-select-with-add">
              <select value={form.clientId} onChange={e=>set('clientId',e.target.value)}>
                <option value="">Wybierz...</option>
                {clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button className="ef-add-btn" title="Dodaj nowego klienta — otworzy pełny formularz" onClick={()=>setPanel('klient')}>
                <Plus size={14}/>
              </button>
            </div>
            {selectedClient && (
              <div style={{fontSize:11,color:'var(--text-muted)',marginTop:3}}>
                {selectedClient.nip && <span>NIP: {selectedClient.nip} &nbsp;</span>}
                {selectedClient.email && <span>✉ {selectedClient.email}</span>}
              </div>
            )}
          </div>

          {/* OSOBA KONTAKTOWA */}
          <div className="ef-field">
            <label>Osoba kontaktowa</label>
            <div className="ef-select-with-add">
              <select value={form.contactPerson} onChange={e=>set('contactPerson',e.target.value)}>
                <option value="">Wybierz...</option>
                {contacts.map(c=><option key={c}>{c}</option>)}
              </select>
              <button className="ef-add-btn" title="Dodaj osobę kontaktową"
                onClick={()=>{const n=prompt('Imię i nazwisko osoby kontaktowej:');if(n?.trim()){setContacts(p=>[...p,n.trim()]);set('contactPerson',n.trim())}}}>
                <Plus size={14}/>
              </button>
            </div>
          </div>

          <div className="ef-field">
            <label>EventManager</label>
            <div className="ef-select-with-clear">
              <select value={form.eventManager} onChange={e=>set('eventManager',e.target.value)}>
                {MANAGERS.map(m=><option key={m}>{m}</option>)}
              </select>
              <button className="ef-clear-btn" onClick={()=>set('eventManager','')}><X size={12}/></button>
            </div>
          </div>

          <div className="ef-field">
            <label>Poziom</label>
            <select value={form.level} onChange={e=>set('level',e.target.value)}>
              {[1,2,3,4,5].map(l=><option key={l}>{l}</option>)}
            </select>
          </div>

          <div className="ef-field">
            <label>Działy</label>
            <input value={form.departments} onChange={e=>set('departments',e.target.value)} placeholder="Wybierz..."/>
          </div>

          <div className="ef-field">
            <label>Schemat zadań</label>
            <select value={form.taskSchema} onChange={e=>set('taskSchema',e.target.value)}>
              <option value="">Wybierz...</option>
              <option>Schemat standardowy</option>
              <option>Schemat montażowy</option>
            </select>
          </div>

          <div className="ef-field">
            <label>Uwagi</label>
            <div className="ef-editor-toolbar">
              <select className="ef-editor-select"><option>Akapit</option></select>
              <button className="ef-editor-btn"><strong>B</strong></button>
              <button className="ef-editor-btn"><em>I</em></button>
              <button className="ef-editor-btn"><s>S</s></button>
            </div>
            <textarea value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Uwagi do wydarzenia..." rows={4}/>
          </div>
        </div>

        {/* ── PRAWA KOLUMNA ── */}
        <div className="ef-right">
          <div className="ef-schedule-header"><span>Harmonogram</span></div>
          {scheduleKeys.map((key,idx) => (
            <div key={key} className="ef-schedule-row">
              <label className="ef-schedule-label">{scheduleLabels[idx]}</label>
              <DateTimePicker value={schedule[key]} onChange={v=>setSchedule(s=>({...s,[key]:v}))} placeholder="Wybierz datę..."/>
            </div>
          ))}
          <div className="ef-divider"/>
          <div className="ef-schedule-row">
            <label className="ef-schedule-label">ID imprezy</label>
            <input value={form.eventId} onChange={e=>set('eventId',e.target.value)} placeholder="Auto-generowane"
              style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'6px 10px',fontSize:13,width:'100%'}}/>
            <p className="ef-hint">Jeśli nie wypełnisz, ID zostanie wygenerowane.</p>
          </div>
          <div className="ef-schedule-row">
            <label className="ef-schedule-label">Data księgowania</label>
            <select value={form.dateBooked} onChange={e=>set('dateBooked',e.target.value)}
              style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'6px 10px',fontSize:13,width:'100%'}}>
              <option value="">Wybierz...</option>
              {['2026-05','2026-06','2026-07','2026-08','2026-09','2026-10','2026-11','2026-12'].map(m=><option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="ef-schedule-row">
            <label className="ef-schedule-label">Dojazd z</label>
            <input value={form.travelFrom} onChange={e=>set('travelFrom',e.target.value)}
              style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'6px 10px',fontSize:13,width:'100%'}}/>
            <p className="ef-hint">Wypełnij, jeśli inne niż adres firmy.</p>
          </div>
          <div className="ef-schedule-row">
            <label className="ef-schedule-label">Dojazd do</label>
            <input value={form.travelTo} onChange={e=>set('travelTo',e.target.value)}
              style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'6px 10px',fontSize:13,width:'100%'}}/>
            <p className="ef-hint">Wypełnij, jeśli inne niż adres Miejsca.</p>
          </div>
        </div>
      </div>

      {/* ── SLIDE-OVER PANELS ── */}
      {panel === 'klient' && (
        <KontrahentPanel
          onSave={(k) => {
            setClients(p => [...p, k])
            set('clientId', String(k.id))
            setPanel(null)
          }}
          onClose={() => setPanel(null)}
        />
      )}
      {panel === 'miejsce' && (
        <MiejscePanel
          onSave={(m) => {
            setPlaces(p => [...p, m])
            set('placeId', String(m.id))
            setPanel(null)
          }}
          onClose={() => setPanel(null)}
        />
      )}
    </div>
  )
}
