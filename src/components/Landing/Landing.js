import React from 'react';

import classes from './Landing.css'
import ReactAux from '../../hoc/ReactAux/ReactAux'
import bgImage from '../../assets/images/bg.jpg'


const landing = (props) => (
    <ReactAux>
        <div><img className={classes.bg} src={bgImage} alt="bgImage"/></div>
        <div className={classes.root}>
            <h1>BibGallery</h1>
            <h3>Search for publication and authors.</h3>
        </div>
    </ReactAux>
);

export default landing