# L8 Studio — Event Management System

Profesjonalna aplikacja do zarządzania firmą eventową.  
Stack: **React 18 + Vite + React Router**

---

## 🚀 Uruchomienie lokalne

### Wymagania
- Node.js 18+
- npm lub yarn

### Instalacja
```bash
cd l8studio
npm install
npm run dev
```

Otwórz: http://localhost:5173

---

## 📦 Build produkcyjny

```bash
npm run build
```

Pliki gotowe do wgrania znajdziesz w folderze `dist/`.

---

## ☁️ Deploy — opcje

### Opcja 1: Vercel (REKOMENDOWANA — frontend)
1. Wgraj projekt na GitHub
2. Zaloguj się na vercel.com
3. Kliknij "Import Project" → wybierz repo
4. Framework preset: **Vite**
5. Deploy! ✅

### Opcja 2: Netlify
1. Wgraj projekt na GitHub
2. netlify.com → "New site from Git"
3. Build command: `npm run build`
4. Publish directory: `dist`

### Opcja 3: Własny VPS / hosting
```bash
npm run build
# Wgraj folder dist/ na serwer przez FTP/SFTP
# Skonfiguruj nginx lub Apache do serwowania plików statycznych
```

---

## 🗄️ Backend (następny etap)

Do pełnej funkcjonalności (zapis danych, logowanie, API) potrzebny jest backend.

**Rekomendacja:**
- **Supabase** — PostgreSQL w chmurze, gotowe API, auth z Google
  - Darmowy tier: wystarczy na start
  - supabase.com

---

## 📁 Struktura projektu

```
l8studio/
├── src/
│   ├── components/
│   │   ├── layout/         # Sidebar, Topbar, Layout
│   │   ├── dashboard/      # Kokpit (strona główna)
│   │   ├── events/         # Wydarzenia (do budowy)
│   │   ├── tasks/          # Zadania (do budowy)
│   │   ├── warehouse/      # Magazyn (do budowy)
│   │   ├── crm/            # Kontrahenci (do budowy)
│   │   └── finance/        # Rozliczenia (do budowy)
│   ├── pages/              # Definicje stron
│   ├── context/            # AppContext (globalny stan)
│   ├── utils/              # Dane, helpers
│   └── styles/             # Globalne style CSS
├── public/
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎨 Design

- **Kolorystyka:** Czarno-zielona (jak L8 Studio)
- **Czcionki:** Rajdhani (display) + JetBrains Mono + Inter
- **Efekty:** Scanlines, glow, pulse animations

---

## 📋 Moduły — status

| Moduł | Status |
|---|---|
| Kokpit (Dashboard) | ✅ Gotowy |
| Sidebar + nawigacja | ✅ Gotowy |
| Topbar | ✅ Gotowy |
| Routing (wszystkie ścieżki) | ✅ Gotowy |
| Zadania | 🔄 Do budowy |
| Kalendarz | 🔄 Do budowy |
| Wydarzenia | 🔄 Do budowy |
| Kontrahenci (CRM) | 🔄 Do budowy |
| Miejsca | 🔄 Do budowy |
| Magazyn | 🔄 Do budowy |
| Serwis | 🔄 Do budowy |
| Użytkownicy | 🔄 Do budowy |
| Flota | 🔄 Do budowy |
| Oferty/Kosztorysy | 🔄 Do budowy |
| Rozliczenia/Faktury | 🔄 Do budowy |
| Statystyki | 🔄 Do budowy |
