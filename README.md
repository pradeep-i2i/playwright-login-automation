# Playwright Login Automation Framework

This project contains an automated test suite for testing the login functionality of the Practice Test Automation website using Playwright with TypeScript.

## Features

- Page Object Model (POM) implementation
- Data-driven testing
- Cross-browser testing support
- Comprehensive test coverage
- CI/CD integration with GitHub Actions
- Allure reporting integration

## Prerequisites

- Node.js (v20 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-login-automation
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### View test report
```bash
npm run report
```

## Test Structure

- `src/pages/` - Page Object Models
  - `LoginPage.ts` - Login page interactions
  - `DashboardPage.ts` - Dashboard page interactions
- `src/tests/` - Test specifications
  - `LoginTests.spec.ts` - Login test scenarios
- `src/config/` - Configuration files
  - `config.ts` - Environment and test data configuration

## Test Scenarios

1. Successful login with valid credentials
2. Login using Enter key
3. Empty username validation
4. Empty password validation
5. Invalid credentials handling
6. SQL injection attempt handling
7. Whitespace handling
8. Case sensitivity validation
9. Login form element validation

## CI/CD Integration

The project includes GitHub Actions workflow that:
- Runs on push to main branch and pull requests
- Installs dependencies
- Runs tests across multiple browsers
- Generates and uploads test reports as artifacts

## Reporting

Test reports are generated using:
- Playwright HTML Reporter
- Allure Reports

Reports are available:
- Locally after test execution
- As artifacts in GitHub Actions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 