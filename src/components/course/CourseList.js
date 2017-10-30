import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({courses, deleteCourse, sortCourses}) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>
                        <a href="#" onClick={() => sortCourses('title')}>Titles
                        </a>
                    </th>
                    <th> <a href="#" onClick={() => sortCourses('authorId')}>AuthorId
                    </a></th>
                    <th> <a href="#" onClick={() => sortCourses('category')}>Category
                    </a></th>
                    <th>Length</th>
                </tr>
            </thead>
            <tbody>
            {courses.map(course =>
                <CourseListRow key={course.id} course={course} deleteCourse={deleteCourse} />
            )}
            </tbody>
        </table>
    );
};

CourseList.propTypes = {
    courses: PropTypes.array.isRequired,
    deleteCourse: PropTypes.func.isRequired,
    sortCourses: PropTypes.func.isRequired
};

export default CourseList;