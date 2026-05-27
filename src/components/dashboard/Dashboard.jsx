import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronUp, ChevronDown, X, Plus, MessageCircle } from 'lucide-react'
import { todayEvents, upcomingEvents, activityFeed, statusItems } from '../../utils/mockData'
import './Dashboard.css'

function CollapsibleSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <h3>{title}</h3>
        <div className="dash-section-actions">
          <button onClick={() => setOpen(!open)} className="dash-icon-btn">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button className="dash-icon-btn">
            <X size={14} />
          </button>
        </div>
      </div>
      {open && <div className="dash-section-body">{children}</div>}
    </div>
  )
}

function EventTable({ events }) {
  if (!events.length) {
    return <p className="dash-empty">Brak wyników.</p>
  }
  return (
    <table className="dash-table">
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Wydarzenie</th>
          <th>Trwa</th>
        </tr>
      </thead>
      <tbody>
        {events.map(ev => (
          <tr key={ev.id}>
            <td>
              <Link to={`/wydarzenia/${ev.id}`} className="dash-event-link">
                {ev.name}
              </Link>
            </td>
            <td>{ev.type}</td>
            <td className="dash-date">
              Od: {ev.dateFrom}<br />
              Do: {ev.dateTo}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-main">
        {/* Dzisiaj */}
        <CollapsibleSection title="Dzisiaj">
          <EventTable events={todayEvents} />
        </CollapsibleSection>

        {/* Najbliższe wydarzenia */}
        <CollapsibleSection title="Najbliższe wydarzenia">
          <EventTable events={upcomingEvents} />
        </CollapsibleSection>

        {/* Najbliższe wydarzenia Twojego działu */}
        <CollapsibleSection title="Najbliższe wydarzenia Twojego działu">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Wydarzenie</th>
                <th>Trwa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="dash-empty-row">Brak wyników.</td>
              </tr>
            </tbody>
          </table>
        </CollapsibleSection>
      </div>

      <div className="dashboard-sidebar">
        {/* Aktualności */}
        <CollapsibleSection title="Aktualności">
          <div className="activity-feed">
            {activityFeed.map(item => (
              <div key={item.id} className="activity-item">
                <div className="activity-avatar">
                  <span>{item.initials}</span>
                </div>
                <div className="activity-body">
                  <p className="activity-text">
                    <span className="activity-user">{item.user}:</span>{' '}
                    {item.action}{' '}
                    <Link to="#" className="activity-link">{item.link}</Link>
                  </p>
                  <p className="activity-time">{item.timestamp}</p>
                  <p className="activity-attach">
                    Załączniki:{' '}
                    <button className="activity-add-btn">
                      <Plus size={11} /> Dodaj
                    </button>
                  </p>
                </div>
                <button className="activity-comment-btn">
                  <MessageCircle size={13} />
                  <span>Dodaj komentarz</span>
                </button>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Status */}
        <CollapsibleSection title="Status">
          <div className="status-list">
            {statusItems.map((item, i) => (
              <div key={i} className="status-item">
                <Link to={item.path} className="status-label">{item.label}</Link>
                <span className={`status-count status-count--${item.color}`}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  )
}
