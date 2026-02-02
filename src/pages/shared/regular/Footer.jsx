import React from 'react';
import Logo from '../utils/Logo';
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-primary text-primary-content">
            <div className="footer sm:footer-horizontal p-10 max-w-7xl mx-auto">
                {/* About Section */}
                <aside className="max-w-md">
                    <Logo />
                    <p className="mt-4 leading-relaxed opacity-90 text-sm">
                        Since its inception, eTuitionBd has been dedicated to bridging the educational gap by providing a secure, high-tech marketplace that empowers students and educators alike. As a mission-driven platform, we help students and parents find the perfect academic match by offering a transparent system to post requirements and review verified tutor credentials, while simultaneously providing educators with a professional ecosystem to manage their careers and track their earnings with full transparency.
                    </p>
                </aside>

                {/* Quick Links Section */}
                <nav>
                    <h6 className="footer-title opacity-100">Quick Links</h6>
                    <NavLink to="/" className="link link-hover">Home</NavLink>
                    <NavLink to="/tuitions" className="link link-hover">Tuitions</NavLink>
                    <NavLink to="/tutors" className="link link-hover">Tutors</NavLink>
                    <NavLink to="/about" className="link link-hover">About Us</NavLink>
                </nav>

                {/* Contact Information Section */}
                <nav>
                    <h6 className="footer-title opacity-100">Contact Information</h6>
                    <p className="text-sm">Email: support@etuitionbd.com</p>
                    <p className="text-sm">Phone: +880 1XXX-XXXXXX</p>
                    <p className="text-sm">Location: Dhaka, Bangladesh</p>
                </nav>

                {/* Social Media Section */}
                <nav>
                    <h6 className="footer-title opacity-100">Social Media</h6>
                    <div className="grid grid-flow-col gap-4">
                        {/* New X Logo */}
                        <a href="https://x.com" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>

            {/* Copyright Section */}
            <div className="footer footer-center p-4 border-t border-primary-focus bg-primary text-primary-content">
                <aside>
                    <p>© {new Date().getFullYear()} - All rights reserved by eTuitionBd</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;