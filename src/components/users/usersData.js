export const USERS_LIST = [
  { id: 1, imie: 'Igor', nazwisko: 'Dutczak', email: 'igor@l8studio.pl', typ: 'Pracownik', rola: 'User', stanowisko: 'Technik', aktywny: true, widocznyPlanowanie: true, widocznyRozliczenia: true },
  { id: 2, imie: 'Marcel', nazwisko: 'Fikuski', email: 'marcel@l8studio.pl', typ: 'Pracownik', rola: 'User', stanowisko: '', aktywny: true, widocznyPlanowanie: true, widocznyRozliczenia: true },
  { id: 3, imie: 'Anna', nazwisko: 'Kowalska', email: 'anna@l8studio.pl', typ: 'Pracownik', rola: 'User', stanowisko: '', aktywny: true, widocznyPlanowanie: true, widocznyRozliczenia: true },
  { id: 4, imie: 'Karol', nazwisko: 'L8 Studio', email: 'karol@l8studio.pl', typ: 'Superuser', rola: 'Admin', stanowisko: 'Project Manager', aktywny: true, widocznyPlanowanie: true, widocznyRozliczenia: true },
  { id: 5, imie: 'Manager', nazwisko: 'Project', email: 'manager@l8studio.pl', typ: 'Pracownik', rola: 'Manager', stanowisko: 'Project Manager', aktywny: true, widocznyPlanowanie: true, widocznyRozliczenia: true },
]

export const ROZLICZENIA_DATA = [
  { id: 1, imie: 'Igor', nazwisko: 'Dutczak', zaplanowane: '12:00', dodane: '79:00', pensja: 5000, prowizja: 0, diety: 0, koszty: 0, premie: 0, suma: 5000, sumaZaakc: 5000, brutto: 0, zaplacono: 0, pozostalo: 0, alert: true },
  { id: 2, imie: 'Marcel', nazwisko: 'Fikuski', zaplanowane: '0:00', dodane: '0:00', pensja: 0, prowizja: 0, diety: 0, koszty: 0, premie: 0, suma: 0, sumaZaakc: 0, brutto: 0, zaplacono: 0, pozostalo: 0, alert: false },
  { id: 3, imie: 'Anna', nazwisko: 'Kowalska', zaplanowane: '0:00', dodane: '0:00', pensja: 0, prowizja: 0, diety: 0, koszty: 0, premie: 0, suma: 0, sumaZaakc: 0, brutto: 0, zaplacono: 0, pozostalo: 0, alert: false },
  { id: 4, imie: 'Karol', nazwisko: 'L8 Studio', zaplanowane: '43:00', dodane: '0:00', pensja: 0, prowizja: 0, diety: 0, koszty: 0, premie: 0, suma: 0, sumaZaakc: 0, brutto: 0, zaplacono: 0, pozostalo: 0, alert: false },
  { id: 5, imie: 'Manager', nazwisko: 'Project', zaplanowane: '0:00', dodane: '0:00', pensja: 0, prowizja: 0, diety: 0, koszty: 0, premie: 0, suma: 0, sumaZaakc: 0, brutto: 0, zaplacono: 0, pozostalo: 0, alert: false },
]

export const CHRONOLOGIA_DATA = [
  {
    id: 1, user: 'Igor Dutczak', data: '23.05.2026, 20:52', avatarSub: 'Igor\nDutczak',
    typ: 'Czas pracy', od: '14.05.2026, 09:00', do: '17.05.2026, 16:00',
    etap: 'Montaż dzień 2', stawka: 'Godzinowa (500,00/8h) PLN',
    dodanyCzas: '3 dni, 7 godzin', wydarzenie: 'Festiwal Muzyki Folkowej',
    manager: 'Support Newsystems', kwota: 5000, status: 'Oczekujące', alert: true,
  },
]

export const GRUPY_PROWIZYJNE = [
  { id: 1, nazwa: 'Project Manager', team: '-', poziom: 3, wartosc: 0.00, typ: 'Od zysku' },
]

export const STAWKI = [
  { id: 1, nazwa: '8 godzinna', typ: 'Godzinowa', waluta: 'PLN', liczbaGodzin: 8 },
]

export const STATUSY_ROZLICZEN = [
  { id: 1, nazwa: 'Oczekujące', kolor: '#f97316', wlicza: false },
  { id: 2, nazwa: 'Zaakceptowane', kolor: '#22c55e', wlicza: true },
  { id: 3, nazwa: 'Odrzucone', kolor: '#ef4444', wlicza: false },
]

export const MONTHS_PL = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']
