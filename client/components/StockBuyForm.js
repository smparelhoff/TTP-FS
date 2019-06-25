import React from 'react'

const StockBuyForm = ({
  stock,
  shares,
  error,
  errorMessage,
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
          min="0"
          value={shares}
          onChange={handleChange}
        />
        {error && <div className="error">{errorMessage}</div>}
        <input type="submit" value="Buy" onClick={handleBuy} />
      </div>
    </div>
  )
}

export default StockBuyForm
