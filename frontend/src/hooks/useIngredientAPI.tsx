import { useCallback } from 'react'
import { Configuration, IngredientApi } from '../api/generated'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useIngredientAPI = () => {
    // const { showBoundary } = useErrorBoundary()
    const config: Configuration = {
        accessToken: '',
        basePath: API_BASE_URL,
        isJsonMime: () => {
            return true
        },
    }
    const ingredientAPI = new IngredientApi(config)

    const getAllIngredients = useCallback(async () => {
        return ingredientAPI.getAllIngredientsGet().catch((error) => {
            throw error
            // showBoundary(error)
        })
    }, [])

    const getIngredient = useCallback(async (id: string) => {
        return ingredientAPI.getOneIngredientsIdGet(id).catch((error) => {
            throw error
            // showBoundary(error)
        })
    }, [])

    return { getAllIngredients, getIngredient }
}
