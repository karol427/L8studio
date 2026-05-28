import { useState, useRef, useEffect } from 'react'
import { MapPin, X, Loader } from 'lucide-react'

export default function PlacesAutocomplete({ value, onChange, placeholder = 'Wpisz miejsce...' }) {
  const [query, setQuery]         = useState(value || '')
  const [suggestions, setSugg]    = useState([])
  const [loading, setLoading]     = useState(false)
  const [showList, setShowList]   = useState(false)
  const [selected, setSelected]   = useState(!!value)
  const timerRef = useRef(null)
  const wrapRef  = useRef(null)

  // Zamknij listę po kliknięciu poza
  useEffect(() => {
    const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setShowList(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const search = (q) => {
    if (q.length < 3) { setSugg([]); return }
    setLoading(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      try {
        // Nominatim OpenStreetMap — darmowe, bez klucza API
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=7&accept-language=pl`,
          { headers: { 'Accept-Language': 'pl' } }
        )
        const data = await res.json()
        setSugg(data.map(d => ({
          id:          d.place_id,
          label:       d.display_name,
          shortLabel:  buildShortLabel(d),
          lat:         d.lat,
          lon:         d.lon,
          type:        d.type,
        })))
        setShowList(true)
      } catch {
        setSugg([])
      } finally {
        setLoading(false)
      }
    }, 350)
  }

  const buildShortLabel = (d) => {
    const a = d.address || {}
    const parts = [
      d.name || a.amenity || a.building,
      a.road ? (a.road + (a.house_number ? ' ' + a.house_number : '')) : null,
      a.city || a.town || a.village,
      a.country,
    ].filter(Boolean)
    return parts.join(', ') || d.display_name
  }

  const getIcon = (type) => {
    const icons = { stadium:'🏟️', sports_centre:'🏟️', venue:'🎪', theatre:'🎭',
      hotel:'🏨', restaurant:'🍽️', park:'🌳', default:'📍' }
    return icons[type] || icons.default
  }

  const pick = (s) => {
    setQuery(s.shortLabel)
    setSelected(true)
    setShowList(false)
    setSugg([])
    onChange?.(s)
  }

  const clear = () => {
    setQuery(''); setSelected(false); setSugg([])
    onChange?.(null)
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6,
        background: 'var(--bg-secondary)', border: `1px solid ${showList ? 'var(--green-border)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius)', padding: '7px 10px',
        boxShadow: showList ? '0 0 0 2px var(--green-glow)' : 'none',
        transition: 'all 0.15s' }}>
        {loading
          ? <Loader size={14} style={{ color: 'var(--green-primary)', flexShrink: 0, animation: 'spin 1s linear infinite' }} />
          : <MapPin size={14} style={{ color: selected ? 'var(--green-primary)' : 'var(--text-muted)', flexShrink: 0 }} />
        }
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(false); search(e.target.value) }}
          onFocus={() => { if (suggestions.length > 0) setShowList(true) }}
          placeholder={placeholder}
          style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)',
            fontSize: 13, outline: 'none', minWidth: 0 }}
        />
        {query && (
          <button onClick={clear} style={{ background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            <X size={13} />
          </button>
        )}
      </div>

      {showList && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 300,
          background: 'var(--bg-secondary)', border: '1px solid var(--green-border)',
          borderRadius: 'var(--radius)', overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 20px rgba(0,255,65,0.08)',
          maxHeight: 300, overflowY: 'auto',
        }}>
          {suggestions.map((s, i) => (
            <div key={s.id}
              onClick={() => pick(s)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '9px 12px', cursor: 'pointer',
                borderBottom: i < suggestions.length - 1 ? '1px solid rgba(0,255,65,0.06)' : 'none',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{getIcon(s.type)}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.shortLabel.split(',')[0]}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.shortLabel.split(',').slice(1).join(',').trim()}
                </div>
              </div>
            </div>
          ))}
          <div style={{ padding: '5px 12px', fontSize: 10, color: 'var(--text-muted)',
            borderTop: '1px solid var(--border-default)', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
            © OpenStreetMap contributors
          </div>
        </div>
      )}

      {query.length >= 2 && query.length < 3 && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: 'var(--bg-secondary)', border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius)', padding: '8px 12px',
          fontSize: 12, color: 'var(--text-muted)', zIndex: 300 }}>
          Wpisz co najmniej 3 znaki...
        </div>
      )}

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  )
}
