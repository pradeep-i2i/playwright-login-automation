import { test, expect } from '@playwright/test';

test('basic test to verify GitHub Actions workflow', async ({ page }) => {
  // Navigate to a website
  await page.goto('https://playwright.dev/');
  
  // Verify the title
  const title = await page.title();
  expect(title).toContain('Playwright');
  
  // Take a screenshot for the test report
  await page.screenshot({ path: 'test-results/example-test.png' });
}); 