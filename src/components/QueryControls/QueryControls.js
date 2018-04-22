import React from 'react'
// Others:
import YearConstraint from './YearConstraint'
import AuthorConstraint from './AuthorConstraint'
import TypeConstraint from './TypeConstraint'
import AuthorOrderConstraint from './AuthorOrderConstraint'
import PublicationOrderConstraint from './PublicationOrderConstraint'
import ReactAux from '../../hoc/ReactAux/ReactAux'


const QueryControls = (props) => (
    <ReactAux>
        {props.display === 0 ? <YearConstraint/> : null}
        {props.display === 0 ? <AuthorConstraint/> : null}
        {props.display === 0 ? <TypeConstraint/> : null}
        <AuthorOrderConstraint/>
        <PublicationOrderConstraint/>
    </ReactAux>
)

export default QueryControls