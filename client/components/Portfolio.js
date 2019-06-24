import React from 'react'
import {connect} from 'react-redux'
import {getPortfolio} from '../store/portfolio'
import {Loading} from './index'

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
              {portfolio.map(elem => {
                const color =
                  elem.open < elem.lastPrice
                    ? 'green'
                    : elem.open === elem.lastPrice ? 'gray' : 'red'
                return (
                  <li className={color} key={elem.symbol + elem.lastPrice}>
                    {elem.lastPrice}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <Loading />
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
