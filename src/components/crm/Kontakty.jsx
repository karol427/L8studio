import { useState } from 'react'
import { Plus, Upload, Eye, Edit, X } from 'lucide-react'
import './Kontakty.css'

const KONTAKTY_LIST = [
  { id: 1, nazwisko: 'Barton', imie: 'Patrycja', telefon: '690991844', email: 'patrycja@newsystems.pl', stanowisko: '', klient: '4LeeLoo Patrycja' },
  { id: 2, nazwisko: 'Niezapominalski', imie: 'Mariusz', telefon: '245 678 456', email: 'mariusz@niezapominalski.pl', stanowisko: '', klient: 'Bank Współczesny' },
  { id: 3, nazwisko: 'Kowalski', imie: 'Włodzimierz', telefon: '567 890 345', email: 'wlodzimierz@kowalski.pl', stanowisko: '', klient: 'T-MOBILE POLSKA SPÓŁKA AKCYJNA' },
  { id: 4, nazwisko: 'Mariański', imie: 'Dariusz', telefon: '586 984 893', email: 'dariusz@marianski.pl', stanowisko: '', klient: 'Wypożyczalnia Oświetlenia' },
  { id: 5, nazwisko: 'Wannicka', imie: 'Jolanta', telefon: '896 985 875', email: 'jolanta@wannicka.pl', stanowisko: '', klient: 'Wypożyczalnia mikserów' },
  { id: 6, nazwisko: 'Kownacki', imie: 'Emilian', telefon: '666 888 000', email: 'emilian@kownacki.pl', stanowisko: '', klient: 'Wypożyczalnia Głośników' },
  { id: 7, nazwisko: 'Nowicki', imie: 'Łukas', telefon: '567 876 654', email: 'lukasz@nowiski.pl', stanowisko: '', klient: 'Wypożyczalnia Sceny' },
  { id: 8, nazwisko: 'Michalowicz', imie: 'Bartosz', telefon: '345 654 456', email: 'bartosz@michalowicz.pl', stanowisko: '', klient: 'ORANGE POLSKA SPÓŁKA AKCYJNA' },
  { id: 9, nazwisko: 'Galla', imie: 'Marek', telefon: '609336442', email: 'marqiz87@gmail.com', stanowisko: '', klient: 'Adventure Sport Marek Galla' },
  { id: 10, nazwisko: 'Król', imie: 'Jakub', telefon: '', email: '', stanowisko: '', klient: 'PiN Jakub Król' },
  { id: 11, nazwisko: 'N/a', imie: 'N/a', telefon: '', email: '', stanowisko: '', klient: 'NaN' },
  { id: 12, nazwisko: 'Jan', imie: 'Kowalski', telefon: '', email: '', stanowisko: '', klient: 'SERWERSMS POLSKA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ' },
  { id: 13, nazwisko: 'Drewno', imie: 'Łukasz', telefon: '', email: '', stanowisko: '', klient: 'Wypożyczalnia Laptopów' },
  { id: 14, nazwisko: 'Barwiński', imie: 'Bartosz', telefon: '', email: '', stanowisko: 'Pracownik Techniczny', klient: 'MUZEUM ŚREMSKIE,ŚREM' },
]

export default function Kontakty() {
  const [items, setItems] = useState(KONTAKTY_LIST)
  const [selected, setSelected] = useState([])
  const [filters, setFilters] = useState({ nazwisko: '', imie: '', telefon: '', email: '', stanowisko: '', klient: '' })

  const setF = (k, v) => setFilters(f => ({ ...f, [k]: v }))
  const toggleSelect = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(i => i.id))

  const deleteItem = (id, name) => {
    if (window.confirm(`Usunąć kontakt "${name}"?`)) {
      setItems(p => p.filter(i => i.id !== id))
    }
  }

  const filtered = items.filter(i =>
    (!filters.nazwisko || i.nazwisko.toLowerCase().includes(filters.nazwisko.toLowerCase())) &&
    (!filters.imie || i.imie.toLowerCase().includes(filters.imie.toLowerCase())) &&
    (!filters.telefon || i.telefon.includes(filters.telefon)) &&
    (!filters.email || i.email.toLowerCase().includes(filters.email.toLowerCase())) &&
    (!filters.stanowisko || i.stanowisko.toLowerCase().includes(filters.stanowisko.toLowerCase())) &&
    (!filters.klient || i.klient.toLowerCase().includes(filters.klient.toLowerCase()))
  )

  return (
    <div className="kt-wrap animate-in">
      <div className="kt-toolbar">
        <button className="btn btn-primary"><Plus size={13} /> Dodaj</button>
        <button className="btn btn-ghost"><Upload size={13} /> Import z Excel</button>
      </div>

      <div className="kt-table-wrap">
        <table className="kt-table">
          <thead>
            <tr>
              <th style={{ width: 32 }}>
                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} />
              </th>
              <th style={{ width: 36 }}>#</th>
              <th><div className="kt-th-col">Nazwisko<input className="kt-col-filter" value={filters.nazwisko} onChange={e => setF('nazwisko', e.target.value)} /></div></th>
              <th><div className="kt-th-col">Imię<input className="kt-col-filter" value={filters.imie} onChange={e => setF('imie', e.target.value)} /></div></th>
              <th><div className="kt-th-col">Telefon<input className="kt-col-filter" value={filters.telefon} onChange={e => setF('telefon', e.target.value)} /></div></th>
              <th><div className="kt-th-col">Adres e-mail<input className="kt-col-filter" value={filters.email} onChange={e => setF('email', e.target.value)} /></div></th>
              <th><div className="kt-th-col">Stanowisko<input className="kt-col-filter" value={filters.stanowisko} onChange={e => setF('stanowisko', e.target.value)} /></div></th>
              <th><div className="kt-th-col">Klient<input className="kt-col-filter" value={filters.klient} onChange={e => setF('klient', e.target.value)} /></div></th>
              <th style={{ width: 90 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={9} className="kt-empty">Brak wyników.</td></tr>}
            {filtered.map((item, idx) => (
              <tr key={item.id} className={selected.includes(item.id) ? 'kt-row--selected' : ''}>
                <td><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} /></td>
                <td className="kt-num">{idx + 1}</td>
                <td className="kt-cell kt-bold">{item.nazwisko}</td>
                <td className="kt-cell">{item.imie}</td>
                <td className="kt-cell kt-mono">{item.telefon || ''}</td>
                <td className="kt-cell">
                  {item.email ? <a href={`mailto:${item.email}`} className="kt-email">{item.email}</a> : ''}
                </td>
                <td className="kt-cell">{item.stanowisko}</td>
                <td className="kt-cell">{item.klient}</td>
                <td>
                  <div className="kt-actions">
                    <button className="kt-act-btn" title="Podgląd"><Eye size={13} /></button>
                    <button className="kt-act-btn" title="Edytuj"><Edit size={13} /></button>
                    <button className="kt-act-btn kt-act-btn--del" title="Usuń" onClick={() => deleteItem(item.id, `${item.imie} ${item.nazwisko}`)}><X size={13} /></button>
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
