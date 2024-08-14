import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { Configuration, IngredientApi } from '../api/generated'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN

export const useGetAllIngredients = () => {
    const config: Configuration = {
        accessToken: ACCESS_TOKEN,
        basePath: API_BASE_URL,
        isJsonMime: () => {
            return true
        },
    }
    const ingredientAPI = new IngredientApi(config)

    const getAllIngredients = useCallback(async () => {
        return ingredientAPI
            .getAllIngredientsGet()
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error
            })
    }, [])

    const { data: allIngredients, isLoading: isLoadingAllIngredients } =
        useQuery({ queryKey: ['allIngredients'], queryFn: getAllIngredients })

    return { allIngredients, isLoadingAllIngredients }
}
