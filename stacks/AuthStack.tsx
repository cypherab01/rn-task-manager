import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

const AuthStack = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
      </Stack>
    </>
  );
};

export default AuthStack;
