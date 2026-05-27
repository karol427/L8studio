import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Save, ChevronDown, ChevronUp } from 'lucide-react'
import DateTimePicker from '../events/DateTimePicker'
import './UserForm.css'

export default function UserForm() {
  const navigate = useNavigate()
  const [showOferty, setShowOferty] = useState(false)
  const [form, setForm] = useState({
    email: '', haslo: '', wyslijHaslo: true,
    imie: '', nazwisko: '', miasto: '', telefon: '',
    rfid: '', traccar: '', kierowca: false,
    dataurodzenia: null, pesel: '', nrDowodu: '',
    typ: 'Pracownik', rola: 'User', stanowisko: '',
    grupaUprawnien: '', aktywny: 'Aktywny',
    widocznyPlanowanie: 'Widoczny', widocznyRozliczenia: 'Widoczny',
    oddzialy: '', umiejetnosci: '',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$'
    const pass = Array.from({length: 12}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    set('haslo', pass)
  }

  return (
    <div className="uf-wrap animate-in">
      <div className="uf-topbar">
        <button className="btn btn-ghost" onClick={() => navigate('/uzytkownicy')}><ChevronLeft size={14} /> Wróć</button>
        <button className="btn btn-primary" onClick={() => { alert('Użytkownik zapisany!'); navigate('/uzytkownicy') }}><Save size={14} /> Zapisz</button>
      </div>

      <div className="uf-warning">
        Wykorzystano limit superużytkowników 3/. Dodanie kolejnego konta z uprawnieniami superuser wiąże się z dodatkowym kosztem zgodnie z cennikiem. Koszt zostanie doliczony przy kolejnej fakturze za subskrypcję programu.
      </div>

      <div className="uf-layout">
        {/* LEFT */}
        <div className="uf-left">
          <div className="uf-field">
            <label>Adres e-mail/login</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div className="uf-field">
            <label>Nowe hasło</label>
            <input type="password" value={form.haslo} onChange={e => set('haslo', e.target.value)} />
            <button className="uf-generate-btn" onClick={generatePassword}>Generuj hasło</button>
            <label className="uf-checkbox"><input type="checkbox" checked={form.wyslijHaslo} onChange={e => set('wyslijHaslo', e.target.checked)} /> Wyślij hasło</label>
          </div>
          <div className="uf-field"><label>Imię</label><input value={form.imie} onChange={e => set('imie', e.target.value)} /></div>
          <div className="uf-field"><label>Nazwisko</label><input value={form.nazwisko} onChange={e => set('nazwisko', e.target.value)} /></div>
          <div className="uf-field"><label>Miasto Zamieszkania</label><input value={form.miasto} onChange={e => set('miasto', e.target.value)} /></div>
          <div className="uf-field"><label>Telefon</label><input value={form.telefon} onChange={e => set('telefon', e.target.value)} /></div>
          <div className="uf-field">
            <label>RFID kierowcy</label>
            <input value={form.rfid} onChange={e => set('rfid', e.target.value)} placeholder="np. 18000050632FEB01" />
          </div>
          <div className="uf-field">
            <label>Traccar kod</label>
            <input value={form.traccar} onChange={e => set('traccar', e.target.value)} placeholder="np. 18000050632FEB01" />
          </div>
          <div className="uf-field">
            <label className="uf-checkbox"><input type="checkbox" checked={form.kierowca} onChange={e => set('kierowca', e.target.checked)} /> Kierowca (Traccar)</label>
          </div>
          <div className="uf-field">
            <label>Data urodzenia</label>
            <DateTimePicker value={form.dataurodzenia} onChange={v => set('dataurodzenia', v)} placeholder="Podaj datę" />
          </div>
          <div className="uf-field"><label>Pesel</label><input value={form.pesel} onChange={e => set('pesel', e.target.value)} /></div>
          <div className="uf-field"><label>Nr dowodu</label><input value={form.nrDowodu} onChange={e => set('nrDowodu', e.target.value)} /></div>
        </div>

        {/* RIGHT */}
        <div className="uf-right">
          <div className="uf-field">
            <label>Typ</label>
            <select value={form.typ} onChange={e => set('typ', e.target.value)}>
              <option>Pracownik</option><option>Superuser</option><option>Podwykonawca</option>
            </select>
          </div>
          <div className="uf-field">
            <label>Rola</label>
            <select value={form.rola} onChange={e => set('rola', e.target.value)}>
              <option>User</option><option>Admin</option><option>Manager</option>
            </select>
          </div>
          <div className="uf-field"><label>Stanowisko</label><input value={form.stanowisko} onChange={e => set('stanowisko', e.target.value)} /></div>
          <div className="uf-field">
            <label>Grupa uprawnień</label>
            <select value={form.grupaUprawnien} onChange={e => set('grupaUprawnien', e.target.value)}>
              <option value="">Wybierz...</option><option>Pełny dostęp</option><option>Tylko odczyt</option>
            </select>
          </div>
          <div className="uf-warning-small">Użytkownik bez przypisanych uprawnień nie będzie miał dostępu do żadnej funkcji systemu.</div>
          <div className="uf-field">
            <label>Aktywny</label>
            <select value={form.aktywny} onChange={e => set('aktywny', e.target.value)}>
              <option>Aktywny</option><option>Nieaktywny</option>
            </select>
          </div>
          <div className="uf-field">
            <label>Widoczny w planowaniu</label>
            <select value={form.widocznyPlanowanie} onChange={e => set('widocznyPlanowanie', e.target.value)}>
              <option>Widoczny</option><option>Ukryty</option>
            </select>
          </div>
          <div className="uf-field">
            <label>Widoczny w rozliczeniach</label>
            <select value={form.widocznyRozliczenia} onChange={e => set('widocznyRozliczenia', e.target.value)}>
              <option>Widoczny</option><option>Ukryty</option>
            </select>
          </div>
          <div className="uf-field">
            <label>Oddziały</label>
            <select value={form.oddzialy} onChange={e => set('oddzialy', e.target.value)}>
              <option value="">Wybierz...</option>
            </select>
          </div>
          <div className="uf-field">
            <label>Umiejętności</label>
            <select value={form.umiejetnosci} onChange={e => set('umiejetnosci', e.target.value)}>
              <option value="">Wybierz...</option><option>Elektryk</option><option>Stolarz</option><option>Kierowca</option>
            </select>
          </div>
          <div className="uf-field">
            <label>Ogranicz widoczność magazynu do wybranych kategorii</label>
            <button className="uf-plus-btn">+</button>
          </div>

          {/* Zarządzanie widocznością w ofertach */}
          <div className="uf-accordion">
            <button className="uf-accordion-header" onClick={() => setShowOferty(!showOferty)}>
              <span>⚙ Zarządzanie widocznością w ofertach</span>
              {showOferty ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showOferty && (
              <div className="uf-accordion-body">
                <p className="uf-hint">Skonfiguruj które oferty są widoczne dla tego użytkownika.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
