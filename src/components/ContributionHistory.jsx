import { useState } from 'react';
import { getContributions } from '../utils/localStorage';

function ContributionHistory({ goalId, goalCurrency, exchangeRate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contributions = getContributions(goalId);

  const formatCurrency = (amount, currency) => {
    const symbol = currency === 'USD' ? '$' : '₹';
    const formatted = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${symbol}${formatted}`;
  };

  const convertAmount = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency || !exchangeRate) return amount;
    if (fromCurrency === 'USD' && toCurrency === 'INR') {
      return amount * exchangeRate;
    }
    if (fromCurrency === 'INR' && toCurrency === 'USD') {
      return amount / exchangeRate;
    }
    return amount;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (contributions.length === 0) {
    return null;
  }

  return (
    <div className="contribution-history">
      <button 
        className="history-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '▼' : '▶'} Contribution History ({contributions.length})
      </button>
      
      {isExpanded && (
        <div className="history-list">
          {contributions.map((contribution) => {
            const contributionCurrency = contribution.currency || 'USD';
            const displayAmount = contributionCurrency === goalCurrency 
              ? contribution.amount 
              : convertAmount(contribution.amount, contributionCurrency, goalCurrency);
            
            return (
              <div key={contribution.id} className="history-item">
                <span className="history-date">{formatDate(contribution.date)}</span>
                <div className="history-amounts">
                  <span className="history-amount">
                    {formatCurrency(displayAmount, goalCurrency)}
                  </span>
                  {contributionCurrency !== goalCurrency && exchangeRate && (
                    <span className="history-original">
                      ({formatCurrency(contribution.amount, contributionCurrency)})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ContributionHistory;