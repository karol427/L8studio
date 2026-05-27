import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, X } from 'lucide-react'
import DateTimePicker from '../events/DateTimePicker'
import { CLIENTS } from '../crm/crmData'
import './Offers.css'

const SCHEMATY_HARM = ['Event dwudniowy', 'Event jednodniowy', 'Mały Event']
const SCHEMATY_OFERT = ['Schemat podstawowy', 'Ceny w Euro']
const GRUPY_CENOWE = ['Imprezy w Polsce', 'Imprezy za Granicą']
const JEZYKI = ['Polski', 'Angielski', 'Niemiecki']
const STATUSY = ['Nowa', 'Zaakceptowana', 'Oferta przegrana']
const MIEJSCA = ['DW Bełchatów', 'Torwar', 'Atlas Arena']

export default function OfertaForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nazwaProjektu: '',
    schematHarmonogramu: 'Event dwudniowy',
    schematOferty: 'Schemat podstawowy',
    grupaCenowa: 'Imprezy w Polsce',
    kurs: '',
    jezyk: 'Polski',
    firmaOferenta: 'Firma domyślna',
    status: 'Nowa',
    klient: '',
    osobaKontaktowa: '',
    miejsce: '',
    adresReczny: '',
    eventManager: 'L8 Studio Karol',
    zaliczkaProc: '',
    zaliczkaKwota: '',
    terminPlatnosci: '',
    dataSporzeadzenia: '25/05/2026',
    uwagi: '',
    ofertaWaznaDo: null,
  })
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  const HARMONOGRAM_LABELS = ['Montaż','Montaż dzień 2','Event','Event 2','Demontaż']
  const [harmonogram, setHarmonogram] = useState(HARMONOGRAM_LABELS.reduce((a,l)=>({...a,[l]:null}),{}))

  return (
    <div className="of-form-wrap animate-in">
      <div className="of-form-topbar">
        <button className="btn btn-ghost" onClick={()=>navigate('/oferty')}><ChevronLeft size={14}/> Wróć</button>
        <span className="of-form-subtitle">Dodajesz nową ofertę</span>
      </div>

      <div className="of-form-layout">
        {/* LEFT */}
        <div className="of-form-left">
          <div className="of-field"><label>Nazwa Projektu</label><input value={form.nazwaProjektu} onChange={e=>set('nazwaProjektu',e.target.value)} /></div>
          <div className="of-field">
            <label>Schemat harmonogramu</label>
            <div className="of-select-clear"><select value={form.schematHarmonogramu} onChange={e=>set('schematHarmonogramu',e.target.value)}>
              {SCHEMATY_HARM.map(s=><option key={s}>{s}</option>)}
            </select><button onClick={()=>set('schematHarmonogramu','')}><X size={11}/></button></div>
          </div>
          <div className="of-field">
            <label>Schemat oferty</label>
            <div className="of-select-clear"><select value={form.schematOferty} onChange={e=>set('schematOferty',e.target.value)}>
              {SCHEMATY_OFERT.map(s=><option key={s}>{s}</option>)}
            </select><button onClick={()=>set('schematOferty','')}><X size={11}/></button></div>
          </div>
          <div className="of-field">
            <label>Grupa cenowa</label>
            <div className="of-select-clear"><select value={form.grupaCenowa} onChange={e=>set('grupaCenowa',e.target.value)}>
              {GRUPY_CENOWE.map(g=><option key={g}>{g}</option>)}
            </select><button onClick={()=>set('grupaCenowa','')}><X size={11}/></button></div>
          </div>
          <div className="of-field"><label>Kurs (podaj w przypadku oferty w innej walucie niż PLN)</label><input value={form.kurs} onChange={e=>set('kurs',e.target.value)} /></div>
          <div className="of-field"><label>Język</label><select value={form.jezyk} onChange={e=>set('jezyk',e.target.value)}>{JEZYKI.map(j=><option key={j}>{j}</option>)}</select></div>
          <div className="of-field"><label>Firma oferenta</label><select value={form.firmaOferenta} onChange={e=>set('firmaOferenta',e.target.value)}><option>Firma domyślna</option></select></div>
          <div className="of-field">
            <label>Status</label>
            <div className="of-select-clear"><select value={form.status} onChange={e=>set('status',e.target.value)}>
              {STATUSY.map(s=><option key={s}>{s}</option>)}
            </select><button onClick={()=>set('status','')}><X size={11}/></button></div>
          </div>
          <div className="of-field">
            <label>Klient</label>
            <div className="of-select-plus">
              <select value={form.klient} onChange={e=>set('klient',e.target.value)}>
                <option value="">Wybierz...</option>
                {CLIENTS.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button className="of-plus-btn">+</button>
            </div>
          </div>
          <div className="of-field">
            <label>Osoba kontaktowa</label>
            <div className="of-select-plus">
              <select value={form.osobaKontaktowa} onChange={e=>set('osobaKontaktowa',e.target.value)}>
                <option value="">Wybierz...</option>
                <option>Mariusz Niezapominalski</option>
                <option>Patrycja Barton</option>
              </select>
              <button className="of-plus-btn">+</button>
            </div>
          </div>
          <div className="of-field">
            <label>Miejsce eventu/dostawy</label>
            <div className="of-select-plus">
              <select value={form.miejsce} onChange={e=>set('miejsce',e.target.value)}>
                <option value="">Wybierz...</option>
                {MIEJSCA.map(m=><option key={m}>{m}</option>)}
              </select>
              <button className="of-plus-btn">+</button>
            </div>
          </div>
          <div className="of-field"><label>lub wpisz adres</label><input value={form.adresReczny} onChange={e=>set('adresReczny',e.target.value)} /></div>
          <div className="of-field">
            <label>EventManager</label>
            <div className="of-select-clear"><select value={form.eventManager} onChange={e=>set('eventManager',e.target.value)}>
              <option>L8 Studio Karol</option><option>Igor Dutczak</option><option>Anna Kowalska</option>
            </select><button onClick={()=>set('eventManager','')}><X size={11}/></button></div>
          </div>
          <div className="of-field"><label>Zaliczka %</label><input type="number" value={form.zaliczkaProc} onChange={e=>set('zaliczkaProc',e.target.value)} /></div>
          <div className="of-field"><label>Zaliczka kwota</label><input type="number" value={form.zaliczkaKwota} onChange={e=>set('zaliczkaKwota',e.target.value)} /></div>
          <div className="of-field"><label>Termin płatności [dni]</label><input type="number" value={form.terminPlatnosci} onChange={e=>set('terminPlatnosci',e.target.value)} /></div>
          <div className="of-field">
            <label>Data sporządzenia oferty</label>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <button className="of-cal-btn-sm">📅</button>
              <button style={{background:'none',color:'var(--red)',fontSize:14}}>✕</button>
              <input value={form.dataSporzeadzenia} onChange={e=>set('dataSporzeadzenia',e.target.value)} />
            </div>
          </div>
          <div className="of-field">
            <label>Uwagi</label>
            <div className="of-editor-bar">
              <button>◇</button><button>¶</button><button><strong>B</strong></button>
              <button><em>I</em></button><button><s>S</s></button>
            </div>
            <textarea value={form.uwagi} onChange={e=>set('uwagi',e.target.value)} rows={4} style={{borderTop:'none',borderRadius:'0 0 var(--radius) var(--radius)'}} />
          </div>
        </div>

        {/* RIGHT — Harmonogram */}
        <div className="of-form-right">
          <div className="of-form-harm-header">Harmonogram</div>
          {HARMONOGRAM_LABELS.map(label => (
            <div key={label} className="of-field">
              <label>{label}</label>
              <DateTimePicker
                value={harmonogram[label]}
                onChange={v=>setHarmonogram(h=>({...h,[label]:v}))}
              />
            </div>
          ))}
          <div className="of-field">
            <label>Oferta ważna do</label>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <button className="of-cal-btn-sm">📅</button>
              <button style={{background:'none',color:'var(--red)',fontSize:14}}>✕</button>
              <input placeholder="Wybierz..." />
            </div>
          </div>
          <button
            className="of-zapisz-btn"
            onClick={()=>{alert('Oferta zapisana!');navigate('/oferty')}}
          >Zapisz</button>
        </div>
      </div>
    </div>
  )
}
