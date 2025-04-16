# City Quality of Life Data Collection App

## Implementation Plan

1. **Project Setup**
   - Initialize Expo React Native project with TypeScript
   - Configure essential dependencies
   - Setup directory structure
   - Configure environment files

2. **Authentication System**
   - Implement UUID-based device identification (privacy-focused alternative to IMEI)
   - Develop OTP authentication flow with SMS/email fallbacks
   - Create secure token management and session handling

3. **Core App Structure**
   - Build navigation system (tabs, stacks)
   - Create main screens (Home, Data Collection, Profile, Reports)
   - Implement theming and responsive design system

4. **Offline Functionality**
   - Set up local data storage with SQLite/AsyncStorage
   - Implement sync logic with conflict resolution
   - Build queue system for pending uploads

5. **Data Collection System**
   - Create question & survey component system
   - Implement location tracking and geo-tagging
   - Build media upload capabilities (photos, audio)

6. **Gamification System**
   - Design character evolution system
   - Implement XP and leveling mechanics
   - Create achievements and badges system
   - Build leaderboards and community challenges

7. **Results & Visualization**
   - Develop personal insights dashboard
   - Create Spotify Wrapped-style reports
   - Implement shareable content generation

8. **Privacy & Security Layer**
   - Build data anonymization pipeline
   - Implement encryption for sensitive information
   - Create granular permission controls

9. **Performance Optimization**
   - Optimize assets and bundle size
   - Implement lazy loading and code splitting
   - Tune animations and transitions

10. **Testing & Deployment**
    - Write unit and integration tests
    - Perform cross-platform testing
    - Configure CI/CD pipeline
    - Prepare app store submissions

## Directory Structure

```
/
├── assets/                  # Static assets (images, fonts, etc.)
├── src/
│   ├── api/                 # API client and endpoints
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Basic UI elements
│   │   ├── forms/           # Form-related components
│   │   ├── game/            # Gamification components
│   │   └── survey/          # Survey and data collection components
│   ├── constants/           # App constants and configuration
│   ├── context/             # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── navigation/          # Navigation configuration
│   ├── screens/             # App screens
│   │   ├── auth/            # Authentication screens
│   │   ├── home/            # Home and dashboard screens
│   │   ├── profile/         # User profile screens
│   │   ├── survey/          # Data collection screens
│   │   └── reports/         # Results and visualization screens
│   ├── services/            # Core services
│   │   ├── analytics/       # Analytics and tracking
│   │   ├── storage/         # Local storage handling
│   │   ├── sync/            # Data synchronization
│   │   └── gameEngine/      # Game mechanics engine
│   ├── store/               # State management
│   ├── theme/               # UI theming
│   ├── types/               # TypeScript types and interfaces
│   └── utils/               # Utility functions
├── App.tsx                  # Main App component
├── app.config.js            # Expo configuration
├── babel.config.js          # Babel configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── implementation_details.txt # Development tracking file
``` 

## App Distribution Guide

### Setting Up EAS Build for TestFlight Distribution

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo Account**
   ```bash
   eas login
   ```

3. **Configure EAS Build**
   ```bash
   eas build:configure
   ```
   This will create an `eas.json` file in your project root with build profiles.

4. **Create an Internal iOS Build**
   ```bash
   eas build --platform ios --profile preview
   ```
   
   The build process:
   - Creates your app in the Apple Developer Portal
   - Generates necessary certificates and provisioning profiles
   - Builds a binary file compatible with TestFlight
   - Uploads the build to App Store Connect

5. **TestFlight Distribution**
   - Sign in to App Store Connect (https://appstoreconnect.apple.com)
   - Navigate to your app > TestFlight
   - Add internal testers with their Apple IDs/email addresses
   - External testers can be added after passing Beta App Review
   - Testers will receive an email invitation to download the app

### Build Profiles in eas.json

Your `eas.json` should contain these profiles:

```json
{
  "cli": {
    "version": ">= 0.52.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### Requirements

- Apple Developer Program account ($99/year)
- App-specific Apple App Store Connect setup
- Valid app bundle identifier (e.g., com.yourcompany.citypulse)
- Basic app information in App Store Connect
- App icon and launch screen conforming to Apple's specifications 