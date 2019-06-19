import axios from 'axios'

//Action constants
const GET_PORTFOLIO = 'GET_PORTFOLIO'
const ADD_STOCK = 'ADD_STOCK'

//Action creators
const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})
const addStock = stock => ({type: ADD_STOCK, stock})

//Thunks
export const fetchPortfolio = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolio')
    dispatch(getPortfolio(data))
  } catch (error) {
    console.log("Data couldn't be fetched")
  }
}

export const postStock = stock => async dispatch => {
  const [stockData] = stock
  const {data} = await axios.post('/api/portfolio', stockData)
  dispatch(addStock(data))
}

//Initial State
const initialState = []

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.portfolio
    case ADD_STOCK:
      return [...state, action.stock]
    default:
      return state
  }
}
