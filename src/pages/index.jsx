import { Calendar, Star, Users, MapPin, Package, Wrench, Truck, BarChart2, DollarSign, Settings, ShoppingCart, AlertCircle, Network, CheckSquare } from 'lucide-react'
import PlaceholderPage from '../components/layout/PlaceholderPage'

export const KalendarzPage = () => <PlaceholderPage title="Kalendarz" description="Widok kalendarza ze wszystkimi wydarzeniami, montażami i demontażami." icon={Calendar} />
export const ZadaniaPage = () => <PlaceholderPage title="Zadania" description="Lista zadań przypisanych do Ciebie i Twojego działu." icon={CheckSquare} />
export const ZadaniaSchematy = () => <PlaceholderPage title="Schematy zadań" description="Szablony i schematy powtarzalnych zadań." icon={CheckSquare} />
export const ZadaniaKalendarz = () => <PlaceholderPage title="Kalendarz zadań" description="Zadania w widoku kalendarza." icon={Calendar} />
export const WydarzeniaPage = () => <PlaceholderPage title="Wydarzenia" description="Lista wszystkich wydarzeń eventowych — od scenografii po demontaż." icon={Star} />
export const NoweWydarzenie = () => <PlaceholderPage title="Nowe wydarzenie" description="Formularz tworzenia nowego projektu eventowego." icon={Star} />
export const KontrahenciPage = () => <PlaceholderPage title="Kontrahenci" description="CRM — klienci, firmy partnerskie, dostawcy." icon={Users} />
export const NowyKontrahent = () => <PlaceholderPage title="Nowy kontrahent" description="Formularz dodawania nowego kontrahenta." icon={Users} />
export const MiejscaPage = () => <PlaceholderPage title="Miejsca" description="Baza lokalizacji eventowych — hale, sceny, przestrzenie." icon={MapPin} />
export const NoweMiejsce = () => <PlaceholderPage title="Nowe miejsce" description="Dodaj nową lokalizację do bazy." icon={MapPin} />
export const EventNetworkPage = () => <PlaceholderPage title="Event Network" description="Sieć partnerów i podwykonawców branży eventowej." icon={Network} />
export const MagazynPage = () => <PlaceholderPage title="Magazyn" description="Zarządzanie scenografią — stolarnia, ślusarnia, tekstylia, elektryka." icon={Package} />
export const MagazynStolarnia = () => <PlaceholderPage title="Magazyn — Stolarnia" description="Elementy drewniane, konstrukcje, meble sceniczne." icon={Package} />
export const MagazynSlusarnia = () => <PlaceholderPage title="Magazyn — Ślusarnia" description="Elementy metalowe, stelaże, systemy truss." icon={Package} />
export const MagazynTekstylia = () => <PlaceholderPage title="Magazyn — Tekstylia" description="Tkaniny dekoracyjne, bannery, nadruki." icon={Package} />
export const MagazynElektryka = () => <PlaceholderPage title="Magazyn — Elektryka" description="Sprzęt elektryczny, okablowanie, oświetlenie." icon={Package} />
export const MagazynInne = () => <PlaceholderPage title="Magazyn — Inne" description="Pozostały sprzęt i materiały." icon={Package} />
export const SerwisPage = () => <PlaceholderPage title="Serwis" description="Zlecenia serwisowe — sprzęt wymagający naprawy lub przeglądu." icon={Wrench} />
export const UzytkownicyPage = () => <PlaceholderPage title="Użytkownicy" description="Zarządzanie pracownikami i ich uprawnieniami." icon={Users} />
export const UzytkownicyRole = () => <PlaceholderPage title="Role i uprawnienia" description="Konfiguracja ról i poziomów dostępu." icon={Settings} />
export const FlotaPage = () => <PlaceholderPage title="Flota" description="Pojazdy firmy — harmonogram, serwis, przydział do wydarzeń." icon={Truck} />
export const UstawieniaPage = () => <PlaceholderPage title="Ustawienia" description="Konfiguracja systemu, dane firmy, integracje." icon={Settings} />
export const OfertyPage = () => <PlaceholderPage title="Oferty" description="Kosztorysy i oferty dla klientów." icon={ShoppingCart} />
export const NowaOferta = () => <PlaceholderPage title="Nowa oferta" description="Stwórz wycenę z marżą i strefami." icon={ShoppingCart} />
export const WypozyczeniaPage = () => <PlaceholderPage title="Wypożyczenia i konflikty" description="Śledzenie wypożyczonego sprzętu i rozwiązywanie konfliktów." icon={AlertCircle} />
export const StatystykiPage = () => <PlaceholderPage title="Statystyki" description="Wykresy i raporty — wyniki firmy, wykorzystanie magazynu." icon={BarChart2} />
export const RozliczeniaPage = () => <PlaceholderPage title="Rozliczenia" description="Faktury, monitor płatności, ZUS, VAT." icon={DollarSign} />
export const RozliczeniaKoszty = () => <PlaceholderPage title="Rozliczenia — Koszty" description="Koszty projektów, koszty przeterminowane." icon={DollarSign} />
