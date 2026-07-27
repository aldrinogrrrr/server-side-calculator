export const invalidInputCases = [
    { description: 'first field left empty', numberOne: '', operator: 'plus', numberTwo: '5', expected: 'ERR' },
    { description: 'second field left empty', numberOne: '5', operator: 'plus', numberTwo: '', expected: 'ERR' },
    { description: 'both fields left empty', numberOne: '', operator: 'plus', numberTwo: '', expected: 'ERR' },
    { description: 'nonsense text instead of a number', numberOne: 'zzqxnonsense', operator: 'plus', numberTwo: '5', expected: 'ERR' },
    { description: 'a script tag, in case someone gets clever', numberOne: '<script>alert(1)</script>', operator: 'plus', numberTwo: '5', expected: 'ERR' },
    { description: 'whitespace pretending to be a value', numberOne: '   ', operator: 'plus', numberTwo: '5', expected: 'ERR' },
];
