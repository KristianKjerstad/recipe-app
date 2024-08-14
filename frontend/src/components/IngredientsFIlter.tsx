import { Checkbox, FormControlLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { Ingredient, IngredientCategories } from '../api/generated'

type IngredientsFilterProps = {
    ingredients: Ingredient[]
    selectedIngredientIds: string[]
    setSelectedIngredientIds: (ingredients: string[]) => void
}

const h2_classname = 'text-xl font-medium'

export const IngredientsFilter = (props: IngredientsFilterProps) => {
    const { ingredients, selectedIngredientIds, setSelectedIngredientIds } =
        props
    const categories: IngredientCategories[] = [
        'Spirits',
        'Mixers',
        'Liqueurs',
        'Wine',
        'Other',
    ]

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
            {width < SCREEN_WIDTH_LIMIT && <div>hei</div>}
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
