import { Construction } from 'lucide-react'
import './PlaceholderPage.css'

export default function PlaceholderPage({ title, description, icon: Icon = Construction }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-content">
        <div className="placeholder-icon">
          <Icon size={40} />
        </div>
        <h1 className="placeholder-title">{title}</h1>
        <p className="placeholder-desc">
          {description || 'Ten moduł jest w trakcie budowy. Wkrótce zostanie uruchomiony.'}
        </p>
        <div className="placeholder-status">
          <span className="status-dot green" />
          <span>Moduł zaplanowany do wdrożenia</span>
        </div>
      </div>
    </div>
  )
}
