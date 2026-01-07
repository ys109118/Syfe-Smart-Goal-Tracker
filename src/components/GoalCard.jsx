import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import ContributionModal from './ContributionModal';
import ContributionHistory from './ContributionHistory';
import { getTotalContributions, addContribution } from '../utils/localStorage';
import { updateGoal, deleteGoal } from '../utils/goalsAPI';

function GoalCard({ goal, setGoals, exchangeRate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    setTotalContributions(getTotalContributions(goal.id));
  }, [goal.id]);

  const handleDelete = () => {
    deleteGoal(goal.id);
    setGoals((prevGoals) => prevGoals.filter((g) => g.id !== goal.id));
  };

  const handleContribute = async (contribution) => {
    addContribution(goal.id, contribution);
    const newTotal = getTotalContributions(goal.id);
    setTotalContributions(newTotal);
    
    // Update goal's saved amount
    const updatedSavedAmount = goal.savedAmount + contribution.amount;
    updateGoal(goal.id, { savedAmount: updatedSavedAmount });
    
    setGoals(prevGoals => 
      prevGoals.map(g => 
        g.id === goal.id ? { ...g, savedAmount: updatedSavedAmount } : g
      )
    );
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

  const formatCurrency = (amount, currency) => {
    const symbol = currency === 'USD' ? '$' : '₹';
    return `${symbol}${amount.toFixed(2)}`;
  };

  const calculateMonthlyRequired = () => {
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const monthsRemaining = Math.max(1, Math.ceil((deadline - today) / (1000 * 60 * 60 * 24 * 30)));
    const remaining = goal.targetAmount - goal.savedAmount;
    return remaining / monthsRemaining;
  };

  const goalCurrency = goal.currency || 'USD';
  const otherCurrency = goalCurrency === 'USD' ? 'INR' : 'USD';
  
  const targetInOtherCurrency = convertAmount(goal.targetAmount, goalCurrency, otherCurrency);
  const savedInOtherCurrency = convertAmount(goal.savedAmount, goalCurrency, otherCurrency);
  const monthlyRequired = calculateMonthlyRequired();
  
  const progressPercent = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);

  return (
    <>
      <div className="goal-card">
        <h3>{goal.name}</h3>
        <p>Category: {goal.category}</p>
        
        <div className="currency-display">
          <p>Target: {formatCurrency(goal.targetAmount, goalCurrency)}</p>
          {exchangeRate && (
            <p className="original-currency">
              Converted: {formatCurrency(targetInOtherCurrency, otherCurrency)}
            </p>
          )}
        </div>
        
        <div className="currency-display">
          <p>Saved: {formatCurrency(goal.savedAmount, goalCurrency)}</p>
          {exchangeRate && (
            <p className="original-currency">
              Converted: {formatCurrency(savedInOtherCurrency, otherCurrency)}
            </p>
          )}
        </div>
        
        <p>Remaining: {formatCurrency(goal.targetAmount - goal.savedAmount, goalCurrency)}</p>
        <p>Deadline: {goal.deadline}</p>
        {monthlyRequired > 0 && (
          <p className="monthly-required">
            💰 Save {formatCurrency(monthlyRequired, goalCurrency)}/month to reach goal
          </p>
        )}
        <p>Progress: {progressPercent.toFixed(1)}%</p>

        <div className="progress-bar-container">
          <div 
            className="progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <ContributionHistory goalId={goal.id} goalCurrency={goalCurrency} />

        <div className="goal-actions">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="contribute-button"
          >
            Add Contribution
          </button>
          
          <NavLink to={`/edit/${goal.id}`}>
            <button>Edit</button>
          </NavLink>

          <NavLink to={`/deposit/${goal.id}`}>
            <button>Deposit</button>
          </NavLink>

          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      
      <ContributionModal
        goal={goal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContribute={handleContribute}
      />
    </>
  );
}

export default GoalCard;