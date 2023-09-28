import React, { useState, useEffect } from "react";
import dropdown from "../assets/dropdown.png";
import "../style.css";

const SecretButton = (props) => {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
    function handleClickOutside(event) {
        if (toggle && !event.target.closest(".SecretButton")) {
        setToggle(false);
        }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
        document.removeEventListener("click", handleClickOutside);
    };
    }, [toggle]);

    return (
    <div className="SecretButton" onClick={() => setToggle(!toggle)}>
        <div className={`SecretToggle ${toggle ? "open" : "close"}`}>
            <h1>Secret Button</h1>
        </div>
    </div>
    );
};

export default SecretButton;
