import { CText } from '@/components';
import { getToken } from '@/utils/token';
import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const index = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkToken = async () => {
      const token = await getToken({ name: 'accessToken' });
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
      <View className="flex-1 items-center justify-center">
        <View className="flex flex-row items-center justify-center gap-2">
          <CText variant="Regular" className="text-xl text-text-primary">
            Hang tight, fetching your tasks...
          </CText>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/login" />;
};

export default index;
