import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, Edit, X, Loader } from 'lucide-react'
import { useCollection } from '../../hooks/useFirestore'
import './EventsList.css'

const STATUS_COLORS = {
  'Niepotwierdzony': '#f59e0b',
  'Potwierdzony':    '#22c55e',
  'Zamknięty':       '#6b7280',
  'Anulowany':       '#ef4444',
}

export default function EventsList() {
  const { items, loading, remove } = useCollection('wydarzenia', 'name')
  const [filter, setFilter] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const filtered = items.filter(i =>
    (!filter || i.name?.toLowerCase().includes(filter.toLowerCase())) &&
    (!filterStatus || i.status === filterStatus)
  )

  const del = async (id, name) => {
    if (!window.confirm(`Usunąć wydarzenie "${name}"?`)) return
    await remove(id)
  }

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:200,color:'var(--text-muted)',gap:10}}>
      <Loader size={20} style={{animation:'spin 1s linear infinite'}}/>
      <span>Ładowanie wydarzeń...</span>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <div className="ev-list-wrap animate-in">
      <div className="ev-toolbar">
        <Link to="/wydarzenia/nowe" className="btn btn-primary"><Plus size={13}/> Dodaj</Link>
        <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Szukaj..."
          style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'6px 12px',fontSize:13,width:220}}/>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
          style={{background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'6px 10px',fontSize:13}}>
          <option value="">Wszystkie statusy</option>
          {Object.keys(STATUS_COLORS).map(s=><option key={s}>{s}</option>)}
        </select>
        <div style={{marginLeft:'auto',display:'flex',gap:6,alignItems:'center'}}>
          <div style={{width:7,height:7,borderRadius:'50%',background:'var(--green-primary)',boxShadow:'0 0 5px var(--green-primary)'}}/>
          <span style={{fontSize:11,color:'var(--text-muted)',fontFamily:'var(--font-mono)'}}>Firestore • {items.length}</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div style={{textAlign:'center',padding:'60px 20px',color:'var(--text-muted)'}}>
          <div style={{fontSize:40,marginBottom:12}}>📅</div>
          <p style={{fontSize:15,color:'var(--text-secondary)',marginBottom:8}}>Brak wydarzeń</p>
          <Link to="/wydarzenia/nowe" className="btn btn-primary"><Plus size={13}/> Dodaj pierwsze wydarzenie</Link>
        </div>
      ) : (
        <div style={{overflowX:'auto',border:'1px solid var(--border-default)',borderRadius:'var(--radius)'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:800}}>
            <thead>
              <tr style={{background:'var(--bg-card)',borderBottom:'1px solid var(--border-default)'}}>
                {['#','Nazwa','Typ','Status','Klient','Miejsce','Termin od','Termin do',''].map(h=>(
                  <th key={h} style={{padding:'8px 12px',fontSize:11,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em',color:'var(--text-muted)',fontFamily:'var(--font-mono)',textAlign:'left'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((ev,idx) => (
                <tr key={ev.id} style={{borderBottom:'1px solid rgba(0,255,65,0.04)'}} onMouseEnter={e=>e.currentTarget.style.background='var(--bg-hover)'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                  <td style={{padding:'10px 12px',fontSize:11,color:'var(--text-muted)',fontFamily:'var(--font-mono)'}}>{idx+1}</td>
                  <td style={{padding:'10px 12px'}}>
                    <Link to={`/wydarzenia/${ev.id}`} style={{color:'var(--green-primary)',fontWeight:500,fontSize:13}}>{ev.name}</Link>
                  </td>
                  <td style={{padding:'10px 12px',fontSize:12.5,color:'var(--text-secondary)'}}>{ev.type||'—'}</td>
                  <td style={{padding:'10px 12px'}}>
                    <span style={{fontSize:11,padding:'2px 8px',borderRadius:10,fontWeight:700,
                      background:STATUS_COLORS[ev.status||'Niepotwierdzony']+'22',
                      color:STATUS_COLORS[ev.status||'Niepotwierdzony'],
                      border:`1px solid ${STATUS_COLORS[ev.status||'Niepotwierdzony']}44`}}>
                      {ev.status||'Niepotwierdzony'}
                    </span>
                  </td>
                  <td style={{padding:'10px 12px',fontSize:12,color:'var(--text-secondary)'}}>{ev.clientId||'—'}</td>
                  <td style={{padding:'10px 12px',fontSize:12,color:'var(--text-secondary)'}}>{ev.placeManual||ev.placeId||'—'}</td>
                  <td style={{padding:'10px 12px',fontSize:11,fontFamily:'var(--font-mono)',color:'var(--text-muted)'}}>{ev.schedule?.event||'—'}</td>
                  <td style={{padding:'10px 12px',fontSize:11,fontFamily:'var(--font-mono)',color:'var(--text-muted)'}}>{ev.schedule?.demontaz||'—'}</td>
                  <td style={{padding:'10px 12px'}}>
                    <div style={{display:'flex',gap:3}}>
                      <Link to={`/wydarzenia/${ev.id}`} style={{background:'none',border:'1px solid var(--border-default)',color:'var(--text-muted)',borderRadius:3,padding:'3px 6px',display:'flex',alignItems:'center'}}><Eye size={12}/></Link>
                      <Link to={`/wydarzenia/${ev.id}/edytuj`} style={{background:'none',border:'1px solid var(--border-default)',color:'var(--text-muted)',borderRadius:3,padding:'3px 6px',display:'flex',alignItems:'center'}}><Edit size={12}/></Link>
                      <button onClick={()=>del(ev.id,ev.name)} style={{background:'none',border:'1px solid var(--border-default)',color:'var(--text-muted)',borderRadius:3,padding:'3px 6px',cursor:'pointer',display:'flex',alignItems:'center'}}><X size={12}/></button>
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
