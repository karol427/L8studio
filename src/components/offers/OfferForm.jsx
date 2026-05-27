import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Plus, X } from 'lucide-react'
import DateTimePicker from '../events/DateTimePicker'
import './Offers.css'

const SCHEMAT_HARM = ['Event dwudniowy','Event jednodniowy','Event trzydniowy','Własny']
const SCHEMATY_OFERT = ['Schemat podstawowy','Ceny w Euro']
const GRUPY_CENOWE = ['Imprezy w Polsce','Imprezy za Granicą']
const JEZYKI = ['Polski','Angielski','Niemiecki']
const FIRMY = ['Firma domyślna','L8 Studio']
const STATUSY = ['Nowa','Zaakceptowana','Oferta przegrana']
const KLIENCI = ['Bank Współczesny','KCEK','ORANGE POLSKA','4LeeLoo Patrycja']
const MENAGEROWIE = ['L8 Studio Karol','Igor Dutczak','Anna Kowalska']

export default function OfferForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nazwaProjektu: '', schematHarmonogramu: 'Event dwudniowy',
    schematOferty: 'Schemat podstawowy', grupaCenowa: 'Imprezy w Polsce',
    kurs: '', jezyk: 'Polski', firmaOferenta: 'Firma domyślna',
    status: 'Nowa', klient: '', osobaKontaktowa: '', miejsceEventu: '',
    adresReczny: '', eventManager: 'L8 Studio Karol',
    zaliczkaProc: '', zaliczkaKwota: '', terminPlatnosci: '',
    dataSporzeadzenia: null, uwagi: '', ofertaWaznaDo: null,
    harmonogram: { montaz: null, montaz2: null, event: null, event2: null, demontaz: null },
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setHarm = (k, v) => setForm(f => ({ ...f, harmonogram: { ...f.harmonogram, [k]: v } }))

  const HARM_STAGES = [
    { key: 'montaz', label: 'Montaż' },
    { key: 'montaz2', label: 'Montaż dzień 2' },
    { key: 'event', label: 'Event' },
    { key: 'event2', label: 'Event 2' },
    { key: 'demontaz', label: 'Demontaż' },
  ]

  return (
    <div className="off-form-wrap animate-in">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingBottom:12,borderBottom:'1px solid var(--border-default)'}}>
        <button className="btn btn-ghost" onClick={()=>navigate('/oferty')}><ChevronLeft size={14}/> Wróć</button>
      </div>

      <div className="off-form-header">Dodajesz nową ofertę</div>

      <div className="off-form-layout">
        {/* LEFT */}
        <div className="off-form-left">
          <div className="off-field"><label>Nazwa Projektu</label><input value={form.nazwaProjektu} onChange={e=>set('nazwaProjektu',e.target.value)} /></div>
          <div className="off-field">
            <label>Schemat harmonogramu</label>
            <div className="off-field-with-clear">
              <select value={form.schematHarmonogramu} onChange={e=>set('schematHarmonogramu',e.target.value)}>
                {SCHEMAT_HARM.map(s=><option key={s}>{s}</option>)}
              </select>
              <button className="off-clear-btn" onClick={()=>set('schematHarmonogramu','')}><X size={11}/></button>
            </div>
          </div>
          <div className="off-field">
            <label>Schemat oferty</label>
            <div className="off-field-with-clear">
              <select value={form.schematOferty} onChange={e=>set('schematOferty',e.target.value)}>
                {SCHEMATY_OFERT.map(s=><option key={s}>{s}</option>)}
              </select>
              <button className="off-clear-btn"><X size={11}/></button>
            </div>
          </div>
          <div className="off-field">
            <label>Grupa cenowa</label>
            <div className="off-field-with-clear">
              <select value={form.grupaCenowa} onChange={e=>set('grupaCenowa',e.target.value)}>
                {GRUPY_CENOWE.map(g=><option key={g}>{g}</option>)}
              </select>
              <button className="off-clear-btn"><X size={11}/></button>
            </div>
          </div>
          <div className="off-field"><label>Kurs (podaj w przypadku oferty w innej walucie niż PLN)</label><input value={form.kurs} onChange={e=>set('kurs',e.target.value)} /></div>
          <div className="off-field"><label>Język</label><select value={form.jezyk} onChange={e=>set('jezyk',e.target.value)}>{JEZYKI.map(j=><option key={j}>{j}</option>)}</select></div>
          <div className="off-field"><label>Firma oferenta</label><select value={form.firmaOferenta} onChange={e=>set('firmaOferenta',e.target.value)}>{FIRMY.map(f=><option key={f}>{f}</option>)}</select></div>
          <div className="off-field">
            <label>Status</label>
            <div className="off-field-with-clear">
              <select value={form.status} onChange={e=>set('status',e.target.value)}>{STATUSY.map(s=><option key={s}>{s}</option>)}</select>
              <button className="off-clear-btn"><X size={11}/></button>
            </div>
          </div>
          <div className="off-field">
            <label>Klient</label>
            <div style={{display:'flex',gap:6}}>
              <select value={form.klient} onChange={e=>set('klient',e.target.value)} style={{flex:1}}>
                <option value="">Wybierz...</option>
                {KLIENCI.map(k=><option key={k}>{k}</option>)}
              </select>
              <button className="off-add-btn"><Plus size={12}/></button>
            </div>
          </div>
          <div className="off-field">
            <label>Osoba kontaktowa</label>
            <div style={{display:'flex',gap:6}}>
              <select value={form.osobaKontaktowa} onChange={e=>set('osobaKontaktowa',e.target.value)} style={{flex:1}}>
                <option value="">Wybierz...</option>
              </select>
              <button className="off-add-btn"><Plus size={12}/></button>
            </div>
          </div>
          <div className="off-field">
            <label>Miejsce eventu/dostawy</label>
            <div style={{display:'flex',gap:6}}>
              <select value={form.miejsceEventu} onChange={e=>set('miejsceEventu',e.target.value)} style={{flex:1}}>
                <option value="">Wybierz...</option>
              </select>
              <button className="off-add-btn"><Plus size={12}/></button>
            </div>
          </div>
          <div className="off-field"><label>lub wpisz adres</label><input value={form.adresReczny} onChange={e=>set('adresReczny',e.target.value)} /></div>
          <div className="off-field">
            <label>EventManager</label>
            <div className="off-field-with-clear">
              <select value={form.eventManager} onChange={e=>set('eventManager',e.target.value)}>{MENAGEROWIE.map(m=><option key={m}>{m}</option>)}</select>
              <button className="off-clear-btn"><X size={11}/></button>
            </div>
          </div>
          <div className="off-field"><label>Zaliczka %</label><input type="number" value={form.zaliczkaProc} onChange={e=>set('zaliczkaProc',e.target.value)} /></div>
          <div className="off-field"><label>Zaliczka kwota</label><input type="number" value={form.zaliczkaKwota} onChange={e=>set('zaliczkaKwota',e.target.value)} /></div>
          <div className="off-field"><label>Termin płatności [dni]</label><input type="number" value={form.terminPlatnosci} onChange={e=>set('terminPlatnosci',e.target.value)} /></div>
          <div className="off-field">
            <label>Data sporządzenia oferty</label>
            <DateTimePicker value={form.dataSporzeadzenia} onChange={v=>set('dataSporzeadzenia',v)} placeholder="25/05/2026" />
          </div>
          <div className="off-field">
            <label>Uwagi</label>
            <div style={{display:'flex',gap:4,padding:'5px 8px',background:'var(--bg-secondary)',border:'1px solid var(--border-default)',borderBottom:'none',borderRadius:'var(--radius) var(--radius) 0 0',flexWrap:'wrap'}}>
              {['◇','¶','B','I','S','U'].map(b=><button key={b} style={{background:'none',color:'var(--text-secondary)',padding:'2px 6px',border:'1px solid transparent',borderRadius:3,fontSize:13}}>{b}</button>)}
            </div>
            <textarea value={form.uwagi} onChange={e=>set('uwagi',e.target.value)} rows={4} style={{borderTop:'none',borderRadius:'0 0 var(--radius) var(--radius)'}} />
          </div>
        </div>

        {/* RIGHT - harmonogram */}
        <div className="off-form-right">
          <div className="off-harm-schedule">Harmonogram</div>
          {HARM_STAGES.map(stage => (
            <div key={stage.key} className="off-field">
              <label>{stage.label}</label>
              <DateTimePicker value={form.harmonogram[stage.key]} onChange={v=>setHarm(stage.key,v)} />
            </div>
          ))}
          <div className="off-field">
            <label>Oferta ważna do</label>
            <DateTimePicker value={form.ofertaWaznaDo} onChange={v=>set('ofertaWaznaDo',v)} placeholder="Wybierz..." />
          </div>
          <button className="off-save-btn" onClick={()=>{alert('Oferta zapisana!');navigate('/oferty')}}>Zapisz</button>
        </div>
      </div>
    </div>
  )
}
