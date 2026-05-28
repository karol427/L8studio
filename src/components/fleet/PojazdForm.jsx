import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Save, Truck } from 'lucide-react'
import DateTimePicker from '../events/DateTimePicker'
import { TYPY_POJAZDOW, STATUSY_POJAZDOW } from './fleetData'
import './Fleet.css'

export default function PojazdForm() {
  const navigate = useNavigate()
  const fileRef = useRef()
  const [zdjecie, setZdjecie] = useState(null)
  const [form, setForm] = useState({
    typ: 'Firmowy', nazwa: '', kosztKm: '', kosztRyczalt: '',
    ladownosc: '', pojemnosc: '', nrRej: '', nrVin: '',
    sredniespalanie: '', opis: '', dataPrzegladu: null,
    ocWazneDo: null, przypomnienie: 'Brak', przypomnieniUser: '',
    uwagi: '', status: 'Sprawny',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="fl-form-wrap animate-in">
      <div className="fl-form-topbar">
        <button className="btn btn-ghost" onClick={() => navigate('/flota')}><ChevronLeft size={14}/> Wróć</button>
        <button className="btn btn-primary" onClick={() => { alert('Pojazd zapisany!'); navigate('/flota') }}><Save size={14}/> Zapisz</button>
      </div>

      <div className="fl-form-layout">
        {/* LEFT */}
        <div className="fl-form-left">
          <div className="fl-field">
            <label>Typ</label>
            <select value={form.typ} onChange={e=>set('typ',e.target.value)}>
              {TYPY_POJAZDOW.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="fl-field"><label>Nazwa</label><input value={form.nazwa} onChange={e=>set('nazwa',e.target.value)} /></div>
          <div className="fl-field"><label>Średni koszt kilometra</label><input type="number" value={form.kosztKm} onChange={e=>set('kosztKm',e.target.value)} /></div>
          <div className="fl-field"><label>Średni koszt przy ryczałcie</label><input type="number" value={form.kosztRyczalt} onChange={e=>set('kosztRyczalt',e.target.value)} /></div>
          <div className="fl-field"><label>Ładowność</label><input type="number" value={form.ladownosc} onChange={e=>set('ladownosc',e.target.value)} /></div>
          <div className="fl-field"><label>Pojemność</label><input type="number" value={form.pojemnosc} onChange={e=>set('pojemnosc',e.target.value)} /></div>
          <div className="fl-field"><label>Numer rejestracyjny</label><input value={form.nrRej} onChange={e=>set('nrRej',e.target.value)} /></div>
          <div className="fl-field"><label>Numer VIN</label><input value={form.nrVin} onChange={e=>set('nrVin',e.target.value)} /></div>
          <div className="fl-field"><label>Średnie spalanie</label><input type="number" value={form.sredniespalanie} onChange={e=>set('sredniespalanie',e.target.value)} /></div>
          <div className="fl-field">
            <label>Opis</label>
            <div className="fl-editor-bar">
              <button className="fl-editor-btn"><strong>B</strong></button>
              <button className="fl-editor-btn"><em>I</em></button>
              <button className="fl-editor-btn"><u>U</u></button>
            </div>
            <textarea value={form.opis} onChange={e=>set('opis',e.target.value)} rows={4} style={{borderTop:'none',borderRadius:'0 0 var(--radius) var(--radius)'}} />
          </div>
          <button className="btn btn-primary" style={{alignSelf:'flex-start'}} onClick={() => { alert('Pojazd zapisany!'); navigate('/flota') }}>Zapisz</button>
        </div>

        {/* RIGHT */}
        <div className="fl-form-right">
          {/* Truck icon preview */}
          <div className="fl-truck-preview">
            {zdjecie
              ? <img src={zdjecie} alt="Pojazd" className="fl-truck-img" />
              : <Truck size={80} strokeWidth={1} color="var(--text-muted)" />
            }
          </div>

          <div className="fl-field">
            <label>Zdjęcie</label>
            <div className="fl-file-row">
              <button className="btn btn-ghost" style={{fontSize:12}} onClick={() => fileRef.current?.click()}>Wybierz plik</button>
              <span className="fl-file-name">{zdjecie ? 'Wybrano plik' : 'Nie wybrano pliku'}</span>
              <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}}
                onChange={e => { const f = e.target.files[0]; if(f) setZdjecie(URL.createObjectURL(f)) }} />
            </div>
          </div>

          <div className="fl-field">
            <label>Data przeglądu</label>
            <DateTimePicker value={form.dataPrzegladu} onChange={v=>set('dataPrzegladu',v)} placeholder="Wybierz..." />
          </div>
          <div className="fl-field">
            <label>OC ważne do</label>
            <DateTimePicker value={form.ocWazneDo} onChange={v=>set('ocWazneDo',v)} placeholder="Wybierz..." />
          </div>
          <div className="fl-field">
            <label>Przypomnij przed końcem OC i przeglądu</label>
            <select value={form.przypomnienie} onChange={e=>set('przypomnienie',e.target.value)}>
              {['Brak','7 dni','14 dni','30 dni','60 dni'].map(o=><option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="fl-field">
            <label>Przypomnij użytkownikom</label>
            <select value={form.przypomnieniUser} onChange={e=>set('przypomnieniUser',e.target.value)}>
              <option value="">Wybierz...</option>
              <option>Karol L8 Studio</option>
              <option>Igor Dutczak</option>
              <option>Anna Kowalska</option>
            </select>
          </div>
          <div className="fl-field">
            <label>Uwagi</label>
            <div className="fl-editor-bar">
              <button className="fl-editor-btn"><strong>B</strong></button>
              <button className="fl-editor-btn"><em>I</em></button>
              <button className="fl-editor-btn"><u>U</u></button>
            </div>
            <textarea value={form.uwagi} onChange={e=>set('uwagi',e.target.value)} rows={4} style={{borderTop:'none',borderRadius:'0 0 var(--radius) var(--radius)'}} />
          </div>
        </div>
      </div>
    </div>
  )
}
