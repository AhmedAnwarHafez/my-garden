import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addThePlant, fetchPlants } from '../actions/plants'
import Plant from './Plant'
import WaitIndicator from './WaitIndicator'

const auth0Id = '123'
// const auth0Id = '456'

function Plants (props) {
  useEffect(() => {
    props.dispatch(fetchPlants(auth0Id))
  }, [])
  const [addForm, setAddForm] = useState(
    {
      type: '',
      name: '',
      imageName: '',
      plantingDate: '',
      reapOrPropagationDate: '',
      fertilizationDate: '',
      pestControlDate: '',
      cost: ''
    }
  )
  const [load, setLoad] = useState(false)
  // const [fileState, setFileState] = useState({ selectedFile: null })

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

  function handleClickShowAddPlant () {
    setLoad(!load)
  }

  // function onFileChange (e) {
  //   setFileState({ selectedFile: e.target.files[0] })
  // }

  // function handleImageSubmit (e) {
  //   e.preventDefault()
  //   const formData = new FormData()
  //   formData.append('profile_pic', fileState.selectedFile)
  //   // console.log(fileState.selectedFile)
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //     }
  //   }
  //   props.dispatch(getImages(formData, config))
  // }

  return (
    <>
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
                <Plant plant={plant} /* imageNames={props.imageNames} */ />
              </li>
            )
          })
          }
        </ul>
      </div>
      <div>
        <p onClick={handleClickShowAddPlant}><strong>Add a Plant:</strong> </p>
        {load
          ? <form onSubmit={(e) => { handleSubmitAddPlant(e)/* ; handleImageSubmit(e) */ }}>
            <label htmlFor="type">Plant Type: <br />
              <select name="type" id="type" onChange={(e) => handleChangeAddPlant(e)}>
                <option value=''>--Select--</option>
                <option value='Vegetable'>Vegetable</option>
                <option value='Succulent'>Succulent</option>
              </select><br />
            </label>
            <label htmlFor="name">Plant Name: <br />
              <input
                type="text"
                name='name'
                value= {addForm.name}
                onChange={(e) => handleChangeAddPlant(e)} />
            </label><br />
            {/* <label htmlFor="imageName">Image Name: <br />
              <form method="POST" action="/upload-profile-pic" encType="multipart/form-data">
                <div>
                  <input type="file" name="profile_pic" onChange={(e) => onFileChange(e)} />
                </div>
              </form>
            </label><br /> */}
            <label htmlFor="plantingDate">Planting Date: <br />
              <input
                type="date"
                name='plantingDate'
                value= {addForm.plantingDate}
                onChange={(e) => handleChangeAddPlant(e)}/>
            </label><br />
            <label htmlFor="reapOrPropagationDate">Reap or Propagation Date: <br />
              <input
                type="date"
                name='reapOrPropagationDate'
                value= {addForm.reapOrPropagationDate}
                onChange={(e) => handleChangeAddPlant(e)} />
            </label><br />
            <label htmlFor="fertilizationDate">Fertilization Date: <br />
              <input
                type="date"
                name='fertilizationDate'
                value= {addForm.fertilizationDate}
                onChange={(e) => handleChangeAddPlant(e)} />
            </label><br />
            <label htmlFor="pestControlDate">Pest Control Date: <br />
              <input
                type="date"
                name='pestControlDate'
                value= {addForm.pestControlDate}
                onChange={(e) => handleChangeAddPlant(e)} />
            </label><br />
            <label htmlFor="cost">Cost: <br />
              <input
                type="text"
                name='cost'
                value= {addForm.cost}
                onChange={(e) => handleChangeAddPlant(e)} />
            </label><br /><br />
            <button>Submit</button>
          </form>
          : null
        }
      </div>
    </>
  )
}

function mapStateToProps (globalState) {
  return {
    plants: globalState.plants
    // imageNames: globalState.images
  }
}

export default connect(mapStateToProps)(Plants)
