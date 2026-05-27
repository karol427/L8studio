import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, Edit, X } from 'lucide-react'
import { USERS_LIST } from './usersData'
import './Users.css'

export default function UzytkownicyList() {
  const [users, setUsers] = useState(USERS_LIST)
  const [filterImie, setFilterImie] = useState('')

  const filtered = users.filter(u =>
    !filterImie || `${u.imie} ${u.nazwisko}`.toLowerCase().includes(filterImie.toLowerCase())
  )

  const deleteUser = (id, name) => {
    if (window.confirm(`Usunąć użytkownika "${name}"?`)) setUsers(p => p.filter(u => u.id !== id))
  }

  return (
    <div className="usr-wrap animate-in">
      <div className="usr-toolbar">
        <Link to="/uzytkownicy/nowy" className="btn btn-primary"><Plus size={13} /> Dodaj</Link>
      </div>
      <div className="usr-table-wrap">
        <table className="usr-table">
          <thead>
            <tr>
              <th style={{width:36}}>#</th>
              <th><div className="usr-th-col">Imię i nazwisko<input className="usr-col-filter" value={filterImie} onChange={e => setFilterImie(e.target.value)} /></div></th>
              <th>Email</th>
              <th>Typ</th>
              <th>Rola</th>
              <th>Stanowisko</th>
              <th>Aktywny</th>
              <th style={{width:90}}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, idx) => (
              <tr key={u.id}>
                <td className="usr-num">{idx+1}</td>
                <td><Link to={`/uzytkownicy/${u.id}`} className="usr-name-link">{u.imie} {u.nazwisko}</Link></td>
                <td className="usr-cell">{u.email}</td>
                <td><span className={`usr-typ usr-typ--${u.typ === 'Superuser' ? 'super' : 'normal'}`}>{u.typ}</span></td>
                <td className="usr-cell">{u.rola}</td>
                <td className="usr-cell">{u.stanowisko || '–'}</td>
                <td><span className={`usr-bool ${u.aktywny ? 'usr-bool--yes' : 'usr-bool--no'}`}>{u.aktywny ? 'Tak' : 'Nie'}</span></td>
                <td>
                  <div className="usr-actions">
                    <Link to={`/uzytkownicy/${u.id}`} className="usr-act-btn"><Eye size={13} /></Link>
                    <Link to={`/uzytkownicy/${u.id}/edytuj`} className="usr-act-btn"><Edit size={13} /></Link>
                    <button className="usr-act-btn usr-act-btn--del" onClick={() => deleteUser(u.id, `${u.imie} ${u.nazwisko}`)}><X size={13} /></button>
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
