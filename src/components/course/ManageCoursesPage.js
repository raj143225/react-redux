import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

import { createHistory, useBasename } from 'history';
const history = useBasename(createHistory)({
    basename: '/'
});

class ManageCoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false,
            dirty: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.routerWillLeave = this.routerWillLeave.bind(this);
    }

    componentDidMount() {
        this.removeListener = this.context.router.listenBefore(this.routerWillLeave);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id != nextProps.course.id) {
            // Necessary to populate from an existing course is loaded directly
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    componentWillUnmount() {
        this.removeListener();
    }

    routerWillLeave (nextState, router) {
        if (this.state.dirty) {
            router('Leave without saving?');
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = Object.assign({}, this.state.course);
        course[field] = event.target.value;
        if (course[field]) {
            this.setState({dirty:true});
        }
        return this.setState({course: course});
    }

    saveCourse(event) {
        event.preventDefault();
        this.setState({saving:true, dirty:false});
        this.props.actions.saveCourse(this.state.course)
        .then(() => this.redirect())
        .catch(error => {
                toastr.error(error);
                this.setState({saving:false});
            });
    }

    redirect() {
        this.setState({saving:false});
        toastr.success('Course Saved');
        this.context.router.push('/courses');
    }

    render() {
        return (
            <CourseForm
                allAuthors={this.props.authors}
                course={this.state.course}
                errors={this.state.errors}
                saving={this.state.saving}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                />
        );
    }
}

ManageCoursesPage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};


ManageCoursesPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if (course.length) { //Since filter returns array we need check length
        return course[0];
    } else {
        return null;
    }
}

function mapStateToProps(state, ownProps) {

    const courseId = ownProps.params.id;//from the path '/course/:id'

    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if(courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

    const authorsFormattedForDropDown = state.authors.map(author => {
       return {
           value: author.id,
           text: author.firstName + ' ' + author.lastName
       };
    });

    return {
        course: course,
        authors: authorsFormattedForDropDown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
