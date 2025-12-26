import { expect, test } from '@playwright/test'

test.describe('Badminton App Tests', () => {
  test('homepage loads correctly with VNB V200 Blue product', async ({
    page,
  }) => {
    // Navigate to homepage
    await page.goto('/')

    // Wait for page to load (10 seconds)
    await page.waitForTimeout(10000)

    // Verify the specific product text exists
    const productTitle = page.locator(
      '#__next > div > div > main > section > main > div > div:nth-child(4) > div:nth-child(1) > div > div.grid.w-full.gap-4.grid-cols-1.md\\:grid-cols-2.sm\\:grid-cols-1.lg\\:grid-cols-3.xl\\:grid-cols-4.items-center > div:nth-child(2) > div.relative.flex.w-full.p-3.flex-auto.flex-col.place-content-inherit.align-items-inherit.break-words.text-left.overflow-y-auto.subpixel-antialiased.gap-2.pb-0.h-min > h5',
    )

    await expect(productTitle).toHaveText('VNB V200 Blue')

    console.log('✓ Homepage loaded successfully with VNB V200 Blue product')
  })

  test('search function works and navigates to product page', async ({
    page,
  }) => {
    // Navigate to homepage
    await page.goto('/')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Locate the search input and type "VNB"
    const searchInput = page.getByPlaceholder('Search')
    await searchInput.fill('VNB')

    // Wait a bit for search results to appear
    await page.waitForTimeout(1000)

    // Click on the first search result
    const searchResultLink = page.locator(
      '#__next > div > div > nav > header > ul.flex.h-full.flex-row.flex-nowrap.items-center.data-\\[justify\\=start\\]\\:justify-start.data-\\[justify\\=start\\]\\:flex-grow.data-\\[justify\\=start\\]\\:basis-0.data-\\[justify\\=center\\]\\:justify-center.data-\\[justify\\=end\\]\\:justify-end.data-\\[justify\\=end\\]\\:flex-grow.data-\\[justify\\=end\\]\\:basis-0.gap-2.xl\\:flex.lg\\:flex.md\\:hidden.min-\\[20px\\]\\:hidden.sm\\:hidden > li:nth-child(6) > div > ul > li:nth-child(1) > a',
    )
    await searchResultLink.click()

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle')

    // Verify the product title on the product page
    const productPageTitle = page.locator(
      '#__next > div > div > main > section > div > div > div.flex.flex-col.xl\\:flex-row.lg\\:flex-row.md\\:flex-col.sm\\:flex-col.gap-9 > div.flex.flex-col.gap-2 > h1',
    )
    await expect(productPageTitle).toHaveText('VNB TC88C')

    console.log(
      '✓ Search function works and navigated to VNB TC88C product page',
    )
  })
})
