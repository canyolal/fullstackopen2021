import React from 'react'

const SumParts = ({parts}) => {
    let sum =0
    for (let i =0; i<parts.length; i++){
        sum+= parts[i].exercises;
    }
    return(
        <p>Total of {sum} exercises</p>
    )
}

export default SumParts