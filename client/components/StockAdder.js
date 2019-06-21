import React from 'react'
import {connect} from 'react-redux'
import {StockLookupForm, StockBuyForm} from './index'
import {postStock} from '../store/portfolio'
import {postBalance} from '../store/user'
import {removeStock} from '../store/stock'

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
        return this.props.updateBalance(tradeID)
      })
      .then(() => {
        this.props.clearStock()
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
    const {stock} = this.props
    let {balance, shares} = this.state
    return (
      <div>
        <h4>Current balance: ${balance.toFixed(2)}</h4>
        {!stock.symbol ? (
          <StockLookupForm />
        ) : (
          <StockBuyForm
            stock={stock}
            shares={shares}
            handleChange={this.handleChange}
            error={this.state.error}
            handleBuy={this.handleBuy}
          />
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
  },
  clearStock() {
    dispatch(removeStock())
  }
})

export default connect(mapState, mapDispatch)(StockAdder)
