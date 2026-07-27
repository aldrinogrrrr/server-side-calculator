export const arithmeticCases = [
    { description: 'straightforward addition', numberOne: '5', operator: 'plus', numberTwo: '3', expected: '8' },
    { description: 'straightforward subtraction', numberOne: '10', operator: 'minus', numberTwo: '4', expected: '6' },
    { description: 'straightforward multiplication', numberOne: '6', operator: 'times', numberTwo: '7', expected: '42' },
    { description: 'straightforward division', numberOne: '20', operator: 'divide', numberTwo: '4', expected: '5' },
    { description: 'adding two negative numbers', numberOne: '-5', operator: 'plus', numberTwo: '-3', expected: '-8' },
    { description: 'subtracting into negative territory', numberOne: '3', operator: 'minus', numberTwo: '10', expected: '-7' },
    { description: 'decimal addition', numberOne: '2.5', operator: 'plus', numberTwo: '2.5', expected: '5' },
    { description: 'zero as an operand', numberOne: '0', operator: 'times', numberTwo: '25', expected: '0' },
    { description: 'a leading zero should not confuse the parser', numberOne: '007', operator: 'plus', numberTwo: '3', expected: '10' },
];
