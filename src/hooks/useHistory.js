import { useState } from 'react'
import { getChronology } from '../services/functions'

export function useHistory() {
    const [history, setHistory] = useState()
    const [error, setError] = useState(null)

    const getHistory = async () => {
        try {
            setError(null)
            const newHistory = await getChronology()
            setHistory(newHistory)
        } catch (e) {
            setError(e.message)
        }
    }

    return{ history, getHistory, error }
    
}