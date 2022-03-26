import React from 'react'

function Image (props) {
  const { imageName } = props.imageObj
  return (
    <>
      <img src={`/images/uploads/${imageName}`} alt={props.imageName} style={{ width: '200px', height: 'auto' }} />
    </>
  )
}

export default Image
