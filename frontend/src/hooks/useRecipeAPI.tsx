import { useCallback } from 'react'
import { Configuration, RecipeApi } from '../api/generated'

import { useErrorBoundary } from 'react-error-boundary'
const API_BASE_URL = 'http://localhost:5000'

export const useRecipeAPI = () => {
    const { showBoundary } = useErrorBoundary()
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
            showBoundary(error)
        })
    }, [])

    const getRecipe = useCallback(async (recipeId: string) => {
        return recipeAPI.getOneRecipesIdGet(recipeId).catch((error) => {
            showBoundary(error)
        })
    }, [])

    return { getAllRecipes, getRecipe }
}
