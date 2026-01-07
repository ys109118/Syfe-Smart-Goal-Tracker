function Overview({ goals, exchangeRate }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((acc, g) => acc + g.savedAmount, 0);
  const totalTarget = goals.reduce((acc, g) => acc + g.targetAmount, 0);
  const goalsCompleted = goals.filter(g => g.savedAmount >= g.targetAmount).length;
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const formatCurrency = (amount, currency) => {
    const symbol = currency === 'USD' ? '$' : '₹';
    return `${symbol}${amount.toFixed(2)}`;
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
            <p className="stat-value">{formatCurrency(totalSaved, 'USD')}</p>
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
              const overdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount;
              const warning = daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;
              const completed = goal.savedAmount >= goal.targetAmount;

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