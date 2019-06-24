import React from 'react'

const StockBuyForm = ({
  stock,
  shares,
  error,
  handleBuy,
  handleChange,
  clearStock
}) => {
  return (
    <div className="col">
      <div className="stock-quote">
        <div>SYMBOL: {stock.symbol}</div>
        <div>LAST PRICE: {stock.price.toFixed(3)}</div>
        <div>
          <input type="button" value="X" onClick={clearStock} />
        </div>
      </div>
      <div className="row">
        Buy Shares:
        <input
          type="number"
          name="shares"
          min="0"
          value={shares}
          onChange={handleChange}
        />
        {error && <div>Sorry, you can't afford any more!</div>}
        <input type="submit" value="Buy" onClick={handleBuy} />
      </div>
    </div>
  )
}

export default StockBuyForm
