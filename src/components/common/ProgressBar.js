import React, { PropTypes } from 'react';

/**
 * Display progress from 0% to 100%
 */
class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.getBarColor = this.getBarColor.bind(this);
    }

    getBarColor() {
        if (this.props.percent === 100) {
            return 'green';
        } else if (this.props.percent > 50) {
            return 'lightgreen';
        }
        return 'red';
    }

    render() {
        const height = this.props.height || 5;

        let barStyle = {
            width: this.props.percent,
            height: height,
            backgroundColor: this.getBarColor()
        };

        let container = {
            border: 'solid 1px lightgray',
            width: '100px'
        };

        return (
            <div style={container}>
                <div style={barStyle} />
            </div>
        );
    }
}

ProgressBar.propTypes = {
    /**
     * Number from 0 and 100 that represents progress.
     */
    percent: PropTypes.number.isRequired,
    /**
     * Bar height in pixels.
     */
    height: PropTypes.number
};

export default ProgressBar;