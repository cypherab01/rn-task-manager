import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

const Dashboard = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
};

export default Dashboard;
