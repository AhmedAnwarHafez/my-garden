import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { updateThePlant } from '../actions/plants'

function EditPlant (props) {
  const history = useHistory()
  const { id, name, type, cost, plantingDate, reapOrPropagationDate, fertilizationDate, pestControlDate, userId } = props.location.state.detail
  const [editForm, setEditForm] = useState({
    name,
    type,
    cost,
    plantingDate,
    reapOrPropagationDate,
    fertilizationDate,
    pestControlDate
  })

  let reapOrPropagation
  type === 'Vegetable'
    ? reapOrPropagation = 'Reap Date'
    : reapOrPropagation = 'Propagation Date'

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
        elem.className = 'addFormColour'
      })
    }
    document.querySelectorAll('.addFormColour').forEach((elem) => {
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
      history.push('/')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitEditPlant}>
        <button onClick={() => { history.push('/') }} >Home</button>
        <p ><strong>Edit Plant:</strong> </p>
        <label htmlFor='type'><strong>Type:</strong> <br />
          <select name='type' id='type' defaultValue={type} onChange={handleChangeEditPlant}>
            <option value='Vegetable'>Vegetable</option>
            <option value="Succulent">Succulent</option>
          </select>
        </label><br />
        <label htmlFor='name'><strong>Name:</strong> <br />
          <input type="text"
            id='name'
            name='name'
            value={editForm.name}
            className='addFormColour'
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='name'><strong>Planting Date:</strong> <br />
          <input type="date"
            id='plantingDate'
            name='plantingDate'
            value={editForm.plantingDate}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='reapOrPropagationDate'><strong>{reapOrPropagation}:</strong> <br />
          <input type="date"
            id='reapOrPropagationDate'
            name='reapOrPropagationDate'
            value={editForm.reapOrPropagationDate}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='fertilizationDate'><strong>Fertilization Date:</strong> <br />
          <input type="date"
            id='fertilizationDate'
            name='fertilizationDate'
            value={editForm.fertilizationDate}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='pestControlDate'><strong>Pest Control Date:</strong> <br />
          <input type="date"
            id='pestControlDate'
            name='pestControlDate'
            value={editForm.pestControlDate}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='cost'><strong>cost:</strong> <br />
          <input type="text"
            id='cost'
            name='cost'
            value={editForm.cost}
            className='addFormColour'
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <button>Submit</button>
      </form>
    </>
  )
}

export default EditPlant
