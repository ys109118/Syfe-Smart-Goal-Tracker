import GoalCard from './GoalCard';

function GoalList({ goals, setGoals, exchangeRate }) {
    return (
        <div className="goal-list">
            {goals.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🎯</div>
                    <h3>No goals yet</h3>
                    <p>Create your first savings goal to get started!</p>
                </div>
            ) : (
                goals.map((goal) => (
                    <GoalCard 
                        key={goal.id}
                        goal={goal}
                        setGoals={setGoals}
                        exchangeRate={exchangeRate}
                    />
                ))
            )}
        </div>
    );
}

export default GoalList;