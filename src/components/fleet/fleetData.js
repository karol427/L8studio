export const POJAZDY = [
  {
    id: 1, nazwa: 'FIAT DUCATO', opis: '', nrRej: 'PY79162', nrVin: '',
    typ: 'Firmowy', dataPrzegladu: null, ocWazneDo: null,
    status: 'Sprawny', przebieg: null, modelId: 2,
    zdjecie: null,
  },
]

export const MODELE = [
  { id: 1, nazwa: 'Transpor mały ciężarowy', ladownosc: null, objetosc: null, pasazerowie: null,
    stawki: [
      { id: 1, nazwa: 'KM', cena: 7.00, koszt: 6.00, waluta: 'PLN', jednostka: 'KM', domyslna: true },
      { id: 2, nazwa: 'Ryczałt', cena: 500.00, koszt: 400.00, waluta: 'PLN', jednostka: 'Dzień', domyslna: false },
    ],
    tlumaczenia: [{ id: 1, nazwa: 'Big Car', jezyk: 'Angielski' }],
  },
  { id: 2, nazwa: 'Samochód ciężarowy', ladownosc: 3500, objetosc: 30.00, pasazerowie: 3, stawki: [], tlumaczenia: [] },
  { id: 3, nazwa: 'Transport osobowy', ladownosc: null, objetosc: null, pasazerowie: null, stawki: [], tlumaczenia: [] },
]

export const PRZEJAZDY = [
  { id: 1, pojazd: 'FIAT DUCATO', kierowca: 'Igor Dutczak', wydarzenie: 'HALO POLSAT', od: '2026-05-22 08:00', do: '2026-05-22 12:00', km: 145, koszt: 1015, status: 'Zaakceptowany' },
]

export const TYPY_POJAZDOW = ['Firmowy', 'Wynajęty', 'Prywatny']
export const STATUSY_POJAZDOW = ['Sprawny', 'W naprawie', 'Rezerwacja', 'Niedostępny']
export const JEDNOSTKI = ['KM', 'Dzień', 'Godzina', 'Ryczałt']
export const WALUTY = ['PLN', 'EUR', 'USD']
export const JEZYKI = ['Angielski', 'Niemiecki', 'Francuski', 'Rosyjski']
