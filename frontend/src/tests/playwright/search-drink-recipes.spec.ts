import { expect, test } from '@playwright/test'

const recipes = [
    {
        id: '81ff95d9-c553-4fc9-87cd-e743f8457474',
        type: 'cocktail',
        name: 'Vodka redbull',
        category: 'cocktail',
        ingredient_ids: [
            '4fcf8f09-e852-47b5-83ce-bd5dc94c9e23',
            '22585b6f-d1c5-4ebe-9e5d-ac5b2bc9b6ec',
        ],
        recipe_steps: ['Mix ingredients', 'drink!'],
    },
    {
        id: 'de09298c-5ad1-4ae9-aff0-d078c6f12925',
        type: 'cocktail',
        name: 'Margarita',
        category: 'cocktail',
        ingredient_ids: [
            '5e8d8a24-25d7-4580-82ad-e534fe8cbdd1',
            '63d1bfa1-779c-48da-aec4-ff3b2dee457d',
            '4fcf8f09-e852-47b5-83ce-bd5dc94c9e23',
        ],
        recipe_steps: ['Mix ingredients', 'drink!'],
    },
]

const ingredients = [
    {
        id: '4fcf8f09-e852-47b5-83ce-bd5dc94c9e23',
        name: 'Vodka',
        category: 'Alcoholic beverage',
    },
    {
        id: '22585b6f-d1c5-4ebe-9e5d-ac5b2bc9b6ec',
        name: 'Red bull',
        category: 'Soft drinks',
    },
    {
        id: '63d1bfa1-779c-48da-aec4-ff3b2dee457d',
        name: 'Lime',
        category: 'Fruit',
    },
    {
        id: '5e8d8a24-25d7-4580-82ad-e534fe8cbdd1',
        name: 'Tequila',
        category: 'Alcoholic beverage',
    },
]

test.beforeEach(async ({ page }) => {
    // Runs before each test and signs in each page.
    await page.goto('http://localhost:5173/')
})

test('select ingredients and click on recipe', async ({ page }) => {
    // Mock the api call before navigating
    await page.route('**/recipes', async (route) => {
        // Customize the response for the /recipes endpoint
        const responseData = recipes

        await route.fulfill({ json: responseData })
    })

    await page.route('**/recipes/*', async (route, request) => {
        // Extract the recipe ID from the request URL
        const recipeId = request.url().split('/').pop()

        // Customize the response based on the recipe ID
        const responseData = recipes.filter((recipe) => {
            return recipe.id === recipeId
        })[0]

        await route.fulfill({ json: responseData })
    })

    await page.route('**/ingredients', async (route) => {
        // Customize the response for the /recipes endpoint
        const responseData = ingredients

        await route.fulfill({ json: responseData })
    })

    await page.route('**/ingredients/*', async (route, request) => {
        // Extract the recipe ID from the request URL
        const ingredientId = request.url().split('/').pop()

        // Customize the response based on the recipe ID
        const responseData = ingredients.filter((ingredient) => {
            return ingredient.id === ingredientId
        })

        await route.fulfill({ json: responseData })
    })

    await page.getByRole('button', { name: 'Drinks' }).click()
    await page.locator('.my-react-select__input-container').click()
    await page.locator('#react-select-3-input').fill('vodka')
    await page.getByRole('option', { name: 'Vodka' }).click()
    await page.getByRole('option', { name: 'Lime' }).click()
    await page.locator('#react-select-3-input').press('Escape')
    await page.getByRole('button', { name: 'Search' }).click()
    await page
        .locator('div')
        .filter({ hasText: /^Select your ingredientsVodkaLime$/ })
        .locator('svg')
        .nth(2)
        .click()
    await page.locator('.my-react-select__input-container').click()
    await page.getByRole('option', { name: 'Vodka' }).click()
    await page.getByRole('option', { name: 'Red bull' }).click()
    await page.locator('#react-select-3-input').press('Escape')
    await page.getByRole('button', { name: 'Search' }).click()
    await page
        .locator('#root div')
        .filter({ hasText: 'Drink recipesSelect your' })
        .getByRole('img')
        .click()
    await expect(page.getByText('Vodka redbull')).toBeVisible()
})
