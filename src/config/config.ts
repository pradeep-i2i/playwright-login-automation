export const config = {
    baseUrl: 'https://practicetestautomation.com',
    loginUrl: '/practice-test-login/',
    dashboardUrl: '/logged-in-successfully/',
    timeouts: {
        defaultTimeout: 30000,
        navigationTimeout: 30000,
        assertionTimeout: 5000
    },
    testData: {
        validCredentials: {
            username: 'student',
            password: 'Password123'
        },
        invalidCredentials: [
            {
                username: '',
                password: 'Password123',
                expectedError: 'Your username is invalid!'
            },
            {
                username: 'student',
                password: '',
                expectedError: 'Your password is invalid!'
            },
            {
                username: 'invalid',
                password: 'invalid',
                expectedError: 'Your username is invalid!'
            }
        ]
    }
}; 