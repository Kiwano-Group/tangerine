const { default: mongoose } = require('mongoose');
const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');

const { errorHandler } = require('./middleware/errorHandlerMiddleware.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })

// Env file secrets
const mongoURI = process.env.mongoURI;
const PORT = process.env.PORT;

// Connect to MongoDB
mongoose.connect(mongoURI);

// Controllers
const employeeController = require('./controller.js');
const User = require('./routers/userRoutes.js');

// Routers 
app.use('/api/user/', User)

app.get("/api/filterFirstName", employeeController.filterFirstName, (req, res) => {
    console.log(res.locals.result)
    return res.status(200).json(res.locals.result);
})

//GET THE WHOLE TABLE
app.get('/api/table', employeeController.getDb, (req, res) => {
    return res.status(200).json(res.locals.result);
})

//filter by EMPLOYEE ID
app.get('/api/id/:id', employeeController.filterById, (req, res) => {
    return res.status(200).json(res.locals.result);
})


//filter by DEPARTMENT
app.get('/api/department/:dept', employeeController.filterByDept, (req, res) => {
    return res.status(200).json(res.locals.result);
})

//filter by ROLE
app.get('/api/role/:role', employeeController.filterByRole, (req, res) => {
    return res.status(200).json(res.locals.result);
})

//filter by SALARY
app.get('/api/salary/:num', employeeController.filterBySalary, (req, res) => {
    return res.status(200).json(res.locals.result);
})

//ADD A ROW TO TABLE, INFO IN REQ BODY
app.post('/api/add', employeeController.addDb, employeeController.getDb, (req, res) => {
    return res.status(200).json(res.locals.result);
})

//UPDATE A ROW VALID ENTRIES ---> name, role, dept, salay, type, phone_number, email
app.patch('/api/update/:id', employeeController.updateDb, employeeController.filterById, (req, res) => {
    return res.status(200).json(res.locals.result);
})



//DELETE A ROW 
app.delete('/api/delete/:id', employeeController.deleteOne, employeeController.getDb, (req, res) => {
    return res.status(200).send(res.locals.result);
})



// //SAVE A USER
// app.post('/api/user/signup', userController.registerUser, (req, res) => {
//     return res.status(200).json(res.locals.loginId);
// })


// //login a user
// app.post('/api/user/login', userController.getUser, (req, res) => {
//     return res.status(200).send(res.locals.user);
// })



//SERVER CHECK
app.get('/api/', (req, res) => {
    return res.status(200).send('the server works!!');
})

//unknown path handler
app.use('/api/*', (req, res) => {
    return res.status(404).send('404 page does not exist');
});


// Global Error Handler
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

