import axios from 'axios'

//Action Constants
const GET_STOCK = 'GET_STOCK'

//Action Creators
const getStock = stock => ({
  type: GET_STOCK,
  stock
})

//Thunks
export const checkStock = symbol => async dispatch => {
  const {data} = await axios.get(
    `https://api.iextrading.com/1.0/tops/last?symbols=${symbol}`
  )
  dispatch(getStock(data))
}

const initialState = []

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK:
      return action.stock
    default:
      return state
  }
}
