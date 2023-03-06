const api = require('./src/api'); // api calls
const inquirer = require("inquirer"); // inquirer for user input
const fs = require('fs'); // file system
const Manager = require('./lib/Manager'); // manager class
const Engineer = require('./lib/Engineer'); // engineer class
const Intern = require('./lib/Intern'); // intern class

let employees = []; // array of employee objects

//manager questions

const addManager = [
    {
        type: 'input',
        message: 'What is the name of the crew manager? (Required)',
        name: 'name',
        validate: nameInput,
    },
    {
        type: 'input',
        message: 'What is the managers ID? (Required)',
        name: 'id',
        validate: numberInput,
    },
    {
        type: 'input',
        message: 'What is the crew managers email? (Required)',
        name: 'email',
        validate: emailInput,
    },
    {
        type: 'input',
        message: 'What is the crew managers office number? (Required)',
        name: 'office',
        validate: numberInput,
    },
    {
        type: 'input',
        name: 'username',
        message: 'What is the employees Github username? (Required)',
        validate: ghInput => {
            if (ghInput) {
                return true;
            } else {
                console.log('Please enter a Github username!');
                return false;
            }
        }
    },
]

//engineer questions

const generateEngineer = [
    {
        type: 'input',
        message: 'What is the name of the employee? (Required)',
        name: 'name',
        validate: nameInput,
    },
    {
        type: 'input',
        message: 'What is the employees ID? (Required)',
        name: 'id',
        validate: numberInput,
    },
    {
        type: 'input',
        message: 'What is the employees email? (Required)',
        name: 'email',
        validate: emailInput,
    },
    {
        type: 'input',
        message: 'What is the employees Github username? (Required)',
        name: 'github',
        validate: nameInput,
    },
]
// intern questions
const generateIntern = [
    {
        type: 'input',
        message: 'What is the name of the employee? (Required)',
        name: 'name',
        validate: nameInput,
    },
    {
        type: 'input',
        message: 'What is the employees ID? (Required)',
        name: 'id',
        validate: numberInput,
    },
    {
        type: 'input',
        message: 'What is the employees email? (Required)',
        name: 'email',
        validate: emailInput,
    },
    {
        type: 'input',
        message: 'What school does the intern attend? (Required)',
        name: 'school',
        validate: nameInput,
    },
    {
        type: 'input',
        name: 'username',
        message: 'What is the employees Github username? (Required)',
        validate: ghInput => {
            if (ghInput) {
                return true;
            } else {
                console.log('Please enter a Github username!');
                return false;
            }
        }
    },
]

// validate number input
function numberInput(input) {
    if (Number.isInteger(Number.parseInt(input))) {
        return true;
    }
    else {
        return "Please enter a valid ID!";
    }
}
// validate name input
function nameInput(input) {
    if (input === "") {
        return "I hate to tell you what to do, but you must enter a value!"
    }
    else {
        return true;
    }
}
// validate email
function emailInput(input) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input)) {
        return true;
    }
    else {
        return "Caught you! Please enter a valid email address!"
    }
}

// This function takes in employee data and creates a new Employee object based on their role. 

// The employee object is then pushed to the employees array.
async function addRole(data) {
    // Convert the id value to a number using parseInt() method.
    data.id = Number.parseInt(data.id);

    // If the employee's role is a Manager, create new Manager object and push it to the employees array.

    // set the avatar_url property of the Manager object using the username provided by the user.
    if (data.office !== undefined) {
        data.office = Number.parseInt(data.office);
        const manager = new Manager(data.name, data.id, data.email, data.office);
        manager.avatar_url = await getAvatarUrl(data.username);
        employees.push(manager);
    }
    // If the employee's role is an Engineer, create a new Engineer object and push it to the employees array.

    // Set the avatar_url property of the Engineer object using the github username provided by the user.
    else if (data.github !== undefined) {
        const engineer = new Engineer(data.name, data.id, data.email, data.github);
        engineer.avatar_url = await getAvatarUrl(data.github);
        employees.push(engineer);
    }
    // If the employee's role is an Intern, create a new Intern object and push it to the employees array.

    // Set the avatar_url property of the Intern object using the username provided by the user
    else if (data.school !== undefined) {
        const intern = new Intern(data.name, data.id, data.email, data.school);
        intern.avatar_url = await getAvatarUrl(data.username);
        employees.push(intern);
    }
}
// This function takes in a Github username and returns the avatar url of the user.
async function getAvatarUrl(username) {
    // Make an API call to get the user data using the Github API.
    const userData = await api.getUser(username);
    // Return the avatar url of the user.
    return userData.avatar_url;
}

