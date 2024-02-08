import { useCallback } from 'react'
import { Configuration, RecipeApi } from '../api/generated'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN

export const useRecipeAPI = () => {
    // const { showBoundary } = useErrorBoundary()
    const config: Configuration = {
        accessToken: ACCESS_TOKEN,
        basePath: API_BASE_URL,
        isJsonMime: () => {
            return true
        },
    }
    const recipeAPI = new RecipeApi(config)

    const getAllRecipes = useCallback(async () => {
        return recipeAPI.getAllRecipesGet().catch((error) => {
            throw error
            // showBoundary(error)
        })
    }, [])

    const getRecipe = useCallback(async (recipeId: string) => {
        return recipeAPI.getOneRecipesIdGet(recipeId).catch((error) => {
            throw error
            // showBoundary(error)
        })
    }, [])

    return { getAllRecipes, getRecipe }
}
