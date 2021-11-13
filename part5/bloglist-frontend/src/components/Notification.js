import React from 'react'
const Notification = ({ message }) => {
  if (message !== null) {
    return (
      <div className="outer notification">
        {message}
      </div>
    )
  }
  else {
    return null
  }
}

export default Notification