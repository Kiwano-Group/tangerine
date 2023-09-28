import React, { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecretButton from "./SecretButton.jsx";

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [filter, filterOn] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data

  const getTableFunc = () => {
    fetch("/api/table")
      .then(response => response.json())
      .then(fetchedData => setData(fetchedData));
  }

  useEffect(getTableFunc, []);

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const currentData = data.slice(firstRowIndex, lastRowIndex);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const formatDate = (databaseDate) => {
    try {
      if (!databaseDate) {
        return ''; // Handle cases where databaseDate is empty or undefined
      }
  
      const date = new Date(databaseDate);
      if (isNaN(date.getTime())) {
        return 'Invalid Date'; // Handle invalid date strings
      }
  
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Error';
    }
  };
  

  const nameFilter = async () => {
    try {
      const res = await fetch('/api/filterFirstName')
        .then(res => res.json());

      // Update the filteredData state with the filtered results
      setFilteredData(res);
    } catch (err) {
      console.log('error filter by first name', err);
    }
  }

  return (
    <div className="container">
      <div className='tableHead'>
        <span className="tableHeadName" onClick={nameFilter}>First Name</span>
        <span className="tableHeadName">Last Name</span>
        <span className="tableHeadName">Role</span>
        <span className="tableHeadName">Department</span>
        <span className="tableHeadName">Start Date</span>
        <span className="tableHeadName">Type</span>
        <SecretButton />
      </div>
      <div className="tableBody">
        {filteredData.length > 0 ? filteredData.map((employee) => (
          // Map over the filteredData if it's available
          <Accordion key={employee.employee_id}>
                  <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography className="Typography">
            <span className="employeeInfo">{employee.first_name}</span>
            <span className="employeeInfo">{employee.last_name}</span>
            <span className="employeeInfo">{employee.department}</span>
            <span className="employeeInfo">{employee.role}</span>
            <span className="employeeInfo">{formatDate(employee.start_date)}</span>
            <span className="employeeInfo">{employee.type}</span>
        </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
            <div className="employeeDetail">Salary: {employee.salary}</div>
            <div className="employeeDetail">Birthday: {employee.birthday}</div>
            <div className="employeeDetail">Email: {employee.email}</div>
            <div className="employeeDetail">Phone Number: {employee.phone_number}</div>
            <br />
            <button>Gettem Outta Here</button>
            <button>Change This Person</button>
        </Typography>
        </AccordionDetails>
          </Accordion>
        )) : currentData.map((employee) => (
          // Map over currentData if filteredData is empty
          <Accordion key={employee.employee_id}>
                  <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography className="Typography">
            <span className="employeeInfo">{employee.first_name}</span>
            <span className="employeeInfo">{employee.last_name}</span>
            <span className="employeeInfo">{employee.department}</span>
            <span className="employeeInfo">{employee.role}</span>
            <span className="employeeInfo">{formatDate(employee.start_date)}</span>
            <span className="employeeInfo">{employee.type}</span>
        </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
            <div className="employeeDetail">Salary: {employee.salary}</div>
            <div className="employeeDetail">Birthday: {employee.birthday}</div>
            <div className="employeeDetail">Email: {employee.email}</div>
            <div className="employeeDetail">Phone Number: {employee.phone_number}</div>
            <br />
            <button>Gettem Outta Here</button>
            <button>Change This Person</button>
        </Typography>
        </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <div className="flex-center">
        <button className="button-style"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>Previous
        </button>
        <button className="button-style"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>Next
        </button>
      </div>
    </div>
  );
}

export default Table;
