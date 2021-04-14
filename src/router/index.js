import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Template from '../pages/Template';
import AddTemplate from '../pages/AddTemplate';
import MyAccount from '../pages/MyAccount';
import MyLink from '../pages/MyLink';
import DetailLink from '../pages/DetailLink';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuthToken} from '../config/api';
import {ActivityIndicator, Text} from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainApp = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Template" component={Template} />
      <Drawer.Screen name="MyAccount" component={MyAccount} />
      <Drawer.Screen name="MyLink" component={MyLink} />
    </Drawer.Navigator>
  );
};

function Router() {
  const [checkToken, setCheckToken] = useState('');
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setAuthToken(token);
    setCheckToken(token);
    setLoading(false);
  };

  useEffect(() => {
    getToken();
  }, []);
  return loading ? (
    <ActivityIndicator />
  ) : (
    <Stack.Navigator initialRouteName={checkToken ? 'MainApp' : 'Home'}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AddTemplate"
        component={AddTemplate}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="DetailLink"
        component={DetailLink}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default Router;
