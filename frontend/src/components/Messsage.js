import React from 'react'
import { Alert } from 'react-bootstrap'
const Messsage = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>
}

Messsage.defaultProps = {
	variant: 'info',
}

export default Messsage
