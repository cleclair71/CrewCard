const Employee = require('./Employee');

class Manager extends Employee {
  constructor(name, id, email, username, officeNumber, avatar_url) {
    super(name, id, email, username, avatar_url);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return 'Manager';
  }
}

module.exports = Manager;