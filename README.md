# Ecopulse - Carbon Footprint Tracker

## Table of Contents
1. [Introduction](#introduction)  
2. [Motivation](#motivation)  
3. [Problem Definition](#problem-definition)  
4. [Objectives](#objectives)  
5. [Proposed Methodology](#proposed-methodology)  
6. [Result and Discussions](#result-and-discussions)  
7. [Conclusion and Learning Outcome](#conclusion-and-learning-outcome)  
8. [Future Enhancements](#future-enhancements)  
9. [Contributors](#contributors)  
10. [References](#references)  
11. [Additional Sections](#additional-sections)
---

## Introduction

A comprehensive, responsive web application for tracking personal carbon emissions and promoting sustainable lifestyle choices through gamification, education, and data-driven insights.

### 🌟 Features

#### Core Functionality
- **Carbon Footprint Calculator**: Calculate daily emissions across transportation, energy, and diet categories  
- **Real-time Analytics**: Visual dashboards with emission trends and category breakdowns  
- **Goal Setting & Tracking**: Set personal sustainability targets with progress monitoring  
- **Achievement System**: Earn badges and level up through eco-friendly actions  
- **Educational Content**: Interactive learning modules and sustainability tips  
- **Personalized Recommendations**: AI-powered suggestions based on user patterns  

#### User Experience
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices  
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS  
- **Gamification**: Streaks, levels, badges, and community leaderboards  
- **Progress Visualization**: Charts, graphs, and progress bars for clear insights  
- **Auth0 Integration**: Secure authentication with demo mode fallback  

---

## Motivation

With increasing awareness about climate change, individuals need accessible tools to understand and reduce their carbon footprints. Ecopulse empowers users to monitor emissions and adopt eco-friendly habits.

---

## Problem Definition

Many existing carbon tracking apps are either too complex or lack engagement features. Ecopulse addresses the need for a user-friendly, educational, and motivating platform.

---

## Objectives

- Provide accurate carbon footprint calculation across transportation, energy, and diet  
- Visualize emission trends and progress  
- Encourage sustainable behavior via gamification and personalized recommendations  
- Offer educational content to increase user awareness  

---

## Proposed Methodology

### 🛠️ Tech Stack

#### Frontend
- **React 18** - Modern React with hooks and functional components  
- **JavaScript (ES6+)** - Modern JavaScript without TypeScript  
- **Tailwind CSS** - Utility-first CSS framework for responsive design  
- **Shadcn/UI** - High-quality, accessible UI components  
- **Lucide React** - Beautiful, customizable icons  
- **Next.js 14** - Full-stack React framework with App Router  

#### Backend
- **API Routes** - Serverless API endpoints  
- **JavaScript (ES6+)** - Modern JavaScript backend development  
- **RESTful APIs** - Standard HTTP methods for data operations  

#### Authentication
- **Auth0** - Secure user authentication (optional)  
- **Demo Mode** - Fallback authentication for development  

#### Development Tools
- **ESLint** - Code linting and formatting  
- **Prettier** - Code formatting  
- **Git** - Version control  

#### Deployment
- **Vercel** - Optimized for Vercel deployment  
- **Vercel Analytics** - Performance monitoring  
- **Environment Variables** - Secure configuration management  

---

## Result and Discussions

### Key Components

#### Carbon Calculator
- Multi-step form with transportation, energy, and diet inputs  
- Real-time emission calculations using standardized factors  
- Personalized recommendations based on results  
- Data persistence and history tracking  

#### Dashboard
- Overview of daily/weekly emissions  
- Progress tracking with visual indicators  
- Quick action buttons for common activities  
- Achievement highlights and streak tracking  

#### Analytics
- Monthly emission trends and comparisons  
- Category-wise performance analysis  
- Global benchmarking (country/world averages)  
- AI-powered insights and pattern recognition  

#### Gamification
- Badge system with different rarity levels  
- User levels and experience points  
- Community leaderboards and rankings  
- Goal setting with progress tracking  

### Emission Calculation Methodology

The application uses scientifically-backed emission factors:

- **Transportation**: Based on fuel consumption and vehicle efficiency  
- **Energy**: Electricity and gas consumption with renewable energy adjustments  
- **Diet**: Food carbon footprint based on dietary patterns and local sourcing  

All calculations follow international standards and are regularly updated to reflect current emission factors.

---

## Conclusion and Learning Outcome

Ecopulse successfully combines data-driven tracking with engaging educational content, helping users better understand their impact and motivating positive change. Development deepened understanding of React, API design, and sustainable technology.

---

## Future Enhancements

- **Database Integration**: PostgreSQL/MongoDB for production data storage  
- **Real-time Charts**: Interactive data visualization with Chart.js/Recharts  
- **Mobile App**: React Native version for iOS and Android  
- **Social Features**: Share achievements and compete with friends  
- **AI Recommendations**: Machine learning for personalized suggestions  
- **Carbon Offsetting**: Integration with offset providers  
- **IoT Integration**: Connect with smart home devices for automatic tracking  

---

## Contributors

- [Sravya](https://github.com/flurry101)


---

## References

- Carbon emission factors from EPA and IPCC guidelines  
- UI components from Shadcn/UI  
- Icons from Lucide React  
- Inspiration from leading sustainability apps  

---

## Additional Sections

### 🚀 Getting Started

#### Prerequisites
- Node.js 18+  
- npm or yarn package manager  

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecopulse.git
   cd ecopulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup (Optional)**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Auth0 credentials (optional)
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ecopulse/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes (JavaScript)
│   │   ├── carbon/              # Carbon calculation endpoints
│   │   ├── users/               # User management
│   │   ├── goals/               # Goal tracking
│   │   └── achievements/        # Badge system
│   ├── components/              # React components (JSX)
│   │   ├── shared/              # Reusable components
│   │   ├── dashboard.jsx        # Main dashboard
│   │   ├── carbon-calculator.jsx # Emission calculator
│   │   ├── analytics.jsx        # Data visualization
│   │   ├── achievements.jsx     # Badge system
│   │   ├── goals.jsx           # Goal management
│   │   ├── education.jsx       # Learning content
│   │   └── auth-provider.jsx   # Authentication context
│   ├── hooks/                   # Custom React hooks (JavaScript)
│   ├── utils/                   # Utility functions (JavaScript)
│   ├── globals.css             # Global styles
│   ├── layout.jsx              # Root layout
│   └── page.jsx                # Main application
├── components/ui/               # Shadcn/UI components
├── lib/                        # Shared utilities
├── public/                     # Static assets
├── .env.local.example          # Environment variables template
├── vercel.json                 # Vercel deployment configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
└── README.md
```

## 🔧 API Endpoints

### Carbon Calculations
- `POST /api/carbon/calculations` - Save new calculation
- `GET /api/carbon/calculations?userId={id}` - Get user's calculation history

### User Management
- `GET /api/users/profile?userId={id}` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Goals
- `GET /api/goals?userId={id}` - Get user's goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals` - Update goal progress

### Achievements
- `GET /api/achievements?userId={id}` - Get user's badges
- `POST /api/achievements` - Award badge to user

## 🔐 Authentication

### Auth0 Integration
The application supports Auth0 authentication for production use:

1. **Setup Auth0 Account**
   - Create an Auth0 account at [auth0.com](https://auth0.com)
   - Create a new Single Page Application
   - Configure allowed callback URLs and logout URLs

2. **Environment Variables**
   ```bash
   NEXT_PUBLIC_AUTH0_DOMAIN=your-domain.auth0.com
   NEXT_PUBLIC_AUTH0_CLIENT_ID=your-client-id
   AUTH0_CLIENT_SECRET=your-client-secret
   ```

3. **Demo Mode Fallback**
   - App works without Auth0 configuration
   - Uses demo user for development and testing
   - Seamless transition to Auth0 when configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Carbon emission factors from EPA and IPCC guidelines
- UI components from Shadcn/UI
- Icons from Lucide React
- Inspiration from leading sustainability apps

---

**Built with 💚 for a sustainable future**