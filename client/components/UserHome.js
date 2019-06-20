import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Portfolio, StockAdder} from './index'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name, balance} = props

  return (
    <div>
      <h3>Welcome, {name}!</h3>
      <Portfolio />
      <StockAdder />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    balance: state.user.balance,
    name: state.user.firstname
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
