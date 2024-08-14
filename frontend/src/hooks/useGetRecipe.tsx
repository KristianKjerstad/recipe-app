import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { Configuration, RecipeApi } from '../api/generated'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN

export const useGetRecipe = (recipeId: string) => {
    const config: Configuration = {
        accessToken: ACCESS_TOKEN,
        basePath: API_BASE_URL,
        isJsonMime: () => {
            return true
        },
    }
    const recipeAPI = new RecipeApi(config)

    const getRecipe = useCallback(async (recipeId: string) => {
        return await recipeAPI
            .getOneRecipesIdGet(recipeId)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error
            })
    }, [])

    const { data: recipe, isLoading: isLoadingRecipe } = useQuery({
        queryKey: ['allRecipes'],
        queryFn: () => getRecipe(recipeId),
    })

    return { recipe, isLoadingRecipe }
}
