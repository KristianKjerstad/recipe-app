import { Recipe } from '../api/generated'

function allEntriesInListAExistInListB(listA: any[], listB: any[]): boolean {
    // Check if every entry in listA is included in listB
    const allEntriesExist = listA.every((entryA) => listB.includes(entryA))

    return allEntriesExist
}

export const filterRecipes = ({
    allRecipes,
    selectedIngredientIds,
}: {
    allRecipes: Recipe[]
    selectedIngredientIds: string[]
}) => {
    // Find recipes for which all ingredients are in the selected ingredients list
    if (selectedIngredientIds.length === 0) {
        return []
    }
    return allRecipes.filter((recipe) => {
        const recipeIngredientIds =
            recipe.ingredients?.map((ingredient) => {
                return ingredient.ingredient_uuid
            }) ?? []
        return allEntriesInListAExistInListB(
            recipeIngredientIds,
            selectedIngredientIds
        )
    })
}
