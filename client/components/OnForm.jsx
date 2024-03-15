import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const OnForm = () => {

    const date = new Date();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    const currentDate =  date.getFullYear().toString() + '-' + month + '-' + day;
    const navigate = useNavigate();

    const formDefaults = {
        first_name: '',
        last_name: '',
        role: 'Accountant',
        department: 'Education',
        salary: '',
        start_date: currentDate,
        type: 'Full-Time',
        birthday: currentDate,
        phone_number: '',
        email: '',
        services: '',
        google: false,
        slack: false,
        zoom: false,
        calendar: false,
    }

    const [form, setForm] = useState(formDefaults)


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = async () => {
        try {
            await fetch('http://34.233.134.97:8000/api/add', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });
            setForm(formDefaults);
            navigate('/dashboard');
        }

        catch (error) {
            console.error('An error occurred:', error);
        }

    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div id='form-component'>
            <form onSubmit={handleSubmit((data) => {
                handleClick();
            })}>
                <fieldset id='employee-info'>
                    <legend>Employee Information</legend>
                    <ul>
                        <li>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" id="first_name" name="first_name" value={form.first_name} onChange={handleChange} required pattern='[a-zA-Z]+'/>
                        </li>
                        <li>
                            <label htmlFor="last_name">Last Name</label>
                            <input {...register('last_name', {required: true, pattern: /^[A-Za-z]+$/i})}
                            type="text" id="last_name" name="last_name" value={form.last_name} onChange={handleChange} required pattern='[a-zA-Z]+'/>
                        </li>
                        <li>
                            <label htmlFor="role">Role</label>
                            <select id="role" name="role" value={form.role} onChange={handleChange} required>
                                <option value="Accountant">Accountant</option>
                                <option value="Architect">Architect</option>
                                <option value="Consultant">Consultant</option>
                                <option value="IT">IT</option>
                                <option value="Software Engineer">Software Engineer</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="department">Department</label>
                            <select name="department" id="department" value={form.department} onChange={handleChange} required>
                                <option value="Education">Education</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Operations">Operations</option>
                                <option value="Other">Other</option>
                            </select>

                        </li>
                        <li>
                            <label htmlFor="salary">Salary</label>
                            <input type="text" id="salary" name="salary" value={form.salary} onChange={handleChange} required pattern='[0-9]+'/>
                        </li>
                        <li>
                            <label htmlFor="start">Start Date</label>
                            <input type="date" id="start" name="start_date" value={form.start_date} min={currentDate} onChange={handleChange} required/>
                            {/*<input type="start" id="start" name="start_date" value={form.start_date} onChange={handleChange} />*/}
                        </li>
                        <li>
                            <label htmlFor="type">Type</label>
                            <select id="type" name="type" value={form.type} onChange={handleChange} required>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Contractor">Contractor</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob" name="birthday" value={form.birthday} max={currentDate} onChange={handleChange} required/>
                            {/*<input type="text" id="dob" name="birthday" value={form.birthday} onChange={handleChange} />*/}
                        </li>
                        <li>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" id="phone" name="phone_number" value={form.phone_number} onChange={handleChange} required  pattern='[0-9]+' minLength='10' maxLength='10'/>
                        </li>
                        <li>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" value={form.email} onChange={handleChange} required pattern='[^@\s]+@[^@\s]+\.[^@\s]+'/>
                        </li>
                        <li>
                            <label htmlFor="services">Services</label>
                            <div className="checkbox-grid">
                                <div>
                                    <input type="checkbox" className='checkbox-service' id="google" name="google" value={form.google} onChange={handleChange}/> 
                                    <label>Google</label>
                                </div>
                                <div>
                                    <input type="checkbox" className='checkbox-service' id="slack" name="slack" value={form.slack} onChange={handleChange}/> 
                                    <label>Slack</label>
                                </div>
                                <div>
                                    <input type="checkbox" className='checkbox-service' id="zoom" name="zoom" value={form.zoom} onChange={handleChange}/> 
                                    <label>Zoom</label>
                                </div>
                                <div>
                                    <input type="checkbox" className='checkbox-service' id="calendar" name="calendar" value={form.calendar} onChange={handleChange}/> 
                                    <label>Calendar</label>
                                </div>
                                <div>
                                    <input type="checkbox" className='checkbox-service' id="adp" name="adp" value={form.adp} onChange={handleChange}/> 
                                    <label>ADP</label>
                                </div>
                                <div>
                                    <input type="checkbox" className='checkbox-service' id="expensify" name="expensify" value={form.expensify} onChange={handleChange}/> 
                                    <label>Expensify</label>
                                </div>
                                
                            </div>
                            
                        </li>

                    </ul>

                    <input type='submit' className='btn' id='addNew' value="Add New Employee"></input>

                </fieldset>

            </form>
        </div>
    )
}

export default OnForm
