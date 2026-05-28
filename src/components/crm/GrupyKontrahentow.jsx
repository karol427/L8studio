import { useState } from 'react'
import { Plus, Edit, X, Check } from 'lucide-react'
import './GrupyKontrahentow.css'

const INIT_GRUPY = [
  { id: 1, nazwa: 'Prospect' },
  { id: 2, nazwa: 'Klient' },
]

export default function GrupyKontrahentow() {
  const [grupy, setGrupy] = useState(INIT_GRUPY)
  const [editingId, setEditingId] = useState(null)
  const [editVal, setEditVal] = useState('')
  const [newNazwa, setNewNazwa] = useState('')
  const [adding, setAdding] = useState(false)

  const startEdit = (g) => { setEditingId(g.id); setEditVal(g.nazwa) }
  const saveEdit = (id) => {
    setGrupy(p => p.map(g => g.id === id ? { ...g, nazwa: editVal } : g))
    setEditingId(null)
  }
  const deleteGrupa = (id, nazwa) => {
    if (window.confirm(`Usunąć grupę "${nazwa}"?`)) setGrupy(p => p.filter(g => g.id !== id))
  }
  const addGrupa = () => {
    if (!newNazwa.trim()) return
    setGrupy(p => [...p, { id: Date.now(), nazwa: newNazwa.trim() }])
    setNewNazwa(''); setAdding(false)
  }

  return (
    <div className="gg-wrap animate-in">
      <div className="gg-toolbar">
        <button className="btn btn-primary" onClick={() => setAdding(true)}>
          <Plus size={13} /> Dodaj
        </button>
      </div>

      <div className="gg-table-wrap">
        <table className="gg-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}>#</th>
              <th>Nazwa</th>
              <th style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {adding && (
              <tr className="gg-add-row">
                <td></td>
                <td>
                  <input
                    className="gg-inline-input"
                    value={newNazwa}
                    onChange={e => setNewNazwa(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addGrupa()}
                    autoFocus
                    placeholder="Nazwa grupy..."
                  />
                </td>
                <td>
                  <div className="gg-actions">
                    <button className="gg-act-btn gg-act-btn--save" onClick={addGrupa}><Check size={13} /></button>
                    <button className="gg-act-btn gg-act-btn--del" onClick={() => { setAdding(false); setNewNazwa('') }}><X size={13} /></button>
                  </div>
                </td>
              </tr>
            )}
            {grupy.map((g, idx) => (
              <tr key={g.id}>
                <td className="gg-num">{idx + 1}</td>
                <td className="gg-name">
                  {editingId === g.id
                    ? <input className="gg-inline-input" value={editVal} onChange={e => setEditVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveEdit(g.id)} autoFocus />
                    : g.nazwa
                  }
                </td>
                <td>
                  <div className="gg-actions">
                    {editingId === g.id
                      ? <button className="gg-act-btn gg-act-btn--save" onClick={() => saveEdit(g.id)}><Check size={13} /></button>
                      : <button className="gg-act-btn" onClick={() => startEdit(g)}><Edit size={13} /></button>
                    }
                    <button className="gg-act-btn gg-act-btn--del" onClick={() => deleteGrupa(g.id, g.nazwa)}><X size={13} /></button>
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
