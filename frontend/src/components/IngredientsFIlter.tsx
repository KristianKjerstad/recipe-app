import { Checkbox, FormControlLabel } from '@mui/material'
// import Select, { MultiValue } from "react-select"
import { MultiSelect } from '@mantine/core'
import { Ingredient, IngredientCategories } from '../api/generated'
import { useScreenWidth } from '../hooks/useScreenWidth'
type IngredientsFilterProps = {
    ingredients: Ingredient[]
    selectedIngredientIds: string[]
    setSelectedIngredientIds: (ingredients: string[]) => void
    categories: IngredientCategories[]
}

const formatIngredients = (
    rawIngredients: Ingredient[],
    categories: IngredientCategories[]
): { group: string; items: { label: string; value: string }[] }[] => {
    const category0: { label: string; value: string }[] = rawIngredients
        .filter((ingredient) => ingredient.category === categories[0])
        .map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
        }))
    const category1 = rawIngredients
        .filter((ingredient) => ingredient.category === categories[1])
        .map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
        }))
    const category2 = rawIngredients
        .filter((ingredient) => ingredient.category === categories[2])
        .map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
        }))
    const category3 = rawIngredients
        .filter((ingredient) => ingredient.category === categories[3])
        .map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
        }))
    const category4 = rawIngredients
        .filter((ingredient) => ingredient.category === categories[4])
        .map((ingredient) => ({
            label: ingredient.name,
            value: ingredient.id,
        }))

    return [
        {
            group: categories[0],
            items: category0,
        },
        { group: categories[1], items: category1 },
        { group: categories[2], items: category2 },
        { group: categories[3], items: category3 },
        { group: categories[4], items: category4 },
    ]
}

const h2_classname = 'text-xl font-medium'

export const IngredientsFilter = (props: IngredientsFilterProps) => {
    const {
        ingredients,
        selectedIngredientIds,
        setSelectedIngredientIds,
        categories,
    } = props

    const { width } = useScreenWidth()

    const SCREEN_WIDTH_LIMIT = 1200

    const handleSelectedIngredientChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        ingredient: Ingredient
    ) => {
        if (event.target.checked) {
            setSelectedIngredientIds([...selectedIngredientIds, ingredient.id])
        } else {
            setSelectedIngredientIds(
                selectedIngredientIds.filter((e) => e !== ingredient.id)
            )
        }
    }

    return (
        <div>
            <h2 className="pt-8 pb-8 font-semibold text-xl">
                Select your available ingredients
            </h2>
            {width < SCREEN_WIDTH_LIMIT && (
                <div>
                    <div className="">
                        <div className="max-w-[450px]">
                            <MultiSelect
                                placeholder="Select Ingredients"
                                data={formatIngredients(
                                    ingredients,
                                    categories
                                )}
                                value={selectedIngredientIds}
                                onChange={(values) => {
                                    setSelectedIngredientIds(values)
                                }}
                                searchable
                            />
                        </div>
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
                                                                    handleSelectedIngredientChange(
                                                                        event,
                                                                        ingredient
                                                                    )
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
