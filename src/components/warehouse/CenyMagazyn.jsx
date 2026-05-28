import { useState } from 'react'
import WarehouseCatHeader from './WarehouseCatHeader'
import { CENY_SPRZET, GRUPY_CENOWE } from './warehouseData'
import './Warehouse.css'

export default function CenyMagazyn() {
  const [activeGroup, setActiveGroup] = useState(GRUPY_CENOWE[0])
  const [items, setItems] = useState(CENY_SPRZET)
  const [massPercent, setMassPercent] = useState('100')
  const [massRound, setMassRound] = useState('1')

  const updatePrice = (id, field, val) => {
    setItems(p => p.map(i => i.id === id ? { ...i, [field]: val } : i))
  }

  const applyMassUpdate = () => {
    const pct = parseFloat(massPercent) / 100
    setItems(p => p.map(i => ({
      ...i,
      stawkaPodst: Math.round(i.stawkaPodst * pct * Math.pow(10, parseInt(massRound))) / Math.pow(10, parseInt(massRound)),
      eventowe: Math.round(i.eventowe * pct * Math.pow(10, parseInt(massRound))) / Math.pow(10, parseInt(massRound)),
    })))
  }

  return (
    <div className="wh-wrap animate-in">
      <div className="wh-toolbar">
        <button className="btn btn-primary" style={{fontSize:12}}>+ Dodaj grupę cenową</button>
        <button className="btn btn-ghost" style={{fontSize:12}}>Edytuj grupę cenową</button>
        <button className="btn btn-primary" style={{fontSize:12}}>+ Dodaj stawkę</button>
        <button className="btn btn-ghost" style={{fontSize:12}}>Zarządzaj stawkami</button>
        <button className="btn btn-ghost" style={{fontSize:12}}>Eksport</button>
        <button className="btn btn-primary" style={{fontSize:12,marginLeft:'auto'}}>Zapisz</button>
      </div>

      <div className="wh-ceny-top">
        <span style={{fontSize:12.5,color:'var(--text-muted)'}}>Wybierz grupę cenową:</span>
        <div className="wh-ceny-groups">
          {GRUPY_CENOWE.map(g => (
            <button key={g} className={`wh-ceny-group-btn ${activeGroup===g?'wh-ceny-group-btn--active':''}`} onClick={()=>setActiveGroup(g)}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <WarehouseCatHeader />

      <div className="wh-ceny-mass-update">
        <span>Zmień wszystkie ceny na</span>
        <input value={massPercent} onChange={e=>setMassPercent(e.target.value)} style={{width:60,textAlign:'center'}} />
        <span>% obecnej zaokrąglając do</span>
        <input value={massRound} onChange={e=>setMassRound(e.target.value)} style={{width:40,textAlign:'center'}} />
        <span>miejsca po przecinku.</span>
        <button className="wh-zmien-btn" onClick={applyMassUpdate}>Zmień</button>
      </div>

      <div className="wh-table-wrap">
        <table className="wh-table">
          <thead>
            <tr>
              <th>Nazwa sprzętu</th>
              <th>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  Stawka podstawowa (PLN) ✏
                  <input type="checkbox" style={{width:14,height:14}} />
                </div>
              </th>
              <th></th>
              <th>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  Eventowe (PLN) ✏
                  <input type="checkbox" style={{width:14,height:14}} />
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <a href="#" className="wh-link">{item.nazwa}</a>
                </td>
                <td>
                  <input
                    type="number"
                    value={item.stawkaPodst}
                    onChange={e=>updatePrice(item.id,'stawkaPodst',parseFloat(e.target.value))}
                    className="wh-col-filter"
                    style={{width:100,textAlign:'right'}}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.aktywny}
                    onChange={e=>updatePrice(item.id,'aktywny',e.target.checked)}
                    style={{width:16,height:16,accentColor:'#22c55e'}}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.eventowe}
                    onChange={e=>updatePrice(item.id,'eventowe',parseFloat(e.target.value))}
                    className="wh-col-filter"
                    style={{width:100,textAlign:'right'}}
                  />
                </td>
                <td>
                  <input type="checkbox" style={{width:16,height:16}} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
