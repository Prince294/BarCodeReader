
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import Router from './routes';




function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>

        <StatusBar style="dark" />
        <Router />

      </NavigationContainer>
    </Provider>

  );
}

export default App;