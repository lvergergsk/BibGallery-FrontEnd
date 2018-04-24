import React from 'react'
// Others:
import YearConstraint from './YearConstraint'
import WrittenByConstraint from './WrittenByConstraint'
import TypeConstraint from './TypeConstraint'
import AuthorOrderConstraint from './AuthorOrderConstraint'
import PublicationOrderConstraint from './PublicationOrderConstraint'
import ResetDerivedSearchButton from './ResetDerivedSearchButton'
import ReactAux from '../../hoc/ReactAux/ReactAux'


const QueryControls = (props) => (
    <ReactAux>
        {props.display === 0 ? <YearConstraint/> : null}
        {props.display === 0 ? <WrittenByConstraint/> : null}
        {props.display === 0 ? <TypeConstraint/> : null}
        {props.display === 1 ? <AuthorOrderConstraint/> : null}
        {props.display === 0 ? <PublicationOrderConstraint/> : null}
        {props.display === 2 ?  <ResetDerivedSearchButton/>: null}
    </ReactAux>
)

export default QueryControls