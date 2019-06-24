import React from 'react'
import {connect} from 'react-redux'
import {checkStock} from '../store/stock'

const StockLookupForm = ({handleSubmit, stock}) => {
  return (
    <form className="flex-grid" onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="Ticker Symbol">Ticker Symbol Lookup</label>
        <input required={true} name="symbol" type="text" />
        {!stock.symbol && <input type="submit" value="Check Price" />}
      </div>
      {/* {stock.symbol && (
          <div className="row">
          <label htmlFor="Shares">Shares</label>
          <input name="shares" type="number" />
          <input type="submit" value="Add To Portfolio" />
          </div>
      )} */}
    </form>
  )
}

const mapState = state => ({
  stock: state.stock || {}
})

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault()
    dispatch(checkStock(evt.target.symbol.value))
  }
})

export default connect(mapState, mapDispatch)(StockLookupForm)
