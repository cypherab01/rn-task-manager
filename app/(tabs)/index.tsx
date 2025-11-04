import { Button } from '@/components';
import { removeTokenAndLogout } from '@/utils/token';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InProgressScreen = () => {
  return (
    <SafeAreaView>
      <Text>InProgressScreen</Text>
      <Button title="Logout" onPress={() => removeTokenAndLogout({ name: 'accessToken' })} />
    </SafeAreaView>
  );
};

export default InProgressScreen;
