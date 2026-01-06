import { useState } from 'react';
import { getContributions } from '../utils/localStorage';

function ContributionHistory({ goalId, goalCurrency }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contributions = getContributions(goalId);

  const formatCurrency = (amount, currency) => {
    const symbol = currency === 'USD' ? '$' : '₹';
    return `${symbol}${amount.toFixed(2)}`;
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
          {contributions.map((contribution) => (
            <div key={contribution.id} className="history-item">
              <span className="history-date">{formatDate(contribution.date)}</span>
              <span className="history-amount">
                {formatCurrency(contribution.amount, goalCurrency)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContributionHistory;