import axios from 'axios'

//Action Constants
const GET_STOCK = 'GET_STOCK'
const REMOVE_STOCK = 'REMOVE_STOCK'

//Action Creators
const getStock = stock => ({type: GET_STOCK, stock})
export const removeStock = () => ({type: REMOVE_STOCK})

//Thunks
export const checkStock = symbol => async dispatch => {
  const {data} = await axios.get(
    `https://api.iextrading.com/1.0/tops/last?symbols=${symbol}`
  )
  dispatch(getStock(data[0]))
}

const initialState = {}

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK:
      return action.stock
    case REMOVE_STOCK:
      return {}
    default:
      return state
  }
}
