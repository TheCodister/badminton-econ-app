import { expect, test } from '@playwright/test'
import testCases from '../common/login/login.testcases.json'

// Get the successful login credentials
const successfulLogin = testCases.find(
  (tc) => tc.expectedAlert === 'Login successful!',
)

test('Add product to cart', async ({ page }) => {
  // Set viewport size to 1920x1080
  await page.setViewportSize({ width: 1920, height: 1080 })

  // Navigate to homepage
  await page.goto('http://localhost:3000')

  // Wait for page to load
  await page.waitForLoadState('networkidle')

  // Navigate to login page
  await page.goto('http://localhost:3000/login')

  // Login with valid credentials
  if (successfulLogin) {
    await page.getByPlaceholder('Email').fill(successfulLogin.email)
    await page.getByPlaceholder('Password').fill(successfulLogin.password)

    // Set up dialog handler for login alert
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe(successfulLogin.expectedAlert)
      await dialog.accept()
    })

    await page.getByRole('button', { name: 'Login' }).click()

    // Wait for login to complete and dialog to be handled
    await page.waitForTimeout(2000)
  }

  // Navigate back to homepage after login
  await page.goto('http://localhost:3000')

  // Wait for page to load
  await page.waitForLoadState('networkidle')

  // Click on the Racket tab in the top bar
  await page.getByRole('button', { name: 'Racket', exact: true }).click()

  // Wait for navigation to complete
  await page.waitForLoadState('networkidle')

  // Click on any product (first product on the page)
  // Wait for products to be visible
  await page.waitForSelector('text=Popular', { state: 'visible' })

  // Find the product grid container
  const productGrid = page.locator('div.grid').first()
  await productGrid.waitFor({ state: 'visible' })

  // Find all images in the grid that have alt text (product images)
  // Exclude images without alt or with generic alt text
  const productImages = productGrid.locator('img[alt]:not([alt=""])')

  // Click on the first product image
  // The image has the onClick handler that navigates to the product page
  await productImages.first().waitFor({ state: 'visible' })
  await productImages.first().click()

  // Wait for product page to load
  await page.waitForLoadState('networkidle')

  // Click the "Add to Cart" button
  // Listen for the alert dialog before clicking
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Added to cart successfully!')
    await dialog.accept()
  })

  // Find and click the Add to Cart button
  await page.getByRole('button', { name: /add to cart/i }).click()

  // Wait a bit to ensure the alert is handled
  await page.waitForTimeout(1000)

  console.log('✓ Product successfully added to cart')
})
