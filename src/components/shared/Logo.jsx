import React from 'react';
import logo from "../../../public/logo.png"

const Logo = () => {
    return (
        <div className="flex ">
            <img src={logo} alt="logo" />
            <h3>eTuiTionsBd</h3>
        </div>
    );
};

export default Logo;