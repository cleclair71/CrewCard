const Employee = require('./Employee');

class Intern extends Employee {
    constructor(name, id, email, username, school, avatar_url) {
        super(name, id, email, username, avatar_url);
        this.school = school;
    }

    getGithub() {
        return this.username;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }
}

module.exports = Intern;