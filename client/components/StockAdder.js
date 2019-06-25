import React from 'react'
import {connect} from 'react-redux'
import {StockLookupForm, StockBuyForm} from './index'
import {postStock} from '../store/trades'
import {postBalance} from '../store/user'
import {removeStock} from '../store/stock'
import {getPortfolio} from '../store/portfolio'

class StockAdder extends React.Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      shares: 0,
      error: false,
      errorMessage: ''
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

    if (this.state.shares < 1) {
      this.setState({error: true, errorMessage: 'Must select at least 1 share'})
    } else {
      this.props
        .addStock(postData)
        .then(tradeID => {
          return this.props.updateBalance(tradeID)
        })
        .then(() => {
          this.props.loadPortfolio()
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
  }

  handleChange(evt) {
    let {balance} = this.props
    const price = this.props.stock.price * evt.target.value
    const newBalance = balance / 100 - price

    if (newBalance < 0) {
      this.setState({
        error: true,
        errorMessage: "Sorry, you can't afford any more!"
      })
    } else if (evt.target.value < 0) {
      this.setState({error: true, errorMessage: 'Invalid share entry'})
    } else {
      this.setState({
        balance: newBalance,
        shares: evt.target.value,
        error: false
      })
    }
  }

  render() {
    const {stock, clearStock} = this.props
    let {balance, shares} = this.state
    return (
      <div className="container">
        <h3>CASH: ${balance.toFixed(2)}</h3>
        {!stock.symbol ? (
          <StockLookupForm clearStock={clearStock} />
        ) : (
          <StockBuyForm
            stock={stock}
            shares={shares}
            handleChange={this.handleChange}
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            handleBuy={this.handleBuy}
            clearStock={clearStock}
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
  loadPortfolio() {
    dispatch(getPortfolio())
  },
  clearStock() {
    dispatch(removeStock())
  }
})

export default connect(mapState, mapDispatch)(StockAdder)
