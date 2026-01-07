# Goal-Based Savings Planner

A lightweight, client-side savings planner that helps users create and track multiple financial goals with real-time currency conversion between USD and INR.

## 🚀 Live Demo

[View Live Demo](https://syfe-smart-goal-tracker.vercel.app/)

## 📋 Features

### Core Functionality
- **Goal Creation**: Add goals with name, target amount, currency (USD/INR), category, and deadline
- **Goal Tracking**: Visual progress bars and contribution tracking
- **Currency Conversion**: Real-time USD ↔ INR exchange rates with last updated timestamp
- **Contribution Management**: Add contributions with amount, currency, and date via modal
- **Dashboard Overview**: Total targets, savings, and average progress across all goals
- **Refresh Exchange Rate**: Manual button to fetch latest forex data

### Technical Features
- **Live Exchange Rates**: Fetches from exchangerate-api.com with caching fallback
- **Persistent Storage**: Goals and contributions stored in localStorage
- **Form Validation**: Prevents negative amounts, validates required fields
- **Loading States**: Visual feedback for async operations
- **Error Handling**: User-friendly error messages with cache fallback
- **Responsive Design**: Mobile-optimized layout
- **Currency-Aware Calculations**: Handles mixed USD/INR contributions correctly

## 🛠️ Tech Stack

- **Frontend**: React 18+ with Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS (no component libraries)
- **State Management**: React Hooks
- **Data Storage**: localStorage
- **API**: Exchange Rate API for currency conversion

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ys109118/Syfe-Smart-Goal-Tracker.git
   cd Syfe-Smart-Goal-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AddGoalForm.jsx           # Goal creation form
│   ├── ContributionModal.jsx     # Add contribution modal
│   ├── ContributionHistory.jsx   # Contribution list display
│   ├── GoalCard.jsx              # Individual goal display
│   ├── GoalList.jsx              # Goals container
│   ├── SummaryBanner.jsx         # Dashboard totals
│   ├── NavBar.jsx                # Navigation
│   ├── Overview.jsx              # Overview page
│   ├── EditGoalForm.jsx          # Edit goal form
│   ├── DepositForm.jsx           # Deposit form
│   └── DarkModeToggle.jsx        # Dark mode toggle
├── hooks/
│   └── useExchangeRate.js        # Exchange rate management
├── utils/
│   ├── localStorage.js           # Contribution persistence & currency calculations
│   └── goalsAPI.js               # Goals CRUD operations
├── App.jsx                       # Main app component
├── App.css                       # Styles
└── main.jsx                      # Entry point
```

## 💡 Key Design Decisions

### Architecture
- **Component-based**: Modular React components for maintainability
- **Custom Hooks**: Separated exchange rate logic for reusability
- **Local Storage**: Goals and contributions persist across sessions
- **Currency-Aware Calculations**: Separate functions for USD and goal-currency calculations

### UX/UI Choices
- **Per-goal Currency**: Each goal has its own currency (USD or INR)
- **Per-contribution Currency**: Each contribution can be in USD or INR
- **Dual Display**: Shows amounts in original + converted currency
- **Average Progress**: Dashboard shows average completion across all goals
- **Modal Interactions**: Non-intrusive contribution adding
- **Responsive Grid**: Adapts to different screen sizes
- **Dark Mode**: Toggle for better viewing experience

### API Integration
- **Fallback Strategy**: Graceful handling of API failures with cached rates
- **Rate Limiting**: Manual refresh to avoid hitting API limits
- **Error States**: Clear feedback when APIs are unavailable
- **Last Updated**: Displays timestamp of last successful rate fetch

### Currency Handling
- **Mixed Currency Support**: Contributions can be in different currencies than the goal
- **Automatic Conversion**: Displays converted amounts using live exchange rates
- **Goal-Currency Display**: Shows saved amount in the goal's currency
- **Dashboard Aggregation**: Converts all amounts to USD for totals

## 🎯 Usage

1. **Add a Goal**: Click "Add Goal" → Fill form with name, amount, currency, category, deadline
2. **Track Progress**: View goals on dashboard with progress bars
3. **Add Contributions**: Click "Add Contribution" on any goal card → Select currency and amount
4. **Monitor Totals**: Check dashboard banner for overall progress
5. **Refresh Rates**: Click "Refresh Rate" to update exchange rates
6. **View Overview**: Navigate to Overview page for detailed statistics

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Reference

### Exchange Rate API
- **Endpoint**: `https://api.exchangerate-api.com/v4/latest/USD`
- **Purpose**: Get live USD to INR conversion rates
- **Rate Limit**: Free tier (1500 requests/month)
- **Fallback**: Cached rate used when API unavailable

### Local Storage Schema
- **Goals**: `savings_goals` - Array of goal objects
- **Contributions**: `contributions_{goalId}` - Array of contribution objects per goal

## 🚀 Deployment

### Vercel (Current)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with default settings
4. Automatic deployments on push to main

### Netlify
1. Build the project: `npm run build`
2. Deploy `dist` folder to Netlify
3. Configure redirects for SPA routing

## ✨ Bonus Features Implemented

- **Dark Mode**: Toggle between light and dark themes
- **Contribution History**: Expandable list showing all contributions with dates
- **Currency Selection**: Choose currency per contribution (not just per goal)
- **Overview Page**: Detailed statistics and upcoming deadlines
- **Goal Categories**: Organize goals by category
- **Monthly Savings Calculator**: Shows required monthly savings to reach goal
- **Goal Completion Status**: Visual indicators for completed/overdue goals
- **Edit & Delete**: Full CRUD operations for goals
- **Responsive Design**: Works seamlessly on mobile and desktop

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨💻 Author

**Yash Sharma**
- GitHub: [@ys109118](https://github.com/ys109118)

---

*Built as a take-home assignment demonstrating React development skills, API integration, currency handling, and modern frontend practices.*
