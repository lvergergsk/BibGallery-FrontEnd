import React from 'react'
import AuthorQueryResult from './AuthorQueryResult'
// Publication order
// num of publication
class AuthorQueryResults extends React.Component {
    state = {
        authors: [
            {
                personId: '001',
                names: ['name 1 of Author 1', 'name 2 of Author 1', 'name 3 of Author 1'],
                publications: ['publication 1 of Author 1', 'publication 2 of Author 1'],
                websites: ['author1.website.com']
            },
            {
                personId: '002',
                names: ['name 1 of Author 2'],
                publications: ['publication 1 of Author 2', 'publication 2 of Author 2',
                    'publication 3 of Author 2', 'publication 4 of Author 2'],
                websites: []
            },
            {
                personId: '003',
                names: ['name 1 of Author 3'],
                publications: ['publication 1 of Author 2', 'publication 2 of Author 2',
                    'publication 3 of Author 2', 'publication 4 of Author 2'],
                websites: ['author3.website.com', 'author3.website2.com']
            },
        ]

    }

    render() {
        return (
            this.state.authors.map(author => {
                return <AuthorQueryResult
                    key={author.personId}
                    author={author}
                />
            })
        );

    }
}


export default AuthorQueryResults;