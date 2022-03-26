import React from 'react'
import { useHistory } from 'react-router-dom'
import { delTheImage } from '../actions/images'

function EditImage (props) {
  const { imageName, id } = props.imageObj
  const history = useHistory()

  function handleClickDelImage () {
    delTheImage(id)
  }

  return (
    <>
      <img src={`/images/uploads/${imageName}`} alt={props.imageName} style={{ width: '200px', height: 'auto' }} />
      <button onClick={handleClickDelImage}>X</button>
    </>
  )
}

export default EditImage
