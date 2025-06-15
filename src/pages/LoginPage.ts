import { Page, expect } from '@playwright/test';
import { config } from '../config/config';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly usernameInput = '#username';
    private readonly passwordInput = '#password';
    private readonly submitButton = '#submit';
    private readonly errorMessage = '#error';

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto(config.loginUrl);
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.submitButton);
    }

    async loginWithEnterKey(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.press(this.passwordInput, 'Enter');
    }

    async getErrorMessage(): Promise<string> {
        const errorElement = await this.page.waitForSelector(this.errorMessage);
        return await errorElement.textContent() || '';
    }

    async validateErrorMessage(expectedError: string) {
        const actualError = await this.getErrorMessage();
        expect(actualError).toBe(expectedError);
    }

    async validateLoginForm() {
        await expect(this.page.locator(this.usernameInput)).toBeVisible();
        await expect(this.page.locator(this.passwordInput)).toBeVisible();
        await expect(this.page.locator(this.submitButton)).toBeVisible();
    }
} 