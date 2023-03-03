class Employee {
    constructor(name, id, email, username, avatar_url) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.username = username;
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
    
    getUsername() {
        return this.username;
    }

    getRole() {
        return 'Employee';
    }
}

module.exports = Employee;