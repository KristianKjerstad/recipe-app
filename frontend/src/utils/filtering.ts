import { Recipe } from '../api/generated'

function allEntriesInListAExistInListB(
    listA: string[],
    listB: string[]
): boolean {
    // Check if every entry in listA is included in listB
    const allEntriesExist = listA.every((entryA) => listB.includes(entryA))

    return allEntriesExist
}

export function recipeHasOneOrTwoMissingIngredients(
    recipeIngredientIds: string[],
    ingredientIds: string[]
) {
    let missingCount = 0

    for (const recipeId of recipeIngredientIds) {
        if (!ingredientIds.includes(recipeId)) {
            missingCount++
        }
    }
    if (missingCount === 1 || missingCount === 2) {
        return true
    }
    return false
}
// return allRecipes.filter((recipe) => {
//             const recipeIngredientIds =
//                 recipe.ingredients?.map((ingredient) => {
//                     return ingredient.ingredient_uuid
//                 }) ?? []
//             return recipeHasAtMostTwoMissingIngredients(
//                 recipeIngredientIds,
//                 selectedIngredientIds
//             )
//         })
export const filterRecipes = ({
    allRecipes,
    selectedIngredientIds,
}: {
    allRecipes: Recipe[]
    selectedIngredientIds: string[]
}) => {
    // Find recipes for which all ingredients are in the selected ingredients list.
    // If include close matches flag is true, include recipes where up to 2 ingredients are missing.
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
