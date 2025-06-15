import { Page, expect } from '@playwright/test';
import { config } from '../config/config';

export class DashboardPage {
    private readonly page: Page;

    // Locators
    private readonly welcomeMessage = '.post-title';
    private readonly logoutButton = '.wp-block-button__link';
    private readonly successMessage = '.post-content';
    private readonly homeLink = 'nav >> text=Home';
    private readonly practiceLink = 'nav >> text=Practice';
    private readonly coursesLink = 'nav >> text=Courses';
    private readonly blogLink = 'nav >> text=Blog';
    private readonly contactLink = 'nav >> text=Contact';

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

    async validateNavigationLinks() {
        // Verify all navigation links are visible with more specific assertions
        await expect(this.page.locator(this.homeLink).first()).toBeVisible();
        await expect(this.page.locator(this.practiceLink).first()).toBeVisible();
        await expect(this.page.locator(this.coursesLink).first()).toBeVisible();
        await expect(this.page.locator(this.blogLink).first()).toBeVisible();
        await expect(this.page.locator(this.contactLink).first()).toBeVisible();
    }

    async validateNavigationLinksClickable() {
        // Verify all navigation links are clickable with more specific assertions
        await expect(this.page.locator(this.homeLink).first()).toBeEnabled();
        await expect(this.page.locator(this.practiceLink).first()).toBeEnabled();
        await expect(this.page.locator(this.coursesLink).first()).toBeEnabled();
        await expect(this.page.locator(this.blogLink).first()).toBeEnabled();
        await expect(this.page.locator(this.contactLink).first()).toBeEnabled();
    }

    async clickNavigationLink(linkName: string) {
        switch(linkName.toLowerCase()) {
            case 'home':
                await this.page.locator(this.homeLink).first().click();
                break;
            case 'practice':
                await this.page.locator(this.practiceLink).first().click();
                break;
            case 'courses':
                await this.page.locator(this.coursesLink).first().click();
                break;
            case 'blog':
                await this.page.locator(this.blogLink).first().click();
                break;
            case 'contact':
                await this.page.locator(this.contactLink).first().click();
                break;
            default:
                throw new Error(`Navigation link "${linkName}" not found`);
        }
    }

    async validatePageTitle(expectedTitle: string) {
        const title = await this.page.title();
        expect(title).toContain(expectedTitle);
    }

    async logout() {
        await this.page.click(this.logoutButton);
    }

    async validateLogout() {
        // Verify we're redirected to login page after logout
        await expect(this.page).toHaveURL(new RegExp(config.loginUrl));
    }
} 