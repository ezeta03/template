import React from 'react'
import { Link } from 'react-router-dom'

const SafeLink = ({ to, children, target, ...props }) => {
    return (
        <Link to={to} rel="noopener noreferrer" referrerPolicy="no-referrer" target={target} {...props}>
            {children}
        </Link>
    )
}

export default SafeLink