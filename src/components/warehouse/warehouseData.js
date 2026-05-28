export const KATEGORIE_TREE = [
  { id: 1, nazwa: 'Multimedia', parent: null, kolor: '#f97316', children: [
    { id: 11, nazwa: 'Projektory', parent: 1 },
    { id: 12, nazwa: 'Ekrany LED', parent: 1 },
    { id: 13, nazwa: 'Miksery AV', parent: 1 },
    { id: 14, nazwa: 'Komputery', parent: 1 },
    { id: 15, nazwa: 'Monitory', parent: 1 },
    { id: 16, nazwa: 'Okablowanie', parent: 1 },
    { id: 17, nazwa: '63A', parent: 1 },
  ]},
  { id: 2, nazwa: 'Oświetlenie', parent: null, kolor: '#f97316', children: [
    { id: 21, nazwa: 'Ruchome Głowy', parent: 2 },
    { id: 22, nazwa: 'Konsolety', parent: 2 },
    { id: 23, nazwa: 'OŚWIETLENIE ARCHITEKTONICZNE', parent: 2 },
  ]},
  { id: 3, nazwa: 'Scena', parent: null, kolor: '#f97316', children: [
    { id: 31, nazwa: 'Podesty Sceniczne', parent: 3 },
    { id: 32, nazwa: 'Akcesoria Sceniczne', parent: 3 },
  ]},
  { id: 4, nazwa: 'Konstrukcje Sceniczne', parent: null, kolor: '#f97316', children: [
    { id: 41, nazwa: 'Kratownica', parent: 4 },
    { id: 42, nazwa: 'Wyciągarki', parent: 4 },
    { id: 43, nazwa: 'Dachy', parent: 4 },
  ]},
  { id: 5, nazwa: 'Okablowanie Prądowe i Rozdzielnie', parent: null },
  { id: 6, nazwa: 'Inne', parent: null },
  { id: 7, nazwa: 'Usługi', parent: null },
  { id: 8, nazwa: 'Scenografia', parent: null },
  { id: 9, nazwa: 'Sala 1', parent: null, kolor: '#f97316', children: [
    { id: 91, nazwa: 'Sprzęt', parent: 9 },
    { id: 92, nazwa: 'Stoły i Krzesła', parent: 9 },
    { id: 93, nazwa: 'Usługi', parent: 9 },
  ]},
]

export const DZIALY_MAGAZYN = ['Multimedia','Oświetlenie','Nagłośnienie','Scena','Konstrukcje Sceniczne','Okablowanie Prądowe i Rozdzielnie','Inne','Usługi','Scenografia','Sala 1']

export const MODELE_MAGAZYN = [
  { id: 1, nazwa: 'Barco HDX W20', sztuki: 4, widocznyMag: true, widocznyOfer: true, kategoria: 'Projektory' },
  { id: 2, nazwa: 'E2', sztuki: 1, widocznyMag: true, widocznyOfer: true, kategoria: 'Miksery AV' },
  { id: 3, nazwa: 'Yamaha QL5', sztuki: 2, widocznyMag: true, widocznyOfer: true, kategoria: 'Miksery Audio' },
  { id: 4, nazwa: 'Yamaha RIO 1608 D', sztuki: 1, widocznyMag: true, widocznyOfer: true, kategoria: 'Miksery Audio' },
  { id: 5, nazwa: 'kabel LAN na bębnie', sztuki: 6, widocznyMag: true, widocznyOfer: true, kategoria: 'Okablowanie' },
  { id: 6, nazwa: 'IPAD', sztuki: 5, widocznyMag: true, widocznyOfer: true, kategoria: 'Komputery' },
  { id: 7, nazwa: 'Projektor Digital Projection HIGHlite Laser II', sztuki: 2, widocznyMag: true, widocznyOfer: true, kategoria: 'Projektory' },
  { id: 8, nazwa: 'Laptop PC', sztuki: 20, widocznyMag: true, widocznyOfer: true, kategoria: 'Komputery' },
  { id: 9, nazwa: 'Macbook Pro', sztuki: 2, widocznyMag: true, widocznyOfer: true, kategoria: 'Komputery' },
  { id: 10, nazwa: 'Monitor podglądowy 22\'', sztuki: 7, widocznyMag: true, widocznyOfer: true, kategoria: 'Monitory' },
  { id: 11, nazwa: 'Barco Kontroler EC50', sztuki: 1, widocznyMag: true, widocznyOfer: true, kategoria: 'Miksery AV' },
  { id: 12, nazwa: 'WMS4500', sztuki: 2, widocznyMag: true, widocznyOfer: true, kategoria: 'Mikrofony' },
  { id: 13, nazwa: 'MAC QUANTUM WASH', sztuki: 3, widocznyMag: true, widocznyOfer: true, kategoria: 'Ruchome Głowy' },
  { id: 14, nazwa: 'LEDWash 800™', sztuki: 6, widocznyMag: true, widocznyOfer: true, kategoria: 'Ruchome Głowy' },
  { id: 15, nazwa: 'Pointe®', sztuki: 8, widocznyMag: true, widocznyOfer: true, kategoria: 'Ruchome Głowy' },
  { id: 16, nazwa: 'KINEX', sztuki: 0, widocznyMag: true, widocznyOfer: true, kategoria: 'Oświetlenie' },
  { id: 17, nazwa: 'Krata 1m', sztuki: 90, widocznyMag: true, widocznyOfer: true, kategoria: 'Kratownica' },
  { id: 18, nazwa: 'Podest sceniczny 2x0,5m', sztuki: 100, widocznyMag: true, widocznyOfer: true, kategoria: 'Podesty Sceniczne' },
  { id: 19, nazwa: 'Podest sceniczny 1x1m', sztuki: 50, widocznyMag: true, widocznyOfer: true, kategoria: 'Podesty Sceniczne' },
  { id: 20, nazwa: 'Podest sceniczny 1x0,5m', sztuki: 40, widocznyMag: true, widocznyOfer: true, kategoria: 'Podesty Sceniczne' },
]

export const EGZEMPLARZE = [
  { id: 1, nazwa: 'Barco HDX W20', model: 'Barco HDX W20', kategoria: 'Projektory', rfid: 'E2000019161101520240 7AF4', nrUrzadzenia: 1, status: 'Aktywny', statusKolor: '#22c55e', barcode: '0000000000001' },
  { id: 2, nazwa: 'Barco HDX W20', model: 'Barco HDX W20', kategoria: 'Projektory', rfid: 'E200001910100115204 05B29', nrUrzadzenia: 2, status: 'Wymaga serwisu, ale działa', statusKolor: '#ef4444', barcode: '0000000000002' },
  { id: 3, nazwa: 'Barco HDX W20', model: 'Barco HDX W20', kategoria: 'Projektory', rfid: 'E200001973180178217 09AE5', nrUrzadzenia: 3, status: 'Wymaga serwisu, ale działa', statusKolor: '#ef4444', barcode: '0000000000026' },
  { id: 4, nazwa: 'Barco HDX W20', model: 'Barco HDX W20', kategoria: 'Projektory', rfid: 'E200001991010162109 08B1D', nrUrzadzenia: 4, status: null, statusKolor: null, barcode: '0000000000027' },
  { id: 5, nazwa: 'E2', model: 'E2', kategoria: 'Miksery AV', rfid: '-', nrUrzadzenia: 1, status: null, statusKolor: null, barcode: '0000000000003' },
  { id: 6, nazwa: 'Yamaha QL5', model: 'Yamaha QL5', kategoria: 'Miksery Audio', rfid: 'E200001757090117061 0D9E9', nrUrzadzenia: 1, status: null, statusKolor: null, barcode: '0000000000004' },
  { id: 7, nazwa: 'Yamaha QL5', model: 'Yamaha QL5', kategoria: 'Miksery Audio', rfid: '-', nrUrzadzenia: 2, status: null, statusKolor: null, barcode: '0000000000005' },
]

export const CENY_SPRZET = [
  { id: 1, nazwa: 'Monitor podglądowy 22\'', stawkaPodst: 100, eventowe: 20, aktywny: true },
  { id: 2, nazwa: 'Barco HDX W20', stawkaPodst: 40, eventowe: 30, aktywny: true },
  { id: 3, nazwa: 'Projektor Digital Projection HIGHlite Laser II', stawkaPodst: 40, eventowe: 40, aktywny: true },
  { id: 4, nazwa: 'Barco Kontroler EC50', stawkaPodst: 50, eventowe: 50, aktywny: true },
  { id: 5, nazwa: 'IPAD', stawkaPodst: 60, eventowe: 60, aktywny: true },
  { id: 6, nazwa: 'Laptop PC', stawkaPodst: 70, eventowe: 70, aktywny: true },
  { id: 7, nazwa: 'Macbook Pro', stawkaPodst: 100, eventowe: 80, aktywny: true },
  { id: 8, nazwa: 'Komputer', stawkaPodst: 120, eventowe: 110, aktywny: true },
  { id: 9, nazwa: 'E2', stawkaPodst: 800, eventowe: 700, aktywny: true },
  { id: 10, nazwa: 'Komputer', stawkaPodst: 700, eventowe: 600, aktywny: true },
  { id: 11, nazwa: 'Converter SDI do HDMI', stawkaPodst: 400, eventowe: 400, aktywny: true },
  { id: 12, nazwa: 'Spliter VGA 1X4', stawkaPodst: 300, eventowe: 290, aktywny: true },
  { id: 13, nazwa: 'Sliter VGA 1x3', stawkaPodst: 280, eventowe: 270, aktywny: true },
  { id: 14, nazwa: 'Extender Światłowodowy', stawkaPodst: 430, eventowe: 420, aktywny: true },
  { id: 15, nazwa: 'Barco HDX', stawkaPodst: 3000, eventowe: 2900, aktywny: false },
  { id: 16, nazwa: '2Barco HDX22', stawkaPodst: 3500, eventowe: 3400, aktywny: false },
  { id: 17, nazwa: '23Barco HDX22', stawkaPodst: 0, eventowe: 0, aktywny: false },
  { id: 18, nazwa: 'ekran PLED', stawkaPodst: 220, eventowe: 200, aktywny: true },
]

export const ZALACZNIKI_MODELI = [
  { id: 1, plik: '1-zrzut-ekranu-2017-05-31-o-173227-592f03d48c2d8.png', rozszerzenie: 'png', model: 'Barco HDX W20' },
  { id: 2, plik: '1-pomnikmikolaja12kopernika10-592f03e5b74cc.jpg', rozszerzenie: 'jpg', model: 'Barco HDX W20' },
  { id: 3, plik: '12-akgwms4500cutsheet.pdf', rozszerzenie: 'pdf', model: 'WMS4500' },
  { id: 4, plik: '12-akgwms4500wms4000servicedocumentation.pdf', rozszerzenie: 'pdf', model: 'WMS4500' },
  { id: 5, plik: '25-qspkk2usermanualen-1.pdf', rozszerzenie: 'pdf', model: 'K10.2 Active 10" Loudspeaker' },
  { id: 6, plik: '25-qspkk2quickstartguideendefresch-1.pdf', rozszerzenie: 'pdf', model: 'K10.2 Active 10" Loudspeaker' },
  { id: 7, plik: '26-qspkwl10wl2102wspecs.pdf', rozszerzenie: 'pdf', model: 'WL2102-w' },
  { id: 8, plik: '26-qspkwl10usermanual.pdf', rozszerzenie: 'pdf', model: 'WL2102-w' },
  { id: 9, plik: 'oswietlenie.png', rozszerzenie: 'png', model: 'Alpha Wash 700' },
  { id: 10, plik: '28-zrzut-ekranu-2017-05-31-o-173227-592f03d48c2d8.png', rozszerzenie: 'png', model: 'Barco HDX W20' },
  { id: 11, plik: '28-pomnikmikolaja12kopernika10-592f03e5b74cc.jpg', rozszerzenie: 'jpg', model: 'Barco HDX W20' },
  { id: 12, plik: 'zrzut-ekranu-2020-05-18-o-200430.png', rozszerzenie: 'png', model: 'Monitor podglądowy 22\'' },
]

export const GRUPY_CENOWE = ['Imprezy w Polsce', 'Imprezy za Granicą']
