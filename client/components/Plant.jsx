import React, { useState } from 'react'
import { delPlant, fetchPlants, getImages } from '../actions/plants'
import { connect } from 'react-redux'

const auth0Id = '123'
// const auth0Id = '456'

function Plant (props) {
  const [fileState, setFileState] = useState({ selectedFile: null })
  const { id, name, type, imageName, createdAt, cost, plantingDate, reapOrPropagationDate, fertilizationDate, pestControlDate, userId } = props.plant

  let reapOrPropagation
  type === 'vegetable'
    ? reapOrPropagation = 'Reap Date'
    : reapOrPropagation = 'Propagation Date'

  function handleClickDelPlant () {
    delPlant(id)
    props.dispatch(fetchPlants(auth0Id))
  }

  function onFileChange (e) {
    setFileState({ selectedFile: e.target.files[0] })
  }

  function handleImageSubmit (e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('profile_pic', fileState.selectedFile)
    // console.log(fileState.selectedFile)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    props.dispatch(getImages(formData, config, id))
    props.dispatch(fetchPlants(auth0Id))
  }

  return (
    <div>
      <p><strong>Id:</strong> {id}</p>
      <p><strong>Plant Type:</strong> {type}</p>
      <p><strong>Plant Name:</strong> {name}</p>
      <p><strong>Image:</strong> <br /> <img style={{ width: '200px', height: 'auto' }} src={`/images/uploads/${imageName}`} alt={imageName} /> </p>
      <p><strong>Created At:</strong> {createdAt}</p>
      <p><strong>Planting Date:</strong> {plantingDate}</p>
      <p><strong>{reapOrPropagation}</strong> {reapOrPropagationDate}</p>
      <p><strong>Fertilization Date:</strong> {fertilizationDate}</p>
      <p><strong>Pest Control Date:</strong> {pestControlDate}</p>
      <p className={type === 'vegetable' ? 'hide' : 'null'}><strong>Cost:</strong> $ {cost}</p>
      <p><strong>User Id:</strong> {userId}</p>
      <label htmlFor="imageName">Image Name: <br />
        <form method="POST" action="/upload-profile-pic" encType="multipart/form-data">
          <div>
            <input type="file" name="profile_pic" id={id} onChange={(e) => onFileChange(e)} />
          </div>
        </form>
      </label><br/>
      <button onClick={e => handleImageSubmit(e)}>Submit</button> <br/><br/>
      <button onClick={handleClickDelPlant}>X</button>
    </div>
  )
}

export default connect()(Plant)
