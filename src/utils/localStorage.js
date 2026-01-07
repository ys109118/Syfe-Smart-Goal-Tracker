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

export const getTotalContributionsInUSD = (goalId, exchangeRate) => {
  const contributions = getContributions(goalId);
  return contributions.reduce((total, contrib) => {
    const amount = contrib.amount;
    const currency = contrib.currency || 'USD';
    
    if (currency === 'USD' || !exchangeRate) {
      return total + amount;
    } else {
      // Convert INR to USD
      return total + (amount / exchangeRate);
    }
  }, 0);
};

export const getTotalContributionsInGoalCurrency = (goalId, goalCurrency, exchangeRate) => {
  const contributions = getContributions(goalId);
  return contributions.reduce((total, contrib) => {
    const amount = contrib.amount;
    const contribCurrency = contrib.currency || 'USD';
    
    if (contribCurrency === goalCurrency || !exchangeRate) {
      return total + amount;
    } else if (contribCurrency === 'USD' && goalCurrency === 'INR') {
      return total + (amount * exchangeRate);
    } else if (contribCurrency === 'INR' && goalCurrency === 'USD') {
      return total + (amount / exchangeRate);
    }
    return total + amount;
  }, 0);
};