import { SearchOutlined } from '@mui/icons-material'
import ClearIcon from '@mui/icons-material/Clear'
import { Button, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Ingredient, Recipe } from '../api/generated'
import { IngredientsFilter } from '../components/IngredientsFIlter'
import { RecipeCard } from '../components/RecipeCard'
import { useIngredientAPI } from '../hooks/useIngredientAPI'
import { useRecipeAPI } from '../hooks/useRecipeAPI'
import {
    filterRecipes,
    recipeHasOneOrTwoMissingIngredients,
} from '../utils/filtering'

export type Options = {
    label: string
    value: string
}

export const DrinksRecipesPage = () => {
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<
        string[]
    >([])

    const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([])
    const [
        recipesWithOneOrTwoMissingIngredients,
        setRecipesWithOneOrTwoMissingIngredients,
    ] = useState<Recipe[]>([])
    const [searchIsUsed, setSearchIsUsed] = useState<boolean>(false)
    const { getAllRecipes } = useRecipeAPI()
    const { getAllIngredients } = useIngredientAPI()

    useEffect(() => {
        getAllRecipes().then((recipesResponse) => {
            setAllRecipes(recipesResponse.data)
        })
    }, [getAllRecipes])

    useEffect(() => {
        getAllIngredients().then((ingredientsResponse) => {
            setAllIngredients(ingredientsResponse.data)
        })
    }, [getAllIngredients])

    const handleSearch = () => {
        setSearchIsUsed(true)
        setRecipesWithOneOrTwoMissingIngredients(
            getRecipesWithOneOrTwoMissingIngredients()
        )
        const newFilteredRecipes = filterRecipes({
            allRecipes: allRecipes,
            selectedIngredientIds: selectedIngredientIds,
        })
        setFilteredRecipes(newFilteredRecipes)
    }

    const getRecipesWithOneOrTwoMissingIngredients = () => {
        return allRecipes.filter((recipe) => {
            const x =
                recipe.ingredients?.map((i) => {
                    return i.ingredient_uuid
                }) ?? []
            if (recipeHasOneOrTwoMissingIngredients(x, selectedIngredientIds)) {
                return true
            }
        })
    }

    if (allRecipes.length === 0) {
        return (
            <div className="pt-40">
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center pl-8 pr-8">
            <h2 className="text-4xl font-medium pt-12 pb-2">
                Cocktail Recipes
            </h2>
            <Link
                to="/all-cocktails"
                className="text-blue-600 underline pt-6 pb-8"
            >
                View all recipes
            </Link>
            <IngredientsFilter
                ingredients={allIngredients}
                selectedIngredientIds={selectedIngredientIds}
                setSelectedIngredientIds={setSelectedIngredientIds}
            />

            <div className="flex flex-row justify-center space-x-16 pt-8 ">
                <Button
                    size="large"
                    variant="contained"
                    color="lightGreen"
                    startIcon={<SearchOutlined />}
                    onClick={() => {
                        handleSearch()
                    }}
                >
                    Search
                </Button>
                <Button
                    size="large"
                    variant="contained"
                    color="lightGreen"
                    startIcon={<ClearIcon />}
                    disabled={selectedIngredientIds.length === 0}
                    onClick={() => {
                        setSelectedIngredientIds([])
                        setFilteredRecipes([])
                        setSearchIsUsed(false)
                    }}
                >
                    Clear Selection
                </Button>
            </div>
            {filteredRecipes.length > 0 && (
                <h2 className="pt-12 text-xl">
                    Found {filteredRecipes.length}{' '}
                    {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} that
                    match your choice of ingredients
                </h2>
            )}
            {filteredRecipes.length === 0 && (
                <p className="pt-12">No results found...</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12 pt-16 pb-16">
                {filteredRecipes.map((recipe) => {
                    return <RecipeCard recipe={recipe} />
                })}
            </div>
            {recipesWithOneOrTwoMissingIngredients.length > 0 && (
                <div className="pb-16  text-xl">
                    Here are some recipes you can make if you get one or two
                    more ingredients!
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-12 pb-48">
                {searchIsUsed &&
                    recipesWithOneOrTwoMissingIngredients.map((recipe) => {
                        return <RecipeCard recipe={recipe} />
                    })}
            </div>
        </div>
    )
}
