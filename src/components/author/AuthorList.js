import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({authors, deleteAuthor}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Id</th>
                <th>FirstName</th>
                <th>LastName</th>
            </tr>
            </thead>
            <tbody>
            {authors.map(author =>
                    <AuthorListRow key={author.id} author={author} deleteAuthor={deleteAuthor} />
            )}
            </tbody>
        </table>
    );
};

AuthorList.propTypes = {
    authors: PropTypes.array.isRequired,
    deleteAuthor: PropTypes.func.isRequired
};

export default AuthorList;