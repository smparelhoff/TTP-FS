import axios from 'axios'

//Action Constants
const GET_STOCK = 'GET_STOCK'
const REMOVE_STOCK = 'REMOVE_STOCK'

//Action Creators
const getStock = stock => ({type: GET_STOCK, stock})
export const removeStock = () => ({type: REMOVE_STOCK})

//Thunks
export const checkStock = symbol => async dispatch => {
  try {
    const {data} = await axios.get(
      `https://api.iextrading.com/1.0/tops/last?symbols=${symbol}`
    )
    if (!data.length) {
      const err = new Error('Symbol not found.')
      dispatch(getStock({error: err}))
    } else dispatch(getStock(data[0]))
  } catch (err) {
    dispatch(getStock({error: err}))
  }
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
