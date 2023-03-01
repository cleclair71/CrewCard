const genHTML = require('./src/genHTML.js');

const inquirer = require('inquirer');
const fs = require('fs');
const api = require('./src/api.js');
const util = require('util');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const crewArray = [];

// Manager questions

const addManager = () => {
    return inquirer.prompt([
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

.then(async managerInput => {
    const { name, id, email, officeNumber, username } = managerInput;
    let avatar_url = '';

    try {
        const response = await axios.get(`https://api.github.com/users/${Manager.username}`);
        avatar_url = response.data.avatar_url;
    } catch (error) {
        console.log(`Error fetching GitHub data for ${username}: ${error.message}`);
    }

    const manager = new Manager(name, id, email, officeNumber, username, avatar_url);
    crewArray.push(manager);
    console.log(manager);
})
.catch(error => {
    console.log(`Error adding manager: ${error.message}`);
});
};

//add employee questions

const addEmployee = () => {
    console.log(`
    =================
    Add a New Employee
    =================
    `);
    return inquirer.prompt([
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
            name: 'github',
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
    .then(employeeData => {
        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData;
    
        let employee;
        let avatar_url;
    
        if (role === 'Engineer') {
            const githubUrl = `https://api.github.com/users/${Engineer.github}`;
    
            try {
                const response = axios.get(githubUrl);
                avatar_url = response.data.avatar_url;
                employee = new Engineer(name, id, email, github, avatar_url);
                console.log(employee);
              } catch (error) {
                console.log(`Error fetching GitHub data for ${github}: ${error.message}`);
                employee = new Engineer(name, id, email, github);
              }
        } else if (role === 'Intern') {
            avatar_url = `https://api.github.com/users/${Intern.username}`;
            employee = new Intern(name, id, email, school, avatar_url);
            console.log(employee);
        }
    
        crewArray.push(employee);
    
        if (confirmAddEmployee) {
            return addEmployee(crewArray);
        } else {
            return crewArray;
        }
    });
};
addManager()
    .then(addEmployee)
    .then(crewArray => {
        return genHTML(crewArray);
    })
    .then(pageHTML => {
        return fs.appendFile('./dist/index.html', pageHTML, err => {
            if (err) {
                console.log(err);
                return;
                }
            });
    })
    .then(() => {
        console.log('Your Crew Cards have been created! Check out index.html to see it!');
    })
    .catch(err => {
        console.log(err);
    });

// write to html

// const writeFile = data => {
//     fs.writeFile('./dist/index.html', data, err => {
//         if (err) {
//             console.log(err);
//             return;
//         } else {
//             console.log('Your Crew Cards have been created! Check out index.html to see it!')
//         }
//     })
// };

//     addManager()
//     .then(addEmployee)
//     .then(crewArray => {
//         return genHTML(crewArray);
//     })
//     .then(pageHTML => {
//         return writeFile(pageHTML);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// };
