import { useState, useEffect } from 'react';
import { getTotalContributions, getTotalContributionsInUSD } from '../utils/localStorage';

function Overview({ goals, exchangeRate }) {
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Force refresh when component mounts, goals change, or localStorage changes
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
    
    // Listen for storage changes
    const handleStorageChange = () => {
      setRefreshKey(prev => prev + 1);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when contributions are added
    const handleContributionChange = () => {
      setRefreshKey(prev => prev + 1);
    };
    
    window.addEventListener('contributionAdded', handleContributionChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('contributionAdded', handleContributionChange);
    };
  }, [goals]);
  
  const totalGoals = goals.length;
  
  // Calculate total saved from actual contributions in localStorage (currency-aware)
  const totalSaved = goals.reduce((acc, goal) => {
    return acc + getTotalContributionsInUSD(goal.id, exchangeRate);
  }, 0);
  
  // Force recalculation on refreshKey change
  useEffect(() => {
    // This effect ensures the component re-renders when refreshKey changes
  }, [refreshKey]);
  
  const totalTarget = goals.reduce((acc, g) => {
    const goalCurrency = g.currency || 'USD';
    if (goalCurrency === 'USD' || !exchangeRate) {
      return acc + g.targetAmount;
    } else {
      return acc + (g.targetAmount / exchangeRate);
    }
  }, 0);
  const goalsCompleted = goals.filter(g => {
    const actualSaved = getTotalContributionsInUSD(g.id, exchangeRate);
    const targetInUSD = g.currency === 'USD' || !exchangeRate ? g.targetAmount : g.targetAmount / exchangeRate;
    return actualSaved >= targetInUSD;
  }).length;
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const formatCurrency = (amount, currency) => {
    const symbol = currency === 'USD' ? '$' : '₹';
    const formatted = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${symbol}${formatted}`;
  };

  const today = new Date();

  return (
    <div className="overview">
      <div className="overview-stats">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>Total Goals</h3>
            <p className="stat-value">{totalGoals}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Saved</h3>
            <p className="stat-value" key={refreshKey}>{formatCurrency(totalSaved, 'USD')}</p>
            {exchangeRate && (
              <p className="stat-secondary">{formatCurrency(totalSaved * exchangeRate, 'INR')}</p>
            )}
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Completed</h3>
            <p className="stat-value">{goalsCompleted}/{totalGoals}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Progress</h3>
            <p className="stat-value">{overallProgress.toFixed(1)}%</p>
            <div className="mini-progress">
              <div className="mini-progress-bar" style={{ width: `${Math.min(overallProgress, 100)}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="deadlines-card">
        <h3>📅 Upcoming Deadlines</h3>
        {goals.length === 0 ? (
          <p className="no-goals">No goals created yet</p>
        ) : (
          goals
            .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
            .map(goal => {
              const deadline = new Date(goal.deadline);
              const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
              const actualSaved = getTotalContributionsInUSD(goal.id, exchangeRate);
              const targetInUSD = goal.currency === 'USD' || !exchangeRate ? goal.targetAmount : goal.targetAmount / exchangeRate;
              const overdue = daysLeft < 0 && actualSaved < targetInUSD;
              const warning = daysLeft <= 30 && daysLeft >= 0 && actualSaved < targetInUSD;
              const completed = actualSaved >= targetInUSD;

              return (
                <div key={goal.id} className={`deadline-item ${overdue ? 'overdue' : warning ? 'warning' : completed ? 'completed' : ''}`}>
                  <div className="deadline-header">
                    <h4>{goal.name}</h4>
                    <span className="deadline-date">{new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="deadline-status">
                    {completed ? (
                      <span className="status-completed">🎉 Completed!</span>
                    ) : overdue ? (
                      <span className="status-overdue">⚠️ Overdue by {Math.abs(daysLeft)} days</span>
                    ) : (
                      <span className="status-normal">{daysLeft} days remaining</span>
                    )}
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default Overview;