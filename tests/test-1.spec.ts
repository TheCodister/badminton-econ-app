import { expect, test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/')
  await page.getByRole('link', { name: 'Make Appointment' }).click()
  // await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('John Doe')
  // await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('ThisIsNotAPassword')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page.locator('h2')).toContainText('Make Appointment')
})
