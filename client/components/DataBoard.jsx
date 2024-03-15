import React, { useEffect, useState } from "react";

import Card from "./Card.jsx";

const DataBoard = () => {

    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalFulltime, setTotalFulltime] = useState(0);
    const [totalContractors, setTotalContractors] = useState(0);

    useEffect(() => {
        fetch("http://34.233.134.97:8000/api/table")
            .then(response => {
                return response.json()
            })
            .then(data => {

                setTotalEmployees(data.length);

                setTotalFulltime(
                    data.filter(employee =>
                        employee.type === "Full-Time"
                    ).length);

                setTotalContractors(
                    data.filter(employee =>
                        employee.type === "Contractor"
                    ).length);
            })
            .catch((error) => console.log("Databoard error: " + error));
    }, []);

    return (
        <>
            <div className="card-container">
                <Card title='Total Employee Count' amount={totalEmployees} />
                <Card title='Full Time Employees' amount={totalFulltime} />
                <Card title='Contractors' amount={totalContractors} />
            </div>
            <br></br>
        </>
    )
}

export default DataBoard;