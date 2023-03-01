const Employee = require('./Employee');

Test('Can instantiate Employee instance', () => {
    const e = new Employee();
    expect(typeof(e)).toBe('object');
});

Test('Can set name via constructor arguments', () => {
    const name = 'Alice';
    const e = new Employee(name);
    expect(e.name).toBe(name);
});

Test('Can set id via constructor argument', () => {
    const testValue = 100;
    const e = new Employee('Foo', testValue);
    expect(e.id).toBe(testValue);
});

Test('Can set email via constructor argument', () => {
    const testValue = '';
    const e = new Employee('Foo', 1, testValue);
    expect(e.email).toBe(testValue);
});

Test('Can get avatar_url via constructor argument', () => {
    const testValue = '';
    const e = new Employee('Foo', 1, testValue);
    expect(e.avatar_url).toBe(testValue);
});
