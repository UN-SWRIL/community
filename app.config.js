const { withPlugins } = require('@expo/config-plugins');

export default {
  name: 'City Pulse',
  slug: 'community',
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
    bundleIdentifier: 'com.citypulse.app',
    buildNumber: '1.0.0'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#377DFF'
    },
    package: 'com.citypulse.app',
    versionCode: 1
  },
  web: {
    bundler: 'webpack',
    output: 'static',
    favicon: './assets/favicon.png',
    build: {
      babel: {
        include: ['@expo/vector-icons'],
      },
    },
  },
  extra: {
    eas: {
      projectId: '7f536996-1d5c-4ee8-b1e2-baecb3189198'
    }
  },
  plugins: [
    // Only include SQLite plugin for native platforms
    (config) => {
      if (process.env.EXPO_PLATFORM === 'web') {
        // Remove SQLite from plugins for web
        config.plugins = config.plugins.filter(plugin => plugin !== 'expo-sqlite');
      }
      return config;
    },
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