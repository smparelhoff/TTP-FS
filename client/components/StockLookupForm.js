import React from 'react'
import {connect} from 'react-redux'
import {checkStock} from '../store/stock'

const StockLookupForm = ({handleSubmit, stock, clearStock}) => {
  return (
    <form className="flex-grid" onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="Ticker Symbol">Ticker Symbol Lookup</label>
        <input required={true} name="symbol" type="text" />
        <input type="submit" value="Check Price" />
        {stock.error && (
          <div className="error" onClick={clearStock}>
            {stock.error.message}
          </div>
        )}
      </div>
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
