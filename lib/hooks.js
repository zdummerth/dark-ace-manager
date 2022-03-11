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

export function useLeague(id) {
    const { data, error, mutate } = useSWR(`/api/league/${id}`, fetcher, {
        errorRetryCount: 2,
    })
    // console.log('league data', data)

    return {
        league: data,
        loading: !data && !error,
        error,
        mutate,
    }
}

export function useLeagueMutations(id) {
    const route = `/api/league/${id}`

    const { mutate: globalMutate } = useSWRConfig()
    const defaultState = {
        updating: [],
        error: null
    }

    const [state, setState] = useState(defaultState)

    const createPlayer = async data => {
        try {
            const response = await fetcher(route, 'PUT', data)
            console.log('created player', response)

            const listData = {
                _id: response._id,
                handle: response.handle
            }
            await mutate(route, response, false)
            await mutate('/api/shops', async prev => (
                [listData, ...prev]
            ), false)

            setState(defaultState)
        } catch (e) {
            setState({
                updating: false,
                error: e,
            })
        }
    }

    return {
        createPlayer,
        error: state.error,
        updating: state.updating
    }
}

export function useShopifyCustomers() {
    const { data, error, mutate } = useSWR('/api/shopify/customers', fetcher, {
        errorRetryCount: 2,
    })
    console.log('customers data', data)

    return {
        customers: data,
        loading: !data && !error,
        error,
        mutate,
    }
}

export function useShopifyCustomerMutations() {
    const seed = async () => {
        const seeded = await fetcher('/api/shopify/seed-customers')
    }

    const registerWebhook = async () => {
        await fetcher('/api/shopify/webhooks/process')
    }

    return {
        seed,
        registerWebhook
    }
}

export function useTwilio() {
    const defaultState = {
        updating: false,
        error: null,
        submitted: false
    }

    const [state, setState] = useState(defaultState)
    const sendMsg = async ({ msg, numbers }) => {
        try {
            setState({
                updating: true,
                error: false,
                submitted: false
            })
            await fetcher('/api/twilio/sendsms', 'POST', { msg, numbers })
            setState({
                updating: false,
                error: false,
                submitted: true
            })
        }
        catch (e) {
            console.log('send twilio message error', e)
            setState({
                updating: false,
                error: e,
                submitted: false
            })
        }
    }

    return {
        sendMsg,
        updating: state.updating,
        error: state.error,
        submitted: state.submitted,
        setState
    }
}