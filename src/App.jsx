import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import SplashScreen from './components/layout/SplashScreen'
import LoginScreen from './components/auth/LoginScreen'
import Layout from './components/layout/Layout'
import Dashboard from './components/dashboard/Dashboard'
import KontrahenciList from './components/crm/KontrahenciList'
import KontrahentForm from './components/crm/KontrahentForm'
import Kontakty from './components/crm/Kontakty'
import GrupyKontrahentow from './components/crm/GrupyKontrahentow'
import UzytkownicyList from './components/users/UzytkownicyList'
import UserForm from './components/users/UserForm'
import RozliczeniaUsers from './components/users/RozliczeniaUsers'
import PojezdyList from './components/fleet/PojezdyList'
import PojazdForm from './components/fleet/PojazdForm'
import OffersList from './components/offers/OffersList'
import OfferDetail from './components/offers/OfferDetail'
import OfferForm from './components/offers/OfferForm'
import RozliczeniaMain from './components/rozliczenia/RozliczeniaMain'
import MagazynWewnetrzny from './components/warehouse/MagazynWewnetrzny'
import CenyMagazyn from './components/warehouse/CenyMagazyn'
import { Modele, DodajModel, Egzemplarze, DodajEgzemplarz, PrzyjecieMagazyn, WydanieMagazyn, NiezwroconySprzet, Opakowania, TypyOpakowan, Zestawy, MagazynDostawcow, KategorieSprzetu, ZalaczkiModeli } from './components/warehouse/WarehousePages'
import UstawieniaMain from './components/settings/UstawieniaMain'
import { DodatkowePola, RodzajeWydarzen, TypyWydarzen, StatusyWydarzen, StatusyOfert, SchematyOfert, FolderyZalacznikow, DomyslneHarmonogramy, GenericSetting } from './components/settings/SettingsPages'
import { ModeleList, ModelDetail, Przejazdy, FlotaZalaczniki } from './components/fleet/FleetPages'
import { ChronologiaRozliczen, GrupyProwizyjne, StawkiPracownikow, StatusyRozliczen, Zespoly, Umiejetnosci } from './components/users/SubPages'
import CalendarView from './components/calendar/Calendar'
import EventsList from './components/events/EventsList'
import EventForm from './components/events/EventForm'
import EventDetail from './components/events/EventDetail'
import {
  KalendarzPage, ZadaniaPage, ZadaniaSchematy, ZadaniaKalendarz,
  KontrahenciPage, NowyKontrahent,
  MiejscaPage, NoweMiejsce, EventNetworkPage, MagazynPage,
  MagazynStolarnia, MagazynSlusarnia, MagazynTekstylia,
  MagazynElektryka, MagazynInne, SerwisPage, UzytkownicyPage,
  UzytkownicyRole, FlotaPage, UstawieniaPage, OfertyPage,
  NowaOferta, WypozyczeniaPage, StatystykiPage,
  RozliczeniaPage, RozliczeniaKoszty
} from './pages/index'

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--green-primary)', letterSpacing: '0.1em' }}>404</h2>
      <p style={{ color: 'var(--text-secondary)', marginTop: 12 }}>Strona nie istnieje.</p>
    </div>
  )
}

