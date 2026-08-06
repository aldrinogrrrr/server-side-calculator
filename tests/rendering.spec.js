const { test, expect } = require('@playwright/test');
require('dotenv').config();
const CalculatorPage = require('../pages/calculatorPage');
const { calculatorLocators } = require('../locators/calculatorLocators');
const { calculatorLabels } = require('../ui-labels/calculatorLabels');

test.describe('Server-Side Calculator - Rendering (Critical) @smoke @regression', () => {

    test('TC-R-001: [Server-Side Calculator] Page loads successfully', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);

        const consoleErrors = [];
        page.on('console', (message) => {
            if (message.type() === 'error') {
                consoleErrors.push(message.text());
            }
        });

        const response = await calculatorPage.navigateToCalculator(process.env.CALCULATOR_URL);
        expect(response.ok()).toBeTruthy();

        await expect(page.locator(calculatorLocators.numberOneInput)).toBeVisible();
        await expect(page.locator(calculatorLocators.numberTwoInput)).toBeVisible();
        await expect(page.locator(calculatorLocators.operatorDropdown)).toBeVisible();
        await expect(page.locator(calculatorLocators.calculateButton)).toBeVisible();

        expect(consoleErrors).toHaveLength(0);
    });

    test('TC-R-003: [Server-Side Calculator] Core input elements are present with correct default state', async ({ page }) => {
        const calculatorPage = new CalculatorPage(page);
        await calculatorPage.navigateToCalculator(process.env.CALCULATOR_URL);

        const numberOneInput = page.locator(calculatorLocators.numberOneInput);
        const numberTwoInput = page.locator(calculatorLocators.numberTwoInput);
        await expect(numberOneInput).toHaveValue('');
        await expect(numberTwoInput).toHaveValue('');

        const selectedOperator = await calculatorPage.getSelectedOperator();
        expect(selectedOperator.trim().toLowerCase()).toBe(calculatorLabels.defaultOperator);

        const calculateBtn = page.locator(calculatorLocators.calculateButton);
        await expect(calculateBtn).toBeVisible();
        await expect(calculateBtn).toBeEnabled();

        const initialAnswer = await calculatorPage.getAnswerText();
        expect(initialAnswer).not.toMatch(/\d/);
    });
});
