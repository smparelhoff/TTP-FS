import React from 'react'
import {connect} from 'react-redux'
import {fetchTransactions} from '../store/trades'

class Transactions extends React.Component {
  async componentDidMount() {
    await this.props.loadTransactions()
  }

  //transactions = {id, symbol, price, shares}

  // {this.props.transactions.length &&
  //   this.props.transactions.map(stock => {
  //     return (
  //       <div key={stock.id}>
  //         Symbol {stock.symbol} - Price at purchase:{' '}
  //         {(stock.price / 1000).toFixed(3)} - # of Shares:{' '}
  //         {stock.shares}
  //       </div>
  //     )
  //   })}

  render() {
    const {transactions} = this.props
    return (
      this.props.transactions.length && (
        <div className="flex-container">
          <div className="container">
            <h3>Transactions</h3>
            <div className="flex-grid">
              <div className="col">
                <ul>
                  <li>SYMBOL</li>
                  <hr />
                  {transactions.map(elem => (
                    <li key={elem.id + elem.symbol}>{elem.symbol}</li>
                  ))}
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>PRICE</li>
                  <hr />
                  {transactions.map(elem => (
                    <li key={elem.id + elem.price}>
                      {(elem.price / 1000).toFixed(3)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>SHARES</li>
                  <hr />
                  {transactions.map(elem => (
                    <li key={elem.id + elem.shares}>{elem.shares}</li>
                  ))}
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>DATE</li>
                  <hr />
                  {transactions.map(elem => (
                    <li key={elem.createdAt}>{elem.createdAt.slice(0, 10)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
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