// prompts the user to either add additional employees or finish building their team and end the program
function addAnotherEmployee() {
    // Prompt the user to select a choice from a list of options
    inquirer
        .prompt(
            {
                type: 'list',
                message: 'Would you like to add another employee?',
                choices: ['Add Engineer', 'Add Intern', 'Crew is Complete!'],
                name: 'action',
            }
        )
        .then((response) => {
// If user chose to finish building team, generate the HTML file and end the program
            if (response.action === 'Crew is Complete!') {
                writeToFile();
            }
 // If user chose to add another employee, prompt them to enter new employee's details
            else {
                // Determine which type of employee the user chose to add
                if (response.action === 'Add Engineer') {
                    var inquirerPrompt = generateEngineer;
                }
                else if (response.action === 'Add Intern') {
                    var inquirerPrompt = generateIntern;
                }
                  // Prompt the user to enter the new employee's details and add them to the team
                inquirer
                    .prompt(inquirerPrompt)
                    .then((response) => {
                        addRole(response);
                        // Prompt the user to add another employee 
                        addAnotherEmployee();
                    })
            }
        })
}

// Generates an HTML file containing the team info and saves it in the 'dist' folder
function writeToFile() {
    var data = generateHTML();
    // Write the generated HTML to the 'index.html' file in the 'dist' folder
    fs.writeFile('./dist/index.html', data, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("Your Crew Cards have been generated! Check them out in './dist/index.html'");
        }
    });
}

// Generates the HTML template for the team page
function generateHTML() {
    var template =
        `
    <!Doctype html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crew Card</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Concert+One&family=Montserrat+Alternates:wght@100;300&display=swap"
            rel="stylesheet">
        <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
        <link rel="stylesheet" href="stylesheet.css">
    </head>
    
    <body>
        <header class="header sticky-top">
            <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
                <div class="container"><a class="navbar-brand" href="#">
                        <a href="#" class="navbar-brand"><img src="../assets/cc.png"></a>
                        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation"><span
                                class="navbar-toggler-icon"></span></button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item active"><a href="#" onclick="alert('Please open your terminal and enter the command: cd \CrewCard> node index.js')">Make New Crew</a></li>
                            </ul>
                        </div>
                </div>
            </nav>
        </header>
    
        <!-- team cards -->
        <div class="profile-area">
            <div class="jumbotron">
                <h1 class="display-4">Your Crew</h1>
                <p class="lead">Teamwork is
                    the backbone of any successful project.</p>
                <hr class="my-4">
                <div class="container">
                    <div class="row justify-content-center">

                    ${generateCrew()}
                    </div>
                </div>
            </div>
        </div>
        <footer class="bg-light text-center text-lg-start">
        <!-- Copyright -->
        <div class="text-center p-3" style="background-color: rgba(255, 255, 255, 0.2);">
            The MIT Licence (MIT) 2023:
            <a class="text-info" href="https://github.com/cleclair71?tab=repositories">Cassie LeClair</a>
        </div>
        <!-- Copyright -->
    </footer>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
</body>

</html>`;
    return template;
}

