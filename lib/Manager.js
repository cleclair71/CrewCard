const Employee = require('./Employee');

class Manager extends Employee {
  constructor(name, id, email, officeNumber, avatar_url) {
    super(name, id, email, avatar_url);
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