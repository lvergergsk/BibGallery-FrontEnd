import React from 'react'

// Others:
import TestQueryControl from './QueryControl/TestQueryControl'
import QueryControl from './QueryControl/QueryControl'
import ReactAux from '../../hoc/ReactAux/ReactAux'


const QueryControls = (props) => (
    <ReactAux>
        <TestQueryControl/>
        <QueryControl/>
        <QueryControl/>
        <QueryControl/>
        <QueryControl/>
        <QueryControl/>
        <QueryControl/>
        <QueryControl/>
        <QueryControl/>
    </ReactAux>

)

export default QueryControls