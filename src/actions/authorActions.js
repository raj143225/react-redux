import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import {beginAjaxCall} from './ajaxStatusActions';


export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function deleteAuthorSuccess(authorId) {
    return { type: types.DELETE_AUTHOR_SUCCESS, authorId };
}

export function loadAuthors() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return AuthorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw (error);
        });
    };
}

export function deleteAuthor(authorId) {
    return function(dispatch) {
        //dispatch(beginAjaxCall());
        return AuthorApi.deleteAuthor(authorId).then(dispatch(deleteAuthorSuccess(authorId))).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}