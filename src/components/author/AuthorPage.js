import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import {browserHistory} from 'react-router';
import AuthorList from './AuthorList';

class authorPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }

    deleteAuthor(id) {
        console.log(this.props.courses);
        this.props.actions.deleteAuthor(id);
    }

    render() {
        const {authors} = this.props;
        return (
            <div>
                <h1>Authors</h1>
                <AuthorList authors={authors} deleteAuthor={this.deleteAuthor} />
            </div>
        );
    }
}


authorPage.propTypes= {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    //debugger;
    return {
        authors: state.authors,
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //createCourse: course => dispatch(courseActions.createCourse(course))
        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(authorPage);

