import { EVENTS_LIST } from '../events/eventsData'

export const CALENDAR_EVENTS = [
  ...EVENTS_LIST.map(ev => ({
    id: ev.id,
    name: ev.name,
    code: ev.code,
    client: ev.client,
    manager: ev.eventManager,
    status: ev.status,
    type: 'event',
    stages: ev.schedule || [
      { name: 'Montaż', prefix: 'MON', color: '#22c55e', dateFrom: ev.dateFrom, dateTo: ev.dateTo },
    ],
    dateFrom: ev.dateFrom,
    dateTo: ev.dateTo,
  })),
  {
    id: 101,
    name: 'Urlop: Anna Kowalska',
    type: 'urlop',
    color: '#bfdbfe',
    textColor: '#1e3a5f',
    dateFrom: '2026-04-27 00:00',
    dateTo: '2026-05-07 23:59',
    person: 'Anna Kowalska',
  },
  {
    id: 102,
    name: 'Urlop: Waldek Marko',
    type: 'urlop',
    color: '#fef9c3',
    textColor: '#713f12',
    dateFrom: '2026-05-22 00:00',
    dateTo: '2026-06-05 23:59',
    person: 'Waldek Marko',
  },
  {
    id: 103,
    name: 'spotkanie z Klientem',
    type: 'task',
    color: '#fef3c7',
    textColor: '#92400e',
    dateFrom: '2026-05-13 10:00',
    dateTo: '2026-05-13 12:00',
    person: 'Karol L8 Studio',
  },
]

export const STAGE_COLORS = {
  'MON': '#22c55e',
  'EVE': '#3b82f6',
  'DEM': '#a855f7',
  'MON2': '#16a34a',
  'EVE2': '#2563eb',
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfWeek(year, month) {
  let d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

export function parseDate(str) {
  if (!str) return null
  const [datePart] = str.split(' ')
  const [y, m, d] = datePart.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function dateToStr(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
}

export function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

export const MONTHS_PL = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']
export const DAYS_SHORT = ['pon.','wt.','śr.','czw.','pt.','sob.','niedz.']
