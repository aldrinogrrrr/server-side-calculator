const { test, expect } = require('@playwright/test');
require('dotenv').config();
const CalculatorPage = require('../pages/calculatorPage');
const { arithmeticCases } = require('../test-data/arithmeticData');
const { invalidInputCases } = require('../test-data/invalidInputData');

test.describe('Server-Side Calculator - Functionality (Critical)', () => {

    test.describe('TC-F-001: core arithmetic returns the correct result', () => {
        for (const testCase of arithmeticCases) {
            test(`${testCase.numberOne} ${testCase.operator} ${testCase.numberTwo} -> ${testCase.expected} (${testCase.description})`, async ({ page }) => {
                const calculatorPage = new CalculatorPage(page);
                await calculatorPage.navigateToCalculator(process.env.CALCULATOR_URL);

                const actualAnswer = await calculatorPage.calculate(testCase.numberOne, testCase.operator, testCase.numberTwo);
                const actualAsNumber = Number(actualAnswer.replace(/[^0-9.-]/g, ''));

                expect(actualAsNumber).toBe(Number(testCase.expected));
            });
        }
    });

    test.describe('TC-F-004: invalid or missing input is not silently miscalculated', () => {
        for (const testCase of invalidInputCases) {
            test(`rejects gracefully: ${testCase.description}`, async ({ page }) => {
                const calculatorPage = new CalculatorPage(page);

                const unexpectedErrors = [];
                page.on('pageerror', (error) => unexpectedErrors.push(error.message));
                page.on('dialog', async (dialog) => {
                    unexpectedErrors.push(`unexpected dialog: "${dialog.message()}"`);
                    await dialog.dismiss();
                });

                await calculatorPage.navigateToCalculator(process.env.CALCULATOR_URL);
                await calculatorPage.submit(testCase.numberOne, testCase.operator, testCase.numberTwo);

                const answerAfterSubmit = await calculatorPage.getAnswerText();

                // exact validation message is unknown, so we check it never returns a clean number instead
                expect(answerAfterSubmit).not.toMatch(/^-?\d+(\.\d+)?$/);
                expect(unexpectedErrors).toHaveLength(0);
            });
        }
    });
});
