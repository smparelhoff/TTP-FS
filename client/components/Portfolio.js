import React from 'react'
import {connect} from 'react-redux'
import {fetchPortfolio} from '../store/portfolio'

class Portfolio extends React.Component {
  async componentDidMount() {
    await this.props.loadPortfolio()
  }

  render() {
    return (
      this.props.portfolio.length &&
      this.props.portfolio.map(stock => {
        return (
          <div key={stock.ticker}>
            {stock.ticker} - {stock.price} - {stock.shares}
          </div>
        )
      })
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
      dispatch(fetchPortfolio())
    }
  }
}

export default connect(mapState, mapDispatch)(Portfolio)
