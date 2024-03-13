import React, { useEffect, useState } from "react";

import Card from "./Card.jsx";

const DataBoard = () => {

    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalFulltime, setTotalFulltime] = useState(0);
    const [totalContractors, setTotalContractors] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3000/api/table")
            .then(response => {
                console.log(response);
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