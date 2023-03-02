const Intern = require("../lib/Intern");

test("creates an intern object", () => {
    const intern = new Intern('Cassie', 1, 'cassieleclair71@gmail.com', 'UCLA', 'cleclair71');

    expect(intern.name).toEqual(expect.any(String));
});

test("gets intern school", () => {
    const intern = new Intern('Cassie', 1, 'cassieleclair71@gmail.com', 'UCLA', 'cleclair71');

    expect(intern.getSchool()).toEqual(expect.any(String));
});

test("gets username", () => {
    const intern = new Intern('Cassie', 1, 'cassieleclair71@gmail.com', 'UCLA', 'cleclair71');

    expect(intern.getUsername()).toEqual(expect.any(String));
});

test("gets intern role", () => {
    const intern = new Intern('Cassie', 1, 'cassieleclair71@gmail.com', 'UCLA', 'cleclair71');

    expect(intern.getRole()).toEqual('Intern');
});