import React from 'react'
import Parts from './Parts.js'


const Content = ({parts}) => {
    console.log('parts', parts)
    return(
        <ul>
            {parts.map(parts => 
                <Parts key={parts.id} parts={parts} />
            )}
        </ul>
    )
    
}

export default Content