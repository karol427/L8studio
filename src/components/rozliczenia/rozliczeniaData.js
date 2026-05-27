// ─── PROJEKTY DO ROZLICZENIA ─────────────────────────────────────────────────
export const PROJEKTY_ROZLICZENIA = [
  {
    id: 1,
    nazwa: '30 lecie Legnica — scenografia',
    nrOferty: 'O/2026/1',
    klient: 'KCEK',
    eventManager: 'Karol Dutczak',
    dataEventu: '2026-05-15',
    dataZamkniecia: null,
    status: 'Otwarty',
    wartoscOferty: 22800,
    pozycjeOferty: [
      { id:'p1',  sekcja:'Transport', nazwa:'Samochód dostawczy — Montaż',    wycena:700,  jednostka:'szt' },
      { id:'p2',  sekcja:'Transport', nazwa:'Samochód osobowy — Montaż',      wycena:300,  jednostka:'szt' },
      { id:'p3',  sekcja:'Transport', nazwa:'Samochód dostawczy — Demontaż',  wycena:700,  jednostka:'szt' },
      { id:'p4',  sekcja:'Transport', nazwa:'Samochód osobowy — Demontaż',    wycena:300,  jednostka:'szt' },
      { id:'p5',  sekcja:'Obsługa',   nazwa:'Technik Scenografii — Montaż',   wycena:3200, jednostka:'os' },
      { id:'p6',  sekcja:'Obsługa',   nazwa:'Scenograf — Montaż',             wycena:1000, jednostka:'os' },
      { id:'p7',  sekcja:'Obsługa',   nazwa:'Technik Scenografii — Demontaż', wycena:3200, jednostka:'os' },
      { id:'p8',  sekcja:'Inne',      nazwa:'Podesty sceniczne — scena',      wycena:4000, jednostka:'szt' },
      { id:'p9',  sekcja:'Inne',      nazwa:'Wykładzina czarna welur',         wycena:3200, jednostka:'m2' },
      { id:'p10', sekcja:'Inne',      nazwa:'Podest mały',                    wycena:800,  jednostka:'szt' },
      { id:'p11', sekcja:'Inne',      nazwa:'Wykładzina niebieska rips expo', wycena:2400, jednostka:'m2' },
      { id:'p12', sekcja:'Inne',      nazwa:'Utylizacja',                     wycena:500,  jednostka:'szt' },
      { id:'p13', sekcja:'Inne',      nazwa:'Projekt scenograficzny',          wycena:2500, jednostka:'szt' },
    ],
  },
  {
    id: 2,
    nazwa: 'HALO POLSAT — event multimedialny',
    nrOferty: 'O/2026/2',
    klient: 'Bank Współczesny',
    eventManager: 'Karol L8 Studio',
    dataEventu: '2026-05-29',
    dataZamkniecia: null,
    status: 'Otwarty',
    wartoscOferty: 5640,
    pozycjeOferty: [
      { id:'q1', sekcja:'Sprzęt',    nazwa:'Barco HDX W20 (4 szt)',   wycena:2400, jednostka:'szt' },
      { id:'q2', sekcja:'Sprzęt',    nazwa:'E2 Mixer',                 wycena:800,  jednostka:'szt' },
      { id:'q3', sekcja:'Obsługa',   nazwa:'Technik multimedialny',    wycena:1200, jednostka:'os' },
      { id:'q4', sekcja:'Transport', nazwa:'Transport sprzętu',         wycena:700,  jednostka:'szt' },
      { id:'q5', sekcja:'Inne',      nazwa:'Kable i akcesoria',         wycena:540,  jednostka:'szt' },
    ],
  },
  {
    id: 3,
    nazwa: 'Koncert na Wyścigach Konnych',
    nrOferty: 'O/2026/3',
    klient: 'ORANGE POLSKA',
    eventManager: 'Igor Dutczak',
    dataEventu: '2026-05-21',
    dataZamkniecia: '2026-05-23',
    status: 'Zamknięty',
    wartoscOferty: 38500,
    pozycjeOferty: [
      { id:'r1', sekcja:'Sprzęt',    nazwa:'System nagłośnienia L-Acoustics', wycena:12000, jednostka:'kpl' },
      { id:'r2', sekcja:'Sprzęt',    nazwa:'Oświetlenie sceniczne',            wycena:8500,  jednostka:'kpl' },
      { id:'r3', sekcja:'Obsługa',   nazwa:'Realizator nagłośnienia',          wycena:2400,  jednostka:'os' },
      { id:'r4', sekcja:'Obsługa',   nazwa:'Technik oświetlenia',              wycena:1800,  jednostka:'os' },
      { id:'r5', sekcja:'Transport', nazwa:'Transport sprzętu x3',             wycena:3600,  jednostka:'szt' },
      { id:'r6', sekcja:'Inne',      nazwa:'Scena + kratownica',               wycena:6200,  jednostka:'kpl' },
      { id:'r7', sekcja:'Inne',      nazwa:'Agregat prądowy',                  wycena:4000,  jednostka:'szt' },
    ],
  },
]

// ─── KOSZTY RZECZYWISTE ───────────────────────────────────────────────────────
export const KOSZTY_RZECZYWISTE = [
  {
    id:'k1', typ:'faktura',
    dostawca:'RENTAL PRO Sp. z o.o.', nrDokumentu:'FV/2026/445',
    opis:'Wynajem podestów scenicznych', dataWystawienia:'2026-05-16',
    kwotaNetto:2400, vat:23, kwotaBrutto:2952,
    przypisania:[{ projektId:1, pozycjaId:'p8', udzialProc:100, kwota:2400 }],
  },
  {
    id:'k2', typ:'faktura',
    dostawca:'TEKSTYL EVENTS Anna Kowalska', nrDokumentu:'FV 05/2026',
    opis:'Wykładzina czarna welur 80m2 + wykładzina niebieska 60m2', dataWystawienia:'2026-05-17',
    kwotaNetto:5100, vat:23, kwotaBrutto:6273,
    przypisania:[
      { projektId:1, pozycjaId:'p9',  udzialProc:60, kwota:3060 },
      { projektId:1, pozycjaId:'p11', udzialProc:40, kwota:2040 },
    ],
  },
  {
    id:'k3', typ:'faktura',
    dostawca:'TRANSPORT CIĘŻKI Marek Nowak', nrDokumentu:'FV-2026-88',
    opis:'Transport scenografii Legnica x2 kursy', dataWystawienia:'2026-05-16',
    kwotaNetto:1100, vat:23, kwotaBrutto:1353,
    przypisania:[
      { projektId:1, pozycjaId:'p1', udzialProc:50, kwota:550 },
      { projektId:1, pozycjaId:'p3', udzialProc:50, kwota:550 },
    ],
  },
  {
    id:'k6', typ:'faktura',
    dostawca:'STUDIO SCENOGRAFII Jan Kowalski', nrDokumentu:'FS/2026/12',
    opis:'Projekt scenograficzny + nadzór', dataWystawienia:'2026-05-10',
    kwotaNetto:2200, vat:23, kwotaBrutto:2706,
    przypisania:[{ projektId:1, pozycjaId:'p13', udzialProc:100, kwota:2200 }],
  },
]

// ─── PRACOWNICY ───────────────────────────────────────────────────────────────
export const PRACOWNICY = [
  {
    id:'u1', imie:'Igor', nazwisko:'Dutczak', stanowisko:'Technik Scenografii',
    forma:'zlecenie', stawkaGodz:80, stawkaRyczalt:null,
    aktywny:true, email:'igor@l8studio.pl', tel:'600 100 200',
  },
  {
    id:'u2', imie:'Marcin', nazwisko:'Wiśniewski', stanowisko:'Technik Scenografii',
    forma:'zlecenie', stawkaGodz:80, stawkaRyczalt:null,
    aktywny:true, email:'marcin@l8studio.pl', tel:'600 100 201',
  },
  {
    id:'u3', imie:'Anna', nazwisko:'Kowalska', stanowisko:'Scenograf',
    forma:'dzielo', stawkaGodz:null, stawkaRyczalt:1000,
    aktywny:true, email:'anna@l8studio.pl', tel:'600 100 202',
  },
  {
    id:'u4', imie:'Łukasz', nazwisko:'Piotrowski', stanowisko:'Realizator nagłośnienia',
    forma:'zlecenie', stawkaGodz:100, stawkaRyczalt:null,
    aktywny:true, email:'lukasz@l8studio.pl', tel:'600 100 203',
  },
  {
    id:'u5', imie:'Michał', nazwisko:'Wiśniewski', stanowisko:'Technik oświetlenia',
    forma:'zlecenie', stawkaGodz:90, stawkaRyczalt:null,
    aktywny:true, email:'michal@l8studio.pl', tel:'600 100 204',
  },
  {
    id:'u6', imie:'Karol', nazwisko:'Dutczak', stanowisko:'Kierownik projektu / Event Manager',
    forma:'umowa', stawkaGodz:null, stawkaRyczalt:null,
    aktywny:true, email:'karol@l8studio.pl', tel:'729 911 512',
  },
]

// ─── WPISY PRACY PRACOWNIKÓW ──────────────────────────────────────────────────
export const WPISY_PRACY = [
  // Projekt 1 — Legnica
  {
    id:'w1', pracownikId:'u1', projektId:1, pozycjaId:'p5',
    opis:'Montaż scenografii', data:'2026-05-14',
    forma:'godz', stawka:80, liczbaGodzin:8, kwota:640,
    status:'Zatwierdzony',
  },
  {
    id:'w2', pracownikId:'u1', projektId:1, pozycjaId:'p7',
    opis:'Demontaż scenografii', data:'2026-05-15',
    forma:'godz', stawka:80, liczbaGodzin:6, kwota:480,
    status:'Zatwierdzony',
  },
  {
    id:'w3', pracownikId:'u2', projektId:1, pozycjaId:'p5',
    opis:'Montaż scenografii', data:'2026-05-14',
    forma:'godz', stawka:80, liczbaGodzin:8, kwota:640,
    status:'Zatwierdzony',
  },
  {
    id:'w4', pracownikId:'u3', projektId:1, pozycjaId:'p6',
    opis:'Nadzór scenograficzny + projekt', data:'2026-05-14',
    forma:'ryczalt', stawka:null, liczbaGodzin:null, kwota:1000,
    status:'Zatwierdzony',
  },
  // Projekt 2 — Polsat
  {
    id:'w5', pracownikId:'u1', projektId:2, pozycjaId:'q3',
    opis:'Obsługa techniczna event', data:'2026-05-29',
    forma:'godz', stawka:80, liczbaGodzin:10, kwota:800,
    status:'Oczekuje',
  },
  // Projekt 3 — Wyścigi
  {
    id:'w6', pracownikId:'u4', projektId:3, pozycjaId:'r3',
    opis:'Realizacja nagłośnienia', data:'2026-05-21',
    forma:'godz', stawka:100, liczbaGodzin:12, kwota:1200,
    status:'Zatwierdzony',
  },
  {
    id:'w7', pracownikId:'u5', projektId:3, pozycjaId:'r4',
    opis:'Obsługa oświetlenia', data:'2026-05-21',
    forma:'godz', stawka:90, liczbaGodzin:12, kwota:1080,
    status:'Zatwierdzony',
  },
  {
    id:'w8', pracownikId:'u1', projektId:3, pozycjaId:'r3',
    opis:'Asystent realizatora', data:'2026-05-21',
    forma:'godz', stawka:80, liczbaGodzin:12, kwota:960,
    status:'Zatwierdzony',
  },
  // Maj — dodatkowe
  {
    id:'w9', pracownikId:'u2', projektId:3, pozycjaId:'r4',
    opis:'Demontaż + transport sprzętu', data:'2026-05-22',
    forma:'godz', stawka:80, liczbaGodzin:8, kwota:640,
    status:'Oczekuje',
  },
]

export const TYP_KOSZTU_LABELS = {
  faktura:'Faktura zakupowa', praca:'Praca / zlecenie',
  zakup:'Zakup materiałów', inne:'Inne koszty',
}
export const TYP_KOSZTU_COLORS = {
  faktura:'#3b82f6', praca:'#22c55e', zakup:'#f97316', inne:'#8b5cf6',
}
export const FORMA_LABELS = {
  godz:'Stawka godz.', ryczalt:'Ryczałt', prowizja:'Prowizja %',
}
export const STATUS_COLORS = {
  Zatwierdzony:'#22c55e', Oczekuje:'#fbbf24', Odrzucony:'#ef4444',
}
