import axios from 'axios'

//Action constants
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const ADD_STOCK = 'ADD_STOCK'

//Action creators
const getTransactions = transactions => ({type: GET_TRANSACTIONS, transactions})
const addStock = stock => ({type: ADD_STOCK, stock})

//Thunks
export const fetchTransactions = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolio')
    dispatch(getTransactions(data))
  } catch (error) {
    console.log("Data couldn't be fetched")
  }
}

export const postStock = stock => async dispatch => {
  const {data} = await axios.post('/api/portfolio', stock)
  dispatch(addStock(data))
  return data.id
}

//Initial State
const initialState = []

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions
    case ADD_STOCK:
      return [...state, action.stock]
    default:
      return state
  }
}
