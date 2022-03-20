import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPlants } from '../actions/plants'
import Plant from './Plant'
import WaitIndicator from './WaitIndicator'
import { useHistory } from 'react-router-dom'

// const auth0Id = '123'
// const auth0Id = '456'

function Plants (props) {
  const { user } = props
  const auth0Id = user.auth0Id
  const history = useHistory()

  useEffect(() => {
    if (auth0Id) {
      props.dispatch(fetchPlants(auth0Id))
    }
  }, [auth0Id])

  return (
    <>
      {!auth0Id
        ? <p>Please log in.</p>
        : <div>
          <WaitIndicator/>
          <button onClick={() => { history.push('/addPlant') }}>Add a Plant</button>
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
