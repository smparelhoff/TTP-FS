import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_BALANCE = 'UPDATE_BALANCE'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateBalance = balance => ({type: UPDATE_BALANCE, balance})

/**
 * THUNK CREATORS
 */

export const postBalance = tradeId => async dispatch => {
  try {
    const {data} = await axios.put('/api/user', {tradeId})
    dispatch(updateBalance(data.balance))
  } catch (err) {
    console.error(err)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  firstname,
  lastname,
  method
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstname,
      lastname
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    console.log('GOT HERE', res.data)
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER: {
      return action.user
    }
    case REMOVE_USER:
      return defaultUser
    case UPDATE_BALANCE:
      return {...state, balance: action.balance}
    default:
      return state
  }
}
