const generateCrewPage = require('./src/genHTML.js');
const generateManager = require('./lib/Manager.js');
const generateEngineer = require('./lib/Engineer.js');
const generateIntern = require('./lib/Intern.js');


const inquirer = require('inquirer');
const fs = require('fs');
const api = require('./src/api.js');
const path = require('path');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const outputPath = path.join(OUTPUT_DIR, 'index.html');

const crewArray = [];

// Manager questions

const addManager = () => {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the crew manager? (Required)',
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter a name!');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the managers ID? (Required)',
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log('Please enter the ID!');
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the crew managers email? (Required)',
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            console.log('Please enter an email!');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the crew managers office number? (Required)',
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log('Please enter an office number!');
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: 'input',
        message: 'What is their Github username?',
        name: 'username',
      },
    ])
    .then(async (managerInput) => {
      const { name, id, email, username, officeNumber } = managerInput;

      try {
        const userData = await api.getUser(username);
        const manager = new Manager(name, id, email, username, officeNumber);
        manager.avatar_url = userData.avatar_url;
        crewArray.push(manager);
        console.log(manager);
      } catch (err) {
        console.log(err);
      }
    });
};

// Employee questions

const getRole = (employeeData) => {
  const { role } = employeeData;

  switch (role) {
    case 'Engineer':
      return inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the engineer? (Required)',
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
                return "Please enter the name of the engineer.";
              }
            }
          },
          {
            type: 'input',
            name: 'id',
            message: 'What is the engineer\'s employee ID? (Required)',
            validate: (idInput) => {
              if (idInput) {
                return true;
              } else {
                return "Please enter the engineer's employee ID.";
              }
            }
          },
          {
            type: 'input',
            name: 'email',
            message: 'What is the engineer\'s email address? (Required)',
            validate: (emailInput) => {
              if (emailInput) {
                return true;
              } else {
                return "Please enter the engineer's email address.";
              }
            }
          },
          {
            type: 'input',
            name: 'github',
            message: 'What is the engineer\'s GitHub username? (Required)',
            validate: (githubInput) => {
              if (githubInput) {
                return true;
              } else {
                return "Please enter the engineer's GitHub username.";
              }
            }
          }
        ])
    
        .then((engineerData) => {
          const { name, id, email, github } = engineerData;
          return new Engineer(name, id, email, github);
        });
    }
      switch (role) {
      case 'Intern':
        return inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'What is the name of the intern? (Required)',
            validate: (nameInput) => {
              if (nameInput) {
                return true;
              } else {
                return "Please enter the name of the intern.";
              }
            }
          },
          {
            type: 'input',
            name: 'id',
            message: 'What is the intern\'s employee ID? (Required)',
            validate: (idInput) => {
              if (idInput) {
                return true;
              } else {
                return "Please enter the intern's employee ID.";
              }
            }
          },
          {
            type: 'input',
            name: 'email',
            message: 'What is the intern\'s email address? (Required)',
            validate: (emailInput) => {
              if (emailInput) {
                return true;
              } else {
                return "Please enter the intern's email address.";
              }
            }
          },
          {
            type: 'input',
            name: 'school',
            message: 'What is the name of the intern\'s school? (Required)',
            validate: (schoolInput) => {
              if (schoolInput) {
                return true;
              } else {
                return "Please enter the name of the intern's school.";
              }
            }
          }
        ])
        .then((internData) => {
          const { name, id, email, school } = internData;
          return new Intern(name, id, email, school);
        });
    
    
      default:
        console.log('Invalid role. Please enter a valid role.');
        return getRole(employeeData);
       
    }
    };
    const addEmployee = async () => {
        const employeeData = await inquirer.prompt([
          {
            type: 'list',
            name: 'role',
            message: 'What is the role of the employee?',
            choices: ['Engineer', 'Intern'],
          },
        ]);
      
        const employee = await getRole(employeeData);
        crewArray.push(employee);
        console.log(employee);
      
        const addAnotherData = await inquirer.prompt([
          {
            type: 'list',
            name: 'addAnother',
            message: 'Would you like to add another employee?',
            choices: ['Yes', 'No'],
          },
        ]);
      
        if (addAnotherData.addAnother === 'Yes') {
          await addEmployee();
        }
      };
      
      const init = async () => {
        console.log('Welcome to the Team Profile Generator!');
      
        try {
          await addManager();
          await addEmployee();
      
          const crewPage = generateCrewPage(crewArray);
          const cardsHtml = employeeCards(crewArray);
      
          if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
          }
      
          fs.writeFileSync(outputPath, crewPage, 'utf-8');
          console.log('Your team profile has been generated!');
        } catch (err) {
          console.log(err);
        }
      };
      
      init();

    module.exports = {addManager, addEmployee};
//     .then((employeeData) => {
//       return getRole(employeeData);
//     })
//     .then((employee) => {
//       crewArray.push(employee);
//       console.log(employee);
//     });
//   };
  
//   // Prompt user to add a manager or employee
  
//   const promptUser = () => {
//     return inquirer.prompt([
//       {
//         type: 'list',
//         name: 'choice',
//         message: 'Would you like to add a crew manager or a crew member?',
//         choices: ['Manager', 'Employee', 'Quit'],
//       },
//     ])
//     .then((answer) => {
//         switch (answer.choice) {
//             case 'Manager':
//                 return addManager();
//             case 'Employee':
//                 return addEmployee();
//             default:
//                 return buildTeam();
//         }
//     });
//     };

// // Build the team
// function buildTeam() {
//     if (!fs.existsSync(OUTPUT_DIR)) {
//       fs.mkdirSync(OUTPUT_DIR);
//     }
  
//     let employeeCards = '';
  
//     // Generate card for each crew member
//     crewArray.forEach(employee => {
//       let cardHTML;
//       switch (employee.getRole()) {
//         case 'Manager':
//           cardHTML = generateManager(employee);
//           break;
//         case 'Intern':
//           cardHTML = generateIntern(employee);
//           break;
//         case 'Engineer':
//           cardHTML = generateEngineer(employee);
//           break;
//         default:
//           cardHTML = '';
//       }
//       employeeCards += cardHTML;
//     });
  
//     // Generate complete HTML document using the team cards
//     let html = generateCrewPage(employeeCards);
  
//     // Write HTML to output file
//     fs.writeFileSync(outputPath, html, "utf-8");
//   }

