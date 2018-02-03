import React from 'react';
import ReactAux from '../../hoc/ReactAux';
import Button from 'material-ui/Button';

const landing = (props)=>(
    <ReactAux>
        <h1>This is a landing page...</h1>
        <div>Adding some content here, maybe some nice picture.</div>
        <div>And a "login" or "get started" button like this:</div>
        <div><Button raised color="primary">get started!</Button></div>
    </ReactAux>
)

export default landing