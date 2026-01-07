<img width="2524" height="1170" alt="image" src="https://github.com/user-attachments/assets/596769e0-0566-48ae-9f63-1c5dc2cbf146" /># Goal-Based Savings Planner

A lightweight, client-side savings planner that helps users create and track multiple financial goals with real-time currency conversion between USD and INR.

## 🚀 Live Demo

[View Live Demo](https://syfe-smart-goal-tracker.vercel.app/)<img width="2524" height="1170" alt="image" src="https://github.com/user-attachments/assets/652189e7-6e8f-44c4-a7c0-5bd3f6b76e24" />
<img width="2524" height="1170" alt="image" src="https://github.com/user-attachments/assets/77846d1c-8d0f-4c4b-9527-0bacf101e3c4" />

## 📋 Features

### Core Functionality
- **Goal Creation**: Add goals with name, target amount, currency (USD/INR), category, and deadline
- **Goal Tracking**: Visual progress bars and contribution tracking
- **Currency Conversion**: Real-time USD ↔ INR exchange rates
- **Contribution Management**: Add contributions with amount and date via modal
- **Dashboard Overview**: Total targets, savings, and average progress across all goals

### Technical Features
- **Live Exchange Rates**: Fetches from exchangerate-api.com
- **Persistent Storage**: Contributions stored in localStorage
- **Form Validation**: Prevents negative amounts, validates required fields
- **Loading States**: Visual feedback for async operations
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Mobile-optimized layout

## 🛠️ Tech Stack

- **Frontend**: React 18+ with Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS (no component libraries)
- **State Management**: React Hooks
- **Data Storage**: JSON Server + localStorage
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

3. **Start the JSON server** (in one terminal)
   ```bash
   npx json-server --watch db.json --port 3000
   ```

4. **Start the development server** (in another terminal)
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AddGoalForm.jsx      # Goal creation form
│   ├── ContributionModal.jsx # Add contribution modal
│   ├── GoalCard.jsx         # Individual goal display
│   ├── GoalList.jsx         # Goals container
│   ├── SummaryBanner.jsx    # Dashboard totals
│   ├── NavBar.jsx           # Navigation
│   └── Overview.jsx         # Overview page
├── hooks/
│   └── useExchangeRate.js   # Exchange rate management
├── utils/
│   └── localStorage.js      # Contribution persistence
├── App.jsx                  # Main app component
├── App.css                  # Styles
└── main.jsx                 # Entry point
```

## 💡 Key Design Decisions

### Architecture
- **Component-based**: Modular React components for maintainability
- **Custom Hooks**: Separated exchange rate logic for reusability
- **Local Storage**: Contributions persist across sessions
- **JSON Server**: Simple backend simulation for development

### UX/UI Choices
- **Per-goal Currency**: Each goal has its own currency (USD or INR)
- **Dual Display**: Shows amounts in original + converted currency
- **Average Progress**: Dashboard shows average completion across all goals
- **Modal Interactions**: Non-intrusive contribution adding
- **Responsive Grid**: Adapts to different screen sizes

### API Integration
- **Fallback Strategy**: Graceful handling of API failures
- **Rate Limiting**: Manual refresh to avoid hitting API limits
- **Error States**: Clear feedback when APIs are unavailable

## 🎯 Usage

1. **Add a Goal**: Click "Add Goal" → Fill form with name, amount, currency, category, deadline
2. **Track Progress**: View goals on dashboard with progress bars
3. **Add Contributions**: Click "Add Contribution" on any goal card
4. **Monitor Totals**: Check dashboard banner for overall progress
5. **Refresh Rates**: Click "Refresh Rate" to update exchange rates

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Reference

### Exchange Rate API
- **Endpoint**: `https://api.exchangerate-api.com/v4/latest/USD`
- **Purpose**: Get live USD to INR conversion rates
- **Rate Limit**: Free tier, manual refresh to avoid limits

### Local JSON Server
- **Goals**: `GET/POST/PATCH/DELETE http://localhost:3000/goals`
- **Structure**: `{ id, name, targetAmount, currency, savedAmount, category, deadline, createdAt }`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with default settings
4. Update API endpoints for production

### Netlify
1. Build the project: `npm run build`
2. Deploy `dist` folder to Netlify
3. Configure redirects for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Yash Sharma**
- GitHub: [@ys109118](https://github.com/ys109118)

---

*Built as a take-home assignment demonstrating React development skills, API integration, and modern frontend practices.*
