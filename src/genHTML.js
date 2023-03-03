// create manager card
const generateCrew = (employees) => {
    // let pageArray = [];
    const generateManager = function (manager) {
        return `
    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <div class="img1"><img src="../assets/managerpic.jpg" alt=""></div>
                                <div class="avatar"><img src="${manager.avatar_url}" onerror="this.onerror=null;this.src='../assets/defaultprofile.jpg';" alt="Profile Picture"></div>
                                <div class="main-text">
                                        <h3>${manager.name}</h3>
                                        <h4>Manager</h4><img class="logo" src="../assets/managericon.png"
                                            alt="manager icon"> <br>
                                        <a class="btn btn-primary" data-toggle="collapse" href="#collapseManager"
                                            role="button" aria-expanded="false" aria-controls="collapseManager">
                                            @
                                        </a>
                                    </div>
                                </div>
                                <div class="card-body collapse" id="collapseManager">
                                    <p class="id">ID: ${manager.id}</p>
                                    <p class="email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
                                    <p class="office">Office Number: ${manager.officeNumber}
                                    </p>
                                </div>
    
                        </div>
                    </div>
    `;
    }
    const generateEngineer = function (engineer) {
        return `
    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <div class="img1"><img src="../assets/engineerpic.jpg" alt=""></div>
                                <div class="avatar"><img src="${engineer.avatar_url}" onerror="this.onerror=null;this.src='../assets/defaultprofile.jpg';" alt="Profile Picture"></div>
                                <div class="main-text">
                                        <h3>${engineer.name}</h3>
                                        <h4>Engineer</h4><img class="logo" src="../assets/developer.png"
                                            alt="engineer icon">
                                        <br>
                                        <a class="btn btn-primary" data-toggle="collapse" href="#collapseEngineer"
                                            role="button" aria-expanded="false" aria-controls="collapseEngineer"> @ </a>
    
                                    </div>
                                </div>
                                <div class="card-body collapse" id="collapseEngineer">
                                    <p class="id">ID: ${engineer.id}</p>
                                    <p class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
                                    <p class="github">Github: <a
                                            href="https://github.com/${engineer.username}">${engineer.username}</a></p>
                                </div>
                        </div>
                    </div>
    `;
    }
    // create intern card
const generateIntern = function (intern) {
    return `
    <div class="col-md-4">
    <div class="card">
        <div class="card-header">
     <div class="img1"><img src="../assets/internpic.jpg" alt=""></div>
            <div class="avatar"><img src="${intern.avatar_url}" onerror="this.onerror=null;this.src='../assets/defaultprofile.jpg';" alt="Profile Picture"></div>
            <div class="main-text">
         <h3>${intern.name}</h3>
            <h4>Intern</h4><img class="logo" src="../assets/internship.png" alt="intern icon">
             <br>
            <a class="btn btn-primary" data-toggle="collapse" href="#collapseIntern" role="button" aria-expanded="false" aria-controls="collapseIntern"> @</a>
         </div>
                            </div>
                            <div class="card-body collapse" id="collapseIntern">
                                <p class="id">ID: ${intern.id}</p>
                                <p class="email">Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
                                <p class="school">School: ${intern.school}</p>
                            </div>
    </div>
</div>
`;
}
    // employees.forEach(employee => {
    //     const { name, id, email, role, avatar_url } = employee;

    //     let additionalInfo = '';

    //     switch (role) {
    //         case 'Manager':
    //             additionalInfo = `Office Number: ${employee.officeNumber}`;
    //             break;
    //         case 'Engineer':
    //             additionalInfo = `GitHub: <a href="https://github.com/${employee.username}">${employee.username}</a>`;
    //             break;
    //         case 'Intern':
    //             additionalInfo = `School: ${employee.school}`;
    //             break;
    //         default:
    //             break;
    //     }

    //     const card = `
    //     <div class="col-md-4">
    //         <div class="card">
    //             <div class="card-header">
    //                 <div class="img1"><img src="../assets/${role.toLowerCase()}pic.jpg" alt=""></div>
    //                 <div class="avatar"><img src="${avatar_url}" onerror="this.onerror=null;this.src='../assets/defaultprofile.jpg';" alt="Profile Picture"></div>
    //                 <div class="main-text">
    //                     <h3>${name}</h3>
    //                     <h4>${role}</h4><img class="logo" src="../assets/${role.toLowerCase()}icon.png" alt="${role} icon">
    //                     <br>
    //                     <a class="btn btn-primary" data-toggle="collapse" href="#collapse${role}" role="button" aria-expanded="false" aria-controls="collapse${role}">@</a>
    //                 </div>
    //             </div>
    //             <div class="card-body collapse" id="collapse${role}">
    //                 <p class="id">ID: ${id}</p>
    //                 <p class="email">Email: <a href="mailto:${email}">${email}</a></p>
    //                 <p class="${role.toLowerCase()}">${additionalInfo}</p>
    //             </div>
    //         </div>
    //     </div>
    //     `;

    //     pageArray.push(card);
    // });
 


// create engineer card
pageArray = [];
pageArray.push(employees
    .filter(employee => employee.getRole() === 'Manager')
    .map(manager => generateManager(manager)));

    pageArray.push(employees
        .filter(employee => employee.getRole() === 'Engineer')
        .map(engineer => generateEngineer(engineer))
        .join(''));

        pageArray.push(employees
            .filter(employee => employee.getRole() === 'Intern')
            .map(intern => generateIntern(intern))
            .join(''));
            return pageArray.join('');
        }

// push to page array
//! error getRole not defined

// const generateHTML = (data) => {
//     

//     for (let i = 0; i < data.length; i++) {
//         const employee = data[i];
//         const role = employee.getRole();

//         if (role === 'Manager') {
//             const managerCard = generateManager(employee);

//             pageArray.push(managerCard);

//         }

//         if (role === 'Engineer') {
//             const engineerCard = generateEngineer(employee);

//             pageArray.push(engineerCard);

//         }

//         if (role === 'Intern') {
//             const internCard = generateIntern(employee);

//             pageArray.push(internCard);

//         }

//     }

//     const employeeCards = pageArray.join('')
//     const generateCrew = generateCrewPage(employeeCards);
//     return generateCrew;

// }
// create html
// const generateCrewPage = function (employeeCards) {
    module.exports = employees => {
    return `
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
        <link rel="stylesheet" href="../dist/stylesheet.css">
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

                    ${generateCrew(employees)}

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
}

// module.exports = generateHTML;