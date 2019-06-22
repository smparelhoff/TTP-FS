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

  const symbols = Object.keys(portfolioRaw).join(',')
  console.log(`https://api.iextrading.com/1.0/tops/last?symbols=${symbols}`)
  const lastPrices = await axios.get(
    `https://api.iextrading.com/1.0/tops/last?symbols=${symbols}`
  )

  //const officialPrices = await axios.get(`https://api.iextrading.com/1.0/deep/official-price?symbols=${symbols}`)
  console.log({portfolioRaw, symbols, lastPrices: lastPrices.data})

  const portfolio = lastPrices.data.map(elem => {
    const shares = portfolioRaw[elem.symbol]
    return {...elem, shares}
  })

  dispatch(loadPortfolio(portfolio))
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
