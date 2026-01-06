import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function AddGoalForm({ goals, setGoals}) {
    const [name, setName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [category, setCategory] = useState("");
    const [deadline, setDeadline] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with:', { name, targetAmount, currency, category, deadline });

        if (!name || !targetAmount || !category || !deadline) {
            alert('Please fill in all fields');
            return;
        }

        if (parseFloat(targetAmount) <= 0) {
            alert('Target amount must be positive');
            return;
        }

        const newGoal = {
            name,
            targetAmount: parseFloat(targetAmount),
            currency,
            savedAmount: 0,
            category,
            deadline,
            createdAt: new Date().toISOString().split("T")[0],
        };

        console.log('Sending goal to server:', newGoal);

        fetch("http://localhost:3000/goals",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGoal),
        })
        .then((res) => {
            console.log('Server response status:', res.status);
            return res.json();
        })
        .then((data) => {
            console.log('Goal added successfully:', data);
            setGoals([...goals, data]);
            // Reset form fields
            setName("");
            setTargetAmount("");
            setCurrency("USD");
            setCategory("");
            setDeadline("");
            // Navigate back to home page
            navigate('/');
        })
        .catch((err) => {
            console.error("Error adding goal:", err);
            alert('Error adding goal. Please check if the server is running.');
        });
    };

    return (
        <form onSubmit={handleSubmit} className="add-goal-form">
            <h2>Add New Goal</h2>
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
                step="0.01"
                min="0.01"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
                />
            </label>
            <label>
                Currency:
                <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
                >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                </select>
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
            <button type="submit">Add Goal</button>
        </form>
    );
}

export default AddGoalForm;