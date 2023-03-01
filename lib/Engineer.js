const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, username, avatar_url) {
        super(name, id, email, avatar_url);
        this.username = username;
    }
    getGithub() {
        return this.username;
    }
    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;