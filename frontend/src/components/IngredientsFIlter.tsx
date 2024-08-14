import { Checkbox, FormControlLabel } from '@mui/material'
import { useEffect, useState } from 'react'
// import Select, { MultiValue } from "react-select"
import { MultiSelect } from '@mantine/core'
import { Ingredient, IngredientCategories } from '../api/generated'
type IngredientsFilterProps = {
    ingredients: Ingredient[]
    selectedIngredientIds: string[]
    setSelectedIngredientIds: (ingredients: string[]) => void
}

const categories: IngredientCategories[] = [
    'Spirits',
    'Mixers',
    'Liqueurs',
    'Wine',
    'Other',
]

const formatIngredients = (
    rawIngredients: Ingredient[]
): { group: string; items: { label: string; value: string }[] }[] => {
    const spirits: { label: string; value: string }[] = rawIngredients
        .filter((ingredient) => ingredient.category === 'Spirits')
        .map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
        }))
    const mixers = rawIngredients
        .filter((ingredient) => ingredient.category === 'Mixers')
        .map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
        }))
    const liqueurs = rawIngredients
        .filter((ingredient) => ingredient.category === 'Liqueurs')
        .map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
        }))
    const wine = rawIngredients
        .filter((ingredient) => ingredient.category === 'Wine')
        .map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
        }))
    const other = rawIngredients
        .filter((ingredient) => ingredient.category === 'Other')
        .map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
        }))

    return [
        {
            group: 'Spirits',
            items: spirits,
        },
        { group: 'Mixers', items: mixers },
        { group: 'Liqueurs', items: liqueurs },
        { group: 'Wine', items: wine },
        { group: 'Other', items: other },
    ]
}

const h2_classname = 'text-xl font-medium'

export const IngredientsFilter = (props: IngredientsFilterProps) => {
    const { ingredients, selectedIngredientIds, setSelectedIngredientIds } =
        props

    const [width, setWidth] = useState(window.innerWidth)

    const SCREEN_WIDTH_LIMIT = 1200

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div>
            <h2 className="pt-8 pb-8 font-semibold text-xl">
                Select the ingredients you have available
            </h2>
            {width < SCREEN_WIDTH_LIMIT && (
                <div>
                    <div className="text-left pt-6 max-w-full  w-3/4">
                        <p className="pb-2">Select your ingredients</p>
                        <MultiSelect
                            // label="Your favorite libraries"
                            placeholder="Pick value"
                            data={formatIngredients(ingredients)}
                            onChange={(values) => {
                                setSelectedIngredientIds(values)
                            }}
                            searchable
                        />
                    </div>
                </div>
            )}
            {width >= SCREEN_WIDTH_LIMIT && (
                <div className="lg:grid grid-cols-5 gap-4 pb-8">
                    {categories.map((category) => {
                        return (
                            <div>
                                <h2 className={h2_classname}>{category}</h2>
                                <div>
                                    {ingredients.map((ingredient) => {
                                        if (ingredient.category === category)
                                            return (
                                                <div className="text-left">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    selectedIngredientIds.find(
                                                                        (id) =>
                                                                            id ===
                                                                            ingredient.id
                                                                    ) !==
                                                                    undefined
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    if (
                                                                        event
                                                                            .target
                                                                            .checked
                                                                    ) {
                                                                        setSelectedIngredientIds(
                                                                            [
                                                                                ...selectedIngredientIds,
                                                                                ingredient.id,
                                                                            ]
                                                                        )
                                                                    } else {
                                                                        setSelectedIngredientIds(
                                                                            selectedIngredientIds.filter(
                                                                                (
                                                                                    e
                                                                                ) =>
                                                                                    e !==
                                                                                    ingredient.id
                                                                            )
                                                                        )
                                                                    }
                                                                }}
                                                            />
                                                        }
                                                        label={ingredient.name}
                                                    />
                                                </div>
                                            )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
