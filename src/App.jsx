import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoalList from './components/GoalList';
import AddGoalForm from './components/AddGoalForm';
import EditGoalForm from './components/EditGoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';
import NavBar from './components/NavBar';
import SummaryBanner from './components/SummaryBanner';
import DarkModeToggle from './components/DarkModeToggle';
import { useExchangeRate } from './hooks/useExchangeRate';
import { getGoals } from './utils/goalsAPI';

function App() {
  const [goals, setGoals] = useState([]);
  const { exchangeRate, loading, error, lastUpdated, isUsingCache, refreshRate } = useExchangeRate();

  useEffect(() => {
    setGoals(getGoals());
  }, []);

  return (
    <Router>
      <DarkModeToggle />
      <NavBar />

      <div className='main-content'>
        <div className="title-card">
          <h1 className="page-title">Goal-Based Savings Planner</h1>
          
          <div className="exchange-rate-info">
            {loading && <span className="loading">Loading exchange rate...</span>}
            {error && !isUsingCache && <span className="error">Error: {error}</span>}
            {isUsingCache && (
              <div className="cache-warning">
                ⚠️ Using cached exchange rate - API unavailable
              </div>
            )}
            {exchangeRate && !loading && (
              <div className="rate-display">
                <span>1 USD = ₹{exchangeRate.toFixed(2)}</span>
                {lastUpdated && (
                  <span className="last-updated">
                    Last updated: {lastUpdated.toLocaleString()}
                  </span>
                )}
                <button 
                  onClick={refreshRate} 
                  disabled={loading}
                  className="refresh-button"
                >
                  {loading ? '⟳' : '↻'} Refresh Rate
                </button>
              </div>
            )}
          </div>
        </div>

        <SummaryBanner 
          goals={goals}
          exchangeRate={exchangeRate}
        />

        <Routes>
          <Route 
            path="/"
            element={
              <GoalList 
                goals={goals} 
                setGoals={setGoals}
                exchangeRate={exchangeRate}
              />
            }
          />
          <Route 
            path="/add"
            element={<AddGoalForm goals={goals} setGoals={setGoals} />}
          />
          <Route 
            path="/edit/:id"
            element={<EditGoalForm goals={goals} setGoals={setGoals} />}
          />
          <Route 
            path="/deposit/:id"
            element={<DepositForm goals={goals} setGoals={setGoals} />}
          />
          <Route 
            path="/overview"
            element={<Overview goals={goals} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
