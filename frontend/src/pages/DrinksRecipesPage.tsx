import { useEffect, useState } from 'react'

import { FilterAltOutlined, SearchOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import Select, { MultiValue } from 'react-select'
import { Ingredient, Recipe } from '../api/generated'
import { RecipeCard } from '../components/RecipeCard'
import { useIngredientAPI } from '../hooks/useIngredientAPI'
import { useRecipeAPI } from '../hooks/useRecipeAPI'
import { filterRecipes } from '../utils/filtering'

type Options = {
    label: string
    value: string
}

// TODO it is possible to divide options into categories like country
// const sampleOptions: Options[] = [
//     {
//         label: 'Finland',
//         options: [
//             {
//                 label: 'Great Hotel',
//                 value: 'Great Hotel',
//             },
//         ],
//     },
//     {
//         label: 'Sweden',
//         options: [{ label: 'Stockholm', value: 'Stockholm' }],
//     },
// ]

const formatIngredients = (rawIngredients: Ingredient[]) => {
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
    const [selectedIngredients, setSelectedIngredients] = useState<
        MultiValue<Options>
    >([])

    const handleSelectedIngredientChange = (value: MultiValue<Options>) => {
        setSelectedIngredients(value)
    }

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
        // get recipes with selected ingredients@
        const selectedIngredientIds: string[] = selectedIngredients.map(
            (ingredient) => {
                return ingredient.value
            }
        )
        const newFilteredRecipes = filterRecipes({
            allRecipes: allRecipes,
            selectedIngredientIds: selectedIngredientIds,
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
    //
    return (
        <div className="flex flex-col justify-center items-center">
            <h3>Drinks</h3>
            <div className="text-left pt-6 max-w-full sm: w-96 md:w-2/4 lg:w-2/4">
                <p className="pb-2">Select your ingredients</p>
                <Select
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                    value={selectedIngredients}
                    options={formatIngredients(allIngredients)}
                    onChange={(value) => {
                        handleSelectedIngredientChange(value)
                    }}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={true}
                />
            </div>

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
                    variant="contained"
                    color="orange"
                    // onClick={() => {
                    //     handleNavigation('drinks')
                    // }}
                    disabled
                    startIcon={<FilterAltOutlined />}
                >
                    Filter
                </Button>
            </div>
            {isNoRecipeResults && <p className="pt-12">No results...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 pt-24 pb-48">
                {filteredRecipes.map((recipe) => {
                    return <RecipeCard recipe={recipe} />
                })}
            </div>
        </div>
    )
}
