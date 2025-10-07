import { useState } from 'react'
import { getChronology, getDragons, getLaunches, getRockets } from '../services/functions'

export function useData() {
    const [data, setData] = useState()
    const [_error, setError] = useState(null)

    const getData = async (tab) => {
        const getFunction = () => {
            if (tab === 0) {
                return getChronology()
            } else if (tab === 1) {
                return getRockets()
            } else if (tab === 2) {
                return getDragons()
            } else if (tab === 3) {
                return getLaunches()
            }
        }

        try {
            setError(null)
            const newData = await getFunction()
            setData(newData)
        } catch (e) {
            setError(e.message)
        }
    }

    return{ data, getData, _error }
    
}