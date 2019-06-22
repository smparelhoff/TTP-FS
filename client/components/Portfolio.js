import React from 'react'
import {connect} from 'react-redux'
import {getPortfolio} from '../store/portfolio'

class Portfolio extends React.Component {
  async componentDidMount() {
    await this.props.loadPortfolio()
  }

  render() {
    const {portfolio} = this.props
    return portfolio.length ? (
      <div>
        <h3>Portfolio</h3>
        {portfolio.map(elem => {
          return (
            <h6 key={elem.symbol}>
              SYMBOL: {elem.symbol} SHARES: {elem.shares} LAST PRICE:{' '}
              {elem.price}
            </h6>
          )
        })}
      </div>
    ) : (
      <div>Uh oh!</div>
    )
  }
}

//map state to props
const mapState = state => ({
  portfolio: state.portfolio
})

const mapDispatch = dispatch => {
  return {
    loadPortfolio() {
      dispatch(getPortfolio())
    }
  }
}

export default connect(mapState, mapDispatch)(Portfolio)
