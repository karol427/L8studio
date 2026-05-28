import { useState } from 'react'
import { Plus, Edit, X, Eye } from 'lucide-react'
import {
  DODATKOWE_POLA, RODZAJE_WYDARZEN, TYPY_WYDARZEN,
  STATUSY_WYDARZEN, STATUSY_OFERT, SCHEMATY_OFERT,
  FOLDERY_ZALACZNIKOW, HARMONOGRAMY
} from './settingsData'
import './Settings.css'

// Generic simple list
function SimpleList({ title, items, setItems, columns, renderRow, extraToolbar }) {
  const [adding, setAdding] = useState(false)
  const [newVal, setNewVal] = useState('')
  const addItem = () => {
    if (!newVal.trim()) return
    setItems(p => [...p, { id: Date.now(), nazwa: newVal.trim() }])
    setNewVal(''); setAdding(false)
  }
  const deleteItem = (id, nazwa) => {
    if (window.confirm(`Usunąć "${nazwa}"?`)) setItems(p => p.filter(i => i.id !== id))
  }
  return (
    <div className="set-wrap animate-in">
      <div className="set-toolbar">
        <button className="btn btn-primary" onClick={() => setAdding(true)}><Plus size={13}/> Dodaj</button>
        {extraToolbar}
      </div>
      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr>
            <th style={{width:36}}>#</th>
            {columns.map(c => <th key={c}>{c}</th>)}
            <th style={{width:90}}></th>
          </tr></thead>
          <tbody>
            {adding && (
              <tr><td></td><td><input className="set-inline-input" value={newVal} onChange={e=>setNewVal(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addItem()} autoFocus placeholder="Nazwa..." /></td>{columns.length>1&&<td colSpan={columns.length-1}></td>}
              <td><div className="set-actions">
                <button className="set-act-btn set-act-btn--save" onClick={addItem}>✓</button>
                <button className="set-act-btn set-act-btn--del" onClick={()=>setAdding(false)}>✕</button>
              </div></td></tr>
            )}
            {items.map((item, idx) => renderRow(item, idx, deleteItem))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── DODATKOWE POLA W WYDARZENIU ─────────────────────────────────────────────
export function DodatkowePola() {
  const [items, setItems] = useState(DODATKOWE_POLA)
  const deleteItem = (id, nazwa) => { if(window.confirm(`Usunąć "${nazwa}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="set-wrap animate-in">
      <div className="set-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj</button></div>
      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr>
            <th style={{width:36}}>#</th>
            <th>Nazwa</th>
            <th>Typ</th>
            <th>Kolumna na liście wydarzeń</th>
            <th>Widoczny na packliście</th>
            <th style={{width:80}}></th>
          </tr></thead>
          <tbody>
            {items.map((item,idx) => (
              <tr key={item.id}>
                <td className="set-num">{idx+1}</td>
                <td className="set-cell set-bold">{item.nazwa}</td>
                <td className="set-cell">{item.typ}</td>
                <td className="set-cell">{item.kolumna ? 'TAK' : 'NIE'}</td>
                <td className="set-cell">{item.widoczny ? 'TAK' : 'NIE'}</td>
                <td><div className="set-actions">
                  <button className="set-act-btn"><Edit size={12}/></button>
                  <button className="set-act-btn set-act-btn--del" onClick={()=>deleteItem(item.id,item.nazwa)}><X size={12}/></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── RODZAJE WYDARZEŃ ─────────────────────────────────────────────────────────
export function RodzajeWydarzen() {
  const [items, setItems] = useState(RODZAJE_WYDARZEN)
  const deleteItem = (id,n) => { if(window.confirm(`Usunąć "${n}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="set-wrap animate-in">
      <div className="set-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj</button></div>
      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr><th style={{width:36}}>#</th><th>Nazwa</th><th style={{width:80}}></th></tr></thead>
          <tbody>{items.map((item,idx) => (
            <tr key={item.id}>
              <td className="set-num">{idx+1}</td>
              <td className="set-cell set-bold">{item.nazwa}</td>
              <td><div className="set-actions">
                <button className="set-act-btn"><Edit size={12}/></button>
                <button className="set-act-btn set-act-btn--del" onClick={()=>deleteItem(item.id,item.nazwa)}><X size={12}/></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}

// ─── TYPY WYDARZEŃ ────────────────────────────────────────────────────────────
export function TypyWydarzen() {
  const [items, setItems] = useState(TYPY_WYDARZEN)
  const deleteItem = (id,n) => { if(window.confirm(`Usunąć "${n}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="set-wrap animate-in">
      <div className="set-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj</button></div>
      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr><th>#</th><th>Nazwa</th><th>Sposób wyświetlania podglądu</th><th style={{width:80}}></th></tr></thead>
          <tbody>{items.map((item,idx) => (
            <tr key={item.id}>
              <td className="set-num">{idx+1}</td>
              <td className="set-cell set-bold">{item.nazwa}</td>
              <td className="set-cell">{item.widok}</td>
              <td><div className="set-actions">
                <button className="set-act-btn"><Edit size={12}/></button>
                <button className="set-act-btn set-act-btn--del" onClick={()=>deleteItem(item.id,item.nazwa)}><X size={12}/></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}

// ─── STATUSY WYDARZEŃ ─────────────────────────────────────────────────────────
export function StatusyWydarzen() {
  const [items, setItems] = useState(STATUSY_WYDARZEN)
  const deleteItem = (id,n) => { if(window.confirm(`Usunąć "${n}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="set-wrap animate-in">
      <div className="set-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj status</button></div>
      <div className="set-statusy">
        {items.map(item => (
          <div key={item.id} className="set-status-row">
            <div className="set-status-icon" style={{background:item.kolor}}>+</div>
            <span className="set-status-name">{item.nazwa}</span>
            <div className="set-actions" style={{marginLeft:'auto'}}>
              <button className="set-act-btn"><Edit size={12}/></button>
              <button className="set-act-btn set-act-btn--del" onClick={()=>deleteItem(item.id,item.nazwa)}><X size={12}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── STATUSY OFERT ────────────────────────────────────────────────────────────
export function StatusyOfert() {
  const [items, setItems] = useState(STATUSY_OFERT)
  const deleteItem = (id,n) => { if(window.confirm(`Usunąć "${n}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="set-wrap animate-in">
      <div className="set-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj status</button></div>
      <div className="set-statusy">
        {items.map(item => (
          <div key={item.id} className="set-status-row">
            <div className="set-status-icon" style={{background:item.kolor}}>+</div>
            <span className="set-status-name">{item.nazwa}</span>
            <div className="set-actions" style={{marginLeft:'auto'}}>
              <button className="set-act-btn"><Edit size={12}/></button>
              <button className="set-act-btn set-act-btn--del" onClick={()=>deleteItem(item.id,item.nazwa)}><X size={12}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── SCHEMATY OFERT ───────────────────────────────────────────────────────────
export function SchematyOfert() {
  const [items, setItems] = useState(SCHEMATY_OFERT)
  const deleteItem = (id,n) => { if(window.confirm(`Usunąć "${n}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="set-wrap animate-in">
      <div className="set-toolbar">
        <button className="btn btn-primary"><Plus size={13}/> Dodaj</button>
        <button className="btn" style={{background:'#22c55e',color:'#000',fontSize:12,fontWeight:700}}><Plus size={12}/> Dodaj - [Wersja BETA]</button>
      </div>
      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr><th>#</th><th>Nazwa</th><th style={{width:80}}></th></tr></thead>
          <tbody>{items.map((item,idx) => (
            <tr key={item.id}>
              <td className="set-num">{idx+1}</td>
              <td className="set-cell set-bold">{item.nazwa}</td>
              <td><div className="set-actions">
                <button className="set-act-btn"><Edit size={12}/></button>
                <button className="set-act-btn set-act-btn--del" onClick={()=>deleteItem(item.id,item.nazwa)}><X size={12}/></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}

// ─── FOLDERY ZAŁĄCZNIKÓW ─────────────────────────────────────────────────────
export function FolderyZalacznikow() {
  const [items, setItems] = useState(FOLDERY_ZALACZNIKOW)
  const deleteItem = (id,n) => { if(window.confirm(`Usunąć "${n}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="set-wrap animate-in">
      <div className="set-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj</button></div>
      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr><th>#</th><th>Name</th><th style={{width:100}}></th></tr></thead>
          <tbody>{items.map((item,idx) => (
            <tr key={item.id}>
              <td className="set-num">{idx+1}</td>
              <td className="set-cell set-bold">{item.nazwa}</td>
              <td><div className="set-actions">
                <button className="set-act-btn"><Eye size={12}/></button>
                <button className="set-act-btn"><Edit size={12}/></button>
                <button className="set-act-btn set-act-btn--del" onClick={()=>deleteItem(item.id,item.nazwa)}><X size={12}/></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}

// ─── HARMONOGRAMY ─────────────────────────────────────────────────────────────
export function DomyslneHarmonogramy() {
  const [items, setItems] = useState(HARMONOGRAMY)
  const [editingName, setEditingName] = useState(null)
  const [editVal, setEditVal] = useState('')
  const deleteItem = (id,n) => { if(window.confirm(`Usunąć "${n}"?`)) setItems(p=>p.filter(i=>i.id!==id)) }
  return (
    <div className="set-wrap animate-in">
      <div className="set-toolbar"><button className="btn btn-primary" onClick={()=>setItems(p=>[...p,{id:Date.now(),nazwa:'Nowy harmonogram'}])}><Plus size={13}/> Dodaj</button></div>
      <div className="set-table-wrap">
        <div style={{border:'1px solid var(--border-default)',borderRadius:'var(--radius)',overflow:'hidden'}}>
          {items.map(item => (
            <div key={item.id} className="set-harm-row">
              {editingName === item.id
                ? <input className="set-inline-input" value={editVal} onChange={e=>setEditVal(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(setItems(p=>p.map(i=>i.id===item.id?{...i,nazwa:editVal}:i)),setEditingName(null))} autoFocus />
                : <a href="#" className="set-link">{item.nazwa}</a>
              }
              <div className="set-harm-btns">
                <button className="set-harm-btn">Duplikuj</button>
                <button className="set-harm-btn">Edytuj</button>
                <button className="set-harm-btn" onClick={()=>{setEditingName(item.id);setEditVal(item.nazwa)}}>Edytuj nazwę</button>
                <button className="set-harm-btn set-harm-btn--del" onClick={()=>deleteItem(item.id,item.nazwa)}>Usuń</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── GENERIC PLACEHOLDER ─────────────────────────────────────────────────────
export function GenericSetting({ title }) {
  return (
    <div className="set-wrap animate-in">
      <div className="set-toolbar"><button className="btn btn-primary"><Plus size={13}/> Dodaj</button></div>
      <div className="set-table-wrap">
        <table className="set-table">
          <thead><tr><th>#</th><th>Nazwa</th><th style={{width:80}}></th></tr></thead>
          <tbody><tr><td colSpan={3} className="set-empty">Brak wyników.</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}
