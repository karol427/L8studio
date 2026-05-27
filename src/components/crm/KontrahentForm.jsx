import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Save, Upload } from 'lucide-react'
import { TYPY_GRUP, OPIEKUNOWIE } from './crmData'
import './KontrahentForm.css'

export default function KontrahentForm({ kontrahent = null }) {
  const navigate = useNavigate()
  const fileRef = useRef()
  const [logo, setLogo] = useState(null)
  const [dragging, setDragging] = useState(false)

  const [form, setForm] = useState({
    nip: kontrahent?.nip || '',
    nazwa: kontrahent?.nazwa || '',
    typ: '',
    panstwo: 'PL',
    adres: kontrahent?.adres || '',
    miasto: kontrahent?.miasto || '',
    kodPocztowy: '',
    telefon: kontrahent?.telefon || '',
    email: kontrahent?.email || '',
    prefiks: '',
    glownyNrKonta: '',
    terminPlatnosci: '',
    opiekunowie: '',
    zespolyOpiekunow: '',
    dostawca: true,
    klient: true,
    domyslnyTypKosztu: '',
    domyslnyNrKontaFV: '',
    domyslnyOpisFV: '',
    dodatkoweInfo: '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setLogo(url)
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) setLogo(URL.createObjectURL(file))
  }

  const [gusLoading, setGusLoading] = useState(false)
  const [gusError, setGusError] = useState('')

  const handleGUS = async () => {
    const nip = form.nip.replace(/[^0-9]/g, '')
    if (!nip || nip.length !== 10) {
      setGusError('Wpisz poprawny 10-cyfrowy numer NIP')
      return
    }
    setGusLoading(true)
    setGusError('')
    try {
      // Publiczne API do weryfikacji NIP (rejestr.io - bezpłatne)
      const res = await fetch(`https://rejestr.io/api/v2/nip/${nip}`)
      if (!res.ok) throw new Error('Nie znaleziono firmy')
      const data = await res.json()
      set('nazwa', data.name || data.fullName || form.nazwa)
      set('adres', data.street ? `${data.street} ${data.houseNumber || ''}`.trim() : form.adres)
      set('miasto', data.city || form.miasto)
      set('kodPocztowy', data.zipCode || form.kodPocztowy)
      set('nip', nip)
      setGusError('')
    } catch (e) {
      // Fallback: GUS BIR przez proxy (CORS-friendly)
      try {
        const res2 = await fetch(`https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=${new Date().toISOString().slice(0,10)}`)
        const data2 = await res2.json()
        const subj = data2?.result?.subject
        if (subj) {
          set('nazwa', subj.name || form.nazwa)
          set('nip', nip)
          // Parse address string: "ul. Jesionowa 8, 56-120 Brzeg Dolny" or "ULICA NR, KOD MIASTO"
          const rawAddr = subj.workingAddress || subj.residenceAddress || ''
          if (rawAddr && rawAddr !== 'null') {
            // Format: "STREET HOUSENO, ZIPCODE CITY"  or  "STREET HOUSENO ZIPCODE MIASTO"
            const commaIdx = rawAddr.lastIndexOf(',')
            if (commaIdx !== -1) {
              const streetPart = rawAddr.substring(0, commaIdx).trim()
              const cityPart = rawAddr.substring(commaIdx + 1).trim()
              // cityPart = "56-120 Brzeg Dolny"
              const zipMatch = cityPart.match(/^(\d{2}-\d{3})\s+(.+)$/)
              if (zipMatch) {
                set('adres', streetPart)
                set('kodPocztowy', zipMatch[1])
                set('miasto', zipMatch[2])
              } else {
                set('adres', streetPart)
                set('miasto', cityPart)
              }
            } else {
              // No comma — try to split by zip code pattern
              const zipMatch = rawAddr.match(/^(.+?)\s+(\d{2}-\d{3})\s+(.+)$/)
              if (zipMatch) {
                set('adres', zipMatch[1].trim())
                set('kodPocztowy', zipMatch[2])
                set('miasto', zipMatch[3].trim())
              } else {
                set('adres', rawAddr)
              }
            }
          }
          setGusError('')
        } else {
          setGusError('Nie znaleziono firmy dla podanego NIP')
        }
      } catch {
        setGusError('Błąd pobierania danych. Sprawdź NIP i spróbuj ponownie.')
      }
    }
    setGusLoading(false)
  }

  const handleSave = () => {
    if (!form.nazwa) { alert('Nazwa firmy jest wymagana'); return }
    alert('Kontrahent zapisany!')
    navigate('/kontrahenci')
  }

  return (
    <div className="kf-wrap animate-in">
      <div className="kf-topbar">
        <button className="btn btn-ghost" onClick={() => navigate('/kontrahenci')}>
          <ChevronLeft size={14} /> Wróć do listy
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={14} /> Zapisz kontrahenta
        </button>
      </div>

      <div className="kf-layout">
        {/* LEFT */}
        <div className="kf-left">
          <div className="kf-field">
            <label>Numer NIP</label>
            <input value={form.nip} onChange={e => set('nip', e.target.value)} placeholder="" />
            {gusError && <span className="kf-gus-error">{gusError}</span>}
            <button className="kf-gus-btn" onClick={handleGUS} disabled={gusLoading}>
              {gusLoading ? '⏳ Pobieranie...' : 'Pobierz dane z GUS'}
            </button>
          </div>

          <div className="kf-field">
            <label>Nazwa firmy</label>
            <input value={form.nazwa} onChange={e => set('nazwa', e.target.value)} />
          </div>

          <div className="kf-field">
            <label>Typ/Grupa</label>
            <select value={form.typ} onChange={e => set('typ', e.target.value)}>
              <option value="">Wybierz...</option>
              {TYPY_GRUP.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="kf-field">
            <label>Państwo</label>
            <input value={form.panstwo} onChange={e => set('panstwo', e.target.value)} />
          </div>

          <div className="kf-field">
            <label>Adres</label>
            <input value={form.adres} onChange={e => set('adres', e.target.value)} />
          </div>

          <div className="kf-field">
            <label>Miasto</label>
            <input value={form.miasto} onChange={e => set('miasto', e.target.value)} />
          </div>

          <div className="kf-field">
            <label>Kod pocztowy</label>
            <input value={form.kodPocztowy} onChange={e => set('kodPocztowy', e.target.value)} />
          </div>

          <div className="kf-field">
            <label>Telefon</label>
            <input value={form.telefon} onChange={e => set('telefon', e.target.value)} />
          </div>

          <div className="kf-field">
            <label>Adres e-mail</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>

          <div className="kf-field">
            <label>Prefiks do numeracji</label>
            <input value={form.prefiks} onChange={e => set('prefiks', e.target.value)} />
          </div>

          <div className="kf-field kf-field--highlight">
            <label>Główny numer konta</label>
            <input value={form.glownyNrKonta} onChange={e => set('glownyNrKonta', e.target.value)} />
          </div>

          <div className="kf-field">
            <label>Domyślny termin płatności [dni]</label>
            <input type="number" value={form.terminPlatnosci} onChange={e => set('terminPlatnosci', e.target.value)} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="kf-right">
          <div className="kf-field">
            <label>Opiekunowie</label>
            <select value={form.opiekunowie} onChange={e => set('opiekunowie', e.target.value)}>
              <option value="">Wybierz...</option>
              {OPIEKUNOWIE.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          <div className="kf-field">
            <label>Zespoły opiekunów</label>
            <select value={form.zespolyOpiekunow} onChange={e => set('zespolyOpiekunow', e.target.value)}>
              <option value="">Wybierz...</option>
            </select>
          </div>

          <div className="kf-checkboxes">
            <label className="kf-checkbox">
              <input type="checkbox" checked={form.dostawca} onChange={e => set('dostawca', e.target.checked)} />
              Dostawca
            </label>
            <label className="kf-checkbox">
              <input type="checkbox" checked={form.klient} onChange={e => set('klient', e.target.checked)} />
              Klient
            </label>
          </div>

          <div className="kf-field">
            <label>Domyślny typ kosztu</label>
            <select value={form.domyslnyTypKosztu} onChange={e => set('domyslnyTypKosztu', e.target.value)}>
              <option value="">Wybierz...</option>
            </select>
          </div>

          <div className="kf-field">
            <label>Domyślny numer konta na FV</label>
            <select value={form.domyslnyNrKontaFV} onChange={e => set('domyslnyNrKontaFV', e.target.value)}>
              <option value="">Wybierz...</option>
            </select>
          </div>

          <div className="kf-field">
            <label>Domyślny opis na FV</label>
            <select value={form.domyslnyOpisFV} onChange={e => set('domyslnyOpisFV', e.target.value)}>
              <option value="">Wybierz...</option>
            </select>
          </div>

          <div className="kf-field">
            <label>Logo</label>
            <div
              className={`kf-dropzone ${dragging ? 'kf-dropzone--active' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              {logo
                ? <img src={logo} alt="Logo" className="kf-logo-preview" />
                : <span className="kf-dropzone-text">Przeciągnij i upuść pliki tutaj ...</span>
              }
            </div>
            <div className="kf-file-row">
              <input
                type="text"
                placeholder="Wybierz pliki ..."
                readOnly
                onClick={() => fileRef.current?.click()}
              />
              <button className="kf-browse-btn" onClick={() => fileRef.current?.click()}>
                <Upload size={13} /> Przeglądaj ...
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileInput} />
            </div>
          </div>

          <div className="kf-field">
            <label>Dodatkowe informacje</label>
            <div className="kf-editor-bar">
              <button className="kf-editor-btn"><strong>B</strong></button>
              <button className="kf-editor-btn"><em>I</em></button>
              <button className="kf-editor-btn"><u>U</u></button>
            </div>
            <textarea
              value={form.dodatkoweInfo}
              onChange={e => set('dodatkoweInfo', e.target.value)}
              rows={4}
              style={{ borderTop: 'none', borderRadius: '0 0 var(--radius) var(--radius)' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
