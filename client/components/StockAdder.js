import React from 'react'
import {connect} from 'react-redux'
import StockLookupForm from './StockLookupForm'

class StockAdder extends React.Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      shares: 0,
      error: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({balance: this.props.balance})
  }

  handleChange(evt) {
    const {balance} = this.props
    const price = this.props.stock[0].price * evt.target.value

    if (balance - price < 0) {
      this.setState({error: true, shares: evt.target.value})
    } else {
      this.setState({
        balance: balance - price,
        shares: evt.target.value,
        error: false
      })
    }
  }

  render() {
    const {stock} = this.props
    const {balance, shares} = this.state
    return (
      <div>
        <h4>Current balance: ${balance}</h4>
        {!stock.length ? (
          <StockLookupForm />
        ) : (
          <div>
            <h4>Symbol: {stock[0].symbol}</h4>
            <h4>Last Price: {stock[0].price}</h4>
            <h4>
              Buy Shares:
              <input
                type="number"
                name="shares"
                min="0"
                value={shares}
                onChange={this.handleChange}
              />
              ARE WE ERRORING?{' '}
              {this.state.error && <div>Sorry, you can't afford this many</div>}
            </h4>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  stock: state.stock || [],
  balance: state.user.balance
})

const mapDispatch = dispatch => ({
  handleAdd() {}
})

export default connect(mapState, mapDispatch)(StockAdder)
