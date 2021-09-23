import React from 'react'

const Parts = ({parts}) => {
    return(
        <p>
            {parts.name} {parts.exercises}
        </p>
    )
    
}

export default Parts