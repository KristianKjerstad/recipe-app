import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const navigate = useNavigate()

    return (
        <div>
            <img
                src="../src/assets/logo.png"
                width="150"
                height="55"
                alt="logo"
                onClick={() => navigate('/')}
            />
        </div>
    )
}
