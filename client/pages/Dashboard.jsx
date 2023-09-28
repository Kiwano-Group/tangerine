import React, { useEffect, useState } from "react";
import Header from '../components/Header.jsx';
import DataBoard from "../components/DataBoard.jsx";
import Table from "../components/Table.jsx";

const Dashboard = () => {

    return (
        <>
            <Header />
            <DataBoard />
            <Table />
        </>
    )
}

export default Dashboard;