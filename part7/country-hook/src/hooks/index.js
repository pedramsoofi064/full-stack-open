import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name"


    useEffect(() => {
        if (!name) {
            return
        }
        const fetchData = async (name) => {
            try {
                const { data } = await axios.get(`${baseUrl}/${name}`)
                setCountry({ data, found: true })
            }
            catch {
                setCountry({ found: false })
            }
        }
        fetchData(name)
    }, [name])

    return country
}

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}