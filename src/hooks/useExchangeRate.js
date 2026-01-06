import { useState, useEffect, useCallback } from 'react';

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
const CACHE_KEY = 'exchange_rate_cache';
const API_KEY = '9b980edfb0-c570485e93-t8g0hl';

export const useExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isUsingCache, setIsUsingCache] = useState(false);

  const getCachedRate = () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { rate, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return { rate, timestamp: new Date(timestamp) };
      }
    }
    return null;
  };

  const setCachedRate = (rate) => {
    const cacheData = {
      rate,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  };

  const fetchExchangeRate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsUsingCache(false);
    
    try {
      const response = await fetch(`https://api.fastforex.io/fetch-one?from=USD&to=INR&api_key=${API_KEY}`);
      if (!response.ok) throw new Error('Failed to fetch exchange rate');
      
      const data = await response.json();
      
      if (data.result && data.result.INR) {
        const rate = data.result.INR;
        setExchangeRate(rate);
        setLastUpdated(new Date());
        setCachedRate(rate);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (err) {
      const cached = getCachedRate();
      if (cached) {
        setExchangeRate(cached.rate);
        setLastUpdated(cached.timestamp);
        setIsUsingCache(true);
        setError('Using cached rate - API unavailable');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const cached = getCachedRate();
    if (cached) {
      setExchangeRate(cached.rate);
      setLastUpdated(cached.timestamp);
      setIsUsingCache(true);
    }
    fetchExchangeRate();
  }, [fetchExchangeRate]);

  return {
    exchangeRate,
    loading,
    error,
    lastUpdated,
    isUsingCache,
    refreshRate: fetchExchangeRate
  };
};