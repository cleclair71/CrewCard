const Employee = require('./Employee');

class Intern extends Employee {
    constructor(name, id, email, school, avatar_url) {
        super(name, id, email, avatar_url);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }
}

module.exports = Intern;