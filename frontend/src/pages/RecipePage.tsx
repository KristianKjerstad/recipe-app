import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Ingredient, Recipe } from '../api/generated'
import { useIngredientAPI } from '../hooks/useIngredientAPI'
import { useRecipeAPI } from '../hooks/useRecipeAPI'

const stockImageUrl =
    'https://media.istockphoto.com/id/490361148/photo/still-life-pour-or-whiskey-in-to-glass.jpg?s=612x612&w=0&k=20&c=UytyI5Bn9m73gO5grR3jdJMHTO_-GWqLyqlVobxiIME='

export const RecipePage = () => {
    const { id: recipeId } = useParams()

    const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const { getRecipe } = useRecipeAPI()
    const { getAllIngredients } = useIngredientAPI()

    const h2Styling = 'text-xl font-medium pt-12 pb-2'
    const listContainerStyling = 'inline-block text-left min-w-96 pl-8 pr-8'

    useEffect(() => {
        getRecipe(recipeId ?? '').then((recipeResponse) => {
            setRecipe(recipeResponse.data)
        })
    }, [getRecipe])

    useEffect(() => {
        getAllIngredients().then((ingredientsResponse) => {
            setIngredients(ingredientsResponse.data)
        })
    }, [getAllIngredients])

    if (!recipe) {
        return <div>Loading...</div>
    }
    return (
        <div className="">
            <div className="flex items-center justify-center pt-8 pb-8">
                <img
                    className="lg:w-96 lg:h-72 "
                    alt={recipe.name}
                    src={stockImageUrl}
                />
            </div>
            <h1 className="text-3xl font-semibold">{recipe.name}</h1>

            <h2 className={h2Styling}>Ingredients:</h2>
            <div className={listContainerStyling}>
                {recipe.ingredient_ids?.map((id, index) => {
                    return (
                        <li key={index}>
                            {
                                ingredients.find((ingredient: Ingredient) => {
                                    return ingredient.id === id
                                })?.name
                            }
                        </li>
                    )
                })}
            </div>
            <br />
            <h2 className={h2Styling}>How to make it:</h2>
            <div className={listContainerStyling}>
                {recipe.recipe_steps?.map((instruction, index) => {
                    return (
                        <div key={index}>
                            {index + 1}. {instruction}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
