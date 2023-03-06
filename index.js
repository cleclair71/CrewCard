const api = require('./src/api');
const inquirer = require("inquirer");
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

let employees = [];

// Manager questions

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

//add Engineer questions

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

function numberInput(input) {
    if (Number.isInteger(Number.parseInt(input))) {
        return true;
    }
    else {
        return "Please enter a valid ID!";
    }
}

function nameInput(input) {
    if (input === "") {
        return "I hate to tell you what to do, but you must enter a value!"
    }
    else {
        return true;
    }
}

function emailInput(input) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input)) {
        return true;
    }
    else {
        return "Caught you! Please enter a valid email address!"
    }
}

const writeFile = data => {
    fs.writeFile('./dist/index.html', pageHTML, {encoding:'utf8',flag:'w'}, data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Your Crew Cards have been created! Check out index.html to see it!');
        }
    });
};
addManager()
    .then(addEmployee)
    .then(crewArray => {
        return generateCrew(crewArray);
    })
    .then(pageHTML => {
        return fs.writeFileSync('./dist/index.html', pageHTML, {encoding:'utf8',flag:'w'});     
    })
    .then(() => {
        console.log('Your Crew Cards have been created! Check out index.html to see it!');
    })
    .catch(err => {
        console.log(err);
    });
