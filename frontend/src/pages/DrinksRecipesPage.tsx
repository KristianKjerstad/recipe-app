import { useEffect, useState } from 'react'

import { FilterAltOutlined, SearchOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import Select, { MultiValue } from 'react-select'
import { Ingredient, Recipe } from '../api/generated'
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
    }

    if (allIngredients.length === 0) {
        return <div>Loading....</div>
    }
    return (
        <div>
            <h3>Drinks</h3>
            <div className="text-left pt-6">
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

            {filteredRecipes.map((recipe) => {
                return <p>{recipe.name}</p>
            })}
        </div>
    )
}
