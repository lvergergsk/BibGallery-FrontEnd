import React from 'react';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom'

import classes from './Landing.css'
import bgImage from '../../assets/images/bg.jpg'
import ReactAux from '../../hoc/ReactAux/ReactAux'


const landing = (props) => (
    <ReactAux>
        <div><img className={classes.bg} src={bgImage} alt="bgImage"/></div>
        <div className={classes.root}>
            <h1>This is a landing page...</h1>
            <div>Adding some content here, maybe some nice picture.</div>
            <div>And a "login" or "get started" button like this:</div>
            <div>
                <Link to="/query" style={{textDecoration: 'none'}}>
                    <Button className={classes["get-started-button"]}>get started!</Button>
                </Link>
            </div>
        </div>
    </ReactAux>
)

export default landing