import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DataUtils } from '../utils/DataUtils';

test.describe('Login Functionality Tests', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.navigate();
    });

    test('should successfully login with valid credentials', async () => {
        const validCredentials = DataUtils.getValidCredentials();
        for (const credentials of validCredentials) {
            await loginPage.login(credentials.username, credentials.password);
            await dashboardPage.validateSuccessfulLogin();
            await dashboardPage.validateSuccessMessage();
            await dashboardPage.logout();
        }
    });

    // test('should login successfully using Enter key', async () => {
    //     const validCredentials = DataUtils.getValidCredentials();
    //     for (const credentials of validCredentials) {
    //         await loginPage.loginWithEnterKey(credentials.username, credentials.password);
    //         await dashboardPage.validateSuccessfulLogin();
    //         await dashboardPage.logout();
    //     }
    // });

    test('should handle invalid credentials', async () => {
        const invalidCredentials = DataUtils.getInvalidCredentials();
        for (const credentials of invalidCredentials) {
            await loginPage.login(credentials.username, credentials.password);
            if (credentials.expectedError) {
                await loginPage.validateErrorMessage(credentials.expectedError);
            }
        }
    });

    test('should handle SQL injection attempt', async () => {
        const sqlInjection = "' OR '1'='1";
        await loginPage.login(sqlInjection, sqlInjection);
        await loginPage.validateErrorMessage('Your username is invalid!');
    });

    test('should handle whitespace in credentials', async () => {
        await loginPage.login(' student ', ' Password123 ');
        await loginPage.validateErrorMessage('Your username is invalid!');
    });

    test('should handle case sensitivity', async () => {
        await loginPage.login('STUDENT', 'PASSWORD123');
        await loginPage.validateErrorMessage('Your username is invalid!');
    });

    test('should validate login form elements', async () => {
        await loginPage.validateLoginForm();
    });
}); 