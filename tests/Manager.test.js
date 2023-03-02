const Manager = require("../lib/Manager");

test("creates a manager object", () => {
    const manager = new Manager('Cassie', 1, 'cassieleclair71@gmail.com', 1, 'cleclair71');

    expect(manager.name).toEqual(expect.any(String));
});

test("gets manager office number", () => {
    const manager = new Manager('Cassie', 1, 'cassieleclair71@gmail.com', 1, 'cleclair71');

    expect(manager.getOfficeNumber()).toEqual(expect.any(Number));

});

test("gets manager username", () => {
    const manager = new Manager('Cassie', 1, 'cassieleclair71@gmail.com', 1, 'cleclair71');

    expect(manager.getUsername()).toEqual(expect.any(String));
});

test("gets manager role", () => {
    const manager = new Manager('Cassie', 1, 'cassieleclair71@gmail.com', 1, 'cleclair71');

    expect(manager.getRole()).toEqual('Manager');
});