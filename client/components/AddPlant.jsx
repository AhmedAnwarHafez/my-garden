import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addThePlant, fetchPlants } from '../actions/plants'
import { useHistory } from 'react-router-dom'

function AddPlant (props) {
  const { user } = props
  const auth0Id = user.auth0Id
  const history = useHistory()
  const [addForm, setAddForm] = useState(
    {
      type: '',
      name: '',
      plantingDate: '',
      reapOrPropagationDate: '',
      fertilizationDate: '',
      pestControlDate: '',
      cost: ''
    }
  )

  function handleChangeAddPlant (e) {
    const { name, value } = e.target
    const newAddForm = {
      ...addForm,
      [name]: value
    }
    setAddForm(newAddForm)
  }

  function handleSubmitAddPlant (e) {
    e.preventDefault()
    if (document.getElementsByClassName('errorColour').length) {
      // [...document.getElementsByClassName('errorColour')].forEach((elem) => {
      //   elem.className = 'addFormColour'
      // })
      document.querySelectorAll('.errorColour').forEach(elem => {
        elem.className = 'addFormColour'
      })
    }

    document.querySelectorAll('.addFormColour').forEach((elem) => {
      if (elem.value.match(/^\s*$/)) {
        document.getElementById(`${elem.id}`).className = 'errorColour'
      }
    })

    if (document.querySelectorAll('.errorColour').length) {
      alert('Please fill in all the required fields.')
    }

    if (isNaN(document.getElementById('cost').value)) {
      document.getElementById('cost').className = 'errorColour'
      alert('Please only enter number at the cost filed.')
    }

    if (!document.querySelectorAll('.errorColour').length) {
      const plant = {
        ...addForm,
        auth0Id
      }
      addThePlant(plant)
      props.dispatch(fetchPlants(auth0Id))
      const clearAddForm = {
        type: '',
        name: '',
        imageName: '',
        plantingDate: '',
        reapOrPropagationDate: '',
        fertilizationDate: '',
        pestControlDate: '',
        cost: ''
      }
      setAddForm(clearAddForm)
      history.push('/')
    }
  }

  return (
    <>
      <form onSubmit={(e) => { handleSubmitAddPlant(e) }}>
        <button onClick={() => { history.push('/') }}>Home</button>
        <p ><strong>Add a Plant:</strong> </p>
        <label htmlFor="plantType"><strong>Plant Type:</strong><br />
          <select className='addFormColour' name="type" id="type" onChange={(e) => handleChangeAddPlant(e)}>
            <option value=''>--Select--</option>
            <option value='Vegetable'>Vegetable</option>
            <option value='Succulent'>Succulent</option>
          </select><br />
        </label>
        <label htmlFor="plantName"><strong>Plant Name:</strong> <br />
          <input
            type="text"
            id='name'
            name='name'
            value= {addForm.name}
            className='addFormColour'
            onChange={(e) => handleChangeAddPlant(e)} />
        </label><br />
        <label htmlFor="plantingDate"><strong>Planting Date:</strong> <br />
          <input
            type="date"
            id='plantingDate'
            name='plantingDate'
            value= {addForm.plantingDate}
            className='addFormColour'
            onChange={(e) => handleChangeAddPlant(e)}/>
        </label><br />
        <label htmlFor="reapOrPropagationDate"><strong>Reap or Propagation Date:</strong> <br />
          <input
            type="date"
            id='reapOrPropagationDate'
            name='reapOrPropagationDate'
            value= {addForm.reapOrPropagationDate}
            className='addFormColour'
            onChange={(e) => handleChangeAddPlant(e)} />
        </label><br />
        <label htmlFor="fertilizationDate"><strong>Fertilization Date:</strong> <br />
          <input
            type="date"
            id='fertilizationDate'
            name='fertilizationDate'
            value= {addForm.fertilizationDate}
            className='addFormColour'
            onChange={(e) => handleChangeAddPlant(e)} />
        </label><br />
        <label htmlFor="pestControlDate"><strong>Pest Control Date:</strong> <br />
          <input
            type="date"
            id='pestControlDate'
            name='pestControlDate'
            value= {addForm.pestControlDate}
            className='addFormColour'
            onChange={(e) => handleChangeAddPlant(e)} />
        </label><br />
        <label htmlFor="cost"><strong>Cost:</strong> <br />
          <input
            type="text"
            id='cost'
            name='cost'
            value= {addForm.cost}
            className='addFormColour'
            onChange={(e) => handleChangeAddPlant(e)} />
        </label><br /><br />
        <button>Submit</button>
      </form>

    </>
  )
}

function mapStateToProps (globalState) {
  return {
    plants: globalState.plants,
    user: globalState.user
  }
}

export default connect(mapStateToProps)(AddPlant)
