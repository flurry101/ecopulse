# EcoPulse 

<img width="120" alt="Icon" src="app/favicon.ico" align="right" />

**EcoPulse** is a responsive web application that helps individuals understand and reduce their carbon footprint. By combining a personal carbon calculator with educational content, quizzes, and gamified progress tracking, the app empowers users to make informed lifestyle changes. With personlized insights, sustainability tips, and education-driven features, EcoPulse turns awareness into action— reducing one carbon footprint at a time.

---

<!-- ## Table of Contents
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

### 🌟 Features

#### Core Functionality
- **Carbon Footprint Calculator**: Calculate daily emissions across transportation, energy, and diet categories  
- **Goal Setting & Tracking**: Set personal sustainability targets with progress monitoring  
- **Educational Content**: Interactive learning modules, quizzes, and sustainability tips  
- **Personalized Recommendations**: AI-powered suggestions based on user patterns  

#### User Experience
- **Responsive Design**: Fully responsive interface optimized for all devices (mobile, tablet, desktop)  
- **Modern UI**: Clean, intuitive interface built with React, Tailwind CSS and Shadcn/UI  
- **Interactive Learning**: Engaging environmental quiz with instant feedback  
- **Community Features**: Global community engagement and support system  

---

## Motivation

With increasing awareness about climate change, individuals need accessible tools to understand and reduce their carbon footprints. Ecopulse empowers users to monitor emissions and adopt eco-friendly habits through interactive learning and practical tools.

---

## Problem Definition

Many existing carbon tracking apps are either too complex or lack engagement features. Ecopulse addresses this by providing an intuitive, educational platform with interactive features and immediate feedback.

---

## Objectives

- Provide accurate carbon footprint calculation across transportation, energy, and diet  
- Visualize emission trends and progress  
- Encourage sustainable behavior via interactive learning and personalized recommendations  
- Offer educational content with immediate feedback through quizzes and tips  
- Create an engaging community-driven platform for sustainability  

---

## Proposed Methodology

### 🛠️ Tech Stack

#### Frontend
- **React 18** - Modern React with hooks and functional components  
- **Next.js 14** - Full-stack React framework with App Router  
- **JavaScript (ES6+)** - Modern JavaScript without TypeScript
- **TypeScript** - For enhanced type safety, configuration and developer experience  
- **Tailwind CSS** - Utility-first CSS framework for responsive design  
- **Shadcn/UI** - High-quality, accessible UI components  
- **Lucide React** - Beautiful, customizable icons  

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

#### Environmental Quiz
- Responsive design optimized for all screen sizes
- Interactive multiple-choice questions with immediate feedback
- Detailed explanations for each answer
- Progress tracking and score calculation
- Share functionality for quiz results

#### Carbon Calculator
- Multi-step form with transportation, energy, and diet inputs  
- Real-time emission calculations using standardized factors  
- Personalized recommendations based on results  
- Data persistence and history tracking  

#### Community Features
- Eco-movement engagement
- Social sharing capabilities

### Emission Calculation Methodology

The application uses scientifically-backed emission factors:

- **Transportation**: Based on fuel consumption and vehicle efficiency  
- **Energy**: Electricity and gas consumption with renewable energy adjustments  
- **Diet**: Food carbon footprint based on dietary patterns and local sourcing  

All calculations follow international standards and are regularly updated to reflect current emission factors.

---

## Conclusion and Learning Outcome

Ecopulse successfully combines data-driven emission calculations with engaging educational content, helping users better understand their impact and motivating positive change. Development deepened understanding of React, API design, and sustainable technology.

---

## Future Enhancements

- **Database Integration**: PostgreSQL/MongoDB for production data storage  
- **Dashboard**: Dashboard with emission overviews, progress visuals, quick actions, and achievement highlights
- **Real-time Analytics**: Visual dashboards with emission trends, global benchmarking, category breakdowns  
- **Achievement System**: Earn badges and level up through eco-friendly actions    
- **Mobile App**: React Native version for iOS and Android  
- **Social Features**: Enhanced community features and friend connections  
- **AI Recommendations**: Machine learning for personalized suggestions  
- **Carbon Offsetting**: Integration with offset providers  
- **IoT Integration**: Connect with smart home devices for automatic tracking 

---
-->

## 🚀 Getting Started 


### Prerequisites
- Node.js 18+  
- npm or pnpm package manager  

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
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
ecopulse/
├── app/                          # Next.js App Router
│   ├── components/              # React components (TSX/JSX)
│   │   ├── ui/                 # Reusable UI components
│   │   ├── education.tsx      # Learning content
│   │   ├── environmental-quiz.tsx # Interactive quiz
│   │   └── community-features.tsx # Community components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                    # Shared utilities
│   ├── types/                  # TypeScript type definitions
│   ├── globals.css             # Global styles
│   ├── layout.jsx             # Root layout
│   └── page.jsx               # Main application
├── components/                  # Shared components
├── public/                     # Static assets
├── styles/                     # Additional styles
├── vercel.json                 # Vercel deployment configuration
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```


<!--

## 📁 Project Structure

```
ecopulse/
├── app/                          # Next.js App Router
│   ├── components/              # React components (TSX/JSX)
│   │   ├── ui/                 # Reusable UI components
│   │   ├── dashboard.tsx       # Main dashboard
│   │   ├── carbon-calculator.jsx # Emission calculator
│   │   ├── analytics.tsx       # Data visualization
│   │   ├── achievements.tsx    # Badge system
│   │   ├── goals.tsx          # Goal management
│   │   ├── education.tsx      # Learning content
│   │   ├── environmental-quiz.tsx # Interactive quiz
│   │   ├── community-features.tsx # Community components
│   │   └── auth-provider.jsx   # Authentication context
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                    # Shared utilities
│   ├── types/                  # TypeScript type definitions
│   ├── globals.css             # Global styles
│   ├── layout.jsx             # Root layout
│   └── page.jsx               # Main application
├── components/                  # Shared components
├── public/                     # Static assets
├── styles/                     # Additional styles
├── vercel.json                 # Vercel deployment configuration
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
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

-->

---

<!--## 🔐 Authentication 

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
   - Seamless transition to Auth0 when configured -->

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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

**Built with 💚 for a sustainable future**
