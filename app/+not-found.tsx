import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router'; // Assuming 'expo-router' is correctly installed and used

const Stack = createStackNavigator();

export default function NotFoundScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotFound"
        component={NotFoundComponent}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}

function NotFoundComponent() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This screen doesn't exist.</ThemedText>
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Go to home screen!</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