// Generates the HTML for each employee card
function generateCrew() {
    // Loop through the employees array and generate the HTML for each employee
    var crewCard = "";
    employees.forEach(employee => {
        // Switch statement to determine which type of employee is being generated
        switch (employee.constructor.name) {
            // Generate the Crew Card for Manager
            case 'Manager':
                crewCard +=
                    `
                <div class="col-md-4">
                                    <div class="card">
                                        <div class="card-header">
                                            <div class="img1"><img src="../assets/managerpic.jpg" alt=""></div>
                                            <div class="avatar"><img src="${employee.avatar_url}" onerror="this.onerror=null;this.src='../assets/defaultprofile.jpg';" alt="${employee.username}"></div>
                                            <div class="main-text">
                                                    <h3>${employee.name}</h3>
                                                    <h4>Manager</h4><img class="logo" src="../assets/managericon.png"
                                                        alt="manager icon"> <br>
                                                    <a class="btn btn-primary" data-toggle="collapse" href="#collapseManager"
                                                        role="button" aria-expanded="false" aria-controls="collapseManager">
                                                        @
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="card-body collapse" id="collapseManager">
                                                <p class="id">ID: ${employee.id}</p>
                                                <p class="email">Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
                                                <p class="office">Office Number: ${employee.officeNumber}
                                                </p>
                                            </div>
                
                                    </div>
                                </div>
                `;
                break;
            // Generate the Crew Card for Engineer
            case 'Engineer':
                crewCard +=
                    `
                <div class="col-md-4">
                                    <div class="card">
                                        <div class="card-header">
                                            <div class="img1"><img src="../assets/engineerpic.jpg" alt=""></div>
                                            <div class="avatar"><img src="${employee.avatar_url}" onerror="this.onerror=null;this.src='../assets/defaultprofile.jpg';" alt="${employee.username}"></div>
                                            <div class="main-text">
                                                    <h3>${employee.name}</h3>
                                                    <h4>Engineer</h4><img class="logo" src="../assets/developer.png"
                                                        alt="engineer icon">
                                                    <br>
                                                    <a class="btn btn-primary" data-toggle="collapse" href="#collapseEngineer"
                                                        role="button" aria-expanded="false" aria-controls="collapseEngineer"> @ </a>
                
                                                </div>
                                            </div>
                                            <div class="card-body collapse" id="collapseEngineer">
                                                <p class="id">ID: ${employee.id}</p>
                                                <p class="email">Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
                                                <p class="github">Github: <a
                                                        href="https://github.com/${employee.github}">${employee.github}</a></p>
                                            </div>
                                    </div>
                                </div>
                `;
                break;

                // Generate the Crew Card for Intern
            case 'Intern':
                crewCard +=
                    `
                <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                 <div class="img1"><img src="../assets/internpic.jpg" alt=""></div>
                        <div class="avatar"><img src="${employee.avatar_url}" onerror="this.onerror=null;this.src='../assets/defaultprofile.jpg';" alt="${employee.username}"></div>
                        <div class="main-text">
                     <h3>${employee.name}</h3>
                        <h4>Intern</h4><img class="logo" src="../assets/internship.png" alt="intern icon">
                         <br>
                        <a class="btn btn-primary" data-toggle="collapse" href="#collapseIntern" role="button" aria-expanded="false" aria-controls="collapseIntern"> @</a>
                     </div>
                                        </div>
                                        <div class="card-body collapse" id="collapseIntern">
                                            <p class="id">ID: ${employee.id}</p>
                                            <p class="email">Email: <a href="mailto:${employee.email}">${employee.email}</a></p>
                                            <p class="school">School: ${employee.school}</p>
                                        </div>
                </div>
            </div>
            `;
                break;
        }
    })
    return crewCard;
}

function init() {
    inquirer
        .prompt(addManager)
        .then((response) => {
            addRole(response);
            addAnotherEmployee();
        })
}

// Call the `init` function to start the program
init();