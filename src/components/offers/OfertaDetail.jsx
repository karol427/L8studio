import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Copy, Mail, Link as LinkIcon, FileText, BarChart2, Download, Send, Eye, Edit, X, Plus, ChevronDown } from 'lucide-react'
import { OFERTY_LIST, ETAPY_HARMONOGRAMU } from './offersData'
import OfertaPDF from './OfertaPDF'
import './Offers.css'

const TABS = ['Sprzęt','Obsługa','Transport','Podsumowanie','Koszty','Historia','Warunki zamówienia','Notatki']

function StatusDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const opts = ['Nowa','Zaakceptowana','Oferta przegrana']
  const colors = { 'Nowa':'#22c55e','Zaakceptowana':'#3b82f6','Oferta przegrana':'#ef4444' }
  return (
    <div style={{position:'relative'}}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <select value={value} onChange={e=>onChange(e.target.value)} className="of-select" style={{flex:1}}>
          {opts.map(o=><option key={o}>{o}</option>)}
        </select>
        <button className="of-historia-btn">
          <BarChart2 size={12}/> Historia
        </button>
      </div>
    </div>
  )
}

export default function OfertaDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const oferta = OFERTY_LIST.find(o => o.id === +id) || OFERTY_LIST[0]
  const [activeTab, setActiveTab] = useState('Sprzęt')
  const [status, setStatus] = useState(oferta.status)
  const [showPDF, setShowPDF] = useState(false)
  const [budzetProdukcji, setBudzetProdukcji] = useState('')

  const stages = oferta.harmonogram || []

  if (showPDF) return <OfertaPDF onClose={() => setShowPDF(false)} />

  return (
    <div className="of-detail-wrap animate-in">
      {/* Top action bar */}
      <div className="of-detail-actions">
        <button className="of-action-btn"><Copy size={13}/> Duplikuj</button>
        <button className="of-action-btn"><Mail size={13}/> Wyślij E-mailem</button>
        <button className="of-action-btn"><LinkIcon size={13}/> Stwórz wydarzenie</button>
        <button className="of-action-btn"><LinkIcon size={13}/> Stwórz wypożyczenie</button>
        <button className="of-action-btn of-action-btn--pdf" onClick={()=>setShowPDF(true)}><FileText size={13}/> PDF</button>
        <button className="of-action-btn"><Download size={13}/> XLS</button>
        <button className="of-action-btn"><Send size={13}/> Zapotrzebowanie</button>
        <button className="of-action-btn"><Eye size={13}/> Podgląd</button>
        <div style={{flex:1}}/>
        <button className="of-close-btn" onClick={()=>navigate('/oferty')}><X size={14}/></button>
        <button className="of-edit-btn"><Edit size={14}/></button>
      </div>

      {/* Template buttons */}
      <div className="of-template-bar">
        <button className="of-tpl-btn"><Download size={12}/> Załaduj szablon</button>
        <button className="of-tpl-btn"><FileText size={12}/> Zapisz jako szablon</button>
        <button className="of-tpl-btn"><FileText size={12}/> Twoje szablony</button>
        <button className="of-tpl-btn" style={{background:'#22c55e',color:'#000'}}>
          Zobacz jak działa kalendarz kosztorysów
        </button>
        <button className="of-zablokuj-btn" style={{marginLeft:'auto'}}>🔒 Zablokuj</button>
      </div>

      {/* 3-column body */}
      <div className="of-detail-body">
        {/* LEFT */}
        <div className="of-detail-left">
          <div className="of-detail-title-row">
            <h2 className="of-detail-title">{oferta.nazwa}</h2>
            <span className="of-detail-nr">{oferta.nrGenerowany} ({oferta.nr})</span>
          </div>
          <div className="of-detail-meta">
            <div className="of-meta-row">
              <span className="of-meta-lbl">Klient:</span>
              <Link to="/kontrahenci" className="of-meta-link">{oferta.klient}</Link>
              <button className="of-eye-btn">👁</button>
            </div>
            {oferta.kontakt && (
              <div className="of-meta-row">
                <span className="of-meta-lbl">Kontakt:</span>
                <span>{oferta.kontakt}</span>
                {oferta.tel && <span className="of-tel-badge">📞 {oferta.tel}</span>}
                {oferta.email && <span className="of-email-badge">✉ {oferta.email}</span>}
              </div>
            )}
            <div className="of-meta-row"><span className="of-meta-lbl">Przygotował:</span><span>{oferta.przygotowal || 'Karol L8 Studio'}</span></div>
            <div className="of-meta-row"><span className="of-meta-lbl">Data sporządzenia:</span><span className="of-mono">{oferta.dataSporzeadzenia}</span></div>
            <div className="of-meta-row"><span className="of-meta-lbl">Termin:</span><span className="of-mono" style={{fontSize:11}}>{oferta.termin || '–'}</span></div>
            {oferta.miejsce && <div className="of-meta-row"><span className="of-meta-lbl">Miejsce:</span><Link to="/miejsca" className="of-meta-link">{oferta.miejsce}</Link></div>}
          </div>
          <div className="of-status-row">
            <span className="of-meta-lbl">STATUS:</span>
            <StatusDropdown value={status} onChange={setStatus} />
          </div>
          <div className="of-schemat-row">
            <span className="of-meta-lbl">SCHEMAT:</span>
            <select defaultValue={oferta.schemat} className="of-select" style={{flex:1}}>
              <option>Schemat podstawowy</option><option>Ceny w Euro</option>
            </select>
          </div>
        </div>

        {/* CENTER */}
        <div className="of-detail-center">
          <div className="of-manager-card">
            <div className="of-manager-avatar"/>
            <div>
              <div className="of-manager-name">Karol L8 Studio</div>
              <div className="of-manager-role">EventManager</div>
            </div>
            <div style={{marginLeft:'auto',display:'flex',flexDirection:'column',gap:4,fontSize:12,color:'var(--text-muted)'}}>
              <span>✉ karol@l8studio.pl</span>
              <span>📞 729911512</span>
            </div>
          </div>

          <div className="of-finance-grid">
            <div className="of-finance-row">
              <div className="of-finance-item">
                <span>Budżet ℹ</span>
                <input value={budzetProdukcji} onChange={e=>setBudzetProdukcji(e.target.value)} className="of-finance-input" placeholder="0,00 zł" />
              </div>
              <div className="of-finance-item">
                <span>Termin płatności:</span>
                <strong>{oferta.terminPlatnosci || 14}</strong>
              </div>
            </div>
            <div className="of-finance-row">
              <div className="of-finance-item">
                <span>Zaliczka</span>
                <input className="of-finance-input" placeholder="0,00 zł" />
              </div>
              <div className="of-finance-item">
                <span>Zaliczka %</span>
                <strong>{oferta.zaliczkaProc || 50}.00</strong>
              </div>
            </div>

            <div className="of-finance-table">
              <div className="of-finance-header">
                <span>Wartość</span><span>Koszty</span><span>Zaliczka</span><span>Budżet produkcji</span>
              </div>
              <div className="of-finance-vals">
                <span className="of-mono">0,00 zł</span>
                <span className="of-mono">0,00 zł</span>
                <span className="of-mono">0,00 zł (50%)</span>
                <span className="of-mono">0,00 zł</span>
              </div>
              <div className="of-finance-header" style={{marginTop:8}}>
                <span>Zysk</span><span>Prowizje</span><span>Zysk po prowizji</span><span></span>
              </div>
              <div className="of-finance-vals">
                <span className="of-mono">0,00 zł</span>
                <span className="of-mono">0,00 zł</span>
                <span className="of-mono">0,00 zł</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Harmonogram */}
        <div className="of-detail-right">
          <div className="of-harm-header">
            <span>Harmonogram</span>
            <button className="btn btn-primary" style={{fontSize:11}}><Plus size={11}/> Dodaj etap</button>
          </div>
          {stages.map(stage => (
            <div key={stage.id} className="of-harm-item">
              <div className="of-harm-pill" style={{background:stage.color}}>
                <span className="of-harm-prefix">{stage.prefix}</span>
              </div>
              <div className="of-harm-info">
                <div className="of-harm-name">{stage.name}</div>
                <div className="of-harm-time">{stage.from} → {stage.to}</div>
              </div>
              <div className="of-harm-btns">
                <button className="of-stage-btn"><Edit size={11}/></button>
                <button className="of-stage-btn of-stage-btn--del"><X size={11}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group/cost summary bar */}
      <div className="of-groups-bar">
        <button className="of-group-add-btn"><Plus size={12}/> Dodaj grupę sprzętową</button>
        <button className="of-group-sum-btn" style={{background:'#555',color:'#fff'}}>⚫ Sprzęt 0,00 zł</button>
        <button className="of-group-sum-btn" style={{background:'#3b82f6',color:'#fff'}}>⚫ Obsługa 0,00 zł</button>
        <button className="of-group-sum-btn" style={{background:'#f97316',color:'#fff'}}>⚫ Transport 0,00 zł</button>
      </div>

      {/* Tabs */}
      <div className="of-tabs-bar">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`of-tab ${activeTab===tab?'of-tab--active':''}`}
            onClick={()=>setActiveTab(tab)}
          >
            {tab==='Sprzęt' && <Edit size={12}/>}
            {tab==='Koszty' && <BarChart2 size={12}/>}
            {tab==='Historia' && '↻'}
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="of-tab-content">
        {activeTab === 'Sprzęt' && <SprzętTab stages={stages} />}
        {activeTab === 'Obsługa' && <ObslugaTab stages={stages} />}
        {activeTab === 'Transport' && <TransportTab stages={stages} />}
        {activeTab === 'Koszty' && <KosztyTab stages={stages} />}
        {activeTab === 'Historia' && <HistoriaTab historia={oferta.historia || []} />}
        {activeTab === 'Warunki zamówienia' && <WarunkiTab />}
        {['Podsumowanie','Notatki'].includes(activeTab) && (
          <div className="of-tab-placeholder">Zakładka <strong>{activeTab}</strong> — zawartość</div>
        )}
      </div>
    </div>
  )
}

function SprzętTab({ stages }) {
  return (
    <div className="of-sprzet-tab">
      <div className="of-sprzet-actions">
        <button className="of-action-btn"><Plus size={12}/> Dodaj sprzęt</button>
        <button className="of-action-btn">Magazyn zewnętrzny</button>
        <button className="of-action-btn">Pokaż kategorie</button>
        <button className="of-action-btn">Zaznacz wszystko</button>
        <input placeholder="Szukaj..." className="of-search-input" />
        <button style={{background:'none',color:'var(--red)',border:'none',cursor:'pointer',fontSize:16}}>✕</button>
        <span style={{marginLeft:8,fontSize:12,color:'var(--text-muted)'}}>Budżet:</span>
        <input className="of-budget-input" placeholder="0,00" />
      </div>
      <div className="of-sprzet-add-row">
        <select className="of-select" style={{flex:1}}><option>wybierz lub wpisz i zatwierdź kliknięciem</option></select>
      </div>
      <div className="of-lacznie-row">
        <span>Łącznie Sprzęt</span>
        <div className="of-lacznie-vals">
          <span>Łącznie</span><span className="of-mono">0,00 zł</span>
          <span>Dodatkowy rabat</span><span className="of-mono">0,00 zł</span>
          <span>Łącznie po rabacie</span><span className="of-mono">0,00 zł</span>
        </div>
      </div>
    </div>
  )
}

function ObslugaTab({ stages }) {
  return (
    <div className="of-sprzet-tab">
      <div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap',alignItems:'center'}}>
        <select className="of-select" style={{maxWidth:400}}><option>Wspólna obsługa dla grup sprzętowych</option></select>
        <button className="of-action-btn" style={{background:'#22c55e',color:'#000'}}>Zapisz jako szablon obsługi</button>
        <button className="of-action-btn" style={{background:'#ef4444',color:'#fff'}}>Załaduj szablon obsługi</button>
      </div>
      {stages.map(stage => (
        <div key={stage.id} className="of-obslugi-stage">
          <div className="of-obslugi-header">
            <span style={{color:'#fff',fontWeight:600}}>{stage.name} {stage.hours || '0'}h</span>
            <span style={{marginLeft:'auto',color:'rgba(255,255,255,0.6)',fontSize:12}}>↻ Kopiuj z</span>
            <select className="of-select" style={{width:160,fontSize:11}}><option>wybierz etap...</option></select>
          </div>
          <table className="of-stage-table">
            <thead><tr>
              <th>Nazwa</th><th>Opis</th><th>Stawka</th><th>Cena</th><th>Ilość</th><th>Przelicznik</th><th>Jedn.</th><th>VAT</th><th>Razem</th>
            </tr></thead>
            <tbody><tr><td colSpan={9}>
              <select className="of-select" style={{width:'100%'}}><option>wybierz lub wpisz i zatwierdź kliknięciem</option></select>
            </td></tr></tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

function TransportTab({ stages }) {
  return (
    <div className="of-sprzet-tab">
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:10}}>
        <button className="of-action-btn" style={{background:'#14b8a6',color:'#fff'}}>📍 Pobierz odległość z Google Maps</button>
      </div>
      <select className="of-select" style={{maxWidth:400,marginBottom:10}}><option>Wspólny transport dla grup sprzętowych</option></select>
      {stages.map(stage => (
        <div key={stage.id} className="of-obslugi-stage">
          <div className="of-obslugi-header">
            <span style={{color:'rgba(255,255,255,0.7)',fontSize:11}}>🚌 0/0 kg | 🚌 0.00/0 m³ | 👥 0/0</span>
            <span style={{color:'#fff',fontWeight:600,margin:'0 auto'}}>{stage.name} {stage.hours || '0'}h</span>
            <span style={{color:'rgba(255,255,255,0.6)',fontSize:12}}>↻ Kopiuj z</span>
            <select className="of-select" style={{width:160,fontSize:11}}><option>wybierz etap...</option></select>
          </div>
          <table className="of-stage-table">
            <thead><tr>
              <th>Nazwa</th><th>Opis</th><th>Stawka</th><th>Cena</th><th>Ilość</th><th>Przelicznik</th><th>Jedn.</th><th>VAT</th><th>Razem</th>
            </tr></thead>
            <tbody><tr><td colSpan={9}>
              <select className="of-select" style={{width:'100%'}}><option>wybierz lub wpisz i zatwierdź kliknięciem</option></select>
            </td></tr></tbody>
          </table>
        </div>
      ))}
      <div className="of-lacznie-transport">
        <span style={{fontWeight:600,fontSize:13}}>Łącznie Transport</span>
        <div className="of-lacznie-stages">
          {stages.map(s=><div key={s.id} className="of-lacznie-stage-row"><span>{s.name}:</span><span className="of-mono">0,00 zł</span></div>)}
        </div>
      </div>
    </div>
  )
}

function KosztyTab({ stages }) {
  const KATEGORIE = [
    {nazwa:'Inne koszty', kolor:'#f97316'},
    {nazwa:'Sprzęt do wypożyczenia', kolor:'#14b8a6'},
    {nazwa:'Materiały eksploatacyjne', kolor:'#f97316'},
    {nazwa:'Pozycje dodatkowe spoza magazynu', kolor:'#14b8a6'},
    {nazwa:'Obsługa', kolor:'#f97316'},
  ]
  return (
    <div className="of-koszty-tab">
      <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap',alignItems:'center'}}>
        <span style={{fontSize:12.5,color:'var(--text-muted)'}}>Pokaż koszty dla:</span>
        <button className="of-action-btn" style={{background:'#f59e0b',color:'#fff'}}>Wszystkie grupy</button>
        <button className="of-action-btn">Sprzęt ⚫</button>
      </div>
      {KATEGORIE.map(kat => (
        <div key={kat.nazwa} className="of-koszt-section">
          <div className="of-koszt-header" style={{background:kat.kolor}}>{kat.nazwa}</div>
          <table className="of-koszt-table">
            <thead><tr>
              <th>#</th><th>Nazwa</th><th>Sekcja</th><th>Grupa sprzętowa</th><th>Koszt</th><th>Ilość</th><th>Suma</th>
            </tr></thead>
            <tbody>
              <tr><td colSpan={2} style={{padding:'6px 12px',fontStyle:'italic',color:'var(--text-muted)'}}>wpisz i zatwierdź kliknięciem</td><td colSpan={5}></td></tr>
            </tbody>
            <tfoot>
              <tr><td colSpan={6} style={{padding:'6px 12px',fontWeight:600,color:'var(--text-secondary)'}}>Łącznie {kat.nazwa}</td><td style={{padding:'6px 12px',textAlign:'right',fontWeight:600,fontFamily:'var(--font-mono)'}}>0,00 zł</td></tr>
            </tfoot>
          </table>
          {kat.nazwa === 'Obsługa' && (
            <div>
              {stages.map(s=>(
                <div key={s.id} className="of-obslugi-header" style={{marginTop:2}}><span style={{color:'#fff',fontWeight:600,margin:'0 auto'}}>{s.name} {s.hours||0}h</span></div>
              ))}
              <table className="of-koszt-table">
                <thead><tr><th>#</th><th>Nazwa</th><th>Ilość</th><th>Grupa sprzętowa</th><th>Koszt</th><th>Stawka</th><th>Okres</th><th>Suma</th></tr></thead>
                <tbody><tr><td colSpan={8} style={{padding:'8px 12px',textAlign:'center',color:'var(--text-muted)',fontStyle:'italic'}}>Brak pozycji</td></tr></tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} style={{padding:'6px 12px',fontWeight:600}}>Łącznie obsługa</td>
                    <td colSpan={3}>
                      {stages.map(s=><div key={s.id} style={{display:'flex',justifyContent:'space-between',padding:'2px 12px',fontSize:12}}><span>{s.name}:</span><span className="of-mono">0,00 zł</span></div>)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function HistoriaTab({ historia }) {
  return (
    <div className="of-historia-tab">
      <div className="of-historia-section">
        <h4>Historia wysyłek</h4>
        <table className="of-historia-table">
          <thead><tr><th>Data</th><th>Odbiorcy</th><th>Nadawca</th><th>Plik</th></tr></thead>
          <tbody><tr><td colSpan={4} className="of-tab-placeholder" style={{padding:'12px',fontStyle:'italic',color:'var(--text-muted)'}}>Brak wysyłek</td></tr></tbody>
        </table>
      </div>
      <div className="of-historia-section">
        <h4>Historia</h4>
        <table className="of-historia-table">
          <thead><tr><th>#</th><th>Treść</th><th>Użytkownik</th><th>Data</th></tr></thead>
          <tbody>
            {historia.map((h,idx) => (
              <tr key={h.id}>
                <td className="of-num">{idx+1}.</td>
                <td className="of-cell">{h.tresc}</td>
                <td className="of-cell">{h.user}</td>
                <td className="of-cell of-mono" style={{fontSize:11}}>{h.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function WarunkiTab() {
  return (
    <div className="of-sprzet-tab">
      <div className="of-sprzet-actions">
        <button className="of-action-btn"><Plus size={12}/> Dodaj sprzęt</button>
        <button className="of-action-btn">Magazyn zewnętrzny</button>
        <button className="of-action-btn">Pokaż kategorie</button>
        <button className="of-action-btn">Zaznacz wszystko</button>
        <input placeholder="Szukaj..." className="of-search-input" />
        <button style={{background:'none',color:'var(--red)',border:'none',cursor:'pointer',fontSize:16}}>✕</button>
        <span style={{marginLeft:8,fontSize:12,color:'var(--text-muted)'}}>Budżet:</span>
        <input className="of-budget-input" />
      </div>
      <div className="of-sprzet-add-row">
        <select className="of-select" style={{flex:1}}><option>wybierz lub wpisz i zatwierdź kliknięciem</option></select>
      </div>
      <div className="of-lacznie-row">
        <span>Łącznie Sprzęt</span>
        <div className="of-lacznie-vals">
          <span>Łącznie</span><span className="of-mono">0,00 zł</span>
          <span>Dodatkowy rabat</span><span className="of-mono">0,00 zł</span>
          <span>Łącznie po rabacie</span><span className="of-mono">0,00 zł</span>
        </div>
      </div>
    </div>
  )
}
