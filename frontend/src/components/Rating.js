import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-bootstrap'

const Rating = ({ value, text, color }) => {
	return (
		<div className='rating'>
			<Row>
				<span>
					<i
						style={{ color }}
						className={
							value >= 1
								? 'fas fa-star'
								: value >= 0.5
								? 'fas fa-star-half-alt'
								: 'far fa-star'
						}></i>
				</span>
				<span>
					<i
						style={{ color }}
						className={
							value >= 2
								? 'fas fa-star'
								: value >= 1.5
								? 'fas fa-star-half-alt'
								: 'far fa-star'
						}></i>
				</span>
				<span>
					<i
						style={{ color }}
						className={
							value >= 3
								? 'fas fa-star'
								: value >= 2.5
								? 'fas fa-star-half-alt'
								: 'far fa-star'
						}></i>
				</span>
				<span>
					<i
						style={{ color }}
						className={
							value >= 4
								? 'fas fa-star'
								: value >= 3.5
								? 'fas fa-star-half-alt'
								: 'far fa-star'
						}></i>
				</span>
				<span>
					<i
						style={{ color }}
						className={
							value >= 5
								? 'fas fa-star'
								: value >= 4.5
								? 'fas fa-star-half-alt'
								: 'far fa-star'
						}></i>
				</span>
				<span>{text && text}</span>
			</Row>
		</div>
	)
}

// set defaut prop for color
Rating.defaultProps = {
	color: '#ffe825',
}

Rating.protoTypes = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
}

export default Rating
