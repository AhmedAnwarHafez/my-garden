import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addThePlant, fetchPlants } from '../actions/plants'
import Plant from './Plant'
import WaitIndicator from './WaitIndicator'

// const auth0Id = '123'
// const auth0Id = '456'

function Plants (props) {
  const { user } = props
  const auth0Id = user.auth0Id

  useEffect(() => {
    if (auth0Id) {
      props.dispatch(fetchPlants(auth0Id))
    }
  }, [auth0Id])

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

  const [load, setLoad] = useState(false)

  function handleChangeAddPlant (e) {
    const { name, value } = e.target
    const newAddForm = {
      ...addForm,
      [name]: value
    }
    // console.log(newAddForm)
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
      setLoad(false)
    }
  }

  function handleClickShowAddPlant () {
    setLoad(!load)
  }

  return (
    <>
      {!auth0Id
        ? <p>Please log in.</p>
        : <div>
          <div>
            <WaitIndicator/>
            <ul>
              {
                !props.plants.length &&
            <p>Please Add a Plant.</p>
              }
              { props.plants.map(plant => {
                return (
                  <li key={plant.id}>
                    <Plant plant={plant} />
                  </li>
                )
              })
              }
            </ul>
          </div>
          <div>
            <p onClick={handleClickShowAddPlant}><strong>Add a Plant:</strong> </p>
            {load
              ? <form onSubmit={(e) => { handleSubmitAddPlant(e) }}>
                <label htmlFor="plantType">Plant Type: <br />
                  <select className='addFormColour' name="type" id="type" onChange={(e) => handleChangeAddPlant(e)}>
                    <option value=''>--Select--</option>
                    <option value='Vegetable'>Vegetable</option>
                    <option value='Succulent'>Succulent</option>
                  </select><br />
                </label>
                <label htmlFor="plantName">Plant Name: <br />
                  <input
                    type="text"
                    id='name'
                    name='name'
                    value= {addForm.name}
                    className='addFormColour'
                    onChange={(e) => handleChangeAddPlant(e)} />
                </label><br />
                <label htmlFor="plantingDate">Planting Date: <br />
                  <input
                    type="date"
                    id='plantingDate'
                    name='plantingDate'
                    value= {addForm.plantingDate}
                    className='addFormColour'
                    onChange={(e) => handleChangeAddPlant(e)}/>
                </label><br />
                <label htmlFor="reapOrPropagationDate">Reap or Propagation Date: <br />
                  <input
                    type="date"
                    id='reapOrPropagationDate'
                    name='reapOrPropagationDate'
                    value= {addForm.reapOrPropagationDate}
                    className='addFormColour'
                    onChange={(e) => handleChangeAddPlant(e)} />
                </label><br />
                <label htmlFor="fertilizationDate">Fertilization Date: <br />
                  <input
                    type="date"
                    id='fertilizationDate'
                    name='fertilizationDate'
                    value= {addForm.fertilizationDate}
                    className='addFormColour'
                    onChange={(e) => handleChangeAddPlant(e)} />
                </label><br />
                <label htmlFor="pestControlDate">Pest Control Date: <br />
                  <input
                    type="date"
                    id='pestControlDate'
                    name='pestControlDate'
                    value= {addForm.pestControlDate}
                    className='addFormColour'
                    onChange={(e) => handleChangeAddPlant(e)} />
                </label><br />
                <label htmlFor="cost">Cost: <br />
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
              : null
            }
          </div>
        </div>}
    </>
  )
}

function mapStateToProps (globalState) {
  return {
    plants: globalState.plants,
    user: globalState.user
  }
}

export default connect(mapStateToProps)(Plants)
