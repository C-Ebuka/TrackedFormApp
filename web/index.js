import React from 'react';
import { AppRegistry } from 'react-native';
import App from '../app/App'; // Assuming your main React Native app component is located in src/App.tsx
import { name as appName } from '../app.json'; // Importing the app name

// Register the main component of your React Native app for the web
AppRegistry.registerComponent(appName, () => App);

// Start the app on the web
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
