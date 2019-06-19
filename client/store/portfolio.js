import axios from 'axios'

//Action constants
const GET_PORTFOLIO = 'GET_PORTFOLIO'

//Action creators
const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})

//Thunks
export const fetchPortfolio = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolio')
    dispatch(getPortfolio(data))
  } catch (error) {
    console.log("Data couldn't be fetched")
  }
}

//Initial State
const initialState = []

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIO: {
      return action.portfolio
    }
    default:
      return state
  }
}
