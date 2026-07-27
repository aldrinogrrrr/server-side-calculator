# Server-Side Calculator - Automated Tests

Playwright (JavaScript) automation for the [EvilTester Server-Side Calculator](https://testpages.eviltester.com/apps/server-side-calculator/).

Covers:
- **2 Critical rendering tests** - page loads with the full form visible (TC-R-001), form's default state (TC-R-003).
- **2 Critical functionality tests** - core arithmetic (9 data-driven scenarios), invalid/empty input handling (6 data-driven scenarios).

17 total test executions across 4 test cases.

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

```bash
npm install
npx playwright install chromium
npm test
```

Other variants:
```bash
npm run test:headed
npm run test:ui
npm run report
```

Run a single file or test by name:
```bash
npx playwright test tests/rendering.spec.js
npx playwright test -g "TC-F-001"
```

## Note on TC-F-004

The app's exact validation message wasn't available while writing this, so instead of checking specific wording, it asserts that bad input never resolves to a clean numeric answer and never throws an unhandled error or triggers a dialog. Worth tightening once you've seen the real behavior.

## Status

All files pass `node --check`, and `npx playwright test --list` shows all 17 test executions registering correctly. Not yet run end-to-end against the live site from this environment.
