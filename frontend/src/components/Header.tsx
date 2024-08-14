import { Button, Drawer } from '@mui/material'
import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { useScreenWidth } from '../hooks/useScreenWidth'

export const Header = () => {
    const navigate = useNavigate()
    const { width } = useScreenWidth()
    const [open, setOpen] = useState<boolean>(false)

    const SCREEN_WIDTH_LIMIT = 800

    const toggleDrawer = () => () => {
        setOpen(!open)
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
                                disabled
                                variant="contained"
                                color="lightGreen"
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
                            open={open}
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
                                    to="/cocktails"
                                    className="text-xl pb-2"
                                    onClick={toggleDrawer()}
                                >
                                    Cocktail Recipes
                                </Link>
                            </div>
                        </Drawer>
                    </div>
                )}
            </div>
        </div>
    )
}
