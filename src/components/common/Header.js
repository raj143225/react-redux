import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import ProgressBar from './ProgressBar';
import ReactLoading from 'react-loading';

const Header = ({loading}) => {
    return(
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
            {" | "}
            <Link to="/courses" activeClassName="active">Courses</Link>
            {" | "}
            <Link to="/authors" activeClassName="active">Authors</Link>
            {loading && <ReactLoading type="bubbles" color="#444" />}
        </nav>
    );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Header;
