# Server-Side Calculator - Automated Tests

Playwright (JavaScript) automation for the [EvilTester Server-Side Calculator](https://testpages.eviltester.com/apps/server-side-calculator/).

Covers:
- **2 Critical rendering tests** - page loads with the full form visible (TC-R-001), form's default state (TC-R-003).
- **2 Critical functionality tests** - core arithmetic (13 data-driven scenarios), invalid/empty input handling (6 data-driven scenarios).

17 total test executions across 4 test cases.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

| Tool | Minimum Version | Installation Instructions |
|------|----------------|--------------------------|
| **Node.js** | v16.0.0 or higher | [Download Node.js](https://nodejs.org/) |
| **npm** | v8.0.0 or higher | Comes with Node.js |
| **Git** (optional) | Latest stable | [Download Git](https://git-scm.com/) |

### Verify Your Setup

Open your terminal/command prompt and run:

```bash
node --version    # Should show v16.0.0 or higher
npm --version     # Should show v8.0.0 or higher
```

### First-Time Setup Guide

If this is your first time running automated tests, follow these steps:

#### Step 1: Clone or Download the Project

```bash
# If you have Git installed:
git clone <repository-url>
cd calculator-automation

# OR download and extract the ZIP file from your repository
```

#### Step 2: Install Dependencies

```bash
# Install all required npm packages
npm install
```

This will install:
- `@playwright/test` - Test framework
- `dotenv` - Environment variable management
- All other project dependencies

#### Step 3: Install Playwright Browsers

```bash
# This downloads Chromium (and optionally other browsers)
npx playwright install chromium
```

> **Note:** This will download ~150MB. If you have limited bandwidth, you can use:
> ```bash
> npx playwright install --with-deps chromium
> ```
> This includes system dependencies on Linux.

#### Step 4: Configure Environment

1. Check if `.env` file exists in the project root
2. If not, create it with:
```bash
echo "CALCULATOR_URL=https://testpages.eviltester.com/apps/server-side-calculator/" > .env
```

#### Step 5: Run Your First Test

```bash
npm test
```

If successful, you should see output showing all tests passing.

## Tools & libraries used

| Tool | Why |
|---|---|
| [Playwright Test](https://playwright.dev/) (`@playwright/test`) | Test runner + browser automation. |
| `dotenv` | Loads the app URL from `.env` instead of hardcoding it. |
| Plain JavaScript (CommonJS) | No build step needed. |
| Chromium (via Playwright) | Single browser target for this exercise. |

## Project structure

```
calculator-automation/
├── .env                         # CALCULATOR_URL
├── locators/
│   └── calculatorLocators.js
├── pages/
│   └── calculatorPage.js
├── ui-labels/
│   └── calculatorLabels.js
├── test-data/
│   ├── arithmeticData.js
│   └── invalidInputData.js
├── tests/
│   ├── rendering.spec.js        # TC-R-001, TC-R-003
│   └── functionality.spec.js    # TC-F-001, TC-F-004
├── playwright.config.js
└── package.json
```

## How to run the tests

### Standard Execution

```bash
npm test
```

### Other Testing Modes

| Command | Description |
|---------|-------------|
| `npm run test:headed` | Run tests with visible browser window |
| `npm run test:ui` | Use Playwright's interactive UI mode |
| `npm run report` | Open HTML test report after execution |

### Running Specific Tests

```bash
# Run all tests in a specific file
npx playwright test tests/rendering.spec.js

# Run a specific test by name (pattern match)
npx playwright test -g "TC-F-001"

# Run tests with a specific browser
npx playwright test --project=chromium

# Run tests with debug mode
npx playwright test --debug
```

## Troubleshooting for First-Time Users

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `command not found: npm` | Node.js isn't installed or not in PATH. [Install Node.js](https://nodejs.org/) |
| `Error: Cannot find module` | Run `npm install` to install missing dependencies |
| `Browser download failed` | Check your internet connection, or try: `npm install --ignore-scripts` then manually install browsers |
| `Tests fail with timeout` | The website might be slow. Increase timeout in `playwright.config.js` |
| `Port already in use` | Close other processes using the port, or change the test port in config |
| `Environment variable not set` | Verify `.env` file exists and has `CALCULATOR_URL` defined |

### Quick Health Check

Run this to verify everything is working:

```bash
# Check installation
npm list --depth=0

# List available tests
npx playwright test --list

# Run a single quick test
npx playwright test tests/rendering.spec.js
```
