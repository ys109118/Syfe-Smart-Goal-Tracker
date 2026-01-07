import { useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { addContribution } from '../utils/localStorage';

function DepositForm({ goals, setGoals }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const goal = goals.find((g) => g.id === parseInt(id));
  const [deposit, setDeposit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add as contribution instead of updating savedAmount
    addContribution(parseInt(id), {
      amount: parseFloat(deposit),
      currency: goal.currency || 'USD',
      date: new Date().toISOString().split('T')[0]
    });
    
    setDeposit("");
    navigate('/');
  };

  if (!goal) return <p>Loading goal...</p>;

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h2>Deposit to {goal.name}</h2>

      <label>
        Amount:
        <input
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          required
        />
      </label>

      <button type="submit">Add Deposit</button>
      <NavLink to="/" className="cancel-button">Cancel</NavLink>
    </form>
  );
}

export default DepositForm;