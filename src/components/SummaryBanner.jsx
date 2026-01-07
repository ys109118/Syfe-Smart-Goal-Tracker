import { useState, useEffect } from 'react';
import { getTotalContributions, getTotalContributionsInUSD } from '../utils/localStorage';

function SummaryBanner({ goals, exchangeRate }) {
  const [, forceUpdate] = useState({});
  
  // Force re-render when contributions change
  useEffect(() => {
    const handleContributionChange = () => {
      forceUpdate({});
    };
    
    window.addEventListener('contributionAdded', handleContributionChange);
    
    return () => {
      window.removeEventListener('contributionAdded', handleContributionChange);
    };
  }, []);
  
  const convertToCommonCurrency = (amount, fromCurrency) => {
    if (fromCurrency === 'USD' || !exchangeRate) return amount;
    return amount / exchangeRate; // Convert INR to USD for common calculation
  };

  const formatCurrency = (amount, currency) => {
    const symbol = currency === 'USD' ? '$' : '₹';
    const formatted = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${symbol}${formatted}`;
  };

  // Calculate totals in USD as base currency
  const totalTargetUSD = goals.reduce((sum, goal) => {
    const goalCurrency = goal.currency || 'USD';
    const convertedAmount = convertToCommonCurrency(goal.targetAmount, goalCurrency);
    return sum + convertedAmount;
  }, 0);

  // Calculate total saved directly in render
  const totalSavedUSD = goals.reduce((sum, goal) => {
    const actualSaved = getTotalContributionsInUSD(goal.id, exchangeRate);
    return sum + actualSaved;
  }, 0);

  // Calculate average progress across all goals using actual contributions
  const averageProgress = goals.length > 0 
    ? goals.reduce((sum, goal) => {
        const actualSaved = getTotalContributionsInUSD(goal.id, exchangeRate);
        const targetInUSD = goal.currency === 'USD' || !exchangeRate ? goal.targetAmount : goal.targetAmount / exchangeRate;
        const progress = targetInUSD > 0 ? (actualSaved / targetInUSD) * 100 : 0;
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
        <p className="summary-value">{formatCurrency(totalSavedUSD, 'USD')}</p>
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