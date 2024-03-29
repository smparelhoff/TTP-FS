import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar">
    <Link to="/home">
      <div id="title">Stock Doc</div>
    </Link>
    <nav>
      {isLoggedIn ? (
        <ul>
          {/* The navbar will show these links after you log in */}
          <li>
            <Link to="/home">home</Link>
          </li>
          <li>
            <Link to="/transactions">transactions</Link>
          </li>
          <li>
            <a href="#" onClick={handleClick}>
              logout
            </a>
          </li>
        </ul>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">login</Link>
          <Link to="/signup">sign up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
