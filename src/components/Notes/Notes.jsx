import React from 'react'

// eslint-disable-next-line react/prop-types
function Notes({ icon, discription, className }) {
  const IconEle = icon;
  return (
    <div className={className}>{IconEle}<p>{discription}</p></div>
  )
}

export default Notes