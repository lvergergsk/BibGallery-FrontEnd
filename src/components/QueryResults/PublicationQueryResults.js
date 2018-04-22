import React from 'react'

import PublicationQueryResult from './PublicationQueryResult'

class PublicationQueryResults extends React.Component {
    state = {
        publications: [
            {
                publicationId: '001',
                type:'inProceeding',
                parent:'Proceeding title',
                title: 'Title of publication 1',
                year: '1995',
                authors: ['author name 1', 'author name 2'],
                cited:['cited publication 1']
            },
            {
                publicationId: '002',
                type:'inCollection',
                parent:'book title',
                title: 'Title of publication 2',
                year: '1999',
                authors: ['author name 1', 'author name 2'],
                cited:['cited publication 1']
            }
        ]

    };


    render() {
        return (
            this.state.publications.map(publication => {
                return <PublicationQueryResult
                    key={publication.publicationId}
                    publication={publication}
                />
            })
        )
    }
}


export default PublicationQueryResults