import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Recipe } from '../api/generated'

type RecipeCardProps = {
    recipe: Recipe
}

const stockImageUrl =
    'https://www.acouplecooks.com/wp-content/uploads/2022/09/Limoncello-Spritz-0010.jpg'

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
    const navigate = useNavigate()
    const [width, setWidth] = useState(window.innerWidth)
    const SCREEN_WIDTH_LIMIT = 640

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <>
            {width < SCREEN_WIDTH_LIMIT && (
                <div
                    className="flex items-center w-[320px] h-[130px] bg-white drop-shadow-xl rounded-2xl cursor-pointer"
                    onClick={() => {
                        navigate(`/recipe/${recipe.id}`)
                    }}
                >
                    <img
                        className="w-[100px] h-[100px] rounded-md ml-4"
                        src={stockImageUrl}
                        alt="Random image"
                    />
                    <div className="">
                        <h2 className="text-black w-[160px] text-l font-bold pl-6">
                            {recipe.name}
                        </h2>
                    </div>
                </div>
            )}
            {width >= SCREEN_WIDTH_LIMIT && (
                <div
                    className="relative w-48 h-[248px] bg-white drop-shadow-xl rounded-md cursor-pointer"
                    onClick={() => {
                        navigate(`/recipe/${recipe.id}`)
                    }}
                >
                    <img
                        className="w-[192px] h-[192px] rounded-md"
                        src={stockImageUrl}
                        alt="Random image"
                    />
                    {/* <div className="absolute inset-0 opacity-60 rounded-md"></div> */}
                    <div className="absolute inset-0 flex items-center justify-center pt-32">
                        <h2 className="text-black bg-white w-[160px] text-xl font-bold rounded-none">
                            {recipe.name}
                        </h2>
                    </div>
                </div>
            )}
        </>
    )
}
