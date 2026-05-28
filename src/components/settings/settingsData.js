export const TABS_MAIN = [
  'Dane firmy', 'Działy firmy', 'Rola ne wydarzeniu', 'Oferty',
  'Finanse', 'Powiadomienia', 'Uprawnienia', 'Indywidualne ustawienia',
  'Personalizacja', 'Języki', 'Firmy', 'Cross rental', 'Wydania/Przyjęcia sprzętu'
]

export const SIDEBAR_ITEMS = [
  { label: 'Ustawienia', path: '/ustawienia' },
  { label: 'Dodatkowe pola w wydarzeniu', path: '/ustawienia/dodatkowe-pola' },
  { label: 'Rodzaje wydarzeń', path: '/ustawienia/rodzaje-wydarzen' },
  { label: 'Typy wydarzeń', path: '/ustawienia/typy-wydarzen' },
  { label: 'Statusy wydarzeń', path: '/ustawienia/statusy-wydarzen' },
  { label: 'Dodatkowe statusy wydarzeń', path: '/ustawienia/dodatkowe-statusy' },
  { label: 'Statusy grup sprzętowych', path: '/ustawienia/statusy-grup' },
  { label: 'Statusy wypożyczeń', path: '/ustawienia/statusy-wypozyczen' },
  { label: 'Statusy sprzętu', path: '/ustawienia/statusy-sprzetu' },
  { label: 'Statusy ofert', path: '/ustawienia/statusy-ofert' },
  { label: 'Schematy Ofert', path: '/ustawienia/schematy-ofert' },
  { label: 'Foldery załączników w sprzęcie', path: '/ustawienia/foldery-zalacznikow' },
  { label: 'Domyślne harmonogramy', path: '/ustawienia/harmonogramy' },
  { label: 'Schematy grup sprzętowych', path: '/ustawienia/schematy-grup' },
  { label: 'Statusy zadań', path: '/ustawienia/statusy-zadan' },
  { label: 'Typy zadań', path: '/ustawienia/typy-zadan' },
]

export const DODATKOWE_POLA = [
  { id: 1, nazwa: 'Elektryk', typ: 'Pole tekstowe krótkie', kolumna: false, widoczny: true },
  { id: 2, nazwa: 'Zapotrzebowanie prądowe', typ: 'Pole tekstowe krótkie', kolumna: false, widoczny: true },
]

export const RODZAJE_WYDARZEN = [
  { id: 1, nazwa: 'Koncert' },
  { id: 2, nazwa: 'Piknik' },
  { id: 3, nazwa: 'Wesele' },
]

export const TYPY_WYDARZEN = [
  { id: 1, nazwa: 'Wydarzenie', widok: 'Widok rozbudowany' },
  { id: 2, nazwa: 'Prace magazynowe', widok: 'Widok uproszczony' },
  { id: 3, nazwa: 'Wizja lokalna', widok: 'Widok uproszczony' },
]

export const STATUSY_WYDARZEN = [
  { id: 1, nazwa: 'Niepotwierdzony', kolor: '#f59e0b' },
  { id: 2, nazwa: 'Potwierdzony', kolor: '#22c55e' },
  { id: 3, nazwa: 'Gotowy do zafakturowania', kolor: '#3b82f6' },
  { id: 4, nazwa: 'Faktura wystawiona', kolor: '#8b5cf6' },
  { id: 5, nazwa: 'Zamknięty', kolor: '#6b7280' },
  { id: 6, nazwa: 'Anulowana Impreza', kolor: '#ef4444' },
]

export const STATUSY_OFERT = [
  { id: 1, nazwa: 'Nowa', kolor: '#14b8a6' },
  { id: 2, nazwa: 'Zaakceptowana', kolor: '#22c55e' },
  { id: 3, nazwa: 'Oferta przegrana', kolor: '#ef4444' },
]

export const SCHEMATY_OFERT = [
  { id: 1, nazwa: 'Schemat podstawowy' },
  { id: 2, nazwa: 'Ceny w Euro' },
]

export const FOLDERY_ZALACZNIKOW = [
  { id: 1, nazwa: 'Opisy' },
  { id: 2, nazwa: 'Zdjęcia sprzętów' },
]

export const HARMONOGRAMY = [
  { id: 1, nazwa: 'Event dwudniowy' },
  { id: 2, nazwa: 'Mały Event' },
]

