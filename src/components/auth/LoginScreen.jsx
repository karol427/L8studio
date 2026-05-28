import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react'

export default function LoginScreen() {
  const { login, register, resetPassword } = useAuth()
  const [mode,     setMode]     = useState('login') // login | register | reset
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [name,     setName]     = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState('')

  const errorMap = {
    'auth/user-not-found':      'Nie znaleziono konta z tym adresem e-mail.',
    'auth/wrong-password':      'Błędne hasło.',
    'auth/invalid-credential':  'Błędny e-mail lub hasło.',
    'auth/email-already-in-use':'Ten adres e-mail jest już zajęty.',
    'auth/weak-password':       'Hasło musi mieć co najmniej 6 znaków.',
    'auth/invalid-email':       'Nieprawidłowy adres e-mail.',
    'auth/too-many-requests':   'Zbyt wiele prób. Spróbuj za chwilę.',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess(''); setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else if (mode === 'register') {
        if (!name.trim()) { setError('Podaj imię i nazwisko'); setLoading(false); return }
        await register(email, password, name)
      } else {
        await resetPassword(email)
        setSuccess('Link do resetu hasła został wysłany na Twój e-mail.')
      }
    } catch (err) {
      setError(errorMap[err.code] || `Błąd: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-body)', padding: 20,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(0,255,65,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,65,0.03) 1px,transparent 1px)',backgroundSize:'60px 60px',pointerEvents:'none'}}/>

      {/* Glow */}
      <div style={{position:'absolute',top:'30%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:600,background:'radial-gradient(circle,rgba(0,255,65,0.06) 0%,transparent 60%)',pointerEvents:'none'}}/>

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 420,
        background: 'var(--bg-card)',
        border: '1px solid var(--green-border)',
        borderRadius: 12,
        boxShadow: '0 0 40px rgba(0,255,65,0.08), 0 20px 60px rgba(0,0,0,0.5)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{padding:'28px 32px 20px',borderBottom:'1px solid var(--border-default)',textAlign:'center',background:'rgba(0,0,0,0.2)'}}>
          <img src="/logo-l8.png" alt="L8 Studio" style={{width:60,height:60,objectFit:'contain',filter:'drop-shadow(0 0 12px rgba(0,255,65,0.6))',marginBottom:12}}/>
          <div style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:700,color:'var(--green-primary)',letterSpacing:'0.15em'}}>L8 STUDIO</div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--text-muted)',letterSpacing:'0.25em',marginTop:2}}>EVENT MANAGEMENT SYSTEM</div>
        </div>

        {/* Form */}
        <div style={{padding:'24px 32px 28px'}}>
          <h2 style={{fontSize:16,fontWeight:700,color:'var(--text-primary)',marginBottom:20,fontFamily:'var(--font-display)',letterSpacing:'0.05em'}}>
            {mode === 'login'    && 'Zaloguj się'}
            {mode === 'register' && 'Utwórz konto'}
            {mode === 'reset'    && 'Reset hasła'}
          </h2>

          {error && (
            <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(255,51,51,0.1)',border:'1px solid rgba(255,51,51,0.3)',borderRadius:6,padding:'10px 12px',marginBottom:14,fontSize:13,color:'#ff6b6b'}}>
              <AlertCircle size={14} style={{flexShrink:0}}/> {error}
            </div>
          )}
          {success && (
            <div style={{background:'rgba(0,255,65,0.1)',border:'1px solid var(--green-border)',borderRadius:6,padding:'10px 12px',marginBottom:14,fontSize:13,color:'var(--green-primary)'}}>
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:12}}>
            {mode === 'register' && (
              <div style={{position:'relative'}}>
                <User size={15} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text-muted)'}}/>
                <input type="text" value={name} onChange={e=>setName(e.target.value)}
                  placeholder="Imię i nazwisko"
                  style={{width:'100%',background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:6,padding:'10px 12px 10px 36px',fontSize:13,boxSizing:'border-box'}}/>
              </div>
            )}

            <div style={{position:'relative'}}>
              <Mail size={15} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text-muted)'}}/>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="Adres e-mail" required
                style={{width:'100%',background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:6,padding:'10px 12px 10px 36px',fontSize:13,boxSizing:'border-box'}}/>
            </div>

            {mode !== 'reset' && (
              <div style={{position:'relative'}}>
                <Lock size={15} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text-muted)'}}/>
                <input type={showPass?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)}
                  placeholder="Hasło" required
                  style={{width:'100%',background:'var(--bg-secondary)',border:'1px solid var(--border-default)',color:'var(--text-primary)',borderRadius:6,padding:'10px 40px 10px 36px',fontSize:13,boxSizing:'border-box'}}/>
                <button type="button" onClick={()=>setShowPass(s=>!s)}
                  style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer',padding:0}}>
                  {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{background:'var(--green-primary)',color:'#000',fontWeight:700,fontSize:14,fontFamily:'var(--font-display)',letterSpacing:'0.06em',padding:'12px',borderRadius:6,border:'none',cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1,marginTop:4,transition:'all 0.15s',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
              {loading && <span style={{width:14,height:14,border:'2px solid rgba(0,0,0,0.3)',borderTopColor:'#000',borderRadius:'50%',display:'inline-block',animation:'spin 0.7s linear infinite'}}/>}
              {mode === 'login'    && (loading ? 'Logowanie...'       : 'Zaloguj się')}
              {mode === 'register' && (loading ? 'Tworzenie konta...' : 'Utwórz konto')}
              {mode === 'reset'    && (loading ? 'Wysyłanie...'       : 'Wyślij link')}
            </button>
          </form>

          {/* Footer links */}
          <div style={{marginTop:16,display:'flex',flexDirection:'column',gap:6,alignItems:'center'}}>
            {mode === 'login' && <>
              <button onClick={()=>{setMode('reset');setError('');setSuccess('')}}
                style={{background:'none',border:'none',color:'var(--text-muted)',fontSize:12,cursor:'pointer'}}>
                Zapomniałem hasła
              </button>
              <button onClick={()=>{setMode('register');setError('');setSuccess('')}}
                style={{background:'none',border:'none',color:'var(--green-primary)',fontSize:12,cursor:'pointer',fontWeight:600}}>
                Nie masz konta? Zarejestruj się
              </button>
            </>}
            {(mode === 'register' || mode === 'reset') && (
              <button onClick={()=>{setMode('login');setError('');setSuccess('')}}
                style={{background:'none',border:'none',color:'var(--green-primary)',fontSize:12,cursor:'pointer',fontWeight:600}}>
                ← Wróć do logowania
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
