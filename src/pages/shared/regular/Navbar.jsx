import React from 'react';
import Logo from '../utils/Logo';
import { NavLink } from 'react-router';
import "./../css/Nav.css"

const Navbar = () => {
    const links = (
    <>
        <li>
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "text-primary font-bold" : "text-neutral"}
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/tuitions" 
                className={({ isActive }) => isActive ? "text-primary font-bold" : "text-neutral"}
            >
                Tuitions
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/tutors" 
                className={({ isActive }) => isActive ? "text-primary font-bold" : "text-neutral"}
            >
                Tutors
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? "text-primary font-bold" : "text-neutral"}
            >
                About
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? "text-primary font-bold" : "text-neutral"}
            >
                Contact
            </NavLink>
        </li>
    </>
);


    return (
        <div className="w-full sticky z-100">
            <div className="navbar bg-base-100 shadow-sm ">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                    </div>
                    <NavLink className="btn btn-ghost text-xl mt-4" to="/"><Logo></Logo></NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-bold">
                    {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <NavLink to="/login"><button className='btn'>Log In</button></NavLink>
                    <NavLink to="/register"><button className='btn'>Join</button></NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;