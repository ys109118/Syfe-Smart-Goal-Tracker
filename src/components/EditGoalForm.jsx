import { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { updateGoal } from '../utils/goalsAPI';

function EditGoalForm({ goals, setGoals }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const goalToEdit = goals.find((goal) => goal.id === parseInt(id));

  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (goalToEdit) {
      setName(goalToEdit.name);
      setTargetAmount(goalToEdit.targetAmount);
      setCategory(goalToEdit.category);
      setDeadline(goalToEdit.deadline);
    }
  }, [goalToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedGoal = {
      ...goalToEdit,
      name,
      targetAmount: parseFloat(targetAmount),
      category,
      deadline,
    };

    updateGoal(id, updatedGoal);
    const updatedGoals = goals.map((goal) =>
      goal.id === parseInt(id) ? updatedGoal : goal
    );
    setGoals(updatedGoals);
    navigate('/');
  };

  if (!goalToEdit) return <p>Loading goal data...</p>;

  return (
    <form onSubmit={handleSubmit} className="edit-goal-form">
      <h2>Edit Goal</h2>

      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Target Amount:
        <input
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />
      </label>

      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>

      <label>
        Deadline:
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </label>

      <button type="submit">Update Goal</button>
      <NavLink to="/" className="cancel-button">Cancel</NavLink>
    </form>
  );
}

export default EditGoalForm;