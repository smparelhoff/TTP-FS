import axios from 'axios'

//Action constants
const LOAD_PORTFOLIO = 'LOAD_PORTFOLIO'

//Action Creators
const loadPortfolio = portfolio => ({type: LOAD_PORTFOLIO, portfolio})

//Thunk Creators
export const getPortfolio = () => async dispatch => {
  const {data} = await axios.get('/api/portfolio')

  const portfolioRaw = data.reduce((accum, elem) => {
    if (accum[elem.symbol]) {
      accum[elem.symbol] += elem.shares
    } else accum[elem.symbol] = elem.shares
    return accum
  }, {})

  const symbols = Object.keys(portfolioRaw)

  const deepInfo = symbols.map(async symbol => {
    const deep = await axios.get(
      `https://api.iextrading.com/1.0/deep?symbols=${symbol}`
    )
    return {
      symbol: deep.data.symbol,
      lastPrice: deep.data.lastSalePrice,
      open: deep.data.trades[deep.data.trades.length - 1].price
    }
  })

  Promise.all(deepInfo).then(deep => {
    const portfolio = deep.map(elem => {
      const shares = portfolioRaw[elem.symbol]
      return {...elem, shares}
    })
    dispatch(loadPortfolio(portfolio))
  })
}

//Reducer
const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_PORTFOLIO:
      return action.portfolio
    default:
      return state
  }
}
