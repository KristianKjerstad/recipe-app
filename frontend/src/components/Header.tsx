import { Button, Drawer } from '@mui/material'
import { Client, LoginAuthQueryParams } from '@vippsmobilepay/sdk'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { useScreenWidth } from '../hooks/useScreenWidth'

// auth

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
const redirectUrl = `${config.authorization_endpoint}?${searchParams}`

export const Header = () => {
    const navigate = useNavigate()
    const { width } = useScreenWidth()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const SCREEN_WIDTH_LIMIT = 800

    const toggleDrawer = () => () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div className="flex justify-between align-center items-center drop-shadow-lg  bg-[#DFDFDF] w-[100%] pt-8 pl-10 pr-10 pb-6">
                <img
                    className="cursor-pointer"
                    src="/logo.png"
                    width="150"
                    height="55"
                    alt="logo"
                    onClick={() => navigate('/')}
                />
                {width >= SCREEN_WIDTH_LIMIT ? (
                    <>
                        <div className="flex gap-8">
                            <Link to="/">Home</Link>
                            <Link to="/food">Food Recipes</Link>
                            <Link to="/cocktails">Cocktail Recipes</Link>
                        </div>
                        <div>
                            <Button
                                size="large"
                                variant="contained"
                                color="lightGreen"
                                onClick={async () => {
                                    await open(redirectUrl)
                                }}
                            >
                                Sign In
                            </Button>
                        </div>
                    </>
                ) : (
                    <div>
                        <RxHamburgerMenu
                            size={24}
                            className="cursor-pointer"
                            onClick={toggleDrawer()}
                        />
                        <Drawer
                            open={isOpen}
                            onClose={toggleDrawer()}
                            anchor="right"
                        >
                            <div className="flex flex-col text-left pt-10 pl-6 pr-6">
                                <Link
                                    to="/"
                                    className="text-xl pb-2"
                                    onClick={toggleDrawer()}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/food"
                                    className="text-xl pb-2"
                                    onClick={toggleDrawer()}
                                >
                                    Food Recipes
                                </Link>
                                <Link
                                    to="/all-foods"
                                    className="text-xl pb-2"
                                    onClick={toggleDrawer()}
                                >
                                    &ensp;&ensp;All Food Recipes
                                </Link>
                                <Link
                                    to="/cocktails"
                                    className="text-xl pb-2"
                                    onClick={toggleDrawer()}
                                >
                                    Cocktail Recipes
                                </Link>
                                <Link
                                    to="/all-cocktails"
                                    className="text-xl pb-2"
                                    onClick={toggleDrawer()}
                                >
                                    &ensp;&ensp;All Cocktail Recipes
                                </Link>
                            </div>
                        </Drawer>
                    </div>
                )}
            </div>
        </div>
    )
}
