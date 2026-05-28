import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Save, Upload, Loader, Check } from 'lucide-react'
import { useCollection } from '../../hooks/useFirestore'
import { TYPY_GRUP, OPIEKUNOWIE } from './crmData'
import './KontrahentForm.css'

export default function KontrahentForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id && id !== 'nowy'

  const { items, add, update, loading: listLoading } = useCollection('kontrahenci')
  const existing = isEdit ? items.find(i => i.id === id) : null

  const fileRef  = useRef()
  const [logo,     setLogo]     = useState(null)
  const [saving,   setSaving]   = useState(false)
  const [saved,    setSaved]    = useState(false)
  const [fetching, setFetching] = useState(false)

  const [form, setForm] = useState({
    nip:'', nazwa:'', typ:'', panstwo:'PL', adres:'', miasto:'', kodPocztowy:'',
    telefon:'', email:'', prefiks:'', glownyNrKonta:'', terminPlatnosci:'',
    opiekunowie:'', dostawca:true, klient:true, dodatkoweInfo:'',
  })

  useEffect(() => {
    if (existing) {
      setForm({
        nip: existing.nip||'', nazwa: existing.nazwa||'', typ: existing.typ||'',
        panstwo: existing.panstwo||'PL', adres: existing.adres||'',
        miasto: existing.miasto||'', kodPocztowy: existing.kodPocztowy||'',
        telefon: existing.telefon||'', email: existing.email||'',
        prefiks: existing.prefiks||'', glownyNrKonta: existing.glownyNrKonta||'',
        terminPlatnosci: existing.terminPlatnosci||'', opiekunowie: existing.opiekunowie||'',
        dostawca: existing.dostawca!==false, klient: existing.klient!==false,
        dodatkoweInfo: existing.dodatkoweInfo||'',
      })
    }
  }, [existing])

  const s = (k,v) => setForm(p=>({...p,[k]:v}))

  const fetchGUS = async () => {
    if (!form.nip.trim()) { alert('Wpisz NIP'); return }
    setFetching(true)
    try {
      const nip = form.nip.replace(/[-\s]/g,'')
      const res = await fetch(`https://api.vatcomply.com/vat?vat_number=PL${nip}`)
      const data = await res.json()
      if (data.valid) {
        s('nazwa', data.name || form.nazwa)
        s('adres', data.address || form.adres)
      } else {
        // Fallback mock
        setForm(p=>({...p, nazwa: p.nazwa||'Firma z NIP '+nip}))
      }
    } catch {
      alert('Nie udało się pobrać danych GUS')
    } finally {
      setFetching(false)
    }
  }

  const handleSave = async () => {
    if (!form.nazwa.trim()) { alert('Podaj nazwę firmy'); return }
    setSaving(true)
    try {
      const data = { ...form }
      if (isEdit) {
        await update(id, data)
      } else {
        await add(data)
      }
      setSaved(true)
      setTimeout(() => navigate('/kontrahenci'), 800)
    } catch(err) {
      alert('Błąd zapisu: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="kf-wrap animate-in">
      <div className="kf-topbar">
        <button className="btn btn-ghost" onClick={()=>navigate('/kontrahenci')}>
          <ChevronLeft size={14}/> Wróć do listy
        </button>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:7,height:7,borderRadius:'50%',background:'var(--green-primary)',boxShadow:'0 0 5px var(--green-primary)'}}/>
          <span style={{fontSize:11,color:'var(--text-muted)',fontFamily:'var(--font-mono)'}}>Firestore</span>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saved ? <><Check size={14}/> Zapisano!</> : saving ? <><Loader size={14} style={{animation:'spin 0.7s linear infinite'}}/> Zapisywanie...</> : <><Save size={14}/> Zapisz kontrahenta</>}
          </button>
        </div>
      </div>

      <div className="kf-layout">
        <div className="kf-left">
          <div className="kf-field">
            <label>Numer NIP</label>
            <div className="kf-nip-row">
              <input value={form.nip} onChange={e=>s('nip',e.target.value)} placeholder="000-000-00-00" className="kf-input"/>
              <button className="kf-gus-btn" onClick={fetchGUS} disabled={fetching}>
                {fetching ? <Loader size={12} style={{animation:'spin 0.7s linear infinite'}}/> : null}
                Pobierz z GUS
              </button>
            </div>
          </div>
          <div className="kf-field"><label>Nazwa firmy</label><input value={form.nazwa} onChange={e=>s('nazwa',e.target.value)} className="kf-input"/></div>
          <div className="kf-field"><label>Typ/Grupa</label>
            <select value={form.typ} onChange={e=>s('typ',e.target.value)} className="kf-input">
              <option value="">Wybierz...</option>
              {(TYPY_GRUP||['Klient','Dostawca','Partner']).map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="kf-field"><label>Państwo</label>
            <select value={form.panstwo} onChange={e=>s('panstwo',e.target.value)} className="kf-input">
              {['PL','DE','FR','GB','CZ','SK','UA','US'].map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="kf-field"><label>Adres</label><input value={form.adres} onChange={e=>s('adres',e.target.value)} className="kf-input"/></div>
          <div className="kf-field"><label>Miasto</label><input value={form.miasto} onChange={e=>s('miasto',e.target.value)} className="kf-input"/></div>
          <div className="kf-field"><label>Kod pocztowy</label><input value={form.kodPocztowy} onChange={e=>s('kodPocztowy',e.target.value)} placeholder="00-000" className="kf-input"/></div>
          <div className="kf-field"><label>Telefon</label><input value={form.telefon} onChange={e=>s('telefon',e.target.value)} className="kf-input"/></div>
          <div className="kf-field"><label>Adres e-mail</label><input type="email" value={form.email} onChange={e=>s('email',e.target.value)} className="kf-input"/></div>
          <div className="kf-field"><label>Prefiks do numeracji</label><input value={form.prefiks} onChange={e=>s('prefiks',e.target.value)} className="kf-input"/></div>
          <div className="kf-field"><label>Główny numer konta</label><input value={form.glownyNrKonta} onChange={e=>s('glownyNrKonta',e.target.value)} className="kf-input"/></div>
          <div className="kf-field"><label>Domyślny termin płatności [dni]</label><input type="number" value={form.terminPlatnosci} onChange={e=>s('terminPlatnosci',e.target.value)} className="kf-input"/></div>
        </div>

        <div className="kf-right">
          <div className="kf-field"><label>Opiekunowie</label>
            <select value={form.opiekunowie} onChange={e=>s('opiekunowie',e.target.value)} className="kf-input">
              <option value="">Wybierz...</option>
              {(OPIEKUNOWIE||['Karol L8 Studio','Igor Dutczak']).map(o=><option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="kf-checkboxes">
            <label className="kf-checkbox"><input type="checkbox" checked={form.dostawca} onChange={e=>s('dostawca',e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>Dostawca</label>
            <label className="kf-checkbox"><input type="checkbox" checked={form.klient} onChange={e=>s('klient',e.target.checked)} style={{accentColor:'var(--green-primary)'}}/>Klient</label>
          </div>
          <div className="kf-field">
            <label>Logo</label>
            <div className="kf-drop-zone">
              {logo ? <img src={logo} alt="logo" style={{maxHeight:60,maxWidth:120,objectFit:'contain'}}/> : <span>Przeciągnij i upuść plik tutaj...</span>}
            </div>
            <div className="kf-file-row">
              <input className="kf-input" style={{flex:1}} placeholder="Wybierz pliki..."/>
              <button className="kf-browse-btn" onClick={()=>fileRef.current?.click()}><Upload size={12}/> Przeglądaj...</button>
              <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files[0];if(f)setLogo(URL.createObjectURL(f))}}/>
            </div>
          </div>
          <div className="kf-field">
            <label>Dodatkowe informacje</label>
            <div className="kf-editor-bar">
              <button className="kf-editor-btn"><strong>B</strong></button>
              <button className="kf-editor-btn"><em>I</em></button>
              <button className="kf-editor-btn"><u>U</u></button>
            </div>
            <textarea value={form.dodatkoweInfo} onChange={e=>s('dodatkoweInfo',e.target.value)} rows={4} style={{borderTop:'none',borderRadius:'0 0 var(--radius) var(--radius)'}}/>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
