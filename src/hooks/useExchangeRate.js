import { useState, useEffect, useCallback } from 'react';

export const useExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchExchangeRate = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!response.ok) throw new Error('Failed to fetch exchange rate');
      
      const data = await response.json();
      
      if (data.rates && data.rates.INR) {
        const rate = data.rates.INR;
        setExchangeRate(rate);
        setLastUpdated(new Date());
      } else {
        throw new Error('Invalid API response');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExchangeRate();
  }, [fetchExchangeRate]);

  return {
    exchangeRate,
    loading,
    error,
    lastUpdated,
    refreshRate: fetchExchangeRate
  };
};