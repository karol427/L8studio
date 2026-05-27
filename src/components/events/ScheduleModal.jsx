import { useState } from 'react'
import { X } from 'lucide-react'
import './ScheduleModal.css'

const COLORS = ['#22c55e','#3b82f6','#a855f7','#f97316','#ef4444','#ec4899','#14b8a6','#eab308']

export default function ScheduleModal({ stage, onClose, onSave }) {
  const [form, setForm] = useState({
    name: stage?.name || '',
    prefix: stage?.prefix || '',
    color: stage?.color || '#22c55e',
    required: 'Tak',
    reserveEquipment: 'Tak',
    dateRange: stage ? `${stage.dateFrom} - ${stage.dateTo}` : `${new Date().toISOString().slice(0,10)} 12 - ${new Date().toISOString().slice(0,10)} 12`,
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="sm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sm-modal">
        <div className="sm-header">
          <h3>Edytuj harmonogram</h3>
          <button className="sm-close" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="sm-body">
          <div className="sm-field">
            <label>Nazwa</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Nazwa" />
          </div>

          <div className="sm-field">
            <label>Prefix - wyświetlany w kalendarzu</label>
            <input value={form.prefix} onChange={e => set('prefix', e.target.value)} placeholder="Prefix" />
          </div>

          <div className="sm-field">
            <label>Kolor</label>
            <div className="sm-color-row">
              <div className="sm-color-preview" style={{ background: form.color }}>
                <X size={12} />
              </div>
              <div className="sm-color-swatches">
                {COLORS.map(c => (
                  <button
                    key={c}
                    className={`sm-swatch ${form.color === c ? 'sm-swatch--active' : ''}`}
                    style={{ background: c }}
                    onClick={() => set('color', c)}
                    type="button"
                  />
                ))}
              </div>
              <input value={form.color} onChange={e => set('color', e.target.value)} placeholder="Wybierz kolor..." style={{ flex: 1 }} />
            </div>
          </div>

          <div className="sm-field">
            <label>Pole obowiązkowe</label>
            <select value={form.required} onChange={e => set('required', e.target.value)}>
              <option>Tak</option>
              <option>Nie</option>
            </select>
          </div>

          <div className="sm-field">
            <label>Domyślnie rezerwuj sprzęt na ten etap</label>
            <select value={form.reserveEquipment} onChange={e => set('reserveEquipment', e.target.value)}>
              <option>Tak</option>
              <option>Nie</option>
            </select>
          </div>

          <div className="sm-field">
            <label>Czas trwania</label>
            <input value={form.dateRange} onChange={e => set('dateRange', e.target.value)} />
          </div>

          <button className="sm-save-btn" onClick={() => onSave(form)}>Dodaj</button>
        </div>
      </div>
    </div>
  )
}
