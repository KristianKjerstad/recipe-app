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
        <div>
            <h1 className="text-4xl pt-8 pb-8">Recipe Finder</h1>
            <p>Find your next recipe based on your available ingredients</p>
            <div className="flex flex-row justify-center space-x-16 pt-8 ">
                <Button
                    size="large"
                    variant="contained"
                    color="orange"
                    startIcon={<LocalDiningOutlined />}
                    onClick={() => {
                        handleNavigation('food')
                    }}
                >
                    Food
                </Button>
                <Button
                    size="large"
                    variant="contained"
                    color="orange"
                    onClick={() => {
                        handleNavigation('drinks')
                    }}
                    startIcon={<LocalBarOutlined />}
                >
                    Drinks
                </Button>
            </div>
        </div>
    )
}
