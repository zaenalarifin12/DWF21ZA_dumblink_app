import 'react-native-gesture-handler';
import React from 'react';

import Router from './src/router';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

export default App;
