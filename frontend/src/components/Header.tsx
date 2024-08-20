import { Button, Drawer } from '@mui/material'

import { useContext, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useScreenWidth } from '../hooks/useScreenWidth'
import { loginRedirectUrl } from '../utils/authUtils'

// auth

export const Header = () => {
    const navigate = useNavigate()
    const { width } = useScreenWidth()
    const { isAuthenticated, signOut } = useContext(AuthContext)
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
                                    if (!isAuthenticated) {
                                        await open(loginRedirectUrl)
                                    } else {
                                        signOut()
                                    }
                                }}
                            >
                                {isAuthenticated ? 'Sign out' : 'Sign in'}
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
