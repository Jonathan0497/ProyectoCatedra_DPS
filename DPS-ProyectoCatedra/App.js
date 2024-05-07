import React from 'react';
import { StyleSheet, Text } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';
import CuentaScreen from './screens/CuentaScreen';
import ProductFormScreen from './screens/ProductFormScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer style={styles.nav}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
            tabBarLabel: () => <Text>Home</Text>, 
          }}
        />
        <Tab.Screen name="Productos" component={ProductFormScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-bag" size={size} color={color} />
            ),
            tabBarLabel: () => <Text>Productos</Text>, 
          }}/>
        <Tab.Screen name="Cuenta" component={CuentaScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" size={size} color={color} />
            ),
            tabBarLabel: () => <Text>Cuenta</Text>, 
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};


const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  nav: {
    flex: 1,
    style: { backgroundColor: '#3B3486' }, 
  },
});

export default App;
