import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Recipe } from '../api/generated'
import { useRecipeAPI } from '../hooks/useRecipeAPI'

const stockImageUrl =
    'https://media.istockphoto.com/id/490361148/photo/still-life-pour-or-whiskey-in-to-glass.jpg?s=612x612&w=0&k=20&c=UytyI5Bn9m73gO5grR3jdJMHTO_-GWqLyqlVobxiIME='

export const CocktailRecipePage = () => {
    const { id: recipeId } = useParams()

    const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)
    const { getRecipe } = useRecipeAPI()

    useEffect(() => {
        getRecipe(recipeId ?? '').then((recipeResponse) => {
            setRecipe(recipeResponse.data)
        })
    }, [getRecipe])
    if (!recipe) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h1>{recipe.name}</h1>
            <img src={stockImageUrl} />
            <h2>Ingredients:</h2>
            <ul>
                {recipe.ingredient_ids?.map((id, index) => {
                    return <li key={index}>* {id}</li>
                })}
            </ul>
            <br />
            <h2>Steps:</h2>
            <ol>
                {recipe.recipe_steps?.map((instruction, index) => {
                    return (
                        <li key={index}>
                            {index + 1}. {instruction}
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}
