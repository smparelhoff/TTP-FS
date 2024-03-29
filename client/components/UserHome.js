import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Portfolio, StockAdder} from './index'

/**
 * COMPONENT
 */
export const UserHome = props => {
  return (
    <div className="main">
      <div className="flex-container">
        <Portfolio />
        <StockAdder />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.firstname
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
