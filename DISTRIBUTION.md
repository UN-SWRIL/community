# City Pulse App Distribution Guide

This guide provides detailed instructions for building and distributing the City Pulse app to testers via TestFlight.

## Prerequisites

Before you begin, make sure you have:

1. An **Apple Developer Program** account ($99/year)
2. **Xcode** installed on your Mac
3. **Expo account** - register at https://expo.dev/signup
4. All project code committed to your repository

## Step 1: Prepare Your App

1. **Register Bundle ID** in Apple Developer Portal
   - Log in to [Apple Developer](https://developer.apple.com)
   - Navigate to Certificates, IDs & Profiles > Identifiers
   - Register a new App ID with the bundle ID specified in app.json (`com.citypulse.app`)

2. **Create App in App Store Connect**
   - Go to [App Store Connect](https://appstoreconnect.apple.com)
   - Click the "+" button to create a new app
   - Enter app name, select primary language, bundle ID, and SKU
   - Complete other required fields (privacy policy URL, etc.)

## Step 2: Set Up EAS Build

1. **Install Dependencies**
   ```bash
   # Install eas-cli (if not already installed)
   npm install eas-cli --save-dev
   
   # Log in to your Expo account
   npm run eas-login
   ```

2. **Configure EAS**
   Make sure your app.json includes the correct bundle identifiers:
   ```json
   {
     "expo": {
       "ios": {
         "bundleIdentifier": "com.citypulse.app"
       },
       "android": {
         "package": "com.citypulse.app"
       }
     }
   }
   ```

3. **Create a development build**
   First, ensure all your changes are committed:
   ```bash
   git add .
   git commit -m "Prepare for EAS build"
   ```

   Then run the build command:
   ```bash
   npm run eas-build-ios
   ```

4. **Monitor Build Progress**
   - The build will run on Expo's servers
   - You can monitor progress in the terminal or on the Expo website
   - First-time builds may take 15-20 minutes

## Step 3: TestFlight Distribution

1. **Wait for Build Completion**
   - EAS Build will automatically upload your completed build to App Store Connect
   - You'll receive an email when the build is ready

2. **Configure TestFlight**
   - Go to App Store Connect > Your App > TestFlight
   - Set up test information (what to test, contact email, etc.)

3. **Add Internal Testers**
   - Internal testers must be members of your development team
   - Add them by email address

4. **Add External Testers**
   - Create a group for external testers
   - Add testers by email
   - Submit for Beta App Review (required for external testing)
   - When approved, testers will receive an email invitation

## Troubleshooting

### Common Issues

1. **"Invalid UUID appId" error**
   - Solution: Make sure your app is registered with Expo first:
     ```bash
     npx expo login
     npx expo project:create
     ```

2. **Build fails due to code signing**
   - Solution: Let EAS handle code signing by selecting "Let EAS handle this for me" during the build

3. **Testers can't install the app**
   - Solution: Make sure testers have accepted the TestFlight invitation and installed the TestFlight app

### Important Notes

- **Builds expire after 90 days** in TestFlight
- You must provide a **privacy policy URL** for TestFlight distribution
- TestFlight supports **up to 10,000 external testers**
- Beta App Review is usually quicker than App Store Review (24-48 hours)

## Additional Resources

- [Expo EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [TestFlight Documentation](https://developer.apple.com/testflight/)
- [Apple App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/) 