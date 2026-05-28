import { useRef } from 'react'
import { X, Printer } from 'lucide-react'
import { PDF_EXAMPLE } from './offersData'
import './OfertaPDF.css'

export default function OfertaPDF({ onClose }) {
  const printRef = useRef()

  const handlePrint = () => {
    const content = printRef.current.innerHTML
    const win = window.open('', '_blank')
    win.document.write(`
      <html><head><title>Oferta PDF</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 11px; color: #000; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        th { background: #333; color: #fff; padding: 6px 8px; text-align: left; font-size: 10px; }
        td { padding: 5px 8px; border-bottom: 1px solid #eee; }
        .section-header { background: #f97316; color: #fff; padding: 6px 10px; font-weight: bold; margin: 12px 0 0; }
        .section-header-blue { background: #ef4444; }
        .section-header-teal { background: #f59e0b; }
        .total-row { font-weight: bold; }
        .right { text-align: right; }
        .podsumowanie { margin-top: 20px; display: flex; gap: 40px; }
        h4 { margin: 16px 0 4px; }
      </style></head>
      <body>${content}</body></html>
    `)
    win.document.close()
    win.print()
  }

  const p = PDF_EXAMPLE
  const totalTransport = p.transport.reduce((s,i) => s + i.razem, 0)
  const totalObsluga = p.obsluga.reduce((s,i) => s + i.razem, 0)
  const totalInne = p.inne.reduce((s,i) => s + i.razem, 0)
  const total = totalTransport + totalObsluga + totalInne

  const fmt = (v) => v.toLocaleString('pl', { minimumFractionDigits: 2 }) + ' zł'

  return (
    <div className="pdf-wrap animate-in">
      <div className="pdf-topbar">
        <h2 className="pdf-title">Podgląd PDF — {p.nazwa}</h2>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-primary" onClick={handlePrint}><Printer size={14}/> Drukuj / Zapisz PDF</button>
          <button className="btn btn-ghost" onClick={onClose}><X size={14}/> Zamknij</button>
        </div>
      </div>

      <div className="pdf-paper" ref={printRef}>
        {/* Header */}
        <div className="pdf-header">
          <div className="pdf-header-left">
            <div className="pdf-client-block">
              <div>Incydentalny</div>
              <div>NIP:</div>
              <div>e-mail:</div>
              <div>tel:</div>
            </div>
          </div>
          <div className="pdf-header-right">
            <table className="pdf-info-table">
              <tbody>
                <tr><td>Nazwa:</td><td><strong>{p.nazwa}</strong></td></tr>
                <tr><td>Numer oferty</td><td>{p.nrOferty}</td></tr>
                <tr><td>Data sporządzenia oferty:</td><td>{p.dataSporzeadzenia}</td></tr>
                <tr><td>Strona:</td><td>{p.strona}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pdf-contact-grid">
          <div className="pdf-contact-left">
            <table className="pdf-info-table">
              <tbody>
                <tr><td>Kierownik projektu:</td><td><strong>{p.kierownikProjektu}</strong></td></tr>
                <tr><td>tel:</td><td>{p.tel}</td></tr>
                <tr><td>e-mail:</td><td>
                  <div style={{display:'flex',gap:4,alignItems:'center'}}>
                    <span style={{fontSize:16}}>•</span><span style={{fontSize:16}}>•</span><span style={{fontSize:16}}>•</span>
                  </div>
                </td></tr>
                <tr><td>Nazwa projektu:</td><td>{p.nazwa}</td></tr>
                <tr><td>Miejsce i adres:</td><td></td></tr>
              </tbody>
            </table>
            <table className="pdf-info-table" style={{marginTop:12}}>
              <thead><tr><th>Początek</th><th>Koniec</th></tr></thead>
              <tbody><tr><td></td><td></td></tr></tbody>
            </table>
          </div>
        </div>

        {/* Transport */}
        <div className="pdf-section-header" style={{background:'#3b82f6'}}>Transport</div>
        <table className="pdf-table">
          <thead>
            <tr>
              <th>Samochód</th><th>Opis</th><th>Liczba</th><th>Przelicznik</th><th>Cena</th><th className="right">Razem netto</th>
            </tr>
          </thead>
          <tbody>
            {['Montaż','Demontaż'].map(etap => {
              const items = p.transport.filter(i => i.etap === etap)
              return [
                <tr key={`etap-${etap}`}><td colSpan={6} style={{textAlign:'center',fontWeight:'bold',background:'#f8f8f8',padding:'4px'}}>{etap}</td></tr>,
                ...items.map((item, idx) => (
                  <tr key={`${etap}-${idx}`}>
                    <td>{item.nazwa}</td><td></td>
                    <td style={{textAlign:'center'}}>{item.liczba}</td>
                    <td>{item.przelicznik}</td>
                    <td className="right">{item.cena.toFixed(2)}</td>
                    <td className="right">{fmt(item.razem)}</td>
                  </tr>
                ))
              ]
            })}
            <tr className="pdf-total-row">
              <td colSpan={5}><strong>Łącznie Transport</strong></td>
              <td className="right"><strong>{fmt(totalTransport)}</strong></td>
            </tr>
          </tbody>
        </table>

        {/* Obsługa */}
        <div className="pdf-section-header" style={{background:'#ef4444'}}>Obsługa techniczna</div>
        <table className="pdf-table">
          <thead>
            <tr><th>Nazwa</th><th>Opis</th><th>Cena</th><th>Liczba</th><th>Okres</th><th className="right">Razem netto</th></tr>
          </thead>
          <tbody>
            {['Montaż','Demontaż'].map(etap => {
              const items = p.obsluga.filter(i => i.etap === etap)
              if (!items.length) return null
              return [
                <tr key={`etap-${etap}`}><td colSpan={6} style={{textAlign:'center',fontWeight:'bold',background:'#f8f8f8',padding:'4px'}}>{etap}</td></tr>,
                ...items.map((item, idx) => (
                  <tr key={`${etap}-${idx}`}>
                    <td>{item.nazwa}</td><td></td>
                    <td className="right">{fmt(item.cena)}</td>
                    <td style={{textAlign:'center'}}>{item.liczba}</td>
                    <td>{item.okres}</td>
                    <td className="right">{fmt(item.razem)}</td>
                  </tr>
                ))
              ]
            })}
            <tr className="pdf-total-row">
              <td colSpan={5}><strong>Łącznie Obsługa techniczna</strong></td>
              <td className="right"><strong>{fmt(totalObsluga)}</strong></td>
            </tr>
          </tbody>
        </table>

        {/* Inne */}
        <div className="pdf-section-header" style={{background:'#f59e0b'}}>Inne</div>
        <table className="pdf-table">
          <thead>
            <tr><th>Nazwa</th><th>Cena</th><th>Liczba</th><th></th><th className="right">Razem netto</th></tr>
          </thead>
          <tbody>
            {p.inne.map((item, idx) => (
              <tr key={idx}>
                <td>{item.nazwa}</td>
                <td className="right">{fmt(item.cena)}</td>
                <td style={{textAlign:'center'}}>{item.liczba}</td>
                <td></td>
                <td className="right">{fmt(item.razem)}</td>
              </tr>
            ))}
            <tr className="pdf-total-row">
              <td colSpan={4}><strong>Łącznie inne</strong></td>
              <td className="right"><strong>{fmt(totalInne)}</strong></td>
            </tr>
          </tbody>
        </table>

        {/* Podsumowanie */}
        <table className="pdf-table pdf-summary-table">
          <tbody>
            <tr className="pdf-total-row">
              <td colSpan={4}><strong>Podsumowanie</strong></td>
              <td className="right"><strong>{fmt(total)}</strong></td>
            </tr>
          </tbody>
        </table>

        <div className="pdf-podsumowanie">
          <div className="pdf-podsum-left">
            <h4>Podsumowanie kosztów: {p.nazwa}</h4>
            <table className="pdf-podsum-table">
              <tbody>
                <tr><td>Koszt sprzętu:</td><td className="right">0,00 zł</td></tr>
                <tr><td>Koszt transportu:</td><td className="right">{fmt(totalTransport)}</td></tr>
                <tr><td>Koszt obsługi:</td><td className="right">{fmt(totalObsluga)}</td></tr>
                <tr><td>Inne koszty:</td><td className="right">{fmt(totalInne)}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="pdf-podsum-right">
            <h4>Uwagi do sprzętu:</h4>
            <table className="pdf-podsum-table">
              <tbody>
                <tr><td>Całkowita objętość:</td><td className="right">0 m³</td></tr>
                <tr><td>Całkowita waga netto:</td><td className="right">0 kg</td></tr>
                <tr><td>Całkowita moc:</td><td className="right">0 W</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="pdf-footer">
          <div>
            <strong>Kierownik projektu:</strong><br/>
            {p.kierownikProjektu}<br/>
            {p.email}
          </div>
        </div>
      </div>
    </div>
  )
}
