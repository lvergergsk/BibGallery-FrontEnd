import React from "react";

import bookLogo from '../../assets/images/book-logo.png';
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={bookLogo} alt="bookLogo"/>
    </div>
);

export default logo;