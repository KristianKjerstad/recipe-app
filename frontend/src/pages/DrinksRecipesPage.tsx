import { useState } from 'react'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()

import Select, { MultiValue } from 'react-select'

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

export const DrinksRecipesPage = () => {
    const [selectedIngredients, setSelectedIngredients] = useState<
        MultiValue<Options>
    >([])

    const handleSelectedIngredientChange = (value: MultiValue<Options>) => {
        setSelectedIngredients(value)
        console.log(value)
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
                    options={sampleOptions}
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
