import React from 'react'

const Parts = ({parts}) => {
    console.log('parts', parts)
    return(
        <li>
            {parts.name} {parts.exercises}
        </li>
    )
    
}

export default Parts