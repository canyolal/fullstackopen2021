import React from 'react'

const SumParts = ({parts}) => {
    let sum =0
    for (let i =0; i<parts.length; i++){
       sum+= parts[i].exercises;
    }

    return(
        <p><strong>Total of {sum} exercises</strong></p>
    )
}

export default SumParts