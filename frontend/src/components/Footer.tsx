import { Link, useNavigate } from 'react-router-dom'
import { useScreenWidth } from '../hooks/useScreenWidth'

export const Footer = () => {
    const navigate = useNavigate()

    const { width } = useScreenWidth()
    const SCREEN_WIDTH_LIMIT = 1000

    return (
        <div className=" bg-[#272838] text-white w-[100%] pt-8 pb-6">
            <div>
                {width >= SCREEN_WIDTH_LIMIT ? (
                    <div className="flex justify-between align-center items-center pl-80 pr-80 pb-4 ">
                        <img
                            className="cursor-pointer"
                            src="/logo-w.png"
                            width="150"
                            height="55"
                            alt="logo"
                            onClick={() => navigate('/')}
                        />
                        <div className="flex flex-col text-left">
                            <Link to="/">Home</Link>
                            <Link to="/blog">Blog</Link>
                            <Link to="/about-us">About Us</Link>
                            <Link to="/privacy-policy">Privacy Policy</Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col text-center pb-4">
                        <Link to="/">Home</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/about-us">About Us</Link>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </div>
                )}
            </div>
            <div>Copyright @ {new Date().getFullYear()}</div>
        </div>
    )
}
