import React, { useEffect, useState } from "react";
import Header from '../components/Header.jsx';
import DataBoard from "../components/DataBoard.jsx";
import Table from "../components/Table.jsx";
import Sidebar from '../components/Sidebar.jsx';
import Footer from '../components/Footer.jsx';

const Dashboard = () => {

    return (
        <>
            <Sidebar />
            <DataBoard />
            <Table />
            <Footer />
        </>
    )
}

export default Dashboard;