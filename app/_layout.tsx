import { CText } from '@/components';
import { QueryProvider } from '@/providers/QueryProvider';
import AuthStack from '@/stacks/AuthStack';
import Dashboard from '@/stacks/Dashboard';
import { getToken } from '@/utils/token';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import '../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(auth)/login',
// };

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
      <RootLayoutNav />
    </QueryProvider>
  );
}

function RootLayoutNav() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken({ name: 'accessToken' });
      console.log('token', token);
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <CText variant="Regular" className="text-text-primary">
        Loading...
      </CText>
    );
  }

  return <QueryProvider>{isAuthenticated ? <Dashboard /> : <AuthStack />}</QueryProvider>;
}
