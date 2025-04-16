export default {
  name: 'City Pulse',
  slug: 'city-pulse',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#377DFF'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.yourcompany.citypulse',
    buildNumber: '1.0.0'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#377DFF'
    },
    package: 'com.yourcompany.citypulse',
    versionCode: 1
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    eas: {
      projectId: 'your-project-id-here'
    }
  },
  plugins: [
    'expo-sqlite',
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: 'Allow City Pulse to use your location to provide localized quality-of-life insights.',
        locationAlwaysPermission: 'Allow City Pulse to use your location in the background to provide localized insights.',
        locationWhenInUsePermission: 'Allow City Pulse to use your location to provide localized quality-of-life insights.',
      }
    ]
  ],
  newArchEnabled: true
}; 