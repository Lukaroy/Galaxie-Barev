import { test, expect } from '@playwright/test'

test.describe('Navigation & Pages', () => {
  test('homepage loads with logo and CTA', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Galaxie/)
    await expect(page.locator('img[alt*="Logo"], img[src*="Logo"]').first()).toBeVisible()
  })

  test('navbar links work', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to barvy
    await page.click('a[href="/barvy"]')
    await expect(page).toHaveURL('/barvy')
    
    // Navigate to fonty
    await page.click('a[href="/fonty"]')
    await expect(page).toHaveURL('/fonty')
  })

  test('footer is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toBeVisible()
  })

  test('podminky page loads', async ({ page }) => {
    await page.goto('/podminky')
    await expect(page.locator('body')).toContainText(/podmín/i)
  })
})

test.describe('Login Page', () => {
  test('login form renders all elements', async ({ page }) => {
    await page.goto('/prihlaseni')
    
    await expect(page.getByPlaceholder('Email')).toBeVisible()
    await expect(page.getByPlaceholder(/heslo/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /přihlásit/i })).toBeVisible()
    await expect(page.getByText(/nemáš účet/i)).toBeVisible()
    await expect(page.getByText(/zapomněl/i)).toBeVisible()
  })

  test('shows validation error for empty form', async ({ page }) => {
    await page.goto('/prihlaseni')
    
    await page.getByRole('button', { name: /přihlásit/i }).click()
    
    await expect(page.getByRole('alert')).toBeVisible()
    await expect(page.getByRole('alert')).toContainText(/email/i)
  })

  test('shows validation error for invalid email', async ({ page }) => {
    await page.goto('/prihlaseni')
    
    await page.getByPlaceholder('Email').fill('not-an-email')
    await page.getByRole('button', { name: /přihlásit/i }).click()
    
    await expect(page.getByRole('alert')).toContainText(/platný email/i)
  })

  test('shows validation error for short password', async ({ page }) => {
    await page.goto('/prihlaseni')
    
    await page.getByPlaceholder('Email').fill('test@example.com')
    await page.getByPlaceholder(/heslo/i).fill('short')
    await page.getByRole('button', { name: /přihlásit/i }).click()
    
    await expect(page.getByRole('alert')).toContainText(/8 znaků/i)
  })

  test('password visibility toggle works', async ({ page }) => {
    await page.goto('/prihlaseni')
    
    const passwordInput = page.getByPlaceholder(/heslo/i)
    await expect(passwordInput).toHaveAttribute('type', 'password')
    
    await page.getByLabel(/zobrazit heslo/i).click()
    await expect(passwordInput).toHaveAttribute('type', 'text')
    
    await page.getByLabel(/skrýt heslo/i).click()
    await expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('link to registration works', async ({ page }) => {
    await page.goto('/prihlaseni')
    
    await page.getByText(/vytvořit/i).click()
    await expect(page).toHaveURL('/registrace')
  })

  test('link to forgot password works', async ({ page }) => {
    await page.goto('/prihlaseni')
    
    await page.getByText(/zapomněl/i).click()
    await expect(page).toHaveURL('/zapomenute-heslo')
  })
})

test.describe('Registration Page', () => {
  test('registration form renders all fields', async ({ page }) => {
    await page.goto('/registrace')
    
    await expect(page.getByPlaceholder('Jméno')).toBeVisible()
    await expect(page.getByPlaceholder('Příjmení')).toBeVisible()
    await expect(page.getByPlaceholder('Email')).toBeVisible()
    await expect(page.getByPlaceholder(/heslo/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /vytvořit/i })).toBeVisible()
    await expect(page.getByText(/podmínkami/i)).toBeVisible()
  })

  test('link to login works', async ({ page }) => {
    await page.goto('/registrace')
    
    await page.getByText(/přihlásit se/i).click()
    await expect(page).toHaveURL('/prihlaseni')
  })
})

test.describe('Barvy Page', () => {
  test('color tools load', async ({ page }) => {
    await page.goto('/barvy')
    // Page should have color-related content
    await expect(page.locator('body')).toContainText(/barv/i)
  })
})

test.describe('Fonty Page', () => {
  test('fonts page loads with search', async ({ page }) => {
    await page.goto('/fonty')
    // Should have search functionality
    await expect(page.locator('input[type="text"], input[type="search"]').first()).toBeVisible()
  })
})

test.describe('Zapomenuté heslo Page', () => {
  test('forgot password page loads', async ({ page }) => {
    await page.goto('/zapomenute-heslo')
    await expect(page.getByPlaceholder(/email/i)).toBeVisible()
  })
})
