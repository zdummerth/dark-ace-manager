import useSWR, { useSWRConfig } from 'swr'
import { useState } from 'react'
import { Magic } from 'magic-sdk'



const fetcher = (url, method = 'GET', body) => fetch(url, {
    method,
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(body)
}).then(res => res.json())



export function useAuth() {

    const defaultState = {
        updating: false,
        error: null
    }
    const [state, setState] = useState(defaultState)

    const login = async email => {
        try {
            setState({
                updating: true,
                error: null,
            })
            const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
            const didToken = await magic.auth.loginWithMagicLink({ email })
            const response = await fetch('/api/auth/login', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + didToken,
                }
            })
            const json = await response.json()
            setState(defaultState)

        } catch (e) {
            console.log('login error', e)
            setState({
                updating: false,
                error: e,
            })
        }
    }

    const logout = async () => {
        try {
            setState({
                updating: true,
                error: null,
            })
            const response = await fetcher('/api/auth/logout')
            console.log('user logged out', response)
            setState(defaultState)
        } catch (e) {
            console.log('user logged out error', e)
            setState({
                updating: false,
                error: e,
            })
        }
    }

    return {
        login,
        logout,
        error: state.error,
        updating: state.updating
    }
}

export function useLeagues() {
    const { data, error, mutate } = useSWR('/api/leagues', fetcher, {
        errorRetryCount: 2,
    })
    console.log('leagues data', data)

    return {
        leagues: data,
        loading: !data && !error,
        error,
        mutate,
    }
}