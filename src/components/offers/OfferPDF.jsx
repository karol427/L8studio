import { useRef } from 'react'
import { X, Printer } from 'lucide-react'
import './Offers.css'

export default function OfferPDF({ data, onClose }) {
  const printRef = useRef()

  const handlePrint = () => {
    const content = printRef.current.innerHTML
    const win = window.open('', '_blank')
    win.document.write(`
      <html><head><title>Oferta - ${data.nazwa}</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 12px; color: #000; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        th { background: #f5f5f5; border: 1px solid #ddd; padding: 6px 8px; text-align: left; font-size: 11px; font-weight: 700; }
        td { border: 1px solid #ddd; padding: 5px 8px; }
        .section-header { padding: 6px 12px; font-weight: 700; font-size: 13px; color: #fff; margin-bottom: 0; }
        .transport-header { background: #1d4ed8; }
        .obsluga-header { background: #dc2626; }
        .inne-header { background: #f97316; }
        .etap-row { background: #e8e8e8; font-weight: 700; text-align: center; }
        .total-row { background: #f0f0f0; font-weight: 700; }
        .summary { margin-top: 20px; display: table; width: 100%; }
        .footer { margin-top: 24px; padding-top: 12px; border-top: 1px solid #ddd; font-weight: 700; text-align: right; }
        @media print { body { margin: 0; } }
      </style></head><body>${content}</body></html>
    `)
    win.document.close()
    win.print()
  }

  const fmt = v => `${v.toLocaleString('pl', {minimumFractionDigits:2,maximumFractionDigits:2})} zł`

  const totalTransport = data.transport.reduce((s,i)=>s+i.razem,0)
  const totalObsluga = data.obsluga.reduce((s,i)=>s+i.razem,0)
  const totalInne = data.inne.reduce((s,i)=>s+i.razem,0)
  const grand = totalTransport + totalObsluga + totalInne

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',zIndex:500,overflow:'auto',padding:'20px'}}>
      <div style={{maxWidth:920,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <button className="off-pdf-print-btn" onClick={handlePrint}>
            <Printer size={14}/> Drukuj / Pobierz PDF
          </button>
          <button onClick={onClose} style={{background:'var(--red)',color:'#fff',border:'none',borderRadius:'50%',width:34,height:34,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
            <X size={16}/>
          </button>
        </div>

        <div className="off-pdf-wrap" ref={printRef}>
          {/* Header */}
          <div className="off-pdf-header">
            <div className="off-pdf-client">
              <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>{data.klient.nazwa}</div>
              {data.klient.nip && <div>NIP: {data.klient.nip}</div>}
              <div>e-mail:</div>
              <div>tel:</div>
            </div>
            <div className="off-pdf-info">
              <div style={{display:'grid',gridTemplateColumns:'120px 1fr',gap:'3px 12px'}}>
                <span className="label">Nazwa:</span><strong>{data.nazwa}</strong>
                <span className="label">Numer oferty</span><span>{data.nrOferty}</span>
                <span className="label">Data sporządzenia oferty:</span><span>{data.dataSporzeadzenia}</span>
                <span className="label">Strona:</span><span>{data.strona}</span>
              </div>
              <div style={{marginTop:16,border:'1px solid #ddd',padding:10}}>
                <div style={{display:'grid',gridTemplateColumns:'140px 1fr',gap:'4px 8px',fontSize:12}}>
                  <span>Kierownik projektu:</span><strong>{data.kierownikProjektu}</strong>
                  <span>tel:</span><span>{data.tel}</span>
                  <span>e-mail:</span>
                  <div style={{display:'flex',gap:6}}>
                    {[1,2,3,4,5,6].map(i=><span key={i} style={{width:8,height:8,borderRadius:'50%',background:i<=3?'#22c55e':'#000',display:'inline-block'}}/>)}
                  </div>
                  <span>Nazwa projektu:</span><strong>{data.nazwa}</strong>
                  <span>Mejsce i adres:</span><span></span>
                  <span>Początek</span><span>Koniec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transport */}
          <div className="section-header transport-header" style={{background:'#1d4ed8',color:'#fff',padding:'6px 12px',fontWeight:700,fontSize:13}}>Transport</div>
          <table>
            <thead>
              <tr>
                <th>Samochód</th><th>Opis</th><th>Liczba</th><th>Przelicznik</th><th>Cena</th><th>Razem netto</th>
              </tr>
            </thead>
            <tbody>
              {['Montaż','Demontaż'].map(etap => (
                <>
                  <tr key={etap}><td colSpan={6} className="etap-row" style={{background:'#e8e8e8',fontWeight:700,textAlign:'center'}}>{etap}</td></tr>
                  {data.transport.filter(t=>t.etap===etap).map((t,i)=>(
                    <tr key={i}>
                      <td>{t.nazwa}</td><td></td><td>{t.liczba}</td>
                      <td>{t.przelicznik}</td><td>{t.cena},00</td><td style={{textAlign:'right'}}>{fmt(t.razem)}</td>
                    </tr>
                  ))}
                </>
              ))}
              <tr style={{background:'#f0f0f0',fontWeight:700}}>
                <td colSpan={5}><strong>Łącznie Transport</strong></td>
                <td style={{textAlign:'right'}}><strong>{fmt(totalTransport)}</strong></td>
              </tr>
            </tbody>
          </table>

          {/* Obsługa techniczna */}
          <div style={{background:'#dc2626',color:'#fff',padding:'6px 12px',fontWeight:700,fontSize:13}}>Obsługa techniczna</div>
          <table>
            <thead>
              <tr><th>Nazwa</th><th>Opis</th><th>Cena</th><th>Liczba</th><th>Okres</th><th>Razem netto</th></tr>
            </thead>
            <tbody>
              {['Montaż','Demontaż'].map(etap => (
                <>
                  <tr key={etap}><td colSpan={6} style={{background:'#e8e8e8',fontWeight:700,textAlign:'center'}}>{etap}</td></tr>
                  {data.obsluga.filter(o=>o.etap===etap).map((o,i)=>(
                    <tr key={i}>
                      <td>{o.nazwa}</td><td></td>
                      <td>{o.cena},00 zł</td><td>{o.liczba}</td><td>{o.okres}</td>
                      <td style={{textAlign:'right'}}>{fmt(o.razem)}</td>
                    </tr>
                  ))}
                </>
              ))}
              <tr style={{background:'#f0f0f0',fontWeight:700}}>
                <td colSpan={5}><strong>Łącznie Obsługa techniczna</strong></td>
                <td style={{textAlign:'right'}}><strong>{fmt(totalObsluga)}</strong></td>
              </tr>
            </tbody>
          </table>

          {/* Inne */}
          <div style={{background:'#f97316',color:'#fff',padding:'6px 12px',fontWeight:700,fontSize:13}}>Inne</div>
          <table>
            <thead>
              <tr><th>Nazwa</th><th>Cena</th><th>Liczba</th><th></th><th>Razem netto</th></tr>
            </thead>
            <tbody>
              {data.inne.map((item,i) => (
                <tr key={i}>
                  <td>{item.nazwa}</td>
                  <td>{fmt(item.cena)}</td>
                  <td>{item.liczba}</td>
                  <td></td>
                  <td style={{textAlign:'right'}}>{fmt(item.razem)}</td>
                </tr>
              ))}
              <tr style={{background:'#f0f0f0',fontWeight:700}}>
                <td colSpan={4}><strong>Łącznie inne</strong></td>
                <td style={{textAlign:'right'}}><strong>{fmt(totalInne)}</strong></td>
              </tr>
            </tbody>
          </table>

          {/* Grand total */}
          <table>
            <tbody>
              <tr style={{background:'#f0f0f0',fontWeight:700,fontSize:13}}>
                <td><strong>Podsumowanie</strong></td>
                <td style={{textAlign:'right'}}><strong>{fmt(grand)}</strong></td>
              </tr>
            </tbody>
          </table>

          {/* Summary */}
          <div style={{marginTop:20,display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <div style={{border:'1px solid #ddd',padding:12}}>
              <div style={{fontWeight:700,marginBottom:8}}>Podsumowanie kosztów: {data.nazwa}</div>
              {[
                ['Koszt sprzętu:','0,00 zł'],
                ['Koszt transportu:',fmt(totalTransport)],
                ['Koszt obsługi:',fmt(totalObsluga)],
                ['Inne koszty:',fmt(totalInne)],
              ].map(([k,v])=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'3px 0',borderBottom:'1px solid #eee',fontSize:12}}>
                  <span>{k}</span><strong>{v}</strong>
                </div>
              ))}
            </div>
            <div style={{border:'1px solid #ddd',padding:12}}>
              <div style={{fontWeight:700,marginBottom:8}}>Uwagi do sprzętu:</div>
              {[['Całkowita objętość:','0 m³'],['Całkowita waga netto:','0 kg'],['Całkowita moc:','0 W']].map(([k,v])=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'3px 0',fontSize:12}}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="off-pdf-footer">
            <div>Kierownik projektu:</div>
            <div>{data.kierownikProjektu}</div>
            <div>{data.email}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
