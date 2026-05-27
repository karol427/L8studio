import { useState, useRef } from 'react'
import { Plus, X, Eye, Edit, FileText, ChevronDown, ChevronRight, Printer, Check } from 'lucide-react'
import { PROJEKTY_ROZLICZENIA, KOSZTY_RZECZYWISTE, TYP_KOSZTU_LABELS, TYP_KOSZTU_COLORS } from './rozliczeniaData'
import './Rozliczenia.css'

const SEKCJA_COLORS = {
  Transport: '#1d4ed8', Obsługa: '#dc2626', Inne: '#f97316',
  Sprzęt: '#7c3aed', default: '#374151',
}

const fmt = (v) => v == null ? '—' : `${Number(v).toLocaleString('pl', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł`
const fmtPct = (v) => v == null ? '—' : `${v > 0 ? '+' : ''}${v.toFixed(1)}%`

export default function RozliczeniaMain() {
  const [view, setView] = useState('lista') // lista | projekt | faktury | raport
  const [selectedProjektId, setSelectedProjektId] = useState(null)
  const [projekty, setProjekty] = useState(PROJEKTY_ROZLICZENIA)
  const [koszty, setKoszty] = useState(KOSZTY_RZECZYWISTE)

  const openProjekt = (id) => { setSelectedProjektId(id); setView('projekt') }
  const selectedProjekt = projekty.find(p => p.id === selectedProjektId)

  return (
    <div className="roz-wrap animate-in">
      {/* TOPBAR */}
      <div className="roz-toolbar">
        <button className={`btn ${view==='lista'?'btn-primary':'btn-ghost'}`} onClick={()=>setView('lista')}>
          📋 Projekty
        </button>
        <button className={`btn ${view==='faktury'?'btn-primary':'btn-ghost'}`} onClick={()=>setView('faktury')}>
          🧾 Baza kosztów
        </button>
        {selectedProjekt && (
          <button className={`btn ${view==='projekt'?'btn-primary':'btn-ghost'}`} onClick={()=>setView('projekt')}>
            📊 {selectedProjekt.nazwa.slice(0,30)}…
          </button>
        )}
        <button className={`btn ${view==='raport'?'btn-primary':'btn-ghost'}`} onClick={()=>setView('raport')}>
          📄 Raport PDF
        </button>
      </div>

      {view === 'lista' && (
        <ListaProjektow projekty={projekty} koszty={koszty} onOpen={openProjekt} />
      )}
      {view === 'projekt' && selectedProjekt && (
        <ProjektDetail
          projekt={selectedProjekt}
          koszty={koszty}
          onAddKoszt={(k) => setKoszty(p => [...p, k])}
          onUpdateKoszt={(k) => setKoszty(p => p.map(x => x.id === k.id ? k : x))}
          onDeleteKoszt={(id) => setKoszty(p => p.filter(x => x.id !== id))}
          onBack={() => setView('lista')}
          onClose={() => { setProjekty(p => p.map(x => x.id === selectedProjekt.id ? {...x, status:'Zamknięty'} : x)); setView('lista') }}
        />
      )}
      {view === 'faktury' && (
        <BazaKosztow koszty={koszty} projekty={projekty}
          onAdd={(k) => setKoszty(p => [...p, k])}
          onDelete={(id) => setKoszty(p => p.filter(x => x.id !== id))} />
      )}
      {view === 'raport' && (
        <RaportPDF projekty={projekty} koszty={koszty} />
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   LISTA PROJEKTÓW
═══════════════════════════════════════════════ */
function ListaProjektow({ projekty, koszty, onOpen }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
        Kliknij projekt aby otworzyć rozliczenie — konfrontacja wyceny z kosztami rzeczywistymi.
      </div>
      {projekty.map(p => {
        const kosztyProjektu = koszty.filter(k => k.przypisania.some(a => a.projektId === p.id))
        const kosztTotal = kosztyProjektu.reduce((sum, k) => {
          const udz = k.przypisania.filter(a => a.projektId === p.id).reduce((s, a) => s + a.kwota, 0)
          return sum + udz
        }, 0)
        const zysk = p.wartoscOferty - kosztTotal
        const marza = p.wartoscOferty > 0 ? (zysk / p.wartoscOferty * 100) : 0
        const pokrycie = p.pozycjeOferty.filter(poz => {
          return koszty.some(k => k.przypisania.some(a => a.projektId === p.id && a.pozycjaId === poz.id))
        }).length

        return (
          <div key={p.id} className="roz-projekt-card">
            <div className="roz-projekt-header" onClick={() => onOpen(p.id)}>
              <div>
                <div className="roz-projekt-title">{p.nazwa}</div>
                <div className="roz-projekt-meta">
                  <span>📋 {p.nrOferty}</span>
                  <a href="#">👤 {p.klient}</a>
                  <span>📅 {p.dataEventu}</span>
                  <span>👷 {p.eventManager}</span>
                  <span style={{ color: 'var(--green-primary)' }}>
                    {pokrycie}/{p.pozycjeOferty.length} pozycji z kosztami
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={`roz-status roz-status--${p.status.toLowerCase()}`}>{p.status}</span>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              </div>
            </div>
            <div className="roz-summary-bar">
              <div className="roz-summary-item">
                <span className="roz-summary-label">Wycena klienta</span>
                <span className="roz-summary-val roz-summary-val--blue">{fmt(p.wartoscOferty)}</span>
              </div>
              <div className="roz-summary-item">
                <span className="roz-summary-label">Koszty rzeczywiste</span>
                <span className="roz-summary-val">{kosztTotal > 0 ? fmt(kosztTotal) : '— brak danych'}</span>
              </div>
              <div className="roz-summary-item">
                <span className="roz-summary-label">Zysk</span>
                <span className={`roz-summary-val ${zysk > 0 ? 'roz-summary-val--green' : zysk < 0 ? 'roz-summary-val--red' : 'roz-summary-val--muted'}`}>
                  {kosztTotal > 0 ? fmt(zysk) : '—'}
                </span>
              </div>
              <div className="roz-summary-item">
                <span className="roz-summary-label">Marżowość</span>
                <span className={`roz-summary-val ${marza > 20 ? 'roz-summary-val--green' : marza < 0 ? 'roz-summary-val--red' : 'roz-summary-val--muted'}`}>
                  {kosztTotal > 0 ? fmtPct(marza) : '—'}
                </span>
              </div>
              <div className="roz-summary-item">
                <span className="roz-summary-label">Pokrycie kosztami</span>
                <span className="roz-summary-val roz-summary-val--muted">{pokrycie}/{p.pozycjeOferty.length} poz.</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SZCZEGÓŁ PROJEKTU — ROZLICZENIE
═══════════════════════════════════════════════ */
function ProjektDetail({ projekt, koszty, onAddKoszt, onUpdateKoszt, onDeleteKoszt, onBack, onClose }) {
  const [modal, setModal] = useState(null) // null | { pozycjaId, pozycjaNazwa }
  const [showRaport, setShowRaport] = useState(false)

  // Zbierz koszty dla pozycji
  const getKosztyPozycji = (pozId) =>
    koszty.flatMap(k => k.przypisania
      .filter(a => a.projektId === projekt.id && a.pozycjaId === pozId)
      .map(a => ({ ...k, kwotaPrzypisana: a.kwota, udzialProc: a.udzialProc }))
    )

  // Grupuj pozycje po sekcji
  const sekcje = [...new Set(projekt.pozycjeOferty.map(p => p.sekcja))]

  // Sumy globalne
  const totalWycena = projekt.pozycjeOferty.reduce((s, p) => s + p.wycena, 0)
  const totalKoszty = projekt.pozycjeOferty.reduce((s, poz) => {
    return s + getKosztyPozycji(poz.id).reduce((ss, k) => ss + k.kwotaPrzypisana, 0)
  }, 0)
  const totalZysk = totalWycena - totalKoszty
  const totalMarza = totalWycena > 0 ? (totalZysk / totalWycena * 100) : 0

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
        <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={onBack}>← Wróć</button>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', flex: 1 }}>
          {projekt.nazwa}
        </h2>
        <span className="roz-status roz-status--otwarty">{projekt.nrOferty}</span>
        <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setShowRaport(!showRaport)}>
          <Printer size={13} /> Raport PDF
        </button>
        <button onClick={onClose}
          style={{ background: '#22c55e', color: '#000', padding: '7px 16px', borderRadius: 'var(--radius)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
          <Check size={13} /> Zamknij projekt
        </button>
      </div>

      {/* Podsumowanie globalne */}
      <div className="roz-summary-bar" style={{ borderRadius: 'var(--radius)', border: '1px solid var(--border-default)', marginBottom: 14, overflow: 'hidden' }}>
        <div className="roz-summary-item">
          <span className="roz-summary-label">Wycena dla klienta</span>
          <span className="roz-summary-val roz-summary-val--blue">{fmt(totalWycena)}</span>
        </div>
        <div className="roz-summary-item">
          <span className="roz-summary-label">Koszty rzeczywiste</span>
          <span className="roz-summary-val">{fmt(totalKoszty)}</span>
        </div>
        <div className="roz-summary-item">
          <span className="roz-summary-label">Zysk brutto</span>
          <span className={`roz-summary-val ${totalZysk >= 0 ? 'roz-summary-val--green' : 'roz-summary-val--red'}`}>
            {fmt(totalZysk)}
          </span>
        </div>
        <div className="roz-summary-item">
          <span className="roz-summary-label">Marżowość</span>
          <span className={`roz-summary-val ${totalMarza >= 20 ? 'roz-summary-val--green' : totalMarza < 0 ? 'roz-summary-val--red' : 'roz-summary-val--muted'}`}>
            {fmtPct(totalMarza)}
          </span>
        </div>
        <div className="roz-summary-item">
          <span className="roz-summary-label">Klient</span>
          <span className="roz-summary-val roz-summary-val--muted" style={{ fontSize: 13 }}>{projekt.klient}</span>
        </div>
      </div>

      {/* Sekcje z pozycjami */}
      {sekcje.map(sekcja => {
        const pozycje = projekt.pozycjeOferty.filter(p => p.sekcja === sekcja)
        const sekcjaWycena = pozycje.reduce((s, p) => s + p.wycena, 0)
        const sekcjaKoszty = pozycje.reduce((s, poz) =>
          s + getKosztyPozycji(poz.id).reduce((ss, k) => ss + k.kwotaPrzypisana, 0), 0)
        const sekcjaZysk = sekcjaWycena - sekcjaKoszty
        const kolor = SEKCJA_COLORS[sekcja] || SEKCJA_COLORS.default

        return (
          <div key={sekcja} className="roz-sekcja" style={{ marginBottom: 12 }}>
            <div className="roz-sekcja-header" style={{ background: kolor }}>
              <span>{sekcja}</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12, opacity: 0.9 }}>
                Wycena: {fmt(sekcjaWycena)} | Koszty: {fmt(sekcjaKoszty)} |
                Zysk: <span style={{ color: sekcjaZysk >= 0 ? '#86efac' : '#fca5a5' }}>{fmt(sekcjaZysk)}</span>
              </span>
            </div>
            <table className="roz-table">
              <thead>
                <tr>
                  <th style={{ width: 36 }}>#</th>
                  <th>Pozycja z oferty</th>
                  <th className="right" style={{ width: 130 }}>Wycena klienta</th>
                  <th style={{ width: 280 }}>Koszty rzeczywiste</th>
                  <th className="right" style={{ width: 120 }}>Koszt łącznie</th>
                  <th className="right" style={{ width: 110 }}>Zysk</th>
                  <th className="right" style={{ width: 90 }}>Marża</th>
                </tr>
              </thead>
              <tbody>
                {pozycje.map((poz, idx) => {
                  const kosztyPoz = getKosztyPozycji(poz.id)
                  const kosztPoz = kosztyPoz.reduce((s, k) => s + k.kwotaPrzypisana, 0)
                  const zyskPoz = poz.wycena - kosztPoz
                  const marzaPoz = poz.wycena > 0 ? (zyskPoz / poz.wycena * 100) : 0

                  return (
                    <tr key={poz.id}>
                      <td className="muted" style={{ textAlign: 'center' }}>{idx + 1}</td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{poz.nazwa}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{poz.jednostka}</div>
                      </td>
                      <td className="right" style={{ fontWeight: 700, color: '#60a5fa' }}>{fmt(poz.wycena)}</td>
                      <td>
                        <div className="roz-koszt-list">
                          {kosztyPoz.map(k => (
                            <div key={k.id + poz.id} className="roz-koszt-pill"
                              title={`${TYP_KOSZTU_LABELS[k.typ]} — ${k.nrDokumentu || k.pracownik || ''} (${k.udzialProc}% z ${fmt(k.kwotaNetto)})`}>
                              <div className="roz-koszt-typ" style={{ background: TYP_KOSZTU_COLORS[k.typ] }} />
                              <span style={{ flex: 1 }}>{k.typ === 'praca' ? k.pracownik : k.dostawca}</span>
                              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{k.udzialProc}%</span>
                              <span className="roz-koszt-kwota">{fmt(k.kwotaPrzypisana)}</span>
                              <button
                                onClick={() => { if (window.confirm('Odpiąć ten koszt?')) onDeleteKoszt(k.id) }}
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 2px' }}>
                                <X size={10} />
                              </button>
                            </div>
                          ))}
                          <button className="roz-add-koszt" onClick={() => setModal({ pozycjaId: poz.id, pozycjaNazwa: poz.nazwa })}>
                            <Plus size={11} /> Dodaj koszt
                          </button>
                        </div>
                      </td>
                      <td className="right" style={{ fontWeight: 600 }}>
                        {kosztPoz > 0 ? fmt(kosztPoz) : <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>brak</span>}
                      </td>
                      <td className="right">
                        {kosztPoz > 0
                          ? <span style={{ fontWeight: 700, color: zyskPoz >= 0 ? 'var(--green-primary)' : 'var(--red)' }}>{fmt(zyskPoz)}</span>
                          : <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>—</span>
                        }
                      </td>
                      <td className="right">
                        {kosztPoz > 0
                          ? <span className={`roz-marza roz-marza--${marzaPoz > 0 ? 'plus' : marzaPoz < 0 ? 'minus' : 'zero'}`}>
                              {fmtPct(marzaPoz)}
                            </span>
                          : <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>—</span>
                        }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Razem sekcja {sekcja}</td>
                  <td className="right" style={{ color: '#60a5fa' }}>{fmt(sekcjaWycena)}</td>
                  <td />
                  <td className="right">{fmt(sekcjaKoszty)}</td>
                  <td className="right" style={{ color: sekcjaZysk >= 0 ? 'var(--green-primary)' : 'var(--red)' }}>{fmt(sekcjaZysk)}</td>
                  <td className="right">
                    {sekcjaKoszty > 0
                      ? <span className={`roz-marza roz-marza--${sekcjaZysk/sekcjaWycena*100 > 0 ? 'plus' : 'minus'}`}>
                          {fmtPct(sekcjaZysk / sekcjaWycena * 100)}
                        </span>
                      : '—'
                    }
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )
      })}

      {/* Modal dodaj koszt */}
      {modal && (
        <ModalDodajKoszt
          pozycjaId={modal.pozycjaId}
          pozycjaNazwa={modal.pozycjaNazwa}
          projektId={projekt.id}
          istniejaceKoszty={koszty}
          onSave={(k) => { onAddKoszt(k); setModal(null) }}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   MODAL — DODAJ KOSZT DO POZYCJI
═══════════════════════════════════════════════ */
function ModalDodajKoszt({ pozycjaId, pozycjaNazwa, projektId, istniejaceKoszty, onSave, onClose }) {
  const [tab, setTab] = useState('nowy') // nowy | istniejacy
  const [typ, setTyp] = useState('faktura')
  const [f, sf] = useState({
    dostawca: '', pracownik: '', stanowisko: '', nrDokumentu: '',
    opis: '', dataWystawienia: new Date().toISOString().slice(0, 10),
    kwotaNetto: '', vat: '23', stawkaGodz: '', liczbaGodzin: '',
    udzialProc: '100',
  })
  const s = (k, v) => sf(p => ({ ...p, [k]: v }))

  const kwotaNetto = typ === 'praca'
    ? (parseFloat(f.stawkaGodz) * parseFloat(f.liczbaGodzin) || 0)
    : parseFloat(f.kwotaNetto) || 0
  const kwotaProc = kwotaNetto * (parseFloat(f.udzialProc) / 100)

  const handleSave = () => {
    if (!kwotaNetto || kwotaNetto <= 0) { alert('Podaj kwotę!'); return }
    const koszt = {
      id: 'k' + Date.now(),
      typ,
      dostawca: f.dostawca,
      pracownik: f.pracownik,
      stanowisko: f.stanowisko,
      nrDokumentu: f.nrDokumentu,
      opis: f.opis,
      dataWystawienia: f.dataWystawienia,
      stawkaGodz: parseFloat(f.stawkaGodz) || null,
      liczbaGodzin: parseFloat(f.liczbaGodzin) || null,
      kwotaNetto,
      vat: parseFloat(f.vat) || 0,
      kwotaBrutto: kwotaNetto * (1 + (parseFloat(f.vat) || 0) / 100),
      przypisania: [{ projektId, pozycjaId, udzialProc: parseFloat(f.udzialProc), kwota: kwotaProc }],
    }
    onSave(koszt)
  }

  return (
    <div className="roz-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="roz-modal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div className="roz-modal-title">Dodaj koszt rzeczywisty</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Pozycja: <strong style={{ color: 'var(--green-primary)' }}>{pozycjaNazwa}</strong></div>
          </div>
          <button onClick={onClose} style={{ background: 'none', color: 'var(--text-muted)', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border-default)', marginBottom: 16 }}>
          {[['nowy', '➕ Nowy koszt'], ['istniejacy', '📋 Istniejący z bazy']].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
              style={{ padding: '7px 16px', background: 'none', fontSize: 12, fontWeight: 600, borderBottom: `2px solid ${tab === k ? 'var(--green-primary)' : 'transparent'}`, color: tab === k ? 'var(--green-primary)' : 'var(--text-muted)', cursor: 'pointer' }}>
              {l}
            </button>
          ))}
        </div>

        {tab === 'istniejacy' && (
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>Wybierz koszt z bazy i przypisz do tej pozycji:</div>
            {istniejaceKoszty.slice(0, 8).map(k => (
              <div key={k.id} onClick={() => {
                const udzial = parseFloat(prompt(`Jaki % tej faktury przypisać do "${pozycjaNazwa}"? (1-100)`, '100')) || 100
                onSave({ ...k, id: 'k' + Date.now(), przypisania: [...k.przypisania, { projektId, pozycjaId, udzialProc: udzial, kwota: k.kwotaNetto * udzial / 100 }] })
              }}
                style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius)', marginBottom: 6, cursor: 'pointer' }}
                className="roz-koszt-pill">
                <div className="roz-koszt-typ" style={{ background: TYP_KOSZTU_COLORS[k.typ] }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{k.opis}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{k.nrDokumentu || k.pracownik} • {k.dataWystawienia}</div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{fmt(k.kwotaNetto)}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'nowy' && (
          <>
            {/* Typ */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              {Object.entries(TYP_KOSZTU_LABELS).map(([k, l]) => (
                <button key={k} onClick={() => setTyp(k)}
                  style={{ padding: '6px 12px', borderRadius: 'var(--radius)', fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none', background: typ === k ? TYP_KOSZTU_COLORS[k] : 'var(--bg-primary)', color: typ === k ? '#fff' : 'var(--text-muted)', outline: typ === k ? `2px solid ${TYP_KOSZTU_COLORS[k]}` : 'none', transition: 'all 0.15s' }}>
                  {l}
                </button>
              ))}
            </div>

            {typ === 'faktura' || typ === 'zakup' || typ === 'inne' ? (
              <>
                <div className="roz-modal-2col">
                  <div className="roz-modal-field"><label>Dostawca / firma</label><input value={f.dostawca} onChange={e => s('dostawca', e.target.value)} placeholder="Nazwa firmy..." /></div>
                  <div className="roz-modal-field"><label>Nr dokumentu</label><input value={f.nrDokumentu} onChange={e => s('nrDokumentu', e.target.value)} placeholder="FV/2026/..." /></div>
                </div>
                <div className="roz-modal-field"><label>Opis kosztu</label><input value={f.opis} onChange={e => s('opis', e.target.value)} placeholder="Czego dotyczy..." /></div>
                <div className="roz-modal-3col">
                  <div className="roz-modal-field">
                    <label>Kwota netto (zł)</label>
                    <input type="number" value={f.kwotaNetto} onChange={e => s('kwotaNetto', e.target.value)} placeholder="0.00" />
                  </div>
                  <div className="roz-modal-field">
                    <label>VAT (%)</label>
                    <select value={f.vat} onChange={e => s('vat', e.target.value)}>
                      <option value="23">23%</option><option value="8">8%</option><option value="5">5%</option><option value="0">0%</option><option value="-1">ZW</option>
                    </select>
                  </div>
                  <div className="roz-modal-field">
                    <label>Data wystawienia</label>
                    <input type="date" value={f.dataWystawienia} onChange={e => s('dataWystawienia', e.target.value)} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="roz-modal-2col">
                  <div className="roz-modal-field"><label>Pracownik / osoba</label><input value={f.pracownik} onChange={e => s('pracownik', e.target.value)} placeholder="Imię Nazwisko" /></div>
                  <div className="roz-modal-field"><label>Stanowisko / rola</label><input value={f.stanowisko} onChange={e => s('stanowisko', e.target.value)} placeholder="Technik, Scenograf..." /></div>
                </div>
                <div className="roz-modal-field"><label>Opis pracy</label><input value={f.opis} onChange={e => s('opis', e.target.value)} placeholder="Montaż scenografii — 8h..." /></div>
                <div className="roz-modal-3col">
                  <div className="roz-modal-field">
                    <label>Stawka (zł/godz)</label>
                    <input type="number" value={f.stawkaGodz} onChange={e => s('stawkaGodz', e.target.value)} placeholder="80.00" />
                  </div>
                  <div className="roz-modal-field">
                    <label>Liczba godzin</label>
                    <input type="number" value={f.liczbaGodzin} onChange={e => s('liczbaGodzin', e.target.value)} placeholder="8" />
                  </div>
                  <div className="roz-modal-field">
                    <label>Data</label>
                    <input type="date" value={f.dataWystawienia} onChange={e => s('dataWystawienia', e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {/* Udział % */}
            <div style={{ background: 'rgba(0,255,65,0.05)', border: '1px solid var(--green-border)', borderRadius: 'var(--radius)', padding: 12, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
                  Udział tego dokumentu przypisany do tej pozycji
                </label>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>(pozostała część można przypisać do innych pozycji/projektów)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input type="range" min="1" max="100" value={f.udzialProc} onChange={e => s('udzialProc', e.target.value)}
                  style={{ flex: 1, accentColor: 'var(--green-primary)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input type="number" value={f.udzialProc} onChange={e => s('udzialProc', Math.min(100, Math.max(1, e.target.value)))}
                    style={{ width: 60, background: 'var(--bg-primary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', borderRadius: 'var(--radius)', padding: '4px 8px', fontSize: 13, textAlign: 'center' }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>%</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13 }}>
                <span style={{ color: 'var(--text-muted)' }}>Kwota całkowita netto:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>{fmt(kwotaNetto)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 14 }}>
                <span style={{ color: 'var(--green-primary)', fontWeight: 600 }}>Przypisane do tej pozycji ({f.udzialProc}%):</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--green-primary)', fontSize: 16 }}>{fmt(kwotaProc)}</span>
              </div>
            </div>

            <div className="roz-modal-actions">
              <button className="roz-modal-save" onClick={handleSave}>✓ Zapisz koszt</button>
              <button className="roz-modal-cancel" onClick={onClose}>Anuluj</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   BAZA KOSZTÓW
═══════════════════════════════════════════════ */
function BazaKosztow({ koszty, projekty, onAdd, onDelete }) {
  const [showAdd, setShowAdd] = useState(false)
  const [filter, setFilter] = useState('')

  const filtered = koszty.filter(k =>
    !filter ||
    (k.opis || '').toLowerCase().includes(filter.toLowerCase()) ||
    (k.dostawca || '').toLowerCase().includes(filter.toLowerCase()) ||
    (k.pracownik || '').toLowerCase().includes(filter.toLowerCase())
  )

  const totalNetto = filtered.reduce((s, k) => s + (k.kwotaNetto || 0), 0)

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
        <input placeholder="Szukaj kosztów..." value={filter} onChange={e => setFilter(e.target.value)}
          style={{ flex: 1, maxWidth: 300, background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', borderRadius: 'var(--radius)', padding: '7px 12px', fontSize: 13 }} />
        <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={() => setShowAdd(true)}>
          <Plus size={13} /> Dodaj koszt
        </button>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>
          Łącznie: <strong style={{ color: 'var(--text-primary)' }}>{fmt(totalNetto)}</strong>
        </span>
      </div>

      <div className="roz-faktury-wrap">
        {filtered.map(k => {
          const przypisaneProjekty = [...new Set(k.przypisania.map(a => {
            const p = projekty.find(pr => pr.id === a.projektId)
            return p ? p.nazwa.slice(0, 25) + '…' : `Projekt #${a.projektId}`
          }))]

          return (
            <div key={k.id} className="roz-faktura-row">
              <div>
                <span className="roz-faktura-typ" style={{ background: TYP_KOSZTU_COLORS[k.typ] }}>
                  {k.typ}
                </span>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>
                  {k.typ === 'praca' ? `${k.pracownik} — ${k.stanowisko}` : k.dostawca}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{k.opis}</div>
              </div>
              <div>
                <div className="roz-faktura-kwota">{fmt(k.kwotaNetto)}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'right' }}>
                  {k.vat > 0 ? `VAT ${k.vat}%` : 'bez VAT'}
                </div>
              </div>
              <div className="roz-faktura-doc">{k.nrDokumentu || '—'}</div>
              <div className="roz-faktura-data">{k.dataWystawienia}</div>
              <div className="roz-faktura-przypisania">
                {przypisaneProjekty.map((p, i) => (
                  <div key={i} style={{ fontSize: 11, color: 'var(--green-primary)' }}>📋 {p}</div>
                ))}
              </div>
              <div>
                <button className="roz-add-koszt" style={{ width: 'auto', padding: '3px 8px' }}
                  onClick={() => { if (window.confirm(`Usunąć koszt "${k.opis}"?`)) onDelete(k.id) }}>
                  <X size={12} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   RAPORT PDF
═══════════════════════════════════════════════ */
function RaportPDF({ projekty, koszty }) {
  const [selectedId, setSelectedId] = useState(projekty[0]?.id)
  const printRef = useRef()
  const projekt = projekty.find(p => p.id === selectedId)

  const getKosztyPozycji = (projektId, pozId) =>
    koszty.flatMap(k => k.przypisania
      .filter(a => a.projektId === projektId && a.pozycjaId === pozId)
      .map(a => ({ ...k, kwotaPrzypisana: a.kwota }))
    )

  const handlePrint = () => {
    const w = window.open('', '_blank')
    w.document.write(`<html><head><title>Rozliczenie — ${projekt?.nazwa}</title>
      <style>body{font-family:Arial,sans-serif;font-size:12px;margin:20px;color:#000}
      table{width:100%;border-collapse:collapse;margin-bottom:16px}
      th{background:#222;color:#fff;padding:6px 8px;font-size:11px;text-align:left}
      th.right{text-align:right}
      td{border:1px solid #ddd;padding:5px 8px}td.right{text-align:right}
      .plus{color:#16a34a;font-weight:700}.minus{color:#dc2626;font-weight:700}
      .total{background:#f5f5f5;font-weight:700}
      h1{font-size:18px;margin-bottom:4px}h2{font-size:14px;color:#444;border-bottom:2px solid #222;padding-bottom:4px;margin:16px 0 8px}
      </style></head><body>${printRef.current?.innerHTML || ''}</body></html>`)
    w.document.close(); w.print()
  }

  if (!projekt) return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>Brak projektów.</div>

  const sekcje = [...new Set(projekt.pozycjeOferty.map(p => p.sekcja))]
  const rows = projekt.pozycjeOferty.map(poz => {
    const kosztyPoz = getKosztyPozycji(projekt.id, poz.id)
    const kosztPoz = kosztyPoz.reduce((s, k) => s + k.kwotaPrzypisana, 0)
    return { ...poz, kosztPoz, zysk: poz.wycena - kosztPoz, marza: poz.wycena > 0 ? ((poz.wycena - kosztPoz) / poz.wycena * 100) : 0 }
  })
  const totalWycena = rows.reduce((s, r) => s + r.wycena, 0)
  const totalKoszty = rows.reduce((s, r) => s + r.kosztPoz, 0)
  const totalZysk = totalWycena - totalKoszty
  const totalMarza = totalWycena > 0 ? (totalZysk / totalWycena * 100) : 0

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
        <select value={selectedId} onChange={e => setSelectedId(+e.target.value)}
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', borderRadius: 'var(--radius)', padding: '7px 12px', fontSize: 13 }}>
          {projekty.map(p => <option key={p.id} value={p.id}>{p.nazwa}</option>)}
        </select>
        <button onClick={handlePrint}
          style={{ background: 'var(--green-primary)', color: '#000', padding: '8px 20px', borderRadius: 'var(--radius)', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Printer size={14} /> Drukuj / Pobierz PDF
        </button>
      </div>

      <div ref={printRef} className="roz-raport">
        <div className="roz-raport-header">
          <div>
            <div className="roz-raport-title">ROZLICZENIE PROJEKTU</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{projekt.nazwa}</div>
            <div><strong>Klient:</strong> {projekt.klient}</div>
            <div><strong>Numer oferty:</strong> {projekt.nrOferty}</div>
            <div><strong>Data eventu:</strong> {projekt.dataEventu}</div>
            <div><strong>Kierownik projektu:</strong> {projekt.eventManager}</div>
            <div><strong>Data rozliczenia:</strong> {new Date().toLocaleDateString('pl-PL')}</div>
          </div>
          <div>
            <div style={{ border: '2px solid #222', padding: 12 }}>
              <div style={{ fontSize: 12, marginBottom: 6, fontWeight: 700, borderBottom: '1px solid #ddd', paddingBottom: 4 }}>PODSUMOWANIE</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}><span>Wycena dla klienta:</span><strong>{fmt(totalWycena)}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}><span>Koszty rzeczywiste:</span><strong>{fmt(totalKoszty)}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, borderTop: '1px solid #ddd', paddingTop: 4 }}><span>Zysk brutto:</span><strong className={totalZysk >= 0 ? 'plus' : 'minus'}>{fmt(totalZysk)}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Marżowość:</span><strong className={totalMarza >= 0 ? 'plus' : 'minus'}>{fmtPct(totalMarza)}</strong></div>
            </div>
          </div>
        </div>

        {sekcje.map(sekcja => {
          const poz = rows.filter(r => r.sekcja === sekcja)
          const sWycena = poz.reduce((s, r) => s + r.wycena, 0)
          const sKoszty = poz.reduce((s, r) => s + r.kosztPoz, 0)
          const sZysk = sWycena - sKoszty
          return (
            <div key={sekcja}>
              <h2>{sekcja}</h2>
              <table>
                <thead><tr>
                  <th>#</th><th>Pozycja</th>
                  <th className="right">Wycena klienta</th>
                  <th className="right">Koszty rzeczywiste</th>
                  <th className="right">Zysk / strata</th>
                  <th className="right">Marża %</th>
                </tr></thead>
                <tbody>
                  {poz.map((r, i) => (
                    <tr key={r.id}>
                      <td>{i + 1}</td>
                      <td>{r.nazwa}</td>
                      <td className="right">{fmt(r.wycena)}</td>
                      <td className="right">{r.kosztPoz > 0 ? fmt(r.kosztPoz) : '—'}</td>
                      <td className="right"><span className={r.kosztPoz > 0 ? (r.zysk >= 0 ? 'plus' : 'minus') : ''}>{r.kosztPoz > 0 ? fmt(r.zysk) : '—'}</span></td>
                      <td className="right"><span className={r.kosztPoz > 0 ? (r.marza >= 0 ? 'plus' : 'minus') : ''}>{r.kosztPoz > 0 ? fmtPct(r.marza) : '—'}</span></td>
                    </tr>
                  ))}
                  <tr className="total">
                    <td colSpan={2}>RAZEM {sekcja}</td>
                    <td className="right">{fmt(sWycena)}</td>
                    <td className="right">{fmt(sKoszty)}</td>
                    <td className="right"><span className={sZysk >= 0 ? 'plus' : 'minus'}>{fmt(sZysk)}</span></td>
                    <td className="right"><span className={sZysk >= 0 ? 'plus' : 'minus'}>{fmtPct(sKoszty > 0 ? sZysk / sWycena * 100 : 0)}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        })}

        {/* Koszty źródłowe */}
        <h2>Koszty źródłowe (faktury i praca)</h2>
        <table>
          <thead><tr><th>Typ</th><th>Dostawca / Pracownik</th><th>Nr dokumentu</th><th>Opis</th><th>Data</th><th className="right">Kwota netto</th></tr></thead>
          <tbody>
            {koszty.filter(k => k.przypisania.some(a => a.projektId === projekt.id)).map(k => (
              <tr key={k.id}>
                <td>{TYP_KOSZTU_LABELS[k.typ]}</td>
                <td>{k.typ === 'praca' ? `${k.pracownik} (${k.stanowisko})` : k.dostawca}</td>
                <td>{k.nrDokumentu || '—'}</td>
                <td>{k.opis}</td>
                <td>{k.dataWystawienia}</td>
                <td className="right">{fmt(k.kwotaNetto)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 32, paddingTop: 12, borderTop: '1px solid #ddd', textAlign: 'right', fontSize: 11, color: '#666' }}>
          Dokument wygenerowany: {new Date().toLocaleString('pl-PL')} | L8 Studio Event Management System v1.0
        </div>
      </div>
    </div>
  )
}
