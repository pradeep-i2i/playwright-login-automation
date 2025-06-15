import { Page, expect } from '@playwright/test';
import { config } from '../config/config';

export class DashboardPage {
    private readonly page: Page;

    // Locators
    private readonly welcomeMessage = '.post-title';
    private readonly logoutButton = '.wp-block-button__link';
    private readonly successMessage = '.post-content';

    constructor(page: Page) {
        this.page = page;
    }

    async validateSuccessfulLogin() {
        // Verify URL
        await expect(this.page).toHaveURL(new RegExp(config.dashboardUrl));

        // Verify welcome message
        const welcomeElement = await this.page.waitForSelector(this.welcomeMessage);
        const welcomeText = await welcomeElement.textContent();
        expect(welcomeText).toContain('Logged In Successfully');

        // Verify logout button
        await expect(this.page.locator(this.logoutButton)).toBeVisible();
    }

    async validateSuccessMessage() {
        const successElement = await this.page.waitForSelector(this.successMessage);
        const successText = await successElement.textContent();
        expect(successText).toContain('Congratulations');
    }

    async logout() {
        await this.page.click(this.logoutButton);
    }
} 