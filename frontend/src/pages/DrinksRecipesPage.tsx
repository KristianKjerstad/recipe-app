import { SearchOutlined } from '@mui/icons-material'
import { Button, Checkbox, FormControlLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { MultiValue } from 'react-select'
import { Ingredient, Recipe } from '../api/generated'
import { IngredientsFilter } from '../components/IngredientsFIlter'
import { RecipeCard } from '../components/RecipeCard'
import { useIngredientAPI } from '../hooks/useIngredientAPI'
import { useRecipeAPI } from '../hooks/useRecipeAPI'
import { filterRecipes } from '../utils/filtering'

export type Options = {
    label: string
    value: string
}

const formatIngredients = (
    rawIngredients: Ingredient[]
): MultiValue<Options> => {
    const newIngredients: MultiValue<Options> = rawIngredients.map(
        (ingredient) => {
            return {
                label: ingredient.name,
                value: ingredient.id,
            }
        }
    )
    return newIngredients
}

export const DrinksRecipesPage = () => {
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<
        string[]
    >([])

    const [includeCloseMatches, setIncludeCloseMatches] =
        useState<boolean>(false)

    const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
    const [allIngredients, setAllIngredients] = useState<Ingredient[]>([])
    const [isNoRecipeResults, setIsNoRecipeResults] = useState<boolean>(false)
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
        const newFilteredRecipes = filterRecipes({
            allRecipes: allRecipes,
            selectedIngredientIds: selectedIngredientIds,
            includeCloseMatches: includeCloseMatches,
        })
        setFilteredRecipes(newFilteredRecipes)
        if (newFilteredRecipes.length === 0) {
            setIsNoRecipeResults(true)
        } else {
            setIsNoRecipeResults(false)
        }
    }

    if (allRecipes.length === 0) {
        return <div>Loading....</div>
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-medium pt-12 pb-2">Drink recipes</h2>
            <IngredientsFilter
                ingredients={allIngredients}
                selectedIngredientIds={selectedIngredientIds}
                setSelectedIngredientIds={setSelectedIngredientIds}
            />
            <div className="flex flex-row justify-center space-x-16 pt-8 ">
                <Button
                    size="large"
                    variant="contained"
                    color="orange"
                    startIcon={<SearchOutlined />}
                    onClick={() => {
                        handleSearch()
                    }}
                >
                    Search
                </Button>
                <Button
                    size="large"
                    variant="outlined"
                    color="orange"
                    disabled={selectedIngredientIds.length === 0}
                    onClick={() => {
                        setSelectedIngredientIds([])
                    }}
                >
                    Clear Selection
                </Button>
            </div>
            <FormControlLabel
                className="pt-4"
                control={
                    <Checkbox
                        checked={includeCloseMatches}
                        onChange={(event) =>
                            setIncludeCloseMatches(event.target.checked)
                        }
                    />
                }
                label="Include recipes where up to 2 ingredients are missing"
            />
            {filteredRecipes.length > 0 && (
                <h2 className="pt-12">
                    Recipes that match your choice of ingredients
                </h2>
            )}
            {isNoRecipeResults && <p className="pt-12">No results...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 pt-24 pb-48">
                {filteredRecipes.map((recipe) => {
                    return <RecipeCard recipe={recipe} />
                })}
            </div>
            <h2>All Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 pt-24 pb-48">
                {allRecipes.map((recipe) => {
                    return <RecipeCard recipe={recipe} />
                })}
            </div>
        </div>
    )
}
