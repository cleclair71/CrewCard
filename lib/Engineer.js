const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, github, avatar_url) {
        super(name, id, email, avatar_url);
        this.github = github;
        this.avatar_url = avatar_url;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;