import React from 'react'
import {connect} from 'react-redux'
import {getPortfolio} from '../store/portfolio'

class Portfolio extends React.Component {
  async componentDidMount() {
    await this.props.loadPortfolio()
  }

  //portfolio = {symbol, shares, price}

  render() {
    const {portfolio} = this.props
    return portfolio.length ? (
      <div className="container">
        <h3>Portfolio</h3>
        <div className="flex-grid">
          <div className="col">
            <ul>
              <li>SYMBOL</li>
              <hr />
              {portfolio.map(elem => <li key={elem.symbol}>{elem.symbol}</li>)}
            </ul>
          </div>
          <div className="col">
            <ul>
              <li>SHARES</li>
              <hr />
              {portfolio.map(elem => (
                <li key={elem.symbol + elem.shares}>{elem.shares}</li>
              ))}
            </ul>
          </div>
          <div className="col">
            <ul>
              <li>LAST</li>
              <hr />
              {portfolio.map(elem => (
                <li key={elem.symbol + elem.price}>{elem.price}</li>
              ))}
            </ul>
          </div>
        </div>
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
