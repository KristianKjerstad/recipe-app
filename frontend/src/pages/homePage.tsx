import LocalBarOutlined from '@mui/icons-material/LocalBarOutlined'
import LocalDiningOutlined from '@mui/icons-material/LocalDiningOutlined'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
    const navigate = useNavigate()

    const handleNavigation = (newUrl: string) => {
        navigate(newUrl)
    }

    return (
        <div className="pl-8 pr-8">
            <h1 className="text-4xl pt-16 pb-8">Recipe Finder</h1>
            <p className="text-xl">
                Find your next recipe based on your available ingredients!
            </p>
            <div className="flex flex-col items-center gap-8 sm:flex-row justify-center sm:space-x-16 pt-16 ">
                <Button
                    className="w-[260px]"
                    size="large"
                    disabled
                    variant="contained"
                    color="lightGreen"
                    startIcon={<LocalDiningOutlined />}
                    onClick={() => {
                        handleNavigation('food')
                    }}
                >
                    Find Food Recipes
                </Button>
                <Button
                    className="w-[260px]"
                    size="large"
                    variant="contained"
                    color="lightGreen"
                    onClick={() => {
                        handleNavigation('cocktails')
                    }}
                    startIcon={<LocalBarOutlined />}
                >
                    Find Cocktail Recipes
                </Button>
            </div>
        </div>
    )
}
