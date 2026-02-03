import React from 'react';
import Logo from '../components/shared/Logo';
import { NavLink } from 'react-router';

const Navbar = () => {
    // Added 'to' paths and some styling for the links
    const links = <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-white"}>Home</NavLink></li>
            <li><NavLink to="/tuitions" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-white"}>Tuitions</NavLink></li>
            <li><NavLink to="/tutors" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-white"}>Tutors</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-white"}>About</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-white"}>Contact</NavLink></li>
    </>

    return (
        // Added 'mt-4' to give it that "floating" space from the top
        <div className="absolute top-0 left-0 w-full z-50 h-5 bg-transparent mt-4">
            <div className="max-w-7xl mx-auto px-4 h-full">
                {/* Changed bg-base-100 to transparent/blur for that glass look */}
                <div className="navbar bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl px-4">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                                </svg>
                            </div>
                            <ul 
                                tabIndex={0} 
                                className="menu menu-sm dropdown-content mt-5 w-52 p-2 shadow-xl z-1 
                                        rounded-box border border-white/10 
                                        bg-black/80 backdrop-blur-lg text-white" 
                            >
                                {links}
                            </ul>
                        </div>
                        <Logo />
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-2 text-white">
                            {links}
                        </ul>
                    </div>

                    <div className="navbar-end gap-3">
                        <NavLink to="/login" className="btn text-primary rounded-full hover:text-white hover:bg-primary transition font-medium mr-2 hover:font-bold">Log In</NavLink>
                        <NavLink to="/register">
                            {/* Combined DaisyUI button with your Primary Orange */}
                            <button className="bg-primary btn  rounded-full px text-white border-none hover:bg-amber-400 hover:text-white ">
                                Sign up
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;