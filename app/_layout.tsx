import { QueryProvider } from '@/providers/QueryProvider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import '../global.css';
import { StatusBar } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Lato-Thin': require('../assets/fonts/Lato-Thin.ttf'),
    'Lato-ThinItalic': require('../assets/fonts/Lato-ThinItalic.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-LightItalic': require('../assets/fonts/Lato-LightItalic.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-BoldItalic': require('../assets/fonts/Lato-BoldItalic.ttf'),
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-BlackItalic': require('../assets/fonts/Lato-BlackItalic.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <StatusBar barStyle={'dark-content'} />
      <Slot />
    </QueryProvider>
  );
}
