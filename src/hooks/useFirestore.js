import { useState, useEffect, useCallback } from 'react'
import {
  collection, doc, onSnapshot, addDoc, updateDoc,
  deleteDoc, setDoc, query, orderBy, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

// ─── UNIVERSAL CRUD HOOK ──────────────────────────────────────────────────────
// Używaj: const { items, add, update, remove, loading } = useCollection('kontrahenci')
export function useCollection(collectionName, orderByField = 'createdAt') {
  const { user } = useAuth()
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  // Ścieżka: /users/{userId}/{collectionName}
  const colRef = useCallback(() => {
    if (!user) return null
    return collection(db, 'users', user.uid, collectionName)
  }, [user, collectionName])

  // Subskrypcja realtime
  useEffect(() => {
    if (!user) { setLoading(false); return }
    const ref = colRef()
    if (!ref) return

    setLoading(true)
    let q
    try {
      q = query(ref, orderBy(orderByField, 'desc'))
    } catch {
      q = ref
    }

    const unsub = onSnapshot(q,
      (snap) => {
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      (err) => {
        console.error(`Firestore [${collectionName}]:`, err)
        setError(err.message)
        setLoading(false)
      }
    )
    return unsub
  }, [user, collectionName, orderByField])

  // Dodaj dokument
  const add = useCallback(async (data) => {
    if (!user) return null
    const ref = colRef()
    const docRef = await addDoc(ref, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      userId:    user.uid,
    })
    return docRef.id
  }, [user, colRef])

  // Aktualizuj dokument
  const update = useCallback(async (id, data) => {
    if (!user) return
    const ref = doc(db, 'users', user.uid, collectionName, id)
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() })
  }, [user, collectionName])

  // Ustaw dokument (nadpisz)
  const set = useCallback(async (id, data) => {
    if (!user) return
    const ref = doc(db, 'users', user.uid, collectionName, id)
    await setDoc(ref, { ...data, updatedAt: serverTimestamp(), userId: user.uid }, { merge: true })
  }, [user, collectionName])

  // Usuń dokument
  const remove = useCallback(async (id) => {
    if (!user) return
    const ref = doc(db, 'users', user.uid, collectionName, id)
    await deleteDoc(ref)
  }, [user, collectionName])

  return { items, loading, error, add, update, set, remove }
}

// ─── HOOK DLA USTAWIEŃ (singleton) ───────────────────────────────────────────
export function useSettings() {
  const { user } = useAuth()
  const [settings, setSettings] = useState({})
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    if (!user) return
    const ref = doc(db, 'users', user.uid, 'config', 'settings')
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setSettings(snap.data())
      setLoading(false)
    })
    return unsub
  }, [user])

  const saveSettings = useCallback(async (data) => {
    if (!user) return
    const ref = doc(db, 'users', user.uid, 'config', 'settings')
    await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true })
  }, [user])

  return { settings, loading, saveSettings }
}
