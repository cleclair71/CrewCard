class Employee {
    constructor(name, id, email, avatar_url) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.avatar_url = avatar_url;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return 'Employee';
    }
}

module.exports = Employee;