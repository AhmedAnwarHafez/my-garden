import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { addTheImages, fetchImages } from '../actions/images'
import { fetchPlants, updateThePlant } from '../actions/plants'
import EditImage from './EditImage'

function EditPlant (props) {
  console.log(props)
  const { user } = props
  const auth0Id = user.auth0Id
  const { id } = useParams()
  // console.log(id)
  const [editForm, setEditForm] = useState({
    name: '',
    type: '',
    cost: '',
    plantingDate: '',
    reapOrPropagationDate: '',
    fertilizationDate: '',
    pestControlDate: ''
  })
  useEffect(() => {
    console.log('aaaaaa')
    if (auth0Id) {
      props.dispatch(fetchPlants(auth0Id))
      props.dispatch(fetchImages())
      const thePlant = props.plants.find(plant => plant.id === Number(id))
      setEditForm({
        name: thePlant?.name,
        type: thePlant?.type,
        cost: thePlant?.cost,
        plantingDate: thePlant?.plantingDate,
        reapOrPropagationDate: thePlant?.reapOrPropagationDate,
        fertilizationDate: thePlant?.fertilizationDate,
        pestControlDate: thePlant?.pestControlDate
      })
    }
  }, [])
  const history = useHistory()

  // console.log(thePlant)
  // const { name, type, cost, plantingDate, reapOrPropagationDate, fertilizationDate, pestControlDate, userId } = thePlant[0]
  // console.log(thePlant[0])
  const [fileState, setFileState] = useState({ selectedFile: null })
  console.log('useState')

  const reapOrPropagation = editForm.type === 'Vegetable'
    ? 'Reap Date'
    : 'Propagation Date'

  function handleChangeEditPlant (e) {
    e.preventDefault()
    const { name, value } = e.target
    const newEditForm = {
      ...editForm,
      [name]: value
    }
    setEditForm(newEditForm)
  }

  function handleSubmitEditPlant (e) {
    e.preventDefault()
    if (document.getElementsByClassName('errorColour').length) {
      document.querySelectorAll('.errorColour').forEach(elem => {
        elem.className = 'formColour'
      })
    }
    document.querySelectorAll('.formColour').forEach((elem) => {
      if (elem.value.match(/^\s*$/)) {
        document.getElementById(`${elem.id}`).className = 'errorColour'
      }
    })

    if (document.querySelectorAll('.errorColour').length) {
      setTimeout(() => {
        alert('Please fill in all the required fields.')
      }, 1)
    }

    if (isNaN(document.getElementById('cost').value)) {
      document.getElementById('cost').className = 'errorColour'
      setTimeout(() => {
        alert('Please only enter number at the cost filed.')
      }, 1)
    }
    if (!document.querySelectorAll('.errorColour').length) {
      updateThePlant(id, editForm)
      history.push('/editPlant/' + id)
    }
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
    // props.dispatch(fetchImages())
    history.push('/editPlant/' + id)
  }

  const images = props.imageNames.filter((elem) => { return Number(elem.plantId) === Number(id) })

  return (
    <>
      <form onSubmit={handleSubmitEditPlant}>
        <button onClick={() => { history.push('/') }}>Home</button>
        <p ><strong>Edit Plant:</strong> </p>
        <label htmlFor='type'><strong>Type:</strong> <br />
          <select name='type' id='type' defaultValue={editForm.type} onChange={handleChangeEditPlant}>
            <option value='Vegetable'>Vegetable</option>
            <option value="Succulent">Succulent</option>
          </select>
        </label><br />
        <label htmlFor='name'><strong>Name:</strong> <br />
          <input type="text"
            id='name'
            name='name'
            value={editForm.name}
            className='formColour'
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <ul style={{ padding: '0px' }} >
          {images.length === 0
            ? <p><strong>Image:</strong> <br /> Please add a image/images. </p>
            : <p><strong>Image:</strong> <br />
              {images.map(imageObj => {
                return (
                  <li key={imageObj.id}>
                    <EditImage imageObj={imageObj}/>
                  </li>
                )
              })}
            </p>}
        </ul> <br />
        <label htmlFor='name'><strong>Planting Date:</strong> <br />
          <input type="date"
            id='plantingDate'
            name='plantingDate'
            value={editForm.plantingDate}
            className='formColour'
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='reapOrPropagationDate'><strong>{reapOrPropagation}:</strong> <br />
          <input type="date"
            id='reapOrPropagationDate'
            name='reapOrPropagationDate'
            value={editForm.reapOrPropagationDate}
            className='formColour'
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='fertilizationDate'><strong>Fertilization Date:</strong> <br />
          <input type="date"
            id='fertilizationDate'
            name='fertilizationDate'
            value={editForm.fertilizationDate}
            className='formColour'
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='pestControlDate'><strong>Pest Control Date:</strong> <br />
          <input type="date"
            id='pestControlDate'
            name='pestControlDate'
            value={editForm.pestControlDate}
            className='formColour'
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='cost'><strong>cost:</strong> <br />
          <input type="text"
            id='cost'
            name='cost'
            value={editForm.cost}
            className='formColour'
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <button>Submit</button>
      </form>
      <p><strong>Add Images</strong></p>
      <label htmlFor="imageName">Image Name: <br />
        <form encType="multipart/form-data">
          <div>
            <input type="file" name="plant_pic" multiple id={id} onChange={(e) => onFileChange(e)} />
          </div><br/>
          <button onClick={e => handleImageSubmit(e)}>Submit</button> <br/><br/>
        </form>
      </label><br/>
    </>
  )
}

function mapStateToProps (globalState) {
  return {
    plants: globalState.plants,
    imageNames: globalState.images,
    user: globalState.user
  }
}

export default connect(mapStateToProps)(EditPlant)
