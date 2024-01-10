import { useEffect, useState } from 'react'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()

import Select, { MultiValue } from 'react-select'
import { Ingredient, Recipe } from '../api/generated'
import { useIngredientAPI } from '../hooks/useIngredientAPI'
import { useRecipeAPI } from '../hooks/useRecipeAPI'

type Options = {
    label: string
    options: { label: string; value: string }[]
}

const sampleOptions: Options[] = [
    {
        label: 'Finland',
        options: [
            {
                label: 'Great Hotel',
                value: 'Great Hotel',
            },
        ],
    },
    {
        label: 'Sweden',
        options: [{ label: 'Stockholm', value: 'Stockholm' }],
    },
]

const formatIngredients = (rawIngredients: Ingredient[]) => {
    const newIngredients: MultiValue<Options> = rawIngredients.map(
        (ingredient) => {
            return {
                label: 'something',
                options: [{ label: ingredient.name, value: ingredient.id }],
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
        console.log(value)
    }

    const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
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
        </div>
    )
}
