import React from 'react'
import {connect} from 'react-redux'
import {checkStock} from '../store/stock'

const StockLookupForm = ({handleSubmit, handleAdd, stock}) => {
  return (
    <div>
      <form onSubmit={!stock.length ? handleSubmit : handleAdd}>
        <div>
          <label htmlFor="Ticker Symbol">Ticker Symbol</label>
          <input name="symbol" type="text" />
        </div>
        {!stock.length && <input type="submit" value="Check Price" />}
        {stock.length && (
          <div>
            <label htmlFor="Shares">Shares</label>
            <input name="shares" type="number" />
            <input type="submit" value="Add To Portfolio" />
          </div>
        )}
      </form>
    </div>
  )
}

const mapState = state => ({
  stock: state.stock || []
})

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault()
    console.log(evt.target.symbol.value)
    dispatch(checkStock(evt.target.symbol.value))
  },
  handleAdd(evt) {
    evt.preventDefault()
    console.log(evt.target.shares.value, evt.target.symbol.value)
  }
})

export default connect(mapState, mapDispatch)(StockLookupForm)
