import React from 'react'
import { connect } from 'react-redux'

function WaitIndicator (props) {
  return (
    props.waiting
      ? <img className='wait-indicator' src="/animated-circle.gif" alt="animated-circle.gif" />
      : null
  )
}

function mapStateToProps (globalState) {
  return {
    waiting: globalState.waiting
  }
}

export default connect(mapStateToProps)(WaitIndicator)
