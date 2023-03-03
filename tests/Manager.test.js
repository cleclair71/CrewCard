const Manager = require("../lib/Manager");

test("creates a manager object", () => {
    const manager = new Manager('Cassie', 1, 'cassieleclair71@gmail.com', 'cleclair71', 1);

    expect(manager.name).toEqual(expect.any(String));
});

test("gets manager office number", () => {
    const manager = new Manager('Cassie', 1, 'cassieleclair71@gmail.com', 'cleclair71', 1);

    expect(manager.getOfficeNumber()).toEqual(expect.any(Number));

});

test("gets manager username", () => {
    const manager = new Manager('Cassie', 1, 'cassieleclair71@gmail.com', 'cleclair71', 1);

    expect(manager.getUsername()).toEqual(expect.any(String));
});

test("gets manager role", () => {
    const manager = new Manager('Cassie', 1, 'cassieleclair71@gmail.com', 'cleclair71', 1);

    expect(manager.getRole()).toEqual('Manager');
});