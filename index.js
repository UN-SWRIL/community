// MUST be first — before react, react-native, etc.
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { registerRootComponent } from 'expo';
import App from './App';

// Register the main component
registerRootComponent(App); 