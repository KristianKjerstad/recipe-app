import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Recipe, RecipeCategories } from '../api/generated'
import { RecipeCard } from '../components/RecipeCard'
import { useGetAllRecipes } from '../hooks/useGetAllRecipes'

const filterRecipesByName = (
    selectedRecipeName: string,
    allRecipes: Recipe[]
): Recipe[] => {
    if (selectedRecipeName === '') {
        return allRecipes
    }
    return allRecipes.filter((recipe) => {
        return recipe.name
            .toLocaleLowerCase()
            .includes(selectedRecipeName.toLocaleLowerCase())
    })
}

export const AllFoodsPage = () => {
    const { allRecipes } = useGetAllRecipes(RecipeCategories.Food)
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])

    const [selectedRecipeName, setSelectedRecipeName] = useState<string>('')

    useEffect(() => {
        if (allRecipes) {
            const filteredRecipes = filterRecipesByName(
                selectedRecipeName,
                allRecipes
            )
            setFilteredRecipes(filteredRecipes)
        }
    }, [selectedRecipeName, allRecipes])

    return (
        <div>
            <div className="flex flex-col justify-center items-center pl-8 pr-8">
                <h2 className="text-4xl font-medium pt-10 pb-8">
                    All Food Recipes
                </h2>
                <div className="w-3/4 min-w-[310px] max-w-[500px] bg-white">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                        id=" outlined-basic"
                        label="Recipe Name"
                        value={selectedRecipeName}
                        onChange={(e) => setSelectedRecipeName(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12 pt-24 pb-48">
                    {filteredRecipes.map((recipe) => {
                        return <RecipeCard recipe={recipe} />
                    })}
                </div>
            </div>
        </div>
    )
}
