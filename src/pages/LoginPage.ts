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
        try {
            console.log('Navigating to login page...');
            await this.page.goto(config.loginUrl);
            
            console.log('Filling username...');
            await this.page.fill(this.usernameInput, username);
            
            console.log('Filling password...');
            await this.page.fill(this.passwordInput, password);
            
            console.log('Waiting for submit button...');
            await this.page.waitForSelector(this.submitButton, { state: 'visible', timeout: 5000 });
            
            console.log('Clicking submit button...');
            await this.page.click(this.submitButton);
            
            console.log('Waiting for navigation...');
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async loginWithEnterKey(username: string, password: string) {
        try {
            console.log('Navigating to login page...');
            await this.page.goto(config.loginUrl);
            
            console.log('Filling username...');
            await this.page.fill(this.usernameInput, username);
            
            console.log('Filling password...');
            await this.page.fill(this.passwordInput, password);
            
            console.log('Pressing Enter key...');
            await this.page.press(this.passwordInput, 'Enter');
            
            console.log('Waiting for navigation...');
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error('Login with Enter key failed:', error);
            throw error;
        }
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