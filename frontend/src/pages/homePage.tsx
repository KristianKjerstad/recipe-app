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
            <h1>Recipe Finder</h1>
            <h3>Find your next recipe based on your available ingredients</h3>
            <div>
                <Button
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
