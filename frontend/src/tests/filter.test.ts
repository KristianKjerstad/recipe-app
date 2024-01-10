import { expect, test } from 'vitest'
import { Recipe } from '../api/generated'
import { filterRecipes } from '../utils/filtering'

test('filter recipes by ingredient', () => {
    const vodkaRedbullRecipe: Recipe = {
        id: '81ff95d9-c553-4fc9-87cd-e743f8457474',
        type: 'cocktail',
        name: 'Vodka redbull',
        category: 'cocktail',
        ingredient_ids: ['1', '2'],
        recipe_steps: ['Mix ingredients', 'drink!'],
    }
    const margaritaRecipe: Recipe = {
        id: 'de09298c-5ad1-4ae9-aff0-d078c6f12925',
        type: 'cocktail',
        name: 'Margarita',
        category: 'cocktail',
        ingredient_ids: ['3', '4', '1'],
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
            selectedIngredientIds: ['1', '2'],
        })
    ).toEqual([vodkaRedbullRecipe])
    expect(
        filterRecipes({
            allRecipes: recipes,
            selectedIngredientIds: ['1', '2', '3'],
        })
    ).toEqual([vodkaRedbullRecipe])
    expect(
        filterRecipes({ allRecipes: recipes, selectedIngredientIds: ['2'] })
    ).toEqual([])
    expect(
        filterRecipes({
            allRecipes: recipes,
            selectedIngredientIds: ['3', '4', '1'],
        })
    ).toEqual([margaritaRecipe])
    expect(
        filterRecipes({
            allRecipes: recipes,
            selectedIngredientIds: ['3', '4', '1', '87', '99'],
        })
    ).toEqual([margaritaRecipe])
    expect(
        filterRecipes({
            allRecipes: recipes,
            selectedIngredientIds: ['1', '2', '3', '4'],
        })
    ).toEqual(recipes)
})
