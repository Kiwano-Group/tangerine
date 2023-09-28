import React from "react";
import { useState } from "react";
import "../dropdown.css";
import icon from "../assets/icon.jpg";
import editProfile from "../assets/editProfile.png";
import logOut from "../assets/logOut.png";
import myProfile from "../assets/myProfile.png";
import settings from "../assets/settings.jpg";
import DropdownItem from "./DropdownItem.jsx";


const Dropdown = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='menu-container'>
            <div className='menu-trigger' onClick={()=> {setOpen(!open)}}>
                <img src={icon}></img>
            </div>

            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                <h3>Profile</h3>
                <ul className="box">
                    <DropdownItem img = {myProfile} text= {"My Profile"}/>
                    <DropdownItem img = {editProfile} text= {"Edit Profile"}/>
                    <DropdownItem img = {settings} text= {"Settings"}/>
                    <DropdownItem img = {logOut} text= {"Logout"}/>
                </ul>
            </div>
        </div>
)
}

export default Dropdown;