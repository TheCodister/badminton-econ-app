import { expect, test } from '@playwright/test'
import testCases from './login.testcases.json'

for (const { email, password, expectedAlert } of testCases) {
  test(`Login test for ${email}`, async ({ page }) => {
    await page.goto('http://localhost:3000/login')

    await page.getByPlaceholder('Email').fill(email)
    await page.getByPlaceholder('Password').fill(password)

    await page.click(
      'xpath=//*[@id="__next"]/div/div/main/section/div/div[3]/button[1]',
    )

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe(expectedAlert)
      await dialog.dismiss() // or dialog.accept() if needed
    })
  })
}
