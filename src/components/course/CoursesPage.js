import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            courseCount: -1,
            sortType: 1,
            page: 1
        };
        this.redirectToCoursePage = this.redirectToCoursePage.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.manageCoursesList = this.manageCoursesList.bind(this);
        this.sortCoursesList = this.sortCoursesList.bind(this);
    }

    redirectToCoursePage() {
        browserHistory.push('/course');
    }

    deleteCourse(id, event) {
        event.preventDefault();
        this.props.actions.deleteCourse(id);
    }

    manageCoursesList(event) {
        let courseCount = event.target.value;
        this.setState({courseCount: parseInt(courseCount)});
        this.props.actions.loadCourses(courseCount);

    }

    sortCoursesList(sortColumn) {
        this.setState(function(prevState) {
            return {
                sortType: 1 - prevState.sortType
            };
        });
        this.props.actions.loadCourses(this.state.courseCount, sortColumn, this.state.sortType);
    }

    render() {
        const {courses} = this.props;
        let coursesList = false;
        if (courses.length) {
            coursesList = true;
        }
        return (
            <div>
                <h1>Courses</h1>
                <input type="submit"
                       value="Add Course"
                       className="btn btn-primary"
                       onClick={this.redirectToCoursePage}
                    />
                <div className="form-group">
                    <label htmlFor="sel1">Select list (select one):</label>
                    <select className="form-control" id="sel1" onChange={this.manageCoursesList} >
                        <option value="-1" ></option>
                        <option value="1" >1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="-1">All</option>
                    </select>
                </div>
                {coursesList && <CourseList courses={courses} deleteCourse={this.deleteCourse} sortCourses={this.sortCoursesList}
                    />}
            </div>
        );
    }
}

CoursesPage.propTypes= {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    //debugger;
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //createCourse: course => dispatch(courseActions.createCourse(course))
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
