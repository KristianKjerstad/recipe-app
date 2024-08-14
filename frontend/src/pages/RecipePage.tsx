import { CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Ingredient, RecipeIngredient } from '../api/generated'
import { useGetAllIngredients } from '../hooks/useGetAllIngredients'
import { useGetRecipe } from '../hooks/useGetRecipe'

const stockImageUrl =
    'https://media.istockphoto.com/id/490361148/photo/still-life-pour-or-whiskey-in-to-glass.jpg?s=612x612&w=0&k=20&c=UytyI5Bn9m73gO5grR3jdJMHTO_-GWqLyqlVobxiIME='

export const RecipePage = () => {
    const { id: recipeId } = useParams()

    const { recipe, isLoadingRecipe } = useGetRecipe(recipeId ?? '')
    const { allIngredients, isLoadingAllIngredients } = useGetAllIngredients()

    const h2Styling = 'text-xl font-medium pt-12 pb-2'
    const listContainerStyling = 'inline-block text-left min-w-96 pl-8 pr-8'

    if (
        isLoadingRecipe ||
        !recipe ||
        isLoadingAllIngredients ||
        !allIngredients
    ) {
        return (
            <div className="pt-40">
                <CircularProgress />
            </div>
        )
    } else {
        return (
            <div className="">
                <div className="flex items-center justify-center pt-8 pb-8">
                    <img
                        className="lg:w-72 lg:h-72 "
                        alt={recipe.name}
                        src={recipe.image_link ?? stockImageUrl}
                    />
                </div>
                <h1 className="text-3xl font-semibold">{recipe.name}</h1>

                <h2 className={h2Styling}>Ingredients needed:</h2>
                <div className={listContainerStyling}>
                    {recipe.ingredients?.map(
                        (recipeIngredient: RecipeIngredient, index) => {
                            return (
                                <li key={index}>
                                    {
                                        allIngredients.find(
                                            (ingredient: Ingredient) => {
                                                return (
                                                    ingredient.id ===
                                                    recipeIngredient.ingredient_uuid
                                                )
                                            }
                                        )?.name
                                    }
                                </li>
                            )
                        }
                    )}
                </div>
                <br />
                <h2 className={h2Styling}>How to make it:</h2>
                <div className={listContainerStyling + ' pb-36'}>
                    {recipe.recipe_steps?.map((instruction, index) => {
                        return (
                            <div key={index}>
                                <p className="font-semibold">
                                    Step {index + 1}
                                </p>
                                {index + 1}. {instruction}
                                <p>&nbsp;</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
