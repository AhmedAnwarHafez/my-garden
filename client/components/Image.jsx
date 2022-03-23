import React from 'react'

function Image (props) {
  const { imageName } = props.imageObj
  return (
    <>
      <img src={`/images/uploads/${imageName}`} alt={props.imageName} style={{ width: '200px', height: 'auto' }} />
      <button>X</button>
    </>
  )
}

export default Image
