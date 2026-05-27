import { useState } from 'react'
import { Heart } from 'lucide-react'

const MAIN_CATS = ['Multimedia','Oświetlenie','Nagłośnienie','Scena','Konstrukcje Sceniczne','Okablowanie Prądowe i Rozdzielnie','Inne','Usługi','Scenografia','Sala 1']
const SUB_CATS = {
  Multimedia: ['Projektory','Ekrany LED','Miksery AV','Komputery','Monitory','Okablowanie','63A','Opakowania'],
  Oświetlenie: ['Ruchome Głowy','Konsolety','Lasery','Stroboskopy'],
  Nagłośnienie: ['Mikrofony','Miksery','Głośniki','Wzmacniacze'],
  Scena: ['Podesty','Kratownice','Draperie'],
  default: [],
}

export default function WarehouseCatHeader({ onCatChange }) {
  const [activeCat, setActiveCat] = useState('Multimedia')
  const [activeSub, setActiveSub] = useState(null)
  const subs = SUB_CATS[activeCat] || []

  const selectCat = (cat) => {
    setActiveCat(cat); setActiveSub(null)
    onCatChange?.(cat, null)
  }
  const selectSub = (sub) => {
    setActiveSub(sub); onCatChange?.(activeCat, sub)
  }

  return (
    <div>
      <div className="wh-cat-tabs">
        {MAIN_CATS.map(cat => (
          <button key={cat} className={`wh-cat-tab ${activeCat===cat?'wh-cat-tab--active':''}`} onClick={()=>selectCat(cat)}>
            {cat} <span>▾</span>
          </button>
        ))}
        <button className="wh-favorite"><Heart size={12}/> Ulubione</button>
      </div>
      {subs.length > 0 && (
        <div className="wh-sub-tabs">
          {subs.map(sub => (
            <button key={sub} className={`wh-sub-tab ${activeSub===sub?'wh-sub-tab--active':''}`} onClick={()=>selectSub(sub)}>
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
