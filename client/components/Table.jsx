import React, { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Style from "/client/style.css"

const Table = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [employeeDropdownStates, setEmployeeDropdownStates] = useState({}); // Info drop-down toggle state
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [employeeFormSubmitted, setEmployeeFormSubmitted] = useState({});
    const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState({});
    const [employeeEdit, setEmployeeEdit] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        end_date: "",
        obTime: "",
    });

    const date = new Date();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    const currentDate =  date.getFullYear().toString() + '-' + month + '-' + day;

    const getTableFunc = () => {
        fetch("/api/table")
        .then(response => response.json())
        .then(fetchedData => {
            const updatedData = fetchedData.map(employee => ({
            ...employee,
            formSubmitted: false,
            dropdownOpen: false
            }));
            setData(updatedData);

            const initialEmployeeFormSubmitted = {};
            const initialEmployeeDropdownOpen = {};
            fetchedData.forEach(employee => {
            initialEmployeeFormSubmitted[employee.employee_id] = false;
            initialEmployeeDropdownOpen[employee.employee_id] = false;

            });
            setEmployeeFormSubmitted(initialEmployeeFormSubmitted);
            setEmployeeDropdownOpen(initialEmployeeDropdownOpen)
        });
    }

    useEffect(getTableFunc, []);

    const lastRowIndex = currentPage * rowsPerPage;
    const firstRowIndex = lastRowIndex - rowsPerPage;
    const currentData = data.slice(firstRowIndex, lastRowIndex);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const formatDate = (databaseDate) => {
        const date = new Date(databaseDate);
        return date.toISOString().split('T')[0];
    };
    const toggleDropdown = (employeeId) => {
        setEmployeeDropdownOpen(prevState => ({
            ...prevState,
            [employeeId]: !prevState[employeeId]
        }));
    }

    const editHandle = async (employeeId) => {
        try{

        } catch (err){
            console.log('Error editing employee')
        }
    };

    const clickHandle = async (employeeId) => {
        console.log(employeeId);
        try {
            setEmployeeFormSubmitted(prevEmployeeFormSubmitted => ({
                ...prevEmployeeFormSubmitted,
                [employeeId]: true,
              }));
            const res = await fetch(`/api/delete/${employeeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    end_date: formData.end_date,
                    obTime: formData.obTime,
                    employeeId: employeeId,
                }),
            });
            console.log('true')
            setFormSubmitted(true);
            //rerenders table 
            getTableFunc();
        } catch (err) {
            console.log('error deleting employee');
        }
    }
    

    const handleFormChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="container">
            <div className='tableHead'>
                <span className="tableHeadName">First Name</span>
                <span className="tableHeadName">Last Name</span>
                <span className="tableHeadName">Role</span>
                <span className="tableHeadName">Department</span>
                <span className="tableHeadName">Start Date</span>
                <span className="tableHeadName">Type</span>
            </div> 
            <div className="tableBody">
    {currentData.map((employee) => (
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
            <div className="employeeDetail">Birthday: {formatDate(employee.birthday)}</div>
            <div className="employeeDetail">Email: {employee.email}</div>
            <div className="employeeDetail">Phone Number: {employee.phone_number}</div>
            <br />
            <div className="flex-center">
            {employeeFormSubmitted[employee.employee_id] ? (<div className="Button">Employee offboard scheduled</div>) : (
                <div className="dropdown">
                    <button onClick={() => toggleDropdown(employee.employee_id)}>
                        {employeeDropdownOpen[employee.employee_id] ? "Go Back" : "Offboard"}
                    </button>
                                {employeeDropdownOpen[employee.employee_id] && (
                            <div className="dropdown-content">
                            <form onSubmit={handleSubmit}>
                                <ul>
                                    <li>
                                        <label htmlFor="end_date">Offboard Date </label>
                                        <input type="date" id="end" name="end_date" min={currentDate} value={formData.end_date} onChange={handleFormChange} />
                                    </li>
                                    <li>
                                        <label htmlFor="end_time">Offboard Time </label>
                                        <input type="time" id="obTime" name="obTime" min="06:00" max="24:00" required value={formData.obTime} onChange={handleFormChange} />
                                    </li>
                                    <li>
                                        <button type="submit" onClick={() => clickHandle(employee.employee_id)}>Confirm Offboarding</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        )}
                    {employeeDropdownOpen[employee.employee_id] ? null: <button className="Button">Edit Info</button>}
                </div>
                )}
        </div>
        </Typography>
        </AccordionDetails>
    </Accordion>
    ))}
</div>

            <br></br>
            <div className="flex-center">
                <button className="button-style"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <button className="button-style"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Table;