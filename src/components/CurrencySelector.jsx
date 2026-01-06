function CurrencySelector({ 
  selectedCurrency, 
  onCurrencyChange, 
  exchangeRate, 
  loading, 
  error, 
  lastUpdated, 
  onRefresh 
}) {
  const formatLastUpdated = (date) => {
    if (!date) return '';
    return date.toLocaleString();
  };

  return (
    <div className="currency-selector">
      <div className="currency-controls">
        <label htmlFor="currency">Currency:</label>
        <select 
          id="currency"
          value={selectedCurrency} 
          onChange={(e) => onCurrencyChange(e.target.value)}
          disabled={loading}
        >
          <option value="USD">USD ($)</option>
          <option value="INR">INR (₹)</option>
        </select>
        
        <button 
          onClick={onRefresh} 
          disabled={loading}
          className="refresh-button"
          title="Refresh exchange rate"
        >
          {loading ? '⟳' : '↻'} Refresh Rate
        </button>
      </div>

      <div className="exchange-info">
        {loading && <span className="loading">Loading exchange rate...</span>}
        {error && <span className="error">Error: {error}</span>}
        {exchangeRate && !loading && (
          <div className="rate-info">
            <span>1 USD = ₹{exchangeRate.toFixed(2)}</span>
            {lastUpdated && (
              <span className="last-updated">
                Last updated: {formatLastUpdated(lastUpdated)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrencySelector;