import { useCallback } from 'react'
import { Configuration, RecipeApi } from '../api/generated'

const API_BASE_URL = 'http://localhost:5000'

export const useRecipeAPI = () => {
    const config: Configuration = {
        accessToken: '',
        basePath: API_BASE_URL,
        isJsonMime: () => {
            return true
        },
    }
    const recipeAPI = new RecipeApi(config)

    const getAllRecipes = useCallback(async () => {
        return recipeAPI.getAllRecipesGet().catch((error) => {
            throw error
        })
    }, [])

    return { getAllRecipes }
}
