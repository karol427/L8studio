import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MessageCircle, Copy, Edit, X, Plus, Eye, Phone, Mail, Truck, Zap,
  ChevronDown, List, Check, Info, Package, Paperclip, DollarSign,
  Users, History, Bell, Clock, BarChart2, FileText } from 'lucide-react'
import { EVENTS_LIST, STATUS_OPTIONS, STATUS_KSIEGOWOSC, STATUS_MAGAZYN, STATUS_COLORS } from './eventsData'
import ScheduleModal from './ScheduleModal'
import './EventDetail.css'

const TABS = [
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'zadania', label: 'Zadania', icon: Check },
  { id: 'szczegoly', label: 'Szczegóły', icon: Info },
  { id: 'sprzet', label: 'Sprzęt', icon: Package },
  { id: 'sprzet-zewn', label: 'Sprzęt zewnętrzny', icon: Package, dropdown: true },
  { id: 'zalaczniki', label: 'Załączniki', icon: Paperclip, badge: 0 },
  { id: 'oferty', label: 'Oferty', icon: DollarSign },
  { id: 'ekipa', label: 'Ekipa', icon: Users },
  { id: 'flota', label: 'Flota', icon: Truck },
  { id: 'historia-prz', label: 'Historia przebiegów', icon: History },
  { id: 'powiadomienia', label: 'Powiadomienia', icon: Bell },
  { id: 'godziny', label: 'Godziny pracy', icon: Clock },
  { id: 'finanse', label: 'Finanse', icon: BarChart2 },
  { id: 'historia', label: 'Historia', icon: FileText },
]

function StatusDropdown({ value, options, onChange, colorMap }) {
  const [open, setOpen] = useState(false)
  const color = colorMap?.[value] || '#6b7280'
  return (
    <div className="ed-status-dd" style={{ position: 'relative' }}>
      <button
        className="ed-status-btn"
        style={{ background: color, color: '#fff' }}
        onClick={() => setOpen(!open)}
      >
        {value} <ChevronDown size={12} />
      </button>
      {open && (
        <div className="ed-status-menu">
          {options.map(opt => (
            <button
              key={opt}
              className={`ed-status-opt ${opt === value ? 'ed-status-opt--active' : ''}`}
              onClick={() => { onChange(opt); setOpen(false) }}
            >
              {opt === value && <Check size={12} />}
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function GodzinyPracyTab({ schedule }) {
  const stages = schedule || [
    { name: 'Montaż', color: '#22c55e' },
    { name: 'Event', color: '#3b82f6' },
    { name: 'Demontaż', color: '#a855f7' },
  ]
  const COLS = ['Alerty','Użytkownik','Dział','Początek','Koniec','Liczba godzin','Stawka','Role','Status']
  return (
    <div className="ed-godziny">
      <div className="ed-godziny-toolbar">
        <button className="btn btn-primary" style={{ fontSize: 12 }}>
          <Check size={13} /> Oznacz rozliczenie jako gotowe do weryfikacji
        </button>
        <div className="ed-search-row">
          <input placeholder="Wpisz nazwę" style={{ width: 200 }} />
          <button style={{ background: 'none', color: 'var(--red)', border: 'none', cursor: 'pointer', padding: '0 4px' }}>
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="ed-godziny-link">Godziny pracy</div>
      <div className="ed-godziny-add-btn-wrap">
        <button className="btn btn-primary" style={{ fontSize: 12 }}>
          <Plus size={13} /> Dodaj godziny pracownikowi
        </button>
      </div>
      {stages.map(stage => (
        <div key={stage.name} className="ed-godziny-stage">
          <div className="ed-godziny-stage-header" style={{ borderLeftColor: stage.color }}>
            <span style={{ color: stage.color }}>{stage.name}</span>
            <select style={{ marginLeft: 10, fontSize: 12, width: 'auto', height: 28 }}>
              <option>Zmień status wybranym</option>
            </select>
          </div>
          <table className="ed-godziny-table">
            <thead><tr>{COLS.map(c => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>
              <tr><td colSpan={COLS.length} className="ed-empty">Brak wyników.</td></tr>
            </tbody>
          </table>
        </div>
      ))}
      <div className="ed-godziny-stage">
        <div className="ed-godziny-stage-header" style={{ borderLeftColor: 'var(--green-primary)' }}>
          <span className="ed-koszty-link">Koszty</span>
          <select style={{ marginLeft: 10, fontSize: 12, width: 'auto', height: 28 }}>
            <option>Zmień status wybranym</option>
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '6px 0' }}>
          <button className="btn btn-primary" style={{ fontSize: 12 }}>
            <Plus size={13} /> Dodaj koszt pracownikowi
          </button>
        </div>
        <table className="ed-godziny-table">
          <thead><tr>
            <th><input type="checkbox" /></th>
            {['Użytkownik','Nazwa','Sekcja','Dział','Początek','Koniec','Kwota','Status'].map(c=><th key={c}>{c}</th>)}
          </tr></thead>
          <tbody>
            <tr><td colSpan={9} className="ed-empty">Brak wyników.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function EkipaTab({ event }) {
  return (
    <div className="ed-ekipa">
      <div className="ed-ekipa-toolbar">
        <button className="btn btn-primary" style={{ fontSize: 12 }}>
          <Plus size={13} /> Dodaj ekipę
        </button>
        <button className="btn" style={{ background: '#f97316', color: '#fff', fontSize: 12 }}>
          <Plus size={13} /> Dodaj zapotrzebowanie
        </button>
        <button className="btn btn-ghost" style={{ fontSize: 12 }}>
          <Bell size={13} /> Wyślij powiadomienia do ekipy teraz
        </button>
        <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="checkbox" /> Automatyczne wysyłanie powiadomień do ekipy
        </label>
      </div>
      <div className="ed-ekipa-fast">
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Szybkie dodawanie:</span>
        <select style={{ width: 180, height: 30, fontSize: 12 }}><option>wybierz pracownika</option></select>
        <input placeholder="Wyszukaj" style={{ width: 200, height: 30 }} />
        <button className="btn btn-primary" style={{ fontSize: 12, height: 30 }}>
          Zobacz jak działa planowanie
        </button>
      </div>
      {(event?.schedule || []).map(stage => (
        <div key={stage.id} className="ed-ekipa-stage">
          <div className="ed-ekipa-stage-header">
            <div className="ed-stage-icon" style={{ background: stage.color }}>
              <Users size={14} />
            </div>
            <div>
              <div className="ed-stage-name">{stage.name}</div>
              <div className="ed-stage-dates" style={{ color: stage.color }}>
                Od: {stage.dateFrom} &nbsp; Do: {stage.dateTo}
              </div>
            </div>
            <div className="ed-stage-stats">
              <Users size={12} /> Zapotrzebowanie: 0 os. &nbsp;
              <Users size={12} /> Dodanych: 0 os.
            </div>
          </div>
          <div className="ed-stage-actions">
            <button className="btn btn-ghost" style={{ fontSize: 12 }}>
              <Plus size={12} /> Dodaj / kopiuj zapotrzebowanie
            </button>
            <button className="btn btn-ghost" style={{ fontSize: 12 }}>
              <MessageCircle size={12} /> Chat
            </button>
            <button className="btn btn-ghost" style={{ fontSize: 12 }}>
              <Bell size={12} /> Wiadomość
            </button>
          </div>
        </div>
      ))}
      <div className="ed-ekipa-table-wrap">
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <input placeholder="Użytkownicy..." style={{ width: 160, height: 30 }} />
          <select style={{ width: 200, height: 30, fontSize: 12 }}><option>Widok bez podziału na etapy</option></select>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}><MessageCircle size={12} /> Dodaj komentarz</button>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>Eksportuj</button>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>Dodaj/Edytuj pracowników spoza systemu</button>
        </div>
        <table className="ed-godziny-table">
          <thead><tr>
            <th><input type="checkbox" /></th>
            {['#','Nazwisko','Imię','Telefon','Adres e-mail','Rola na evencie','Czas pracy'].map(c=><th key={c}>{c}</th>)}
          </tr></thead>
          <tbody><tr><td colSpan={8} className="ed-empty">Brak wyników.</td></tr></tbody>
        </table>
      </div>
    </div>
  )
}

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = EVENTS_LIST.find(e => e.id === +id) || EVENTS_LIST[1]

  const [activeTab, setActiveTab] = useState('chat')
  const [status, setStatus] = useState(event.status)
  const [statusKs, setStatusKs] = useState(event.statusKsiegowosc)
  const [statusMag, setStatusMag] = useState(event.statusMagazyn)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [editingStage, setEditingStage] = useState(null)
  const [chatMsg, setChatMsg] = useState('')
  const [chatMessages, setChatMessages] = useState([])

  const schedule = event.schedule || []

  const handleSendChat = () => {
    if (!chatMsg.trim()) return
    setChatMessages(prev => [...prev, { id: Date.now(), text: chatMsg, author: 'Karol L8 Studio', time: new Date().toLocaleString('pl') }])
    setChatMsg('')
  }

  return (
    <div className="event-detail animate-in">
      {/* Top action bar */}
      <div className="ed-topbar">
        <button className="ed-chat-btn">
          <MessageCircle size={14} /> Chat wydarzenia
        </button>
        <button className="ed-duplikuj-btn">
          <Copy size={14} /> Duplikuj
        </button>
        <div style={{ flex: 1 }} />
        <button className="ed-edit-btn" onClick={() => navigate(`/wydarzenia/${id}/edytuj`)}>
          <Edit size={14} />
        </button>
        <button className="ed-close-btn" onClick={() => navigate('/wydarzenia')}>
          <X size={14} />
        </button>
      </div>

      {/* Main 3-column layout */}
      <div className="ed-body">
        {/* LEFT panel */}
        <div className="ed-left">
          <div className="ed-event-title">
            <h2>{event.name}</h2>
            <span className="ed-event-id">ID: {event.code}</span>
          </div>
          <div className="ed-meta-row">Miesiąc księgowania:</div>
          <div className="ed-meta-row">
            <span className="ed-meta-label">Klient:</span>
            <Link to="/kontrahenci" className="ed-meta-link">{event.client}</Link>
            {event.clientId && <button className="ed-eye-btn"><Eye size={12} /></button>}
          </div>
          {event.contact && (
            <div className="ed-meta-row">
              <span className="ed-meta-label">Osoba kontaktowa:</span>
              <span>{event.contact}</span>
              <a href={`tel:${event.phone}`} className="ed-phone-badge">
                <Phone size={11} /> {event.phone}
              </a>
              <a href={`mailto:${event.email}`} className="ed-email-badge">
                <Mail size={11} /> {event.email}
              </a>
            </div>
          )}
          <div className="ed-meta-row">
            <span className="ed-meta-label">Termin:</span>
            <span>{event.dateFrom}, {event.dateTo?.split(' ')[1]}</span>
          </div>

          <div className="ed-meta-section">
            <div className="ed-meta-label">Dojazd</div>
            <div className="ed-dojazd">
              <div>MAGAZYN:</div>
              {event.placeAddress && <div>MIEJSCE: {event.placeAddress}</div>}
            </div>
          </div>

          <div className="ed-status-row">
            <span className="ed-meta-label">STATUS:</span>
            <StatusDropdown
              value={status}
              options={STATUS_OPTIONS}
              onChange={setStatus}
              colorMap={STATUS_COLORS}
            />
            <button className="ed-historia-btn">
              <List size={12} /> Historia
            </button>
          </div>

          <div className="ed-sub-statuses">
            <div className="ed-sub-label">Pozostałe statusy:</div>
            <div className="ed-sub-row">
              <span>Księgowość:</span>
              <select value={statusKs} onChange={e => setStatusKs(e.target.value)} className="ed-sub-select">
                {STATUS_KSIEGOWOSC.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="ed-sub-row">
              <span>Magazyn:</span>
              <select value={statusMag} onChange={e => setStatusMag(e.target.value)} className="ed-sub-select">
                {STATUS_MAGAZYN.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="ed-tasks-status">
            <div className="ed-meta-label">Status zadań w wydarzeniu:</div>
            <div className="ed-progress-bar"><div style={{ width: '0%' }} /></div>
            <div className="ed-tasks-text">Status - wykonano 0%. Jest to 0/0 zadań.</div>
          </div>

          <div className="ed-creator">Utworzył wydarzenie:<br /><strong>Karol L8 Studio</strong></div>
        </div>

        {/* CENTER panel */}
        <div className="ed-center">
          <div className="ed-manager-card">
            <div className="ed-manager-avatar" />
            <div className="ed-manager-info">
              <div className="ed-manager-name">Karol L8 Studio</div>
              <div className="ed-manager-role">EventManager</div>
            </div>
            <div className="ed-manager-email">
              <Mail size={12} /> karol@l8studio.pl
            </div>
          </div>

          <div className="ed-logistics">
            <div className="ed-logistics-row">
              <Truck size={16} className="ed-log-icon" style={{ color: '#22c55e' }} />
              <div className="ed-log-text">
                <div>Waga sprzętu: 0 kg</div>
                <div>Ładowność dodanej floty: - kg</div>
              </div>
              <span className="ed-log-status">Status: Ok</span>
            </div>
            <div className="ed-logistics-row">
              <Truck size={16} className="ed-log-icon" style={{ color: '#22c55e' }} />
              <div className="ed-log-text">
                <div>Objętość sprzętu: 0.0 m³</div>
                <div>Objętość dodanej floty: - m³</div>
              </div>
              <span className="ed-log-status">Status: Ok</span>
            </div>
            <div className="ed-logistics-row">
              <Zap size={16} className="ed-log-icon" style={{ color: '#f59e0b' }} />
              <div className="ed-log-text">Pobór prądu sprzętu: 0 W</div>
            </div>
          </div>

          {event.place && (
            <div className="ed-place-card">
              <div className="ed-place-img-placeholder">
                <div className="ed-place-img-inner">🏰</div>
              </div>
              <div className="ed-place-right">
                <div className="ed-place-sections">
                  <div className="ed-place-section">
                    <span className="ed-meta-label">Plany techniczne</span>
                    <button className="ed-add-mini"><Plus size={11} /> Dodaj</button>
                  </div>
                  <div className="ed-place-section">
                    <span className="ed-meta-label">Panoramy</span>
                    <button className="ed-add-mini"><Plus size={11} /> Dodaj</button>
                  </div>
                </div>
                <Link to="/miejsca" className="ed-place-link">
                  {event.place} <Eye size={12} />
                </Link>
                <button className="btn btn-ghost" style={{ fontSize: 12, marginTop: 6 }}>Pokaż info</button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT panel — schedule */}
        <div className="ed-right">
          <div className="ed-ekipa-header">
            <span>Ekipa</span>
            <div className="ed-ekipa-avatar-placeholder" />
          </div>

          <div className="ed-schedule-panel">
            <div className="ed-schedule-title">
              <span>Harmonogram</span>
              <button className="btn btn-primary" style={{ fontSize: 11 }} onClick={() => { setEditingStage(null); setShowScheduleModal(true) }}>
                <Plus size={12} /> Dodaj etap
              </button>
            </div>
            {schedule.map(stage => (
              <div key={stage.id} className="ed-schedule-item">
                <div className="ed-stage-pill" style={{ background: stage.color }}>
                  <span className="ed-stage-prefix">{stage.prefix}</span>
                </div>
                <div className="ed-stage-info">
                  <div className="ed-stage-name">{stage.name}</div>
                  <div className="ed-stage-time">{stage.dateFrom} → {stage.dateTo}</div>
                </div>
                <div className="ed-stage-btns">
                  <button className="ed-stage-btn" onClick={() => { setEditingStage(stage); setShowScheduleModal(true) }}>
                    <Edit size={12} />
                  </button>
                  <button className="ed-stage-btn ed-stage-btn--del"><X size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ed-tabs-bar">
        {TABS.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className={`ed-tab ${activeTab === tab.id ? 'ed-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="ed-tab-badge">{tab.badge}</span>
              )}
              {tab.dropdown && <ChevronDown size={11} />}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="ed-tab-content">
        {activeTab === 'chat' && (
          <div className="ed-chat">
            <div className="ed-chat-info"><span>ℹ</span></div>
            <div className="ed-chat-messages">
              {chatMessages.map(m => (
                <div key={m.id} className="ed-chat-msg">
                  <strong>{m.author}</strong> <span className="ed-chat-time">{m.time}</span>
                  <div>{m.text}</div>
                </div>
              ))}
            </div>
            <div className="ed-chat-input-wrap">
              <textarea
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                placeholder="Napisz wiadomość..."
                rows={3}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendChat())}
              />
              <div className="ed-chat-bottom">
                <Bell size={14} />
                <div className="ed-chat-participants">Uczestnicy: <button className="ed-add-mini"><Plus size={11} /></button></div>
                <button className="btn btn-primary" style={{ fontSize: 12, marginLeft: 'auto' }} onClick={handleSendChat}>
                  Wyślij
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'godziny' && <GodzinyPracyTab schedule={event.schedule} />}
        {activeTab === 'ekipa' && <EkipaTab event={event} />}
        {['zadania','szczegoly','sprzet','sprzet-zewn','zalaczniki','oferty','flota','historia-prz','powiadomienia','finanse','historia'].includes(activeTab) && (
          <div className="ed-tab-placeholder">
            <span>Zawartość zakładki <strong>{TABS.find(t=>t.id===activeTab)?.label}</strong> — wkrótce</span>
          </div>
        )}
      </div>

      {/* Schedule modal */}
      {showScheduleModal && (
        <ScheduleModal
          stage={editingStage}
          onClose={() => setShowScheduleModal(false)}
          onSave={(data) => { console.log('save stage', data); setShowScheduleModal(false) }}
        />
      )}
    </div>
  )
}
