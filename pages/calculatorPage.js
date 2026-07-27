const { expect } = require('@playwright/test');
const { calculatorLocators } = require('../locators/calculatorLocators');

class CalculatorPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToCalculator(url) {
        const response = await this.page.goto(url);
        const numberOneInput = this.page.locator(calculatorLocators.numberOneInput);
        await numberOneInput.waitFor({ state: 'visible' });
        return response;
    }

    async enterFirstNumber(value) {
        await this.page.fill(calculatorLocators.numberOneInput, value);
    }

    async enterSecondNumber(value) {
        await this.page.fill(calculatorLocators.numberTwoInput, value);
    }

    async selectOperator(operator) {
        await this.page.selectOption(calculatorLocators.operatorDropdown, { label: operator });
    }

    async clickCalculate() {
        const calculateBtn = this.page.locator(calculatorLocators.calculateButton);
        await calculateBtn.waitFor({ state: 'visible' });
        await calculateBtn.click();
    }

    async getAnswerText() {
        const answer = this.page.locator(calculatorLocators.answer);
        return answer.innerText();
    }

    async getSelectedOperator() {
        const selectedOption = this.page.locator(calculatorLocators.operatorDropdown).locator('option:checked');
        return selectedOption.innerText();
    }

    async calculate(numberOne, operator, numberTwo) {
        const answerLocator = this.page.locator(calculatorLocators.answer);
        const previousAnswer = await answerLocator.innerText().catch(() => '');

        await this.enterFirstNumber(numberOne);
        await this.selectOperator(operator);
        await this.enterSecondNumber(numberTwo);
        await this.clickCalculate();

        await expect
            .poll(async () => answerLocator.innerText(), { timeout: 10000 })
            .not.toBe(previousAnswer);

        return answerLocator.innerText();
    }

    // doesn't wait for the answer to change - invalid input may never produce one
    async submit(numberOne, operator, numberTwo) {
        await this.enterFirstNumber(numberOne);
        await this.selectOperator(operator);
        await this.enterSecondNumber(numberTwo);
        await this.clickCalculate();
        await this.page.waitForLoadState('networkidle').catch(() => {});
    }
}

module.exports = CalculatorPage;
