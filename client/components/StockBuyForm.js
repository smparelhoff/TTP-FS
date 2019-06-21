import React from 'react'

const StockBuyForm = ({stock, shares, error, handleBuy, handleChange}) => {
  return (
    <h4>
      Symbol: {stock.symbol} - Last Price: {stock.price.toFixed(3)} - Buy
      Shares:
      <input
        type="number"
        name="shares"
        min="0"
        value={shares}
        onChange={handleChange}
      />{' '}
      - ARE WE ERRORING? {error && <div>Sorry, you can't afford any more!</div>}
      <input type="button" value="Buy" onClick={handleBuy} />
    </h4>
  )
}

export default StockBuyForm
