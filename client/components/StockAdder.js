import React from 'react'
import {connect} from 'react-redux'
import StockLookupForm from './StockLookupForm'
import {postStock} from '../store/portfolio'
import {postBalance} from '../store/user'

class StockAdder extends React.Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      shares: 0,
      error: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBuy = this.handleBuy.bind(this)
  }

  componentDidMount() {
    this.setState({balance: parseFloat((this.props.balance / 100).toFixed(2))})
  }

  handleBuy() {
    const {stock} = this.props
    const postData = {
      symbol: stock.symbol,
      price: stock.price,
      shares: this.state.shares
    }

    this.props
      .addStock(postData)
      .then(tradeID => {
        console.log({tradeID})
        return this.props.updateBalance(tradeID)
      })
      .then(promise => {
        console.log('ABOUT TO RESET BALANCE:', this.props.balance)
        this.setState({
          balance: this.props.balance / 100,
          shares: 0,
          error: false
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleChange(evt) {
    let {balance} = this.props
    const price = this.props.stock.price * evt.target.value
    const newBalance = balance / 100 - price

    console.log({balance: balance / 100, price, newBalance})

    if (newBalance < 0) {
      this.setState({error: true})
    } else {
      this.setState({
        balance: newBalance,
        shares: evt.target.value,
        error: false
      })
    }
  }

  render() {
    console.log({balance: this.state.balance, type: typeof this.state.balance})
    const {stock} = this.props
    let {balance, shares} = this.state
    return (
      <div>
        <h4>Current balance: ${balance.toFixed(2)}</h4>
        {!stock.symbol ? (
          <StockLookupForm />
        ) : (
          <div>
            <h4>Symbol: {stock.symbol}</h4>
            <h4>Last Price: {stock.price.toFixed(3)}</h4>
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
              {this.state.error && <div>Sorry, you can't afford any more!</div>}
              <input type="button" value="Buy" onClick={this.handleBuy} />
            </h4>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  stock: state.stock || {},
  balance: state.user.balance
})

const mapDispatch = dispatch => ({
  addStock(postData) {
    const id = dispatch(postStock(postData))
    return id
  },
  updateBalance(tradeID) {
    const balance = dispatch(postBalance(tradeID))
    return balance
  }
})

export default connect(mapState, mapDispatch)(StockAdder)
