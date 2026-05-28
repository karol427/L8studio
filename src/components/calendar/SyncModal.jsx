import { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'
import './SyncModal.css'

const CALENDAR_URL = 'https://calendar.l8studio.pl/ical/sync?token=abc123xyz'

export default function SyncModal({ onClose }) {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    eksportujWydarzenia: 'Nie',
    filtrWydarzenia: 'Wszystkie, do których mam dostęp',
    filtrStatusy: '',
    filtrTypy: '',
    infoNazwa: '',
    infoSzczegoly: '',
    eksportujWypozyczenia: 'Nie',
    filtrWypozyczenia: 'Wszystkie, do których mam dostęp',
    infoNazwaWyp: '',
    infoSzczegolyWyp: '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleCopy = () => {
    navigator.clipboard.writeText(CALENDAR_URL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="sync-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sync-modal">
        <button className="sync-close" onClick={onClose}><X size={16} /></button>

        <div className="sync-body">
          {/* Link */}
          <div className="sync-row">
            <label className="sync-label">Link do kalendarza:</label>
            <button
              className={`sync-copy-btn ${copied ? 'sync-copy-btn--copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Skopiowano!' : 'Kopiuj'}
            </button>
          </div>

          {/* Eksportuj wydarzenia */}
          <div className="sync-row">
            <label className="sync-label">Eksportuj wydarzenia:</label>
            <select value={form.eksportujWydarzenia} onChange={e => set('eksportujWydarzenia', e.target.value)} className="sync-select">
              <option>Nie</option>
              <option>Tak</option>
            </select>
          </div>

          {/* Filtr na wydarzenia */}
          <div className="sync-row">
            <label className="sync-label">Filtr na wydarzenia:</label>
            <select value={form.filtrWydarzenia} onChange={e => set('filtrWydarzenia', e.target.value)} className="sync-select">
              <option>Wszystkie, do których mam dostęp</option>
              <option>Tylko moje wydarzenia</option>
              <option>Tylko potwierdzone</option>
            </select>
          </div>

          {/* Filtr na statusy */}
          <div className="sync-row">
            <label className="sync-label">Filtr na statusy wydarzenia:</label>
            <input
              value={form.filtrStatusy}
              onChange={e => set('filtrStatusy', e.target.value)}
              placeholder="Wybierz..."
              className="sync-input"
            />
          </div>

          {/* Filtr na typy */}
          <div className="sync-row">
            <label className="sync-label">Filtr na typy wydarzenia:</label>
            <input
              value={form.filtrTypy}
              onChange={e => set('filtrTypy', e.target.value)}
              placeholder="Wybierz..."
              className="sync-input"
            />
          </div>

          {/* Info w nazwie */}
          <div className="sync-row">
            <label className="sync-label">Informacje w nazwie wydarzenia:</label>
            <input
              value={form.infoNazwa}
              onChange={e => set('infoNazwa', e.target.value)}
              placeholder="Wybierz..."
              className="sync-input"
            />
          </div>

          {/* Info w szczegółach */}
          <div className="sync-row">
            <label className="sync-label">Informacje w szczegółach wydarzenia:</label>
            <input
              value={form.infoSzczegoly}
              onChange={e => set('infoSzczegoly', e.target.value)}
              placeholder="Wybierz..."
              className="sync-input"
            />
          </div>

          {/* Eksportuj wypożyczenia */}
          <div className="sync-row">
            <label className="sync-label">Eksportuj wypożyczenia:</label>
            <select value={form.eksportujWypozyczenia} onChange={e => set('eksportujWypozyczenia', e.target.value)} className="sync-select">
              <option>Nie</option>
              <option>Tak</option>
            </select>
          </div>

          {/* Filtr na wypożyczenia */}
          <div className="sync-row">
            <label className="sync-label">Filtr na wypożyczenia:</label>
            <select value={form.filtrWypozyczenia} onChange={e => set('filtrWypozyczenia', e.target.value)} className="sync-select">
              <option>Wszystkie, do których mam dostęp</option>
              <option>Tylko moje</option>
            </select>
          </div>

          {/* Info nazwa wypożyczenia */}
          <div className="sync-row">
            <label className="sync-label">Informacje w nazwie wypożyczenia:</label>
            <input
              value={form.infoNazwaWyp}
              onChange={e => set('infoNazwaWyp', e.target.value)}
              placeholder="Wybierz..."
              className="sync-input"
            />
          </div>

          {/* Info szczegóły wypożyczenia */}
          <div className="sync-row">
            <label className="sync-label">Informacje w szczegółach wypożyczenia:</label>
            <input
              value={form.infoSzczegolyWyp}
              onChange={e => set('infoSzczegolyWyp', e.target.value)}
              placeholder="Wybierz..."
              className="sync-input"
            />
          </div>

          {/* Zapisz */}
          <div className="sync-save-row">
            <button className="sync-save-btn" onClick={onClose}>Zapisz</button>
          </div>

          {/* Instrukcja */}
          <div className="sync-info-box">
            <p><strong>Jak zintegrować kalendarz L8 Studio z kalendarzem Google:</strong></p>
            <ol>
              <li>Ustal powyżej, które elementy chcesz integrować i kliknij Zapisz</li>
              <li>Kliknij różowy przycisk "kopiuj", w ten sposób w schowku znajdzie się unikalny link do integracji</li>
              <li>Wejdź w kalendarz Google → Ustawienia → Dodaj kalendarz → Z adresu URL i wklej link<br/>
                <a href="https://calendar.google.com/calendar/u/0/r/settings/addbyurl" target="_blank" rel="noopener noreferrer">
                  https://calendar.google.com/calendar/u/0/r/settings/addbyurl
                </a>
              </li>
              <li>Pamiętaj, że integracja pomiędzy kalendarzami zależy od Google i następuje co ok. 8h</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
