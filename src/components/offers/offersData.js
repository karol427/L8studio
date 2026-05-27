export const OFERTY_LIST = [
  {
    id: 18, nr: 18, nrGenerowany: 'O/2026/2', status: 'Nowa',
    nazwa: 'walki', klient: 'Bank Współczesny', klientNip: 'NIP:5262635506',
    wartosc: 0, koszt: 0, zysk: 0,
    miejsceEventu: 'DW Bełchatów, ul. Kilińskiego 4, Szklarska Poręba, Polska',
    eventManager: 'Karol L8 Studio', wyslano: '-', wydarzenie: '-',
    statusWyd: '-', dataSporzeadzenia: '2026-05-22', zaktualizowano: '2026-05-22 13:49:50',
    odDo: '02.12.2, 00:00 — 22.05.2026, 23:59',
    notatki: 1, schemat: 'Schemat podstawowy', schematHarmonogramu: 'Event dwudniowy',
    grupaCenowa: 'Imprezy w Polsce', kontakt: 'Mariusz Niezapominalski',
    kontaktTel: '245 678 456', kontaktEmail: 'mariusz@niezapominalski.pl',
    termin: '30.11-0001, 00:00 - 22.05.2026, 23:59', miejsce: 'DW Bełchatów',
    budzet: '', terminPlatnosci: 14, zaliczka: '', zaliczkaProc: 50,
    harmonogram: [
      { id:1, name:'Montaż', prefix:'MON', color:'#22c55e', od:'00.00.00 00:00', do:'22.05 13:50' },
      { id:2, name:'Montaż dzień 2', prefix:'MON', color:'#3b82f6', od:'00.00.00 00:00', do:'22.05 23:59' },
      { id:3, name:'Event', prefix:'EVE', color:'#f97316', od:'25.05 12', do:'.12' },
      { id:4, name:'Event 2', prefix:'EVE', color:'#eab308', od:'25.05 12', do:'.12' },
      { id:5, name:'Demontaż', prefix:'DEM', color:'#ef4444', od:'25.05 12', do:'.12' },
    ],
    historia: [
      { id:1, tresc:'Stworzono ofertę walki', user:'Karol L8 Studio', data:'2026-05-22 13:49:48' },
      { id:2, tresc:'Dodano etap harmonogramu Montaż Invalid date - 2026-05-22 13:50', user:'Karol L8 Studio', data:'2026-05-22 13:49:48' },
      { id:3, tresc:'Zmieniono harmonogram oferty.', user:'Karol L8 Studio', data:'2026-05-22 13:49:48' },
      { id:4, tresc:'Dodano etap harmonogramu Montaż dzień 2 Invalid date - 2026-05-22 23:59', user:'Karol L8 Studio', data:'2026-05-22 13:49:48' },
      { id:5, tresc:'Dodano etap harmonogramu Event -', user:'Karol L8 Studio', data:'2026-05-22 13:49:48' },
      { id:6, tresc:'Dodano etap harmonogramu Event 2 -', user:'Karol L8 Studio', data:'2026-05-22 13:49:48' },
      { id:7, tresc:'Dodano etap harmonogramu Demontaż -', user:'Karol L8 Studio', data:'2026-05-22 13:49:48' },
    ],
  },
  {
    id: 17, nr: 17, nrGenerowany: 'O/2026/1', status: 'Nowa',
    nazwa: '100 Lecie Szkoły', klient: 'KCEK',
    wartosc: 5640, koszt: 458, zysk: 5182,
    miejsceEventu: '', eventManager: 'Igor Dutczak', wyslano: '-',
    wydarzenie: '100 Lecie Szkoły', statusWyd: 'Niepotwierdzony',
    dataSporzeadzenia: '2026-04-17 14:06:21', zaktualizowano: '2026-04-17 15:51:40',
    odDo: '-', notatki: 1, schemat: 'Schemat podstawowy', harmonogram: [],
  },
]

export const STATUSY_OFERT_COLORS = {
  'Nowa': '#14b8a6',
  'Zaakceptowana': '#22c55e',
  'Oferta przegrana': '#ef4444',
}

export const OFERTA_TABS = [
  'Sprzęt', 'Obsługa', 'Transport', 'Podsumowanie', 'Koszty', 'Historia', 'Warunki zamówienia', 'Notatki'
]

export const KOSZTY_SECTIONS = [
  { nazwa: 'Inne koszty', kolor: '#f97316' },
  { nazwa: 'Sprzęt do wypożyczenia', kolor: '#14b8a6' },
  { nazwa: 'Materiały eksploatacyjne', kolor: '#f97316' },
  { nazwa: 'Pozycje dodatkowe spoza magazynu', kolor: '#14b8a6' },
  { nazwa: 'Obsługa', kolor: '#f97316' },
]

export const PDF_SAMPLE = {
  nazwa: '30 lecie Legnica - scenografia', nrOferty: '1742',
  dataSporzeadzenia: '2023-03-06', strona: 1,
  kierownikProjektu: 'Karol Dutczak', tel: '+48729911512', email: 'k.dutczak@djak.pl',
  klient: { nazwa: 'Incydentalny', nip: '', email: '', tel: '' },
  transport: [
    { nazwa: 'Samochód dostawczy', etap: 'Montaż', liczba: 1, przelicznik: '1.00 d', cena: 700, razem: 700 },
    { nazwa: 'Samochód osobowy', etap: 'Montaż', liczba: 1, przelicznik: '1.00 d', cena: 300, razem: 300 },
    { nazwa: 'Samochód dostawczy', etap: 'Demontaż', liczba: 1, przelicznik: '1.00 d', cena: 700, razem: 700 },
    { nazwa: 'Samochód osobowy', etap: 'Demontaż', liczba: 1, przelicznik: '1.00 d', cena: 300, razem: 300 },
  ],
  obsluga: [
    { nazwa: 'Technik Scenografii', etap: 'Montaż', cena: 800, liczba: 4, okres: '1.00', razem: 3200 },
    { nazwa: 'Scenograf', etap: 'Montaż', cena: 1000, liczba: 1, okres: '1.00 d', razem: 1000 },
    { nazwa: 'Technik Scenografii', etap: 'Demontaż', cena: 800, liczba: 4, okres: '1.00', razem: 3200 },
  ],
  inne: [
    { nazwa: 'Podesty sceniczne - scena', cena: 4000, liczba: 1, razem: 4000 },
    { nazwa: 'Wykładzina czarna welur', cena: 3200, liczba: 1, razem: 3200 },
    { nazwa: 'Podest mały', cena: 800, liczba: 1, razem: 800 },
    { nazwa: 'wykładzina niebieska rips expo hall + korytarz 60mb', cena: 2400, liczba: 1, razem: 2400 },
    { nazwa: 'Utylizacja', cena: 500, liczba: 1, razem: 500 },
    { nazwa: 'projekt scenograficzny', cena: 2500, liczba: 1, razem: 2500 },
  ],
}