function AppInner() {
  const { user, loading: authLoading } = useAuth()
  const [splashDone, setSplashDone] = useState(false)

  if (authLoading) return (
    <div style={{minHeight:'100vh',background:'var(--bg-primary)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:40,height:40,border:'3px solid var(--border-default)',borderTopColor:'var(--green-primary)',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!user) return <LoginScreen />

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kalendarz" element={<CalendarView />} />
          <Route path="/zadania" element={<ZadaniaPage />} />
          <Route path="/zadania/schematy" element={<ZadaniaSchematy />} />
          <Route path="/zadania/kalendarz" element={<ZadaniaKalendarz />} />
          <Route path="/wydarzenia" element={<EventsList />} />
          <Route path="/wydarzenia/nowe" element={<EventForm />} />
          <Route path="/wydarzenia/:id" element={<EventDetail />} />
          <Route path="/wydarzenia/:id/edytuj" element={<EventForm />} />
          <Route path="/kontrahenci" element={<KontrahenciList />} />
          <Route path="/kontrahenci/nowy" element={<KontrahentForm />} />
          <Route path="/kontrahenci/kontakty" element={<Kontakty />} />
          <Route path="/kontrahenci/grupy" element={<GrupyKontrahentow />} />
          <Route path="/miejsca" element={<MiejscaPage />} />
          <Route path="/miejsca/nowe" element={<NoweMiejsce />} />
          <Route path="/event-network" element={<EventNetworkPage />} />
          <Route path="/magazyn" element={<MagazynWewnetrzny />} />
          <Route path="/magazyn/dostawcow" element={<MagazynDostawcow />} />
          <Route path="/magazyn/ceny" element={<CenyMagazyn />} />
          <Route path="/magazyn/wydanie" element={<WydanieMagazyn />} />
          <Route path="/magazyn/przyjecie" element={<PrzyjecieMagazyn />} />
          <Route path="/magazyn/niezwrocony" element={<NiezwroconySprzet />} />
          <Route path="/magazyn/modele" element={<Modele />} />
          <Route path="/magazyn/modele/nowy" element={<DodajModel />} />
          <Route path="/magazyn/modele/:id" element={<DodajModel />} />
          <Route path="/magazyn/modele/:id/edytuj" element={<DodajModel />} />
          <Route path="/magazyn/egzemplarze" element={<Egzemplarze />} />
          <Route path="/magazyn/egzemplarze/nowy" element={<DodajEgzemplarz />} />
          <Route path="/magazyn/egzemplarze/:id" element={<DodajEgzemplarz />} />
          <Route path="/magazyn/egzemplarze/:id/edytuj" element={<DodajEgzemplarz />} />
          <Route path="/magazyn/opakowania" element={<Opakowania />} />
          <Route path="/magazyn/typy-opakowan" element={<TypyOpakowan />} />
          <Route path="/magazyn/zestawy" element={<Zestawy />} />
          <Route path="/magazyn/kategorie" element={<KategorieSprzetu />} />
          <Route path="/magazyn/zalaczniki-modeli" element={<ZalaczkiModeli />} />
          <Route path="/serwis" element={<SerwisPage />} />
          <Route path="/uzytkownicy" element={<UzytkownicyList />} />
          <Route path="/uzytkownicy/nowy" element={<UserForm />} />
          <Route path="/uzytkownicy/zespoly" element={<Zespoly />} />
          <Route path="/uzytkownicy/umiejetnosci" element={<Umiejetnosci />} />
          <Route path="/uzytkownicy/rozliczenia" element={<RozliczeniaUsers />} />
          <Route path="/uzytkownicy/chronologia" element={<ChronologiaRozliczen />} />
          <Route path="/uzytkownicy/grupy-prowizyjne" element={<GrupyProwizyjne />} />
          <Route path="/uzytkownicy/stawki" element={<StawkiPracownikow />} />
          <Route path="/uzytkownicy/statusy-rozliczen" element={<StatusyRozliczen />} />
          <Route path="/flota" element={<PojezdyList />} />
          <Route path="/flota/nowy" element={<PojazdForm />} />
          <Route path="/flota/:id" element={<PojazdForm />} />
          <Route path="/flota/:id/edytuj" element={<PojazdForm />} />
          <Route path="/flota/modele" element={<ModeleList />} />
          <Route path="/flota/modele/nowy" element={<ModelDetail />} />
          <Route path="/flota/modele/:id" element={<ModelDetail />} />
          <Route path="/flota/modele/:id/edytuj" element={<ModelDetail />} />
          <Route path="/flota/przejazdy" element={<Przejazdy />} />
          <Route path="/flota/zalaczniki" element={<FlotaZalaczniki />} />
          <Route path="/ustawienia" element={<UstawieniaMain />} />
          <Route path="/ustawienia/dodatkowe-pola" element={<DodatkowePola />} />
          <Route path="/ustawienia/rodzaje-wydarzen" element={<RodzajeWydarzen />} />
          <Route path="/ustawienia/typy-wydarzen" element={<TypyWydarzen />} />
          <Route path="/ustawienia/statusy-wydarzen" element={<StatusyWydarzen />} />
          <Route path="/ustawienia/dodatkowe-statusy" element={<GenericSetting title="Dodatkowe statusy" />} />
          <Route path="/ustawienia/statusy-grup" element={<GenericSetting title="Statusy grup sprzętowych" />} />
          <Route path="/ustawienia/statusy-wypozyczen" element={<GenericSetting title="Statusy wypożyczeń" />} />
          <Route path="/ustawienia/statusy-sprzetu" element={<GenericSetting title="Statusy sprzętu" />} />
          <Route path="/ustawienia/statusy-ofert" element={<StatusyOfert />} />
          <Route path="/ustawienia/schematy-ofert" element={<SchematyOfert />} />
          <Route path="/ustawienia/foldery-zalacznikow" element={<FolderyZalacznikow />} />
          <Route path="/ustawienia/harmonogramy" element={<DomyslneHarmonogramy />} />
          <Route path="/ustawienia/schematy-grup" element={<GenericSetting title="Schematy grup" />} />
          <Route path="/ustawienia/statusy-zadan" element={<GenericSetting title="Statusy zadań" />} />
          <Route path="/ustawienia/typy-zadan" element={<GenericSetting title="Typy zadań" />} />
          <Route path="/oferty" element={<OffersList />} />
          <Route path="/oferty/nowa" element={<OfferForm />} />
          <Route path="/oferty/:id" element={<OfferDetail />} />
          <Route path="/oferty/:id/edytuj" element={<OfferForm />} />
          <Route path="/wypozyczenia" element={<WypozyczeniaPage />} />
          <Route path="/statystyki" element={<StatystykiPage />} />
          <Route path="/rozliczenia" element={<RozliczeniaMain />} />
          <Route path="/rozliczenia/koszty" element={<RozliczeniaKoszty />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AppProvider>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
