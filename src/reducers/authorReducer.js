import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action = {}) {
    switch (action.type) {
        case types.LOAD_AUTHORS_SUCCESS:
            return action.authors;
        case types.DELETE_AUTHOR_SUCCESS:
        {
            const newState = Object.assign([], state);
            const indexOfCatToDelete = state.findIndex(author => {
                return author.id == action.authorId;
            });
            newState.splice(indexOfCatToDelete, 1);
            return newState;
        }
        default:
            return state;
    }
}