import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Upload, Eye, Edit, X, Filter, SortDesc } from 'lucide-react'
import { KONTRAHENCI_LIST } from './crmData'
import './KontrahenciList.css'

export default function KontrahenciList() {
  const [items, setItems] = useState(KONTRAHENCI_LIST)
  const [selected, setSelected] = useState([])
  const [filterNazwa, setFilterNazwa] = useState('')
  const [filterMiasto, setFilterMiasto] = useState('')
  const [filterTelefon, setFilterTelefon] = useState('')
  const [filterNip, setFilterNip] = useState('')
  const [filterEmail, setFilterEmail] = useState('')

  const toggleSelect = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(i => i.id))

  const deleteItem = (id, nazwa) => {
    if (window.confirm(`Usunąć kontrahenta "${nazwa}"?`)) {
      setItems(p => p.filter(i => i.id !== id))
      setSelected(p => p.filter(x => x !== id))
    }
  }

  const filtered = items.filter(i => {
    if (filterNazwa && !i.nazwa.toLowerCase().includes(filterNazwa.toLowerCase())) return false
    if (filterMiasto && !i.miasto?.toLowerCase().includes(filterMiasto.toLowerCase())) return false
    if (filterTelefon && !i.telefon?.includes(filterTelefon)) return false
    if (filterNip && !i.nip?.includes(filterNip)) return false
    if (filterEmail && !i.email?.toLowerCase().includes(filterEmail.toLowerCase())) return false
    return true
  })

  return (
    <div className="krm-wrap animate-in">
      {/* Toolbar */}
      <div className="krm-toolbar">
        <Link to="/kontrahenci/nowy" className="btn btn-primary">
          <Plus size={13} /> Dodaj
        </Link>
        <button className="btn btn-ghost">
          <Upload size={13} /> Import
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <button className="krm-icon-btn"><Filter size={14} /></button>
          <button className="krm-icon-btn"><SortDesc size={14} /></button>
        </div>
      </div>

      {/* Table */}
      <div className="krm-table-wrap">
        <table className="krm-table">
          <thead>
            <tr>
              <th style={{ width: 32 }}>
                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} />
              </th>
              <th style={{ width: 36 }}>#</th>
              <th style={{ width: 60 }}>Logo</th>
              <th>
                <div className="krm-th-col">
                  Nazwa firmy
                  <input className="krm-col-filter" value={filterNazwa} onChange={e => setFilterNazwa(e.target.value)} placeholder="" />
                </div>
              </th>
              <th>Notatka</th>
              <th>Państwo</th>
              <th>
                <div className="krm-th-col">
                  Adres
                  <input className="krm-col-filter" placeholder="" />
                </div>
              </th>
              <th>
                <div className="krm-th-col">
                  Miasto
                  <input className="krm-col-filter" value={filterMiasto} onChange={e => setFilterMiasto(e.target.value)} placeholder="" />
                </div>
              </th>
              <th>
                <div className="krm-th-col">
                  Telefon
                  <input className="krm-col-filter" value={filterTelefon} onChange={e => setFilterTelefon(e.target.value)} placeholder="" />
                </div>
              </th>
              <th>
                <div className="krm-th-col">
                  Numer NIP
                  <input className="krm-col-filter" value={filterNip} onChange={e => setFilterNip(e.target.value)} placeholder="" />
                </div>
              </th>
              <th>
                <div className="krm-th-col">
                  Adres e-mail
                  <input className="krm-col-filter" value={filterEmail} onChange={e => setFilterEmail(e.target.value)} placeholder="" />
                </div>
              </th>
              <th>Opiekun</th>
              <th>
                <div className="krm-th-col">
                  Typ/Grupa
                  <select className="krm-col-filter"><option>Wybierz...</option></select>
                </div>
              </th>
              <th>Klient</th>
              <th>Dostawca</th>
              <th>Ostatnia aktywność</th>
              <th>Następna aktywność</th>
              <th style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={18} className="krm-empty">Brak wyników.</td></tr>
            )}
            {filtered.map((item, idx) => (
              <tr key={item.id} className={selected.includes(item.id) ? 'krm-row--selected' : ''}>
                <td><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} /></td>
                <td className="krm-num">{idx + 1}</td>
                <td>
                  <div className="krm-logo-placeholder" />
                </td>
                <td>
                  <Link to={`/kontrahenci/${item.id}`} className="krm-name-link">{item.nazwa}</Link>
                </td>
                <td>
                  <div className="krm-nota-cell">
                    {item.notatki > 0 && <span className="krm-nota-badge">{item.notatki}</span>}
                    <button className="krm-add-btn" title="Dodaj notatkę">+</button>
                  </div>
                </td>
                <td className="krm-cell">PL</td>
                <td className="krm-cell">{item.adres || '–'}</td>
                <td className="krm-cell">{item.miasto || '–'}</td>
                <td className="krm-cell">{item.telefon || '–'}</td>
                <td className="krm-cell krm-mono">{item.nip || '–'}</td>
                <td className="krm-cell">
                  {item.email ? <a href={`mailto:${item.email}`} className="krm-email-link">{item.email}</a> : '–'}
                </td>
                <td className="krm-cell">–</td>
                <td className="krm-cell">–</td>
                <td className="krm-cell">
                  <span className={`krm-bool ${item.klient ? 'krm-bool--yes' : 'krm-bool--no'}`}>
                    {item.klient ? 'Tak' : 'Nie'}
                  </span>
                </td>
                <td className="krm-cell">
                  <span className={`krm-bool ${item.dostawca ? 'krm-bool--yes' : 'krm-bool--no'}`}>
                    {item.dostawca ? 'Tak' : 'Nie'}
                  </span>
                </td>
                <td className="krm-cell krm-mono">{item.aktywnosc || '–'}</td>
                <td className="krm-cell krm-mono">{item.nastepnaAktywnosc || '–'}</td>
                <td>
                  <div className="krm-actions">
                    <Link to={`/kontrahenci/${item.id}`} className="krm-act-btn" title="Podgląd"><Eye size={13} /></Link>
                    <Link to={`/kontrahenci/${item.id}/edytuj`} className="krm-act-btn" title="Edytuj"><Edit size={13} /></Link>
                    <button className="krm-act-btn krm-act-btn--del" title="Usuń" onClick={() => deleteItem(item.id, item.nazwa)}><X size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
