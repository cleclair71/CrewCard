const Engineer = require("../lib/Engineer");

test("creates an engineer object", () => {
    const engineer = new Engineer('Cassie', 1, 'cassieleclair71@gmail.com', 'cleclair71');

    expect(engineer.name).toEqual(expect.any(String));
});

test("gets engineer github", () => {
    const engineer = new Engineer('Cassie', 1, 'cassieleclair71@gmail.com', 'cleclair71');

    expect(engineer.getGithub()).toEqual(expect.any(String));
});

test("gets engineer role", () => {
    const engineer = new Engineer('Cassie', 1, 'cassieleclair71@gmail.com', 'cleclair71');

    expect(engineer.getRole()).toEqual('Engineer');
});