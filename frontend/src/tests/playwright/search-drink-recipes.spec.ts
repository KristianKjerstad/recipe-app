import { expect, test } from '@playwright/test'

test('select ingredients and click on recipe', async ({ page }) => {
    await page.goto('http://localhost:5173/')
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
