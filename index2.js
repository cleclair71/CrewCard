
const inquirer = require('inquirer');
const fs = require('fs');
const api = require('./src/api.js');
const path = require('path');

const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const OUTPUT_DIR = path.resolve(__dirname, '../dist');
const outputPath = path.join(OUTPUT_DIR, 'index.html');

const render = require('./src/genHTML.js');

const crewMembers = [];
const idArray = [];

const addManager = () => {
    console.log ('Build your crew!');
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the crew manager? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the managers ID? (Required)',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Please enter the ID!');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the crew managers email? (Required)',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log('Please enter an email!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the crew managers office number? (Required)',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Please enter an office number!')
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            message: "What is their Github username?",
            name: 'username',
        },

    ])

    .then(async (answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber, answers.username);
        crewMembers.push(manager);
        idArray.push(answers.id);
        const userData = await api.getUser(answers.username);
        manager.avatar_url = userData.avatar_url;
        addEmployee();
    })
};

const addEmployee = () => {
    console.log(`
    =================
    Add a New Employee
    =================
    `);
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the employee?',
                choices: ['Engineer', 'Intern']
            },
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the employee? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter a name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the employees ID? (Required)',
                validate: nameInput => {
                    if (isNaN(nameInput)) {
                        console.log('Please enter the ID!');
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the employees email? (Required)',
                validate: email => {
                    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                    if (valid) {
                        return true;
                    } else {
                        console.log('Please enter an email!')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'username',
                message: 'What is the employees Github username? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter a Github username!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'school',
                message: 'What school does the intern attend? (Required)',
                when: (input) => input.role === 'Intern',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter a school!');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAddEmployee',
                message: 'Would you like to add another employee?',
                default: false
            }
        ])

        .then(async (answers) => {
            let employee;
            if (answers.role === 'Engineer') {
                employee = new Engineer(answers.name, answers.id, answers.email, answers.username);
                console.log(employee);
            } else if (answers.role === 'Intern') {
                employee = new Intern(answers.name, answers.id, answers.email, answers.school);
            }
            crewMembers.push(employee);
            idArray.push(answers.id);
            await api.getUser(answers.username);
            if (answers.confirmAddEmployee) {
                addEmployee();
            } else {
                buildTeam();
            }
        })
};

function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(crewMembers), "utf-8");
}

addManager();


