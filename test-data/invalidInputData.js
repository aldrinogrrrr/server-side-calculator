export const invalidInputCases = [
    { description: 'first field left empty', numberOne: '', operator: 'plus', numberTwo: '5' },
    { description: 'second field left empty', numberOne: '5', operator: 'plus', numberTwo: '' },
    { description: 'both fields left empty', numberOne: '', operator: 'plus', numberTwo: '' },
    { description: 'nonsense text instead of a number', numberOne: 'zzqxnonsense', operator: 'plus', numberTwo: '5' },
    { description: 'a script tag, in case someone gets clever', numberOne: '<script>alert(1)</script>', operator: 'plus', numberTwo: '5' },
    { description: 'whitespace pretending to be a value', numberOne: '   ', operator: 'plus', numberTwo: '5' },
];
