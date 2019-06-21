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
    this.setState({balance: parseFloat(this.props.balance / 100).toFixed(2)})
  }

  async handleBuy() {
    const stock = this.props.stock[0]
    const postData = {
      symbol: stock.symbol,
      price: stock.price,
      shares: this.state.shares
    }
    const balance = {balance: parseInt(this.state.balance * 100, 10)}
    console.log('BALANCE IN STOCKADDER:', balance)

    await this.props.addStock(postData)
    await this.props.updateBalance(balance)

    this.setState({balance: this.props.balance, shares: 0, error: false})
  }

  handleChange(evt) {
    let {balance} = this.props
    const price = this.props.stock[0].price * evt.target.value

    balance = parseFloat(balance / 100).toFixed(2)

    if (balance - price < 0) {
      this.setState({error: true})
    } else {
      this.setState({
        balance: balance - price,
        shares: evt.target.value,
        error: false
      })
    }
  }

  render() {
    console.log(this.state.balance)
    const {stock} = this.props
    let {balance, shares} = this.state
    balance = parseFloat(balance).toFixed(2)
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
  stock: state.stock || [],
  balance: state.user.balance
})

const mapDispatch = dispatch => ({
  addStock(postData) {
    dispatch(postStock(postData))
  },
  updateBalance(balance) {
    dispatch(postBalance(balance))
  }
})

export default connect(mapState, mapDispatch)(StockAdder)
