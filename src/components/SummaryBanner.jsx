import { useState, useEffect } from 'react';
import { getTotalContributions } from '../utils/localStorage';

function SummaryBanner({ goals, exchangeRate }) {
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Listen for contribution changes
  useEffect(() => {
    const handleContributionChange = () => {
      console.log('SummaryBanner: contribution changed, refreshing...');
      setRefreshKey(prev => prev + 1);
    };
    
    window.addEventListener('contributionAdded', handleContributionChange);
    window.addEventListener('storage', handleContributionChange);
    
    return () => {
      window.removeEventListener('contributionAdded', handleContributionChange);
      window.removeEventListener('storage', handleContributionChange);
    };
  }, []);
  
  const convertToCommonCurrency = (amount, fromCurrency) => {
    if (fromCurrency === 'USD' || !exchangeRate) return amount;
    return amount / exchangeRate; // Convert INR to USD for common calculation
  };

  const formatCurrency = (amount, currency) => {
    const symbol = currency === 'USD' ? '$' : '₹';
    return `${symbol}${amount.toFixed(2)}`;
  };

  // Calculate totals in USD as base currency
  const totalTargetUSD = goals.reduce((sum, goal) => {
    const goalCurrency = goal.currency || 'USD';
    const convertedAmount = convertToCommonCurrency(goal.targetAmount, goalCurrency);
    return sum + convertedAmount;
  }, 0);

  // Calculate total saved directly in render (like Overview)
  const totalSavedUSD = goals.reduce((sum, goal) => {
    const goalCurrency = goal.currency || 'USD';
    const actualSaved = getTotalContributions(goal.id);
    const convertedAmount = convertToCommonCurrency(actualSaved, goalCurrency);
    return sum + convertedAmount;
  }, 0);
  
  console.log('SummaryBanner render:', { refreshKey, totalSavedUSD, goalsCount: goals.length });

  // Calculate average progress across all goals using actual contributions
  const averageProgress = goals.length > 0 
    ? goals.reduce((sum, goal) => {
        const actualSaved = getTotalContributions(goal.id);
        const progress = goal.targetAmount > 0 ? (actualSaved / goal.targetAmount) * 100 : 0;
        return sum + progress;
      }, 0) / goals.length
    : 0;

  return (
    <div className="summary-banner">
      <div className="summary-item">
        <h3>Total Goals</h3>
        <p className="summary-value">{goals.length}</p>
      </div>
      
      <div className="summary-item">
        <h3>Total Target</h3>
        <p className="summary-value">{formatCurrency(totalTargetUSD, 'USD')}</p>
        {exchangeRate && (
          <p className="summary-secondary">{formatCurrency(totalTargetUSD * exchangeRate, 'INR')}</p>
        )}
      </div>
      
      <div className="summary-item">
        <h3>Total Saved</h3>
        <p className="summary-value" key={refreshKey}>{formatCurrency(totalSavedUSD, 'USD')}</p>
        {exchangeRate && (
          <p className="summary-secondary">{formatCurrency(totalSavedUSD * exchangeRate, 'INR')}</p>
        )}
      </div>
      
      <div className="summary-item">
        <h3>Overall Progress</h3>
        <p className="summary-value">{averageProgress.toFixed(1)}%</p>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${Math.min(averageProgress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default SummaryBanner;