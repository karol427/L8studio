import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, X, Save, ChevronLeft, Check } from 'lucide-react'
import DateTimePicker from './DateTimePicker'
import { EVENT_TYPES, SCHEDULE_TEMPLATES, CLIENTS, PLACES, MANAGERS } from './eventsData'
import './EventForm.css'

const scheduleKeys   = ['montaz','montaz2','event','event2','demontaz','data']
const scheduleLabels = ['Montaż','Montaż dzień 2','Event','Event 2','Demontaż','Data']

// ─── MINI MODAL — szybkie dodawanie ──────────────────────────────────────────
function QuickAddModal({ title, fields, onSave, onClose }) {
  const [vals, setVals] = useState(fields.reduce((a,f)=>({...a,[f.key]:''}),{}))
  const set = (k,v) => setVals(p=>({...p,[k]:v}))
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:'var(--bg-secondary)',border:'1px solid var(--green-border)',borderRadius:'var(--radius)',padding:24,width:'100%',maxWidth:400,boxShadow:'0 0 40px rgba(0,255,65,0.15)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <h3 style={{fontFamily:'var(--font-display)',fontSize:15,fontWeight:700,color:'var(--green-primary)',letterSpacing:'0.06em'}}>{title}</h3>
          <button onClick={onClose} style={{background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer'}}><X size={16}/></button>
        </div>
        {fields.map(f=>(
          <div key={f.key} style={{marginBottom:12}}>
            <label style={{display:'block',fontSize:12,color:'var(--text-muted)',marginBottom:4}}>{f.label}{f.required&&<span style={{color:'var(--red)'}}> *</span>}</label>
            {f.type==='textarea'
              ? <textarea value={vals[f.key]} onChange={e=>set(f.key,e.target.value)} rows={3}
                  style={{width:'100%',background:'var(--bg-primary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'7px 10px',fontSize:13,resize:'vertical'}}/>
              : <input type={f.type||'text'} value={vals[f.key]} onChange={e=>set(f.key,e.target.value)} placeholder={f.placeholder||''}
                  style={{width:'100%',background:'var(--bg-primary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'7px 10px',fontSize:13}}
                  autoFocus={f.autofocus}/>
            }
          </div>
        ))}
        <div style={{display:'flex',gap:8,marginTop:16}}>
          <button onClick={()=>{
            const required = fields.filter(f=>f.required)
            if(required.some(f=>!vals[f.key].trim())){alert('Wypełnij wymagane pola');return}
            onSave(vals)
          }} style={{background:'var(--green-primary)',color:'#000',padding:'8px 20px',borderRadius:'var(--radius)',fontSize:13,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>
            <Check size={13}/> Dodaj
          </button>
          <button onClick={onClose} style={{background:'var(--bg-primary)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',padding:'8px 14px',borderRadius:'var(--radius)',fontSize:13,cursor:'pointer'}}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN FORM ────────────────────────────────────────────────────────────────
export default function EventForm({ event = null, onSave }) {
  const navigate = useNavigate()
  const isEdit = !!event

  const [form, setForm] = useState({
    name: event?.name || '',
    type: event?.type || 'Wydarzenie',
    scheduleTemplate: 'Event dwudniowy',
    rodzaj: event?.rodzaj || '',
    place: event?.place || '',
    placeManual: event?.placeManual || '',
    client: event?.client || '',
    contactPerson: event?.contactPerson || '',
    eventManager: event?.eventManager || 'L8 Studio Karol',
    level: '1',
    departments: '',
    taskSchema: '',
    notes: event?.notes || '',
    eventId: '',
    dateBooked: '',
    travelFrom: '',
    travelTo: '',
  })

  const [schedule, setSchedule] = useState({
    montaz:null, montaz2:null, event:null, event2:null, demontaz:null, data:null,
  })

  // Listy które można rozbudowywać inline
  const [places,   setPlaces]   = useState(PLACES)
  const [clients,  setClients]  = useState(CLIENTS)
  const [contacts, setContacts] = useState(['Patrycja Barton','Jan Kowalski','Mariusz Niezapominalski'])
  const [managers, setManagers] = useState(MANAGERS)

  // Który modal jest otwarty
  const [modal, setModal] = useState(null) // 'miejsce' | 'klient' | 'kontakt' | 'manager'

  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const handleSave = () => {
    if (!form.name.trim()) { alert('Wypełnij nazwę wydarzenia'); return }
    if (!form.client)      { alert('Wybierz klienta');           return }
    onSave?.({ ...form, schedule })
    navigate('/wydarzenia')
  }

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

          {/* MIEJSCE z + */}
          <div className="ef-field">
            <label>Miejsce</label>
            <div className="ef-select-with-add">
              <select value={form.place} onChange={e=>set('place',e.target.value)}>
                <option value="">Wybierz...</option>
                {places.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <button className="ef-add-btn" title="Dodaj nowe miejsce" onClick={()=>setModal('miejsce')}>
                <Plus size={14}/>
              </button>
            </div>
          </div>

          <div className="ef-field">
            <label>Miejsce imprezy ręcznie</label>
            <input value={form.placeManual} onChange={e=>set('placeManual',e.target.value)} placeholder="Adres imprezy ręcznie"/>
          </div>

          {/* KLIENT z + */}
          <div className="ef-field ef-field--required">
            <label>Klient <span className="ef-required">*</span></label>
            <div className="ef-select-with-add">
              <select value={form.client} onChange={e=>set('client',e.target.value)}>
                <option value="">Wybierz...</option>
                {clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button className="ef-add-btn" title="Dodaj nowego klienta" onClick={()=>setModal('klient')}>
                <Plus size={14}/>
              </button>
            </div>
          </div>

          {/* OSOBA KONTAKTOWA z + */}
          <div className="ef-field">
            <label>Osoba kontaktowa</label>
            <div className="ef-select-with-add">
              <select value={form.contactPerson} onChange={e=>set('contactPerson',e.target.value)}>
                <option value="">Wybierz...</option>
                {contacts.map(c=><option key={c}>{c}</option>)}
              </select>
              <button className="ef-add-btn" title="Dodaj osobę kontaktową" onClick={()=>setModal('kontakt')}>
                <Plus size={14}/>
              </button>
            </div>
          </div>

          <div className="ef-field">
            <label>EventManager</label>
            <div className="ef-select-with-clear">
              <select value={form.eventManager} onChange={e=>set('eventManager',e.target.value)}>
                {managers.map(m=><option key={m}>{m}</option>)}
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
            <div className="ef-select-with-clear">
              <select value={form.taskSchema} onChange={e=>set('taskSchema',e.target.value)}>
                <option value="">Wybierz...</option>
                <option>Schemat standardowy</option>
                <option>Schemat montażowy</option>
              </select>
            </div>
          </div>

          <div className="ef-field">
            <label>Uwagi</label>
            <div className="ef-editor-toolbar">
              <select className="ef-editor-select"><option>Akapit</option></select>
              <button className="ef-editor-btn"><strong>B</strong></button>
              <button className="ef-editor-btn"><em>I</em></button>
              <button className="ef-editor-btn"><s>S</s></button>
            </div>
            <textarea value={form.notes} onChange={e=>set('notes',e.target.value)}
              placeholder="Uwagi do wydarzenia..." rows={4}/>
          </div>
        </div>

        {/* ── PRAWA KOLUMNA — harmonogram ── */}
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

      {/* ── MODALE ── */}

      {modal === 'miejsce' && (
        <QuickAddModal
          title="➕ Dodaj nowe miejsce"
          fields={[
            {key:'name',  label:'Nazwa miejsca', required:true, autofocus:true, placeholder:'np. Hala EXPO Wrocław'},
            {key:'adres', label:'Adres',          placeholder:'ul. Kowalska 1, Wrocław'},
            {key:'miasto',label:'Miasto',         placeholder:'Wrocław'},
          ]}
          onSave={v=>{
            const newPlace = {id: Date.now(), name: v.name, address: v.adres, city: v.miasto}
            setPlaces(p=>[...p, newPlace])
            set('place', String(newPlace.id))
            setModal(null)
          }}
          onClose={()=>setModal(null)}
        />
      )}

      {modal === 'klient' && (
        <QuickAddModal
          title="➕ Dodaj nowego klienta"
          fields={[
            {key:'name',  label:'Nazwa firmy / klienta', required:true, autofocus:true, placeholder:'np. ORANGE POLSKA SA'},
            {key:'nip',   label:'NIP',          placeholder:'123-456-78-90'},
            {key:'email', label:'E-mail',        placeholder:'kontakt@firma.pl', type:'email'},
            {key:'tel',   label:'Telefon',       placeholder:'+48 600 000 000'},
          ]}
          onSave={v=>{
            const newClient = {id: Date.now(), name: v.name, nip: v.nip, email: v.email, phone: v.tel}
            setClients(p=>[...p, newClient])
            set('client', String(newClient.id))
            setModal(null)
          }}
          onClose={()=>setModal(null)}
        />
      )}

      {modal === 'kontakt' && (
        <QuickAddModal
          title="➕ Dodaj osobę kontaktową"
          fields={[
            {key:'imie',     label:'Imię i nazwisko', required:true, autofocus:true, placeholder:'Jan Kowalski'},
            {key:'stanowisko',label:'Stanowisko',      placeholder:'Dyrektor marketingu'},
            {key:'email',    label:'E-mail',           placeholder:'jan@firma.pl', type:'email'},
            {key:'tel',      label:'Telefon',          placeholder:'+48 600 000 000'},
          ]}
          onSave={v=>{
            const fullName = v.imie
            setContacts(p=>[...p, fullName])
            set('contactPerson', fullName)
            setModal(null)
          }}
          onClose={()=>setModal(null)}
        />
      )}
    </div>
  )
}
