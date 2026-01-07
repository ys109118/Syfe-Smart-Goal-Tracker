export const getContributions = (goalId) => {
  const contributions = localStorage.getItem(`contributions_${goalId}`);
  return contributions ? JSON.parse(contributions) : [];
};

export const addContribution = (goalId, contribution) => {
  const contributions = getContributions(goalId);
  const newContribution = {
    id: Date.now(),
    amount: parseFloat(contribution.amount),
    currency: contribution.currency || 'USD',
    date: contribution.date || new Date().toISOString().split('T')[0],
    timestamp: new Date().toISOString()
  };
  
  contributions.push(newContribution);
  localStorage.setItem(`contributions_${goalId}`, JSON.stringify(contributions));
  
  // Dispatch custom event to notify components
  window.dispatchEvent(new CustomEvent('contributionAdded', { detail: { goalId, contribution: newContribution } }));
  
  return newContribution;
};

export const getTotalContributions = (goalId) => {
  const contributions = getContributions(goalId);
  return contributions.reduce((total, contrib) => total + contrib.amount, 0);
};