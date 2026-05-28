import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Plus, Edit, X, Mail, Phone, List, Printer, FileSpreadsheet, Users, Copy } from 'lucide-react'
import { OFERTY_LIST, OFERTA_TABS, KOSZTY_SECTIONS, STATUSY_OFERT_COLORS, PDF_SAMPLE } from './offersData'
import OfferPDF from './OfferPDF'
import './Offers.css'

const STAGE_COLORS = { MON:'#22c55e', EVE:'#f97316', DEM:'#ef4444' }

export default function OfferDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const offer = OFERTY_LIST.find(o => o.id === +id) || OFERTY_LIST[0]
  const [activeTab, setActiveTab] = useState('Sprzęt')
  const [status, setStatus] = useState(offer.status)
  const [showPDF, setShowPDF] = useState(false)

  const fmt = v => typeof v === 'number' ? `${v.toLocaleString('pl', {minimumFractionDigits:2,maximumFractionDigits:2})} zł` : '0,00 zł'

  if (showPDF) return <OfferPDF data={PDF_SAMPLE} onClose={()=>setShowPDF(false)} />

  return (
    <div className="off-detail-wrap animate-in">
      {/* Fixed buttons top right */}
      <button className="off-top-btn--edit off-top-btn" onClick={()=>navigate(`/oferty/${id}/edytuj`)}><Edit size={14}/></button>
      <button className="off-top-btn--lock off-top-btn">🔒 Zablokuj</button>

      {/* Top action row 1 */}
      <div className="off-detail-topbar">
        {[
          {label:'Duplikuj', icon:<Copy size={13}/>, cls:'off-top-btn--gray'},
          {label:'Wyślij E-mailem', icon:<Mail size={13}/>, cls:'off-top-btn--gray'},
          {label:'Stwórz wydarzenie', icon:<Plus size={13}/>, cls:'off-top-btn--gray'},
          {label:'Stwórz wypożyczenie', icon:<Plus size={13}/>, cls:'off-top-btn--gray'},
          {label:'PDF', icon:<Printer size={13}/>, cls:'off-top-btn--gray', action: ()=>setShowPDF(true)},
          {label:'XLS', icon:<FileSpreadsheet size={13}/>, cls:'off-top-btn--gray'},
          {label:'Zapotrzebowanie', icon:<Users size={13}/>, cls:'off-top-btn--gray'},
          {label:'Podgląd', icon:<Edit size={13}/>, cls:'off-top-btn--gray'},
        ].map(b => (
          <button key={b.label} className={`off-top-btn ${b.cls}`} onClick={b.action}>
            {b.icon} {b.label}
          </button>
        ))}
      </div>

      {/* Top action row 2 */}
      <div className="off-detail-topbar2">
        <button className="off-top-btn off-top-btn--gray">⬆ Załaduj szablon</button>
        <button className="off-top-btn off-top-btn--gray">💾 Zapisz jako szablon</button>
        <button className="off-top-btn off-top-btn--gray">📋 Twoje szablony</button>
        <button className="off-top-btn off-top-btn--green">📅 Zobacz jak działa kalendarz kosztorysów</button>
      </div>

      {/* 3-column body */}
      <div className="off-body">
        {/* LEFT */}
        <div className="off-left">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <span className="off-title">{offer.nazwa}</span>
            <span className="off-id-badge">{offer.nrGenerowany} ({offer.nr})</span>
          </div>
          <div className="off-meta">
            <div><strong>Klient:</strong> <a href="#" className="off-link">{offer.klient}</a> <button style={{background:'none',color:'var(--green-primary)',fontSize:12}}>👁</button></div>
            {offer.kontakt && <div>
              <strong>Kontakt:</strong> {offer.kontakt}
              {offer.kontaktTel && <span className="off-phone-tag"><Phone size={10}/> {offer.kontaktTel}</span>}
              {offer.kontaktEmail && <span className="off-email-tag"><Mail size={10}/> {offer.kontaktEmail}</span>}
            </div>}
            <div><strong>Przygotował:</strong> Karol L8 Studio</div>
            <div><strong>Data sporządzenia:</strong> {offer.dataSporzeadzenia}</div>
            <div><strong>Termin:</strong> {offer.termin}</div>
            {offer.miejsce && <div><strong>Miejsce:</strong> <a href="#" className="off-link">{offer.miejsce}</a></div>}
          </div>
          <div className="off-status-row">
            <span style={{fontSize:12.5,color:'var(--text-muted)'}}>STATUS:</span>
            <select className="off-status-select" value={status} onChange={e=>setStatus(e.target.value)}>
              {Object.keys(STATUSY_OFERT_COLORS).map(s=><option key={s}>{s}</option>)}
            </select>
            <button className="off-historia-btn"><List size={12}/> Historia</button>
          </div>
          <div className="off-schemat-row">
            <span>SCHEMAT:</span>
            <select style={{flex:1,height:32,fontSize:12.5,background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'0 8px'}}>
              <option>{offer.schemat}</option>
            </select>
          </div>
        </div>

        {/* CENTER */}
        <div className="off-center">
          <div className="off-manager-row">
            <div className="off-manager-avatar" />
            <div>
              <div className="off-manager-name">Karol L8 Studio</div>
              <div className="off-manager-role">EventManager</div>
            </div>
            <div style={{marginLeft:'auto',display:'flex',flexDirection:'column',gap:3}}>
              <span className="off-manager-email"><Mail size={11}/> karol@l8studio.pl</span>
              <span className="off-manager-tel"><Phone size={11}/> 729911512</span>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div className="off-finance-section">
              <div className="off-finance-section-title">Budżet / Terminy</div>
              <div className="off-finance-row"><span className="off-finance-label">Budżet</span><input className="off-finance-input" placeholder="" /></div>
              <div className="off-finance-row"><span className="off-finance-label">Termin płatności:</span><span className="off-finance-val">{offer.terminPlatnosci}</span></div>
              <div className="off-finance-row"><span className="off-finance-label">Zaliczka</span><input className="off-finance-input" placeholder="" /></div>
              <div className="off-finance-row"><span className="off-finance-label">Zaliczka %</span><span className="off-finance-val">{offer.zaliczkaProc},00</span></div>
            </div>
            <div className="off-finance-section">
              <div className="off-finance-section-title">Podsumowanie</div>
              <div className="off-finance-row"><span className="off-finance-label">Wartość</span><span className="off-finance-val">{fmt(offer.wartosc)}</span></div>
              <div className="off-finance-row"><span className="off-finance-label">Koszty</span><span className="off-finance-val">{fmt(offer.koszt)}</span></div>
              <div className="off-finance-row"><span className="off-finance-label">Zaliczka</span><span className="off-finance-val">{fmt(0)} (50%)</span></div>
              <div className="off-finance-row"><span className="off-finance-label">Budżet produkcji</span><span className="off-finance-val">{fmt(0)}</span></div>
              <div className="off-finance-row"><span className="off-finance-label">Zysk</span><span className="off-finance-val">{fmt(offer.zysk)}</span></div>
              <div className="off-finance-row"><span className="off-finance-label">Prowizje</span><span className="off-finance-val">{fmt(0)}</span></div>
              <div className="off-finance-row"><span className="off-finance-label">Zysk po prowizji</span><span className="off-finance-val">{fmt(0)}</span></div>
            </div>
          </div>
        </div>

        {/* RIGHT - harmonogram */}
        <div className="off-right">
          <div className="off-harm-header">
            <span className="off-harm-title">Harmonogram</span>
            <button className="btn btn-primary" style={{fontSize:11}}>
              <Plus size={12}/> Dodaj etap
            </button>
          </div>
          {offer.harmonogram.map(stage => (
            <div key={stage.id} className="off-harm-item">
              <div className="off-harm-pill" style={{background:stage.color}}>
                <span className="off-harm-prefix">{stage.prefix}</span>
              </div>
              <div style={{flex:1}}>
                <div className="off-harm-name">{stage.name}</div>
                <div className="off-harm-dates">{stage.od} → {stage.do}</div>
              </div>
              <div className="off-harm-btns">
                <button className="off-harm-btn">✏</button>
                <button className="off-harm-btn off-harm-btn--del">✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Segment buttons */}
      <div className="off-segment-btns">
        <button className="off-segment-btn" style={{background:'#6b7280'}}><Plus size={12}/> Dodaj grupę sprzętową</button>
        <button className="off-segment-btn" style={{background:'#374151'}}>⚫ Sprzęt <span>0,00 zł</span></button>
        <button className="off-segment-btn" style={{background:'#1d4ed8'}}>🔵 Obsługa <span>0,00 zł</span></button>
        <button className="off-segment-btn" style={{background:'#92400e'}}>🟤 Transport <span>0,00 zł</span></button>
      </div>

      {/* Tabs */}
      <div className="off-tabs">
        {OFERTA_TABS.map(tab => (
          <button key={tab} className={`off-tab ${activeTab===tab?'off-tab--active':''}`} onClick={()=>setActiveTab(tab)}>
            {tab === 'Koszty' && '💰 '}
            {tab === 'Historia' && '🕐 '}
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'Sprzęt' && <SprzeTab offer={offer} fmt={fmt} />}
        {activeTab === 'Obsługa' && <ObsługaTab offer={offer} />}
        {activeTab === 'Transport' && <TransportTab offer={offer} />}
        {activeTab === 'Koszty' && <KosztyTab />}
        {activeTab === 'Historia' && <HistoriaTab offer={offer} />}
        {activeTab === 'Warunki zamówienia' && <WarunkiTab />}
        {activeTab === 'Notatki' && <NotatkiTab />}
        {activeTab === 'Podsumowanie' && <PodsumowanieTab offer={offer} fmt={fmt} />}
      </div>
    </div>
  )
}

function SprzeTab({ offer, fmt }) {
  return (
    <div>
      <div className="off-sprzet-bar">
        <button className="off-top-btn off-top-btn--teal" style={{fontSize:12}}><Plus size={12}/> Dodaj sprzęt</button>
        <button className="off-top-btn off-top-btn--gray" style={{fontSize:12}}>Magazyn zewnętrzny</button>
        <button className="off-top-btn off-top-btn--gray" style={{fontSize:12}}>Pokaż kategorie</button>
        <button className="off-top-btn off-top-btn--gray" style={{fontSize:12}}>Zaznacz wszystko</button>
        <input className="off-sprzet-input" placeholder="Szukaj..." />
        <button style={{background:'none',color:'var(--red)',border:'none',cursor:'pointer'}}>✕</button>
        <div className="off-sprzet-budget"><span>Budżet:</span><input /></div>
        <div style={{display:'flex',gap:5,marginLeft:'auto'}}>
          <button className="off-top-btn off-top-btn--red" style={{width:28,height:28,padding:0,borderRadius:'50%'}}>✕</button>
          <button className="off-top-btn off-top-btn--blue" style={{width:28,height:28,padding:0,borderRadius:'50%'}}>✏</button>
        </div>
      </div>
      <div className="off-sprzet-add-row">wybierz lub wpisz i zatwierdź kliknięciem ▼</div>
      <div className="off-lacznie">
        <span style={{fontFamily:'var(--font-display)',fontSize:14,letterSpacing:'0.05em'}}>Łącznie Sprzęt</span>
        <div className="off-lacznie-vals">
          <span>Łącznie {fmt(0)}</span>
          <span style={{color:'rgba(0,0,0,0.6)'}}>Dodatkowy rabat {fmt(0)}</span>
          <span>Łącznie po rabacie {fmt(0)}</span>
        </div>
      </div>
    </div>
  )
}

function ObsługaTab({ offer }) {
  const stages = offer.harmonogram.length > 0 ? offer.harmonogram : [
    {id:1,name:'Montaż',prefix:'MON',color:'#4a4a4a'},
    {id:2,name:'Event',prefix:'EVE',color:'#4a4a4a'},
    {id:3,name:'Demontaż',prefix:'DEM',color:'#4a4a4a'},
  ]
  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:12,alignItems:'center'}}>
        <select className="off-select" style={{flex:1,maxWidth:400}}><option>Wspólna obsługa dla grup sprzętowych</option></select>
        <button className="off-top-btn off-top-btn--green" style={{fontSize:12}}>💾 Zapisz jako szablon obsługi</button>
        <button className="off-top-btn off-top-btn--red" style={{fontSize:12}}>⬆ Załaduj szablon obsługi</button>
      </div>
      {stages.map(stage => (
        <div key={stage.id} style={{marginBottom:12}}>
          <div className="off-etap-header">
            <span>{stage.name} {stage.id === 1 ? '17763734h' : stage.id === 2 ? '17763744h' : '0h'}</span>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <span style={{fontSize:11,color:'rgba(255,255,255,0.7)'}}>🔄 Kopiuj z</span>
              <select className="off-select" style={{width:160,height:26,fontSize:11}}><option>wybierz etap...</option></select>
            </div>
          </div>
          <div className="off-etap-body">
            <div className="off-etap-cols">
              <span>Nazwa</span><span>Opis</span><span>Stawka</span><span>Cena</span><span>Ilość</span><span>Przelicznik</span><span>Jedn.</span><span>VAT</span><span>Razem</span>
            </div>
            <div className="off-etap-add">
              <div className="off-sprzet-add-row">wybierz lub wpisz i zatwierdź kliknięciem ▼</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TransportTab({ offer }) {
  const stages = offer.harmonogram.length > 0 ? offer.harmonogram : [
    {id:1,name:'Montaż',h:'17763734h'},{id:2,name:'Montaż dzień 2',h:'17763744h'},
    {id:3,name:'Event',h:'0h'},{id:4,name:'Event 2',h:'0h'},{id:5,name:'Demontaż',h:'0h'},
  ]
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <select className="off-select" style={{flex:1,maxWidth:400}}><option>Wspólny transport dla grup sprzętowych</option></select>
        <button className="off-top-btn off-top-btn--blue" style={{fontSize:12}}>📍 Pobierz odległość z Google Maps</button>
      </div>
      {stages.map((stage, si) => (
        <div key={stage.id} style={{marginBottom:12}}>
          <div className="off-etap-header">
            <div className="off-etap-info">
              <span>🚛 0/0 kg</span><span>📦 0.00/0 m³</span><span>👥 0/0</span>
            </div>
            <span>{stage.name} {stage.h || '0h'}</span>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <span style={{fontSize:11,color:'rgba(255,255,255,0.7)'}}>🔄 Kopiuj z</span>
              <select className="off-select" style={{width:160,height:26,fontSize:11}}><option>wybierz etap...</option></select>
            </div>
          </div>
          <div className="off-etap-body">
            <div className="off-etap-cols">
              <span>Nazwa</span><span>Opis</span><span>Stawka</span><span>Cena</span><span>Ilość</span><span>Przelicznik</span><span>Jedn.</span><span>VAT</span><span>Razem</span>
            </div>
            <div className="off-etap-add">
              <div className="off-sprzet-add-row">wybierz lub wpisz i zatwierdź kliknięciem ▼</div>
            </div>
          </div>
        </div>
      ))}
      <div className="off-lacznie">
        <span style={{fontFamily:'var(--font-display)',fontSize:14}}>Łącznie Transport</span>
        <div className="off-lacznie-vals">
          {stages.map(s=><span key={s.id}>{s.name}: 0,00 zł</span>)}
        </div>
      </div>
    </div>
  )
}

function KosztyTab() {
  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:12,alignItems:'center'}}>
        <span style={{fontSize:12.5,color:'var(--text-muted)'}}>Pokaż koszty dla:</span>
        <button className="off-top-btn off-top-btn--teal" style={{fontSize:12}}>Wszystkie grupy</button>
        <button className="off-top-btn off-top-btn--gray" style={{fontSize:12}}>Sprzęt ⚫</button>
      </div>
      {KOSZTY_SECTIONS.map((section, si) => (
        <div key={si} className="off-koszty-section">
          <div className="off-koszty-header" style={{background: section.kolor}}>{section.nazwa}</div>
          <table className="off-koszty-table">
            <thead><tr>
              <th>#</th><th>Nazwa</th>
              {section.nazwa === 'Obsługa' && <><th>Ilość</th><th>Grupa sprzętowa</th><th>Koszt</th><th>Stawka</th><th>Okres</th></>}
              {section.nazwa !== 'Obsługa' && <><th>Sekcja</th><th>Grupa sprzętowa</th><th>Koszt</th><th>Ilość</th></>}
              <th>Suma</th>
            </tr></thead>
            <tbody>
              {section.nazwa === 'Obsługa' && (
                <>
                  {['Montaż 17763734h','Montaż dzień 2 17763744h','Event 0h','Event 2 0h','Demontaż 0h'].map(etap => (
                    <tr key={etap}><td colSpan={8} style={{background:'#3a3a3a',textAlign:'center',fontWeight:600,fontSize:12,color:'#fff',padding:'5px'}}>{etap}</td></tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
          <div className="off-koszty-lacznie">Łącznie {section.nazwa}: 0,00 zł</div>
        </div>
      ))}
    </div>
  )
}

function HistoriaTab({ offer }) {
  return (
    <div className="off-historia">
      <div className="off-historia-title">Historia wysyłek</div>
      <table className="off-historia-table">
        <thead><tr><th>Data</th><th>Odbiorcy</th><th>Nadawca</th><th>Plik</th></tr></thead>
        <tbody><tr><td colSpan={4} style={{textAlign:'center',padding:'16px',color:'var(--text-muted)',fontStyle:'italic'}}>Brak wysyłek.</td></tr></tbody>
      </table>
      <div className="off-historia-title" style={{marginTop:16}}>Historia</div>
      <table className="off-historia-table">
        <thead><tr><th>#</th><th>Treść</th><th>Użytkownik</th><th>Data</th></tr></thead>
        <tbody>
          {offer.historia?.map(h => (
            <tr key={h.id}>
              <td className="off-mono">{h.id}.</td>
              <td>{h.tresc}</td>
              <td>{h.user}</td>
              <td className="off-mono" style={{fontSize:11}}>{h.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function WarunkiTab() {
  return (
    <div>
      <div className="off-sprzet-bar">
        <button className="off-top-btn off-top-btn--teal" style={{fontSize:12}}><Plus size={12}/> Dodaj sprzęt</button>
        <button className="off-top-btn off-top-btn--gray" style={{fontSize:12}}>Magazyn zewnętrzny</button>
        <button className="off-top-btn off-top-btn--gray" style={{fontSize:12}}>Pokaż kategorie</button>
        <button className="off-top-btn off-top-btn--gray" style={{fontSize:12}}>Zaznacz wszystko</button>
        <input className="off-sprzet-input" placeholder="Szukaj..." />
        <div className="off-sprzet-budget"><span>Budżet:</span><input /></div>
        <div style={{display:'flex',gap:5,marginLeft:'auto'}}>
          <button className="off-top-btn off-top-btn--red" style={{width:28,height:28,padding:0,borderRadius:'50%'}}>✕</button>
          <button className="off-top-btn off-top-btn--blue" style={{width:28,height:28,padding:0,borderRadius:'50%'}}>✏</button>
        </div>
      </div>
      <div className="off-sprzet-add-row">wybierz lub wpisz i zatwierdź kliknięciem ▼</div>
      <div className="off-lacznie">
        <span style={{fontFamily:'var(--font-display)',fontSize:14,letterSpacing:'0.05em'}}>Łącznie Sprzęt</span>
        <div className="off-lacznie-vals">
          <span>Łącznie 0,00 zł</span>
          <span style={{color:'rgba(0,0,0,0.6)'}}>Dodatkowy rabat 0,00 zł</span>
          <span>Łącznie po rabacie 0,00 zł</span>
        </div>
      </div>
    </div>
  )
}

function NotatkiTab() {
  return (
    <div style={{padding:'16px 0'}}>
      <textarea placeholder="Notatki do oferty..." style={{width:'100%',minHeight:120,background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:'var(--radius)',padding:'10px',fontSize:13,fontFamily:'var(--font-body)'}} />
    </div>
  )
}

function PodsumowanieTab({ offer, fmt }) {
  return (
    <div style={{padding:'16px 0'}}>
      <div style={{background:'var(--bg-card)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'16px'}}>
        <h3 style={{fontFamily:'var(--font-display)',fontSize:16,marginBottom:12,color:'var(--text-primary)'}}>Podsumowanie oferty</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <div>
            <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:8}}>Wartości</div>
            {[['Wartość sprzętu','0,00 zł'],['Wartość obsługi','0,00 zł'],['Wartość transportu','0,00 zł'],['Inne koszty','0,00 zł'],['Łącznie',fmt(offer.wartosc)]].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid rgba(0,255,65,0.05)',fontSize:13}}>
                <span style={{color:'var(--text-secondary)'}}>{k}</span>
                <span style={{fontFamily:'var(--font-mono)',color:'var(--text-primary)',fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:8}}>Koszty i zysk</div>
            {[['Koszt sprzętu','0,00 zł'],['Koszt obsługi','0,00 zł'],['Koszt transportu','0,00 zł'],['Inne koszty','0,00 zł'],['Zysk',fmt(offer.zysk)]].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid rgba(0,255,65,0.05)',fontSize:13}}>
                <span style={{color:'var(--text-secondary)'}}>{k}</span>
                <span style={{fontFamily:'var(--font-mono)',color:'var(--text-primary)',fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
