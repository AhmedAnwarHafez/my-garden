import React from 'react'
import { connect } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { cacheUser } from '../auth0-utils'
import { Route } from 'react-router'
import Nav from './Nav'
import PingRoutes from './PingRoutes'
import Registration from './Registration'
import Users from './Users'
import Plants from './Plants'
import AddPlant from './AddPlant'
import EditPlant from './EditPlant'

function App () {
  cacheUser(useAuth0)

  return (
    <div className='app'>
      <Route exact path='/' component={Nav} />
      <Route exact path='/' component={Plants} />
      <Route exact path='/' component={Users} />
      <Route exact path='/' component={PingRoutes} />
      <Route path='/register' component={Registration} />
      <Route path='/addPlant' component={AddPlant}/>
      <Route path='/editPlant/:id' component={EditPlant}/>
    </div>
  )
}
const mapStateToProps = (globalState) => {
  return {
    fruits: globalState.fruits,
    token: globalState.user.token
  }
}

export default connect(mapStateToProps)(App)
