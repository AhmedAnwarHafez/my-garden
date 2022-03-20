import React from 'react'
import { useHistory } from 'react-router-dom'

function EditPlant (props) {
  const history = useHistory()

  const { id, name, type, createdAt, cost, plantingDate, reapOrPropagationDate, fertilizationDate, pestControlDate, userId } = props.location.state.detail

  let reapOrPropagation
  type === 'Vegetable'
    ? reapOrPropagation = 'Reap Date'
    : reapOrPropagation = 'Propagation Date'

  function handleChangeEditPlant () {

  }

  return (
    <>
      <form action="">
        <button onClick={() => { history.push('/') }} >Home</button>
        <p ><strong>Edit Plant:</strong> </p>
        <label htmlFor='id'><strong>Id:</strong><br />
          <input type="text"
            id='id'
            name='id'
            value={id}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='type'><strong>Type:</strong> <br />
          <input type="text"
            id='type'
            name='type'
            value={type}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='name'><strong>Name:</strong> <br />
          <input type="text"
            id='name'
            name='name'
            value={name}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='createdAt'><strong>Created At:</strong> <br />
          <input type="text"
            id='createdAt'
            name='createdAt'
            value={createdAt}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='name'><strong>Planting Date:</strong> <br />
          <input type="text"
            id='plantingDate'
            name='plantingDate'
            value={plantingDate}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='reapOrPropagationDate'><strong>{reapOrPropagation}:</strong> <br />
          <input type="text"
            id='reapOrPropagationDate'
            name='reapOrPropagationDate'
            value={reapOrPropagationDate}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='fertilizationDate'><strong>Fertilization Date:</strong> <br />
          <input type="text"
            id='fertilizationDate'
            name='fertilizationDate'
            value={fertilizationDate}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='pestControlDate'><strong>Pest Control Date:</strong> <br />
          <input type="text"
            id='pestControlDate'
            name='pestControlDate'
            value={pestControlDate}
            onChange={handleChangeEditPlant}
          />
        </label><br />
        <label htmlFor='cost'><strong>cost:</strong> <br />
          <input type="text"
            id='cost'
            name='cost'
            value={cost}
            onChange={handleChangeEditPlant}
          />
        </label><br />
      </form>
    </>
  )
}

export default EditPlant
