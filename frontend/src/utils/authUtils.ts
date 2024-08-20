import { Client, LoginAuthQueryParams } from '@vippsmobilepay/sdk'
import axios, { AxiosResponse } from 'axios'

const merchantSerialNumber: string =
    import.meta.env.VITE_MERCHANT_SERIAL_NUMBER || 'None'
const subscriptionKey: string = import.meta.env.VITE_SUBSCRIPTION_KEY || 'None'
const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID || 'None'
const CLIENT_SECRET: string = import.meta.env.VITE_CLIENT_SECRET || 'None'

// Create a client
const client = Client({
    merchantSerialNumber,
    subscriptionKey,
    useTestMode: true,
    retryRequests: false,
})

const config = await axios
    .get(
        'https://apitest.vipps.no/access-management-1.0/access/.well-known/openid-configuration'
    )
    .then((response: AxiosResponse) => {
        return response.data
    })
    .catch((error) => {
        console.error('😟 Error discovering configuration 😟')
        console.error(error)
    })

const queryParameters: LoginAuthQueryParams = {
    client_id: CLIENT_ID,
    redirect_uri: 'http://localhost:5173/auth',
    scope: 'openid name phoneNumber address birthDate',
    response_type: 'code',
    state: crypto.randomUUID(),
}
const searchParams = Object.entries(queryParameters)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')
export const loginRedirectUrl = `${config.authorization_endpoint}?${searchParams}`
