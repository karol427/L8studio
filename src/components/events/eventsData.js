export const EVENTS_LIST = [
  {
    id: 1,
    name: 'Festiwal Muzyki Klasycznej',
    code: 'E2025/12/5',
    client: 'ORANGE POLSKA SPÓŁKA AKCYJNA, Warszawa',
    clientId: 1,
    eventManager: 'Support Newsystems',
    dateFrom: '2026-05-29 09:00',
    dateTo: '2026-06-01 16:00',
    dateBooked: '2025-12-12 14:05:52',
    status: 'Niepotwierdzony',
    statusKsiegowosc: 'Faktura wystawiona',
    statusMagazyn: 'Nieprzygotowane',
    notes: 1,
  },
  {
    id: 2,
    name: 'HALO POLSAT',
    code: 'E2026/05/2',
    client: '4LeeLoo Patrycja, Warszawa',
    clientId: 2,
    eventManager: 'Karol L8 Studio',
    dateFrom: '2026-05-22 09:00',
    dateTo: '2026-05-29 17:00',
    dateBooked: '2026-05-22 12:00:35',
    status: 'Niepotwierdzony',
    statusKsiegowosc: 'Faktura wystawiona',
    statusMagazyn: 'Nieprzygotowane',
    notes: 0,
    contact: 'Patrycja Barton',
    phone: '690991844',
    email: 'patrycja@newsystems.pl',
    place: 'Dwór Korona Karkonoszy',
    placeAddress: 'Sosnówka k. Karpacza, ul. Liczyrzepy 20',
    schedule: [
      { id: 1, name: 'Montaż', prefix: 'MON', color: '#22c55e', dateFrom: '2026-05-22 09:00', dateTo: '2026-05-24 22:00', required: true, reserveEquipment: true },
      { id: 2, name: 'Event', prefix: 'EVE', color: '#3b82f6', dateFrom: '2026-05-24 10:00', dateTo: '2026-05-25 10:00', required: true, reserveEquipment: true },
      { id: 3, name: 'Demontaż', prefix: 'DEM', color: '#a855f7', dateFrom: '2026-05-25 09:00', dateTo: '2026-05-29 17:00', required: true, reserveEquipment: true },
    ],
  },
  {
    id: 3,
    name: 'Koncert na Wyścigach Konnych',
    code: 'E2023/08/3',
    client: 'Bar',
    clientId: 3,
    eventManager: 'Support Newsystems',
    dateFrom: '2026-05-21 09:00',
    dateTo: '2026-05-23 21:00',
    dateBooked: '2020-08-13 12:42:18',
    status: 'Potwierdzony',
    statusKsiegowosc: 'Faktura opłacona',
    statusMagazyn: 'Przygotowane do zapakowania',
    notes: 0,
  },
  {
    id: 4,
    name: 'Festiwal Muzyki Folkowej',
    code: 'E2023/08/4',
    client: 'ORANGE POLSKA SPÓŁKA AKCYJNA, Warszawa',
    clientId: 1,
    eventManager: 'Support Newsystems',
    dateFrom: '2026-05-14 09:00',
    dateTo: '2026-05-17 16:00',
    dateBooked: '2020-08-13 12:46:09',
    status: 'Zamknięty',
    statusKsiegowosc: 'Faktura opłacona',
    statusMagazyn: 'Przygotowane do zapakowania',
    notes: 1,
  },
]

export const STATUS_OPTIONS = [
  'Niepotwierdzony',
  'Potwierdzony',
  'Gotowy do zafakturowania',
  'Faktura wystawiona',
  'Zamknięty',
  'Anulowana Impreza',
]

export const STATUS_KSIEGOWOSC = [
  'Faktura wystawiona',
  'Faktura opłacona',
]

export const STATUS_MAGAZYN = [
  'Nieprzygotowane',
  'Sprawdzane',
  'Przygotowane do zapakowania',
]

export const EVENT_TYPES = ['Wydarzenie', 'Konferencja', 'Koncert', 'Targi', 'Bankiet', 'Inne']

export const SCHEDULE_TEMPLATES = [
  'Event dwudniowy',
  'Event jednodniowy',
  'Event trzydniowy',
  'Własny schemat',
]

export const CLIENTS = [
  { id: 1, name: 'ORANGE POLSKA SPÓŁKA AKCYJNA, Warszawa' },
  { id: 2, name: '4LeeLoo Patrycja, Warszawa' },
  { id: 3, name: 'Bar' },
  { id: 4, name: 'Bank Współczesny' },
]

export const PLACES = [
  { id: 1, name: 'Dwór Korona Karkonoszy', address: 'Sosnówka k. Karpacza, ul. Liczyrzepy 20' },
  { id: 2, name: 'Torwar', address: 'ul. Łazienkowska 6A, Warszawa' },
  { id: 3, name: 'Atlas Arena', address: 'al. Bandurskiego 7, Łódź' },
]

export const MANAGERS = [
  'Karol L8 Studio',
  'Support Newsystems',
  'Anna Kowalska',
]

export const MONTHS_PL = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']

export const STATUS_COLORS = {
  'Niepotwierdzony': '#f59e0b',
  'Potwierdzony': '#22c55e',
  'Gotowy do zafakturowania': '#3b82f6',
  'Faktura wystawiona': '#8b5cf6',
  'Zamknięty': '#6b7280',
  'Anulowana Impreza': '#ef4444',
}
