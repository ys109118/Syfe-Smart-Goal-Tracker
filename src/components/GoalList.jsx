import GoalCard from './GoalCard';

function GoalList({ goals, setGoals, exchangeRate }) {
    return (
        <div className="goal-list">
            {goals.length === 0 ? (
                <p>No goals yet. Start by adding one.</p>
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