import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/regular/Navbar';
import Footer from '../pages/shared/regular/Footer';

const Rootlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Rootlayout;