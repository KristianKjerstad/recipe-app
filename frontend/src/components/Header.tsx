import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {
    const navigate = useNavigate()

    return (
        <div className="flex justify-between drop-shadow-lg bg-[#DFDFDF] w-[100%] pt-8 pl-10 pr-10 pb-4">
            <img
                className="cursor-pointer"
                src="../src/assets/logo.png"
                width="150"
                height="55"
                alt="logo"
                onClick={() => navigate('/')}
            />
            <div className="flex gap-8">
                <Link to="/">Home</Link>
                <Link to="/">Food Recipes</Link>
                <Link to="/">Cocktail Recipes</Link>
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
        </div>
    )
}
