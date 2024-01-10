import { useNavigate } from 'react-router-dom'
import { Recipe } from '../api/generated'

type RecipeCardProps = {
    recipe: Recipe
}

const stockImageUrl =
    'https://media.istockphoto.com/id/490361148/photo/still-life-pour-or-whiskey-in-to-glass.jpg?s=612x612&w=0&k=20&c=UytyI5Bn9m73gO5grR3jdJMHTO_-GWqLyqlVobxiIME='

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
    const navigate = useNavigate()

    return (
        <div
            className="w-48 h-64 bg-white rounded-3xl drop-shadow-xl cursor-pointer font-semibold"
            onClick={() => {
                navigate(`/recipe/${recipe.id}`)
            }}
        >
            <img className="w-48 h-48" src={stockImageUrl} />
            <h1 className="text-black text-xl pt-2">{recipe.name}</h1>
        </div>
    )
}
