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
      <div className="stock-quote">
        Buy Shares:
        <input
          required={true}
          type="number"
          name="shares"
          min="1"
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
