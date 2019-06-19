import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Portfolio, StockForm} from './index'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name, balance} = props

  return (
    <div>
      <h3>
        Welcome, {name}! Your current balance is ${balance}
      </h3>
      <Portfolio />
      <StockForm />
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
