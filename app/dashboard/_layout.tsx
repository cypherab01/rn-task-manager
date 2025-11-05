import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';
import React from 'react';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof Entypo>['name'];
  color: string;
  size: number;
  focused: boolean;
}) {
  return <Entypo {...props} />;
}

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'In Progress',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon name="hour-glass" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="pending"
        options={{
          title: 'Pending',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon name="circle" color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="completed"
        options={{
          title: 'Completed',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon name="check" color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
