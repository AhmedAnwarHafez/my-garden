import React, { useState, useEffect } from 'react'
import { delPlant, fetchPlants } from '../actions/plants'
import { addTheImages, fetchImages } from '../actions/images'
import Image from './Image'
// import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

// const auth0Id = '123'
// const auth0Id = '456'

function Plant (props) {
  useEffect(() => {
    props.dispatch(fetchImages())
  }, [])
  // const history = useHistory()
  const { user } = props
  const auth0Id = user.auth0Id
  const [fileState, setFileState] = useState({ selectedFile: null })
  const { id, name, type, createdAt, cost, plantingDate, reapOrPropagationDate, fertilizationDate, pestControlDate, userId } = props.plant

  let reapOrPropagation
  type === 'vegetable'
    ? reapOrPropagation = 'Reap Date'
    : reapOrPropagation = 'Propagation Date'

  function handleClickDelPlant () {
    delPlant(id)
    props.dispatch(fetchPlants(auth0Id))
  }

  function onFileChange (e) {
    // setFileState({ selectedFile: e.target.files[0] })
    setFileState({ selectedFile: e.target.files })
  }

  function handleImageSubmit (e) {
    // e.preventDefault()
    const formData = new FormData()

    for (let i = 0; i < fileState.selectedFile.length; i++) {
      formData.append('plant_pic', fileState.selectedFile[i])
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    props.dispatch(addTheImages(formData, config, id))
    props.dispatch(fetchImages())
    // props.dispatch(fetchPlants(auth0Id))
    // history.push('/')
    location.reload(true)
  }

  const images = props.imageNames.filter((elem) => { return Number(elem.plantId) === Number(id) })

  return (
    <div>
      <p><strong>Id:</strong> {id}</p>
      <p><strong>Plant Type:</strong> {type}</p>
      <p><strong>Plant Name:</strong> {name}</p>
      <ul style={{ padding: '0px' }} >
        {images.length === 0
          ? <p><strong>Image:</strong> <br /> Please add a image. </p>
          : <p><strong>Image:</strong> <br />
            {images.map(imageObj => {
              return (
                <li key={imageObj.id}>
                  <Image imageObj={imageObj}/>
                </li>
              )
            })}
          </p>}
      </ul>
      <p><strong>Created At:</strong> {createdAt}</p>
      <p><strong>Planting Date:</strong> {plantingDate}</p>
      <p><strong>{reapOrPropagation}</strong> {reapOrPropagationDate}</p>
      <p><strong>Fertilization Date:</strong> {fertilizationDate}</p>
      <p><strong>Pest Control Date:</strong> {pestControlDate}</p>
      <p className={type === 'vegetable' ? 'hide' : 'null'}><strong>Cost:</strong> $ {cost}</p>
      <p><strong>User Id:</strong> {userId}</p>
      <label htmlFor="imageName">Image Name: <br />
        <form /* method="POST" action="/upload-plant-pic" */ encType="multipart/form-data">
          <div>
            {/* <input type="file" name="plant_pic" id={id} onChange={(e) => onFileChange(e)} /> */}
            <input type="file" name="plant_pic" multiple /* accept='.jpg, .jpeg, .png' */ id={id} onChange={(e) => onFileChange(e)} />
          </div>
        </form>
      </label><br/>
      <button onClick={e => handleImageSubmit(e)}>Submit</button> <br/><br/>
      <button onClick={handleClickDelPlant}>X</button>
    </div>
  )
}

function mapStateToProps (globalState) {
  return {
    imageNames: globalState.images,
    user: globalState.user
  }
}

export default connect(mapStateToProps)(Plant)
