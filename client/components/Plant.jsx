import React, { useEffect } from 'react'
import { delPlant, fetchPlants } from '../actions/plants'
import { fetchImages } from '../actions/images'
import { useHistory } from 'react-router-dom'
import Image from './Image'
// import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

// const auth0Id = '123'
// const auth0Id = '456'

function Plant (props) {
  const history = useHistory()

  useEffect(() => {
    props.dispatch(fetchImages())
  }, [])
  // const history = useHistory()
  const { user } = props
  const auth0Id = user.auth0Id
  const { id, name, type, createdAt, cost, plantingDate, reapOrPropagationDate, fertilizationDate, pestControlDate, userId } = props.plant

  let reapOrPropagation
  type === 'Vegetable'
    ? reapOrPropagation = 'Reap Date'
    : reapOrPropagation = 'Propagation Date'

  function handleClickDelPlant () {
    delPlant(id)
    props.dispatch(fetchPlants(auth0Id))
  }

  function handleClickEditPlant () {
    history.push({
      pathname: '/editPlant',
      state: { plant: props.plant, images }
    })
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
      <button onClick={handleClickEditPlant}>Edit</button> {'\u00A0'}
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