export const DZIALY_FIRMY = [
  { id: 1, nazwa: 'Multimedia', kolor: '#ff0000', aktywny: true },
  { id: 2, nazwa: 'Oświetlenie', kolor: '#00ff00', aktywny: true },
  { id: 3, nazwa: 'Scena', kolor: '#0000ff', aktywny: true },
]

export const ROLE_NA_WYDARZENIU = [
  { id: 1, nazwa: 'Technik oświetlenia', wymagajZgodnosci: false, stawka: '-' },
  { id: 2, nazwa: 'Realizator Oświetlenia', wymagajZgodnosci: true, stawka: '-' },
  { id: 3, nazwa: 'Technik multimediów', wymagajZgodnosci: false, stawka: '-' },
  { id: 4, nazwa: 'Realizator multimedia', wymagajZgodnosci: true, stawka: '-' },
  { id: 5, nazwa: 'Technik nagłośnienia', wymagajZgodnosci: false, stawka: '-' },
  { id: 6, nazwa: 'Realizator nagłośnienia', wymagajZgodnosci: false, stawka: '-' },
  { id: 7, nazwa: 'Operator Kamery', wymagajZgodnosci: true, stawka: '-' },
  { id: 8, nazwa: 'Koordynator', wymagajZgodnosci: true, stawka: '-' },
  { id: 9, nazwa: 'Technik scenografi', wymagajZgodnosci: false, stawka: '-' },
]

export const FIRMY = [
  { id: 1, nazwa: 'L8 Studio', adres: '', kodPocztowy: '', miejscowosc: '', nip: '', logoUrl: null, glowna: true },
  { id: 2, nazwa: 'Firma ABC Sp. z o.o.', adres: 'Ulica 63', kodPocztowy: '00-001', miejscowosc: 'Miasto 1', nip: '456-098-54-32', glowna: false },
  { id: 3, nazwa: 'Nowoczesna Firma S.A.', adres: 'Ulica 15', kodPocztowy: '02-502', miejscowosc: 'Łomianki', nip: '456-987-34-56', glowna: false },
]

export const SEGMENTY_OFERT = [
  { nazwa: 'TRANSPORT', kolor: '#6d9eeb', kolorCzcionki: '' },
  { nazwa: 'OBSŁUGA', kolor: '#6d9eeb', kolorCzcionki: '' },
  { nazwa: 'INNE', kolor: '#c9daf8', kolorCzcionki: '' },
  { nazwa: 'MULTIMEDIA', kolor: '#e6b8af', kolorCzcionki: '' },
  { nazwa: 'OŚWIETLENIE', kolor: '#e6b8af', kolorCzcionki: '' },
  { nazwa: 'NAGŁOŚNIENIE', kolor: '#e6b8af', kolorCzcionki: '' },
  { nazwa: 'SCENA', kolor: '#e6b8af', kolorCzcionki: '#e6b8af' },
  { nazwa: 'KONSTRUKCJE SCENICZNE', kolor: '#666666', kolorCzcionki: '' },
  { nazwa: 'OKABLOWANIE PRĄDOWE I ROZDZIELNIE', kolor: '#e6b8af', kolorCzcionki: '' },
  { nazwa: 'INNE', kolor: '#e6b8af', kolorCzcionki: '' },
  { nazwa: 'USŁUGI', kolor: '#e6b8af', kolorCzcionki: '#000000' },
  { nazwa: 'SCENOGRAFIA', kolor: '#e6b8af', kolorCzcionki: '#000000' },
  { nazwa: 'SALA 1', kolor: '#e6b8af', kolorCzcionki: '' },
]

export const GRUPY_UPRAWNIEN = [
  { id: 1, nazwa: 'Administrator (SU)', typ: 'SU' },
  { id: 2, nazwa: 'Project Managers (SU)', typ: 'SU' },
  { id: 3, nazwa: 'Technicy (U)', typ: 'U' },
  { id: 4, nazwa: 'Technik minimum (U)', typ: 'U' },
]

export const UPRAWNIENIA_LIST = [
  'Kokpit', 'Kalendarz', 'Wydarzenia', 'Kontrahenci', 'Miejsca',
  'Magazyn', 'Serwis', 'Użytkownicy', 'Flota', 'Ustawienia',
  'Statystyki', 'Oferty', 'Zadania', 'Rozliczenia', 'Finanse',
  'Toolbox', 'Chat',
]
