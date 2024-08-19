import axios, { AxiosResponse } from 'axios'
import * as qs from 'qs'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
const merchantSerialNumber: string =
    import.meta.env.VITE_MERCHANT_SERIAL_NUMBER || 'None'
const subscriptionKey: string = import.meta.env.VITE_SUBSCRIPTION_KEY || 'None'
const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID || 'None'
const CLIENT_SECRET: string = import.meta.env.VITE_CLIENT_SECRET || 'None'
const combinedString = `${CLIENT_ID}:${CLIENT_SECRET}`
const clientCredentials = btoa(combinedString)

const getToken = (code: string) => {
    const auth_url = '/getAccessToken'
    const redirect_uri = 'http://localhost:5173/auth'

    const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
    }

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Basic ${clientCredentials}`,
        'Merchant-Serial-Number': merchantSerialNumber,
        'Vipps-System-Name': 'acme',
        'Vipps-System-Version': '3.1.2',
        'Vipps-System-Plugin-Name': 'acme-webshop',
        'Vipps-System-Plugin-Version': '4.5.6',
    }

    return axios
        .post(auth_url, qs.stringify(data), {
            headers: headers,
        })
        .then((response: AxiosResponse) => {
            console.log(response)
            return response.data.access_token as string
        })
        .catch((error) => {
            console.error(error)
            return ''
        })
}

const getUserInfo = async (token: string) => {
    const url = 'https://apitest.vipps.no/vipps-userinfo-api/userinfo'
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    return axios.get(url, { headers: headers }).then((response) => {
        return response.data
    })
}

export interface UserData {
    address: Address
    birthdate: Date
    family_name: string
    given_name: string
    name: string
    other_addresses: any[]
    phone_number: string
    sid: string
    sub: string
}

export interface Address {
    address_type: string
    country: string
    formatted: string
    postal_code: string
    region: string
    street_address: string
}

export const useAuth = () => {
    const [searchParams, _] = useSearchParams()
    const code = searchParams.get('code') || ''

    const [token, setToken] = useState<string>('')
    const [userData, setUserData] = useState<UserData | null>()

    useEffect(() => {
        if (code) {
            async function getTokenWrapper() {
                const token = await getToken(code)
                setToken(token)
            }
            getTokenWrapper()
        }
    }, [code])

    useEffect(() => {
        if (token) {
            console.log('getting user info with token ', token)
            async function getUserDataWrapper() {
                const userInfo = await getUserInfo(token)
                setUserData(userInfo)
            }
            getUserDataWrapper()
        }
    }, [token])

    return { userData }
}
