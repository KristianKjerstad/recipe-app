import { Recipe } from '../api/generated'

function allEntriesInListAExistInListB(
    listA: string[],
    listB: string[]
): boolean {
    // Check if every entry in listA is included in listB
    const allEntriesExist = listA.every((entryA) => listB.includes(entryA))

    return allEntriesExist
}

function recipeHasAtMostTwoMissingIngredients(
    recipeIngredientIds: string[],
    ingredientIds: string[]
) {
    let missingCount = 0

    for (const recipeId of recipeIngredientIds) {
        if (!ingredientIds.includes(recipeId)) {
            missingCount++
        }
    }
    if (missingCount > 2) {
        return false
    }
    return true
}

export const filterRecipes = ({
    allRecipes,
    selectedIngredientIds,
    includeCloseMatches,
}: {
    allRecipes: Recipe[]
    selectedIngredientIds: string[]
    includeCloseMatches: boolean
}) => {
    // Find recipes for which all ingredients are in the selected ingredients list.
    // If include close matches flag is true, include recipes where up to 2 ingredients are missing.
    if (selectedIngredientIds.length === 0) {
        return []
    }
    if (!includeCloseMatches) {
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
    } else {
        return allRecipes.filter((recipe) => {
            const recipeIngredientIds =
                recipe.ingredients?.map((ingredient) => {
                    return ingredient.ingredient_uuid
                }) ?? []
            return recipeHasAtMostTwoMissingIngredients(
                recipeIngredientIds,
                selectedIngredientIds
            )
        })
    }
}
