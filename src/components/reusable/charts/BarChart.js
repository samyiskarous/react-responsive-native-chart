import react from 'react';
import PropTypes from 'prop-types'

const BarChart = (props) => {
    BarChart.propTypes = {
        labels: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.string.isRequired,
            y: PropTypes.string.isRequired
        })).isRequired,
        barsData: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.string.isRequired,
            y: PropTypes.string.isRequired
        }))
    }

    return null;
}

export default BarChart;