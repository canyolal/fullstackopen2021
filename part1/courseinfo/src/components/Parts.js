import React from 'react'

const Parts = ({parts}) => {
    console.log('parts', parts)
    return(
        <p>
            {parts.name} {parts.exercises}
        </p>
    )
    
}

export default Parts