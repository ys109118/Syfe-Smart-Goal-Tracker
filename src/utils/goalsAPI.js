const GOALS_KEY = 'savings_goals';

export const getGoals = () => {
  const goals = localStorage.getItem(GOALS_KEY);
  return goals ? JSON.parse(goals) : [];
};

export const addGoal = (goal) => {
  const goals = getGoals();
  const newGoal = { ...goal, id: Date.now() };
  goals.push(newGoal);
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  return newGoal;
};

export const updateGoal = (id, updates) => {
  const goals = getGoals();
  const index = goals.findIndex(g => g.id === parseInt(id));
  if (index !== -1) {
    goals[index] = { ...goals[index], ...updates };
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
    return goals[index];
  }
  return null;
};

export const deleteGoal = (id) => {
  const goals = getGoals();
  const filtered = goals.filter(g => g.id !== parseInt(id));
  localStorage.setItem(GOALS_KEY, JSON.stringify(filtered));
  return true;
};