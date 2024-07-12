import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

interface SupervisorAuthFormProps {
  onSubmit: (authenticated: boolean) => void;
}

export default function SupervisorAuthForm({ onSubmit }: SupervisorAuthFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform authentication logic here (e.g., validate username and password)
    // For simplicity, we'll use hardcoded values for demo purposes
    const validUsername = 'admin';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
      // Call onSubmit callback to notify parent component that authentication is successful
      onSubmit(true);
    } else {
      Alert.alert('Authentication Failed', 'Invalid username or password.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Facility Name"
        value={username}
        onChangeText={setUsername}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Facility Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Submit" onPress={handleLogin} />
    </View>
  );
}
