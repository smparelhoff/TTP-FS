import React from 'react'
import {connect} from 'react-redux'
import {checkStock} from '../store/stock'
import {Loading} from './index'

const StockLookupForm = ({handleSubmit, stock}) => {
  return (
    <form className="flex-grid" onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="Ticker Symbol">Ticker Symbol Lookup</label>
        <input required={true} name="symbol" type="text" />
        {!stock.symbol && <input type="submit" value="Check Price" />}
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
