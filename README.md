# City Pulse

A mobile-first app that empowers citizens to share location-based, real-time Quality of Life (QoL) data with their city. The app uses gamification, conversational interfaces, and passive data capture to maximize user engagement while providing high-quality insights to city planners.

## Features

- **Real-time Data Collection**: Gather citizen feedback on various quality of life indicators
- **Gamified Experience**: Engage users with evolving characters and RPG mechanics
- **Offline Capability**: Work seamlessly even with intermittent connectivity
- **Privacy-Focused**: Secure, anonymized data collection with user control
- **Cross-Platform**: Works on iOS, Android, and web through Expo

## Development Setup

This project is built with Expo (React Native).

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/city-pulse.git
cd city-pulse
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

4. Open the app on your device using Expo Go app or in a simulator

### Project Structure

```
/
├── assets/                  # Static assets (images, fonts, etc.)
├── src/
│   ├── api/                 # API client and endpoints
│   ├── components/          # Reusable UI components
│   ├── constants/           # App constants and configuration
│   ├── context/             # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── navigation/          # Navigation configuration
│   ├── screens/             # App screens
│   ├── services/            # Core services
│   ├── store/               # State management
│   ├── theme/               # UI theming
│   ├── types/               # TypeScript types and interfaces
│   └── utils/               # Utility functions
├── App.tsx                  # Main App component
└── ...
```

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **State Management**: Zustand, React Context
- **Storage**: SQLite, Expo SecureStore
- **UI Components**: Custom components with Expo libraries
- **Animations**: React Native Reanimated, Gesture Handler

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. 