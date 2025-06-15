import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DataUtils } from '../utils/DataUtils';

test.describe('Dashboard Functionality Tests', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.navigate();
        // Login before each test
        const validCredentials = DataUtils.getValidCredentials()[0];
        await loginPage.login(validCredentials.username, validCredentials.password);
        await dashboardPage.validateSuccessfulLogin();
    });

    test('TC_DASH_001: should validate all navigation links are visible', async () => {
        await dashboardPage.validateNavigationLinks();
    });

    test('TC_DASH_002: should validate all navigation links are clickable', async () => {
        await dashboardPage.validateNavigationLinksClickable();
    });

    test('TC_DASH_003: should navigate to Home page', async () => {
        await dashboardPage.clickNavigationLink('Home');
        await dashboardPage.validatePageTitle('Practice Test Automation');
    });

    test('TC_DASH_004: should navigate to Practice page', async () => {
        await dashboardPage.clickNavigationLink('Practice');
        await dashboardPage.validatePageTitle('Practice');
    });

    test('TC_DASH_005: should navigate to Courses page', async () => {
        await dashboardPage.clickNavigationLink('Courses');
        await dashboardPage.validatePageTitle('Courses');
    });

    test('TC_DASH_006: should navigate to Blog page', async () => {
        await dashboardPage.clickNavigationLink('Blog');
        await dashboardPage.validatePageTitle('Blog');
    });

    test('TC_DASH_007: should navigate to Contact page', async () => {
        await dashboardPage.clickNavigationLink('Contact');
        await dashboardPage.validatePageTitle('Contact');
    });

    test('TC_DASH_008: should successfully logout and redirect to login page', async () => {
        await dashboardPage.logout();
        await dashboardPage.validateLogout();
    });

    test('TC_DASH_009: should maintain session after page refresh', async ({ page }) => {
        await page.reload();
        await dashboardPage.validateSuccessfulLogin();
    });

    test('TC_DASH_010: should display correct welcome message', async () => {
        await dashboardPage.validateSuccessMessage();
    });
}); 