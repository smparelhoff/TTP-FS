import React from 'react'
import {connect} from 'react-redux'
import {checkStock} from '../store/stock'

class StockLookup extends React.Component {
  constructor() {
    super()
    this.state = {
      symbol: ''
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <label htmlFor="Ticker Symbol">Ticker Symbol</label>
            <input name="symbol" type="text" />
          </div>
          <div>
            <label htmlFor="shares">Number of Shares</label>
            <input name="shares" type="number" />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapState = state => ({})

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault()
    console.log(evt.target.symbol.value)
    dispatch(checkStock(evt.target.symbol.value))
  }
})

export default connect(mapState, mapDispatch)(StockLookup)
