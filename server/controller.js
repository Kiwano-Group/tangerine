const db = require('./model.js')

const { deleteUser, createUser } = require('../client/services/googleFunc.js');

const { slackCreation } = require ('../client/services/slackFunc.js');

const schedule = require('node-schedule');

const employeeController = {};

//createing intial table
employeeController.createDb = async (req, res, next) => {
  try {
    // const myQuery = `CREATE TABLE employees( employee_id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, role VARCHAR(50) NOT NULL, department VARCHAR(50) NOT NULL);`

    const myQuery = `CREATE TABLE employees (
      employee_id SERIAL PRIMARY KEY,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      role VARCHAR(255),
      department VARCHAR(255),
      salary DECIMAL(15),
      type VARCHAR(50),
      birthday DATE,
      phone_number VARCHAR(15),
      email VARCHAR(255),
      start_date DATE
  );`
    const result = await db.query(myQuery);
    res.locals.result = result;
    return next()
  } catch (err) {
    return next({
      message: { err: err }
    })
  }
}

//adding employees
employeeController.addDb = async (req, res, next) => {
  const { first_name, last_name, role, department, salary, type, birthday, phone_number, email, start_date } = req.body;

  let myQuery;
  let values;

  // start_date and birthday no longer need to be parsed as strings because the html date type does it for us
  myQuery = 'INSERT INTO employees (employee_id, first_name, last_name, role, department, salary, type, birthday, phone_number, email, start_date) VALUES ( DEFAULT, $1, $2 , $3, $4, $5, $6, $7, $8, $9, $10)';
  values = [first_name, last_name, role, department, Number(salary), type, birthday, phone_number, email, start_date];


  try {

    // console.log('these are values', values)
    const result = await db.query(myQuery, values);
    // console.log(result);
    await createUser(name, email, phone_number)
    await slackCreation(email)

    return next()
  } catch (err) {
    return next({
      message: { err: err }
    })
  }

}

//view entire db
employeeController.getDb = async (req, res, next) => {
  try {
    const myQuery = 'SELECT * FROM employees'
    const result = await db.query(myQuery);
    res.locals.result = result.rows;
    // console.log(result);
    return next()
  } catch (err) {
    console.log('this is an error', err);
    return next({
      message: { err: err }
    })
  }
}

//view parter of db by Dept
employeeController.filterByDept = async (req, res, next) => {
  const { dept } = req.params;
  try {
    const myQuery = 'SELECT * FROM employees WHERE department = $1'
    const values = [dept];
    const result = await db.query(myQuery, values);
    res.locals.result = result.rows;
    // console.log(result);
    return next()
  } catch (err) {
    console.log('this is an error', err);
    return next({
      message: { err: err }
    })
  }
}

//view parter of db by ID
employeeController.filterById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const myQuery = 'SELECT * FROM employees WHERE employee_id = $1'
    const values = [id];
    const result = await db.query(myQuery, values);
    res.locals.result = result.rows;
    // console.log(result);
    return next()
  } catch (err) {
    console.log('this is an error', err);
    return next({
      message: { err: err }
    })
  }
}

//view parter of db by ROLE
employeeController.filterByRole = async (req, res, next) => {
  const { role } = req.params;
  try {
    const myQuery = 'SELECT * FROM employees WHERE role = $1'
    const values = [role];
    const result = await db.query(myQuery, values);
    res.locals.result = result.rows;
    // console.log(result);
    return next()
  } catch (err) {
    console.log('this is an error', err);
    return next({
      message: { err: err }
    })
  }
}

//filter by SALARY
employeeController.filterBySalary = async (req, res, next) => {
  const { num } = req.params;
  // console.log('THIS IS NUM', num)
  try {
    const myQuery = 'SELECT * FROM employees WHERE salary > $1'
    const values = [num];
    const result = await db.query(myQuery, values);
    res.locals.result = result.rows;
    // console.log(result);
    return next()
  } catch (err) {
    console.log('this is an error', err);
    return next({
      message: { err: err }
    })
  }
}

//update a record
employeeController.updateDb = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const values = []

  if (body.salary) {
    body.salary = Number(body.salary)
  }

  values.push(Object.entries(body))
  values.push(Number(id))
  const values2 = values.flat(Infinity);
  // console.log('SHOULD BE VALUES2', values2)
  const column = values2.shift();

  try {
    const myQuery = `UPDATE employees SET ${column} = $1 WHERE employee_id = $2`
    const result = await db.query(myQuery, values2);
    // console.log(result);
    return next()
  } catch (err) {
    console.log('this is an error', err);
    return next({
      message: { err: err }
    })
  }

}

//delete a row
employeeController.deleteOne = async (req, res, next) => {
  console.log('heresdasd')
  const { employeeId, end_date, obTime } = req.body
  console.log(`Delete Request Recieved, ${employeeId}, ${end_date}, ${obTime}`)
  const splitTime = obTime.split(':')
  const hour = splitTime[0];
  const minute = splitTime[1];
  const splitDate = end_date.split('-')
  const  month = splitDate[1];
  const day = splitDate[2];
  console.log(`${minute} ${hour} ${day} ${month} *`)
  // cronJob for scheduling hires and fires.
  const deleteJob = schedule.scheduleJob(`${minute} ${hour} ${day} ${month} *`, async function() {
    try {
      console.log(`${employeeId} deleted`);
      const myQuery = 'DELETE FROM employees WHERE employee_id = $1;';
      const value = [employeeId];
      const result = await db.query(myQuery, value);
      // console.log(result);
      deleteJob.cancel(); // Stop the job after execution
      return next();
    } catch (err) {
      console.log('This is an error', err);
      return next({
        message: { err: err }
    })
  }}
  )
}


module.exports = employeeController;