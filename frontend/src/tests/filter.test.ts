import { expect, test } from 'vitest'
import { Recipe } from '../api/generated'
import { filterRecipes } from '../utils/filtering'

test('filter recipes by ingredient', () => {
    const ingredient_1 = {
        ingredient_uuid: '4f556d17-97f4-47ad-828c-088c7041a6b1',
        ingredient_quantity: '1 ml',
    }
    const ingredient_2 = {
        ingredient_uuid: '4f556d17-97f4-47ad-828c-088c7041a6b2',
        ingredient_quantity: '2 ml',
    }
    const ingredient_3 = {
        ingredient_uuid: '4f556d17-97f4-47ad-828c-088c7041a6b3',
        ingredient_quantity: '3 ml',
    }
    const ingredient_4 = {
        ingredient_uuid: '4f556d17-97f4-47ad-828c-088c7041a6b4',
        ingredient_quantity: '4 ml',
    }

    const vodkaRedbullRecipe: Recipe = {
        id: '81ff95d9-c553-4fc9-87cd-e743f8457474',
        type: 'cocktail',
        name: 'Vodka redbull',
        category: 'cocktail',
        ingredients: [ingredient_1, ingredient_2],
        recipe_steps: ['Mix ingredients', 'drink!'],
    }
    const margaritaRecipe: Recipe = {
        id: 'de09298c-5ad1-4ae9-aff0-d078c6f12925',
        type: 'cocktail',
        name: 'Margarita',
        category: 'cocktail',
        ingredients: [ingredient_3, ingredient_4, ingredient_1],
        recipe_steps: ['Mix ingredients', 'drink!'],
    }
    const recipes: Recipe[] = [vodkaRedbullRecipe, margaritaRecipe]

    expect(
        filterRecipes({ allRecipes: recipes, selectedIngredientIds: [] })
    ).toEqual([])
    expect(
        filterRecipes({ allRecipes: recipes, selectedIngredientIds: ['1'] })
    ).toEqual([])
    expect(
        filterRecipes({
            allRecipes: recipes,
            selectedIngredientIds: [
                ingredient_1.ingredient_uuid,
                ingredient_2.ingredient_uuid,
            ],
        })
    ).toEqual([vodkaRedbullRecipe])
    expect(
        filterRecipes({
            allRecipes: recipes,
            selectedIngredientIds: [
                ingredient_1.ingredient_uuid,
                ingredient_2.ingredient_uuid,
                ingredient_3.ingredient_uuid,
            ],
        })
    ).toEqual([vodkaRedbullRecipe])
    expect(
        filterRecipes({
            allRecipes: recipes,
            selectedIngredientIds: [ingredient_2.ingredient_uuid],
        })
    ).toEqual([])
    expect(
        filterRecipes({
            allRecipes: recipes,
            selectedIngredientIds: [
                ingredient_3.ingredient_uuid,
                ingredient_4.ingredient_uuid,
                ingredient_1.ingredient_uuid,
            ],
        })
    ).toEqual([margaritaRecipe])
    expect(
        filterRecipes({
            allRecipes: recipes,
            selectedIngredientIds: [
                ingredient_3.ingredient_uuid,
                ingredient_4.ingredient_uuid,
                ingredient_1.ingredient_uuid,
                '87',
                '99',
            ],
        })
    ).toEqual([margaritaRecipe])
    expect(
        filterRecipes({
            allRecipes: recipes,
            selectedIngredientIds: [
                ingredient_1.ingredient_uuid,
                ingredient_2.ingredient_uuid,
                ingredient_3.ingredient_uuid,
                ingredient_4.ingredient_uuid,
            ],
        })
    ).toEqual(recipes)
})
