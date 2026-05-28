import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Upload, Eye, Edit, X, Loader } from 'lucide-react'
import { useCollection } from '../../hooks/useFirestore'
import './KontrahenciList.css'

export default function KontrahenciList() {
  const { items, loading, remove } = useCollection('kontrahenci', 'nazwa')
  const [filterNazwa, setFilterNazwa] = useState('')
  const [filterTyp,   setFilterTyp]   = useState('')
  const [selected,    setSelected]    = useState([])

  const filtered = items.filter(i =>
    (!filterNazwa || i.nazwa?.toLowerCase().includes(filterNazwa.toLowerCase())) &&
    (!filterTyp   || i.typ === filterTyp)
  )

  const toggleSelect = (id) => setSelected(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id])
  const selectAll    = () => setSelected(filtered.map(i => i.id))
  const clearSelect  = () => setSelected([])

  const handleDelete = async (id, nazwa) => {
    if (!window.confirm(`Usunąć "${nazwa}"?`)) return
    await remove(id)
  }

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:200,color:'var(--text-muted)',gap:10}}>
      <Loader size={20} style={{animation:'spin 1s linear infinite'}}/>
      <span>Ładowanie...</span>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <div className="krm-wrap animate-in">
      <div className="krm-toolbar">
        <Link to="/kontrahenci/nowy" className="btn btn-primary"><Plus size={13}/> Dodaj</Link>
        <button className="btn btn-ghost"><Upload size={13}/> Import</button>
        {selected.length > 0 && (
          <span style={{fontSize:12,color:'var(--text-muted)',marginLeft:8}}>
            Zaznaczono: {selected.length}
            <button onClick={clearSelect} style={{background:'none',border:'none',color:'var(--red)',cursor:'pointer',marginLeft:6}}>✕</button>
          </span>
        )}
        <div style={{marginLeft:'auto',display:'flex',gap:6,alignItems:'center'}}>
          <div style={{width:7,height:7,borderRadius:'50%',background:'var(--green-primary)',boxShadow:'0 0 5px var(--green-primary)'}}/>
          <span style={{fontSize:11,color:'var(--text-muted)',fontFamily:'var(--font-mono)'}}>Firestore • {items.length} rekordów</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div style={{textAlign:'center',padding:'60px 20px',color:'var(--text-muted)'}}>
          <div style={{fontSize:40,marginBottom:12}}>📋</div>
          <p style={{fontSize:15,marginBottom:8,color:'var(--text-secondary)'}}>Brak kontrahentów w bazie</p>
          <p style={{fontSize:13,marginBottom:20}}>Dodaj pierwszego kontrahenta klikając przycisk „Dodaj"</p>
          <Link to="/kontrahenci/nowy" className="btn btn-primary"><Plus size={13}/> Dodaj kontrahenta</Link>
        </div>
      ) : (
        <div className="krm-table-wrap">
          <table className="krm-table">
            <thead>
              <tr>
                <th style={{width:32}}><input type="checkbox" onChange={e=>e.target.checked?selectAll():clearSelect()} style={{accentColor:'var(--green-primary)'}}/></th>
                <th style={{width:32}}>#</th>
                <th style={{width:50}}>LOGO</th>
                <th><div className="krm-th-col">Nazwa firmy<input className="krm-col-filter" value={filterNazwa} onChange={e=>setFilterNazwa(e.target.value)} placeholder="Filtruj..."/></div></th>
                <th>Państwo</th>
                <th>Adres</th>
                <th>Miasto</th>
                <th>Telefon</th>
                <th>Numer NIP</th>
                <th>Adres e-mail</th>
                <th><div className="krm-th-col">Typ/Grupa<select className="krm-col-filter" value={filterTyp} onChange={e=>setFilterTyp(e.target.value)}><option value="">Wszystkie</option><option>Klient</option><option>Dostawca</option></select></div></th>
                <th>Klient</th>
                <th>Dostawca</th>
                <th>Ostatnia aktywność</th>
                <th style={{width:90}}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={item.id} className={selected.includes(item.id)?'krm-row--selected':''}>
                  <td><input type="checkbox" checked={selected.includes(item.id)} onChange={()=>toggleSelect(item.id)} style={{accentColor:'var(--green-primary)'}}/></td>
                  <td className="krm-num">{idx+1}</td>
                  <td><div className="krm-logo-placeholder">—</div></td>
                  <td><Link to={`/kontrahenci/${item.id}`} className="krm-name-link">{item.nazwa}</Link></td>
                  <td className="krm-cell">{item.panstwo||'PL'}</td>
                  <td className="krm-cell">{item.adres||'—'}</td>
                  <td className="krm-cell">{item.miasto||'—'}</td>
                  <td className="krm-cell krm-mono">{item.telefon||'—'}</td>
                  <td className="krm-cell krm-mono">{item.nip||'—'}</td>
                  <td><a href={`mailto:${item.email}`} className="krm-email-link">{item.email||'—'}</a></td>
                  <td className="krm-cell">{item.typ||'—'}</td>
                  <td>{item.klient!==false?<span className="krm-badge krm-badge--yes">Tak</span>:<span className="krm-badge krm-badge--no">Nie</span>}</td>
                  <td>{item.dostawca!==false?<span className="krm-badge krm-badge--yes">Tak</span>:<span className="krm-badge krm-badge--no">Nie</span>}</td>
                  <td className="krm-cell krm-mono" style={{fontSize:11}}>{item.updatedAt?.toDate?.()?.toLocaleDateString('pl-PL')||'—'}</td>
                  <td>
                    <div className="krm-actions">
                      <Link to={`/kontrahenci/${item.id}`} className="krm-act-btn"><Eye size={12}/></Link>
                      <Link to={`/kontrahenci/${item.id}/edytuj`} className="krm-act-btn"><Edit size={12}/></Link>
                      <button className="krm-act-btn krm-act-btn--del" onClick={()=>handleDelete(item.id,item.nazwa)}><X size={12}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
