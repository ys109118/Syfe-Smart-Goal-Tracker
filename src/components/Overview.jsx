function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((acc, g) => acc + g.savedAmount, 0);
  const goalsCompleted = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  const today = new Date();

  return (
    <div className="overview">
      <div className="overview-card">
        <h2>Overview</h2>
        <p>Total Goals: {totalGoals}</p>
        <p>Total Saved: ${totalSaved}</p>
        <p>Goals Completed: {goalsCompleted}</p>
      </div>

      <div className="deadlines-card">
        <h3>Deadlines</h3>
        {goals.map(goal => {
          const deadline = new Date(goal.deadline);
          const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
          const overdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount;
          const warning = daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;

          return (
            <div key={goal.id} className="deadline-item">
              <p>{goal.name} - Deadline: {goal.deadline}</p>
              <p>Time left: {daysLeft >= 0 ? `${daysLeft} day(s) left` : 'Deadline passed'}</p>
              {overdue && <p className="overdue-text">Overdue</p>}
              {warning && <p className="warning-text">Deadline within 30 days!</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Overview; 