import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthorListRow = ({author, deleteAuthor}) => {

    return (
        <tr>
            <td>{author.id}</td>
            <td>{author.firstName}</td>
            <td>{author.lastName}</td>
            <td><a href="#" onClick={() => deleteAuthor(author.id)}>Delete</a></td>
        </tr>
    );
};

AuthorListRow.propTypes = {
    author: PropTypes.object.isRequired,
    deleteAuthor: PropTypes.func.isRequired
};

export default AuthorListRow;