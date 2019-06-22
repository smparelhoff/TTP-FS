import React from 'react'
import {connect} from 'react-redux'
import {fetchTransactions} from '../store/trades'

class Transactions extends React.Component {
  async componentDidMount() {
    await this.props.loadTransactions()
  }

  render() {
    return (
      this.props.transactions.length &&
      this.props.transactions.map(stock => {
        return (
          <div key={stock.id}>
            Symbol {stock.symbol} - Price at purchase:{' '}
            {(stock.price / 1000).toFixed(3)} - # of Shares: {stock.shares}
          </div>
        )
      })
    )
  }
}

//map state to props
const mapState = state => ({
  transactions: state.transactions
})

const mapDispatch = dispatch => {
  return {
    loadTransactions() {
      dispatch(fetchTransactions())
    }
  }
}

export default connect(mapState, mapDispatch)(Transactions)
