import React from 'react'
import Parts from './Parts.js'

const Content = ({parts}) => {
    console.log(parts)
    return(
        <div>
            {parts.map(parts => 
                <Parts key={parts.id} parts={parts} />
            )}
        </div>
    )
}

export default Content