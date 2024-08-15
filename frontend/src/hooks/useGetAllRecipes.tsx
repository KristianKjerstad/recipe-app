import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import {
    Configuration,
    Recipe,
    RecipeApi,
    RecipeCategories,
} from '../api/generated'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN

export const useGetAllRecipes = (category?: RecipeCategories) => {
    const config: Configuration = {
        accessToken: ACCESS_TOKEN,
        basePath: API_BASE_URL,
        isJsonMime: () => {
            return true
        },
    }
    const recipeAPI = new RecipeApi(config)
    const getAllRecipes = useCallback(async (category?: RecipeCategories) => {
        return await recipeAPI
            .getAllRecipesGet(category)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error
            })
    }, [])
    const { data: allRecipes, isLoading: isLoadingAllRecipes } = useQuery<
        Recipe[]
    >({
        queryKey: ['allRecipes', category],
        queryFn: () => getAllRecipes(category),
    })

    return { allRecipes, isLoadingAllRecipes }
}
