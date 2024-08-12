import { Checkbox, FormControlLabel } from '@mui/material'
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

    return (
        <div>
            <h2 className="pt-8 pb-8 font-semibold text-xl">
                Select your available ingredients
            </h2>
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
                                                                ) !== undefined
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
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
        </div>
    )
}
