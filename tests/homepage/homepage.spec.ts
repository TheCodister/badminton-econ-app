import { expect, test } from '@playwright/test'
import testCases from './search.testcases.json'

for (const { query, result } of testCases) {
  test(`search for "${query}" should lead to "${result}" detail page`, async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/')

    const searchInput = page.getByPlaceholder('Search')
    await searchInput.fill(query)

    await page.getByRole('link', { name: result }).click()

    // await expect(page).toHaveURL(/\/[a-zA-Z0-9-]+$/)

    const productTitle = page.getByRole('heading', { name: result })
    await expect(productTitle).toBeVisible()
  })
}
