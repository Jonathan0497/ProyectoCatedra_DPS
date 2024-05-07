import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './screens/HomeScreen';
import CategoriaScreen from './screens/CategoriaScreen';
import CuentaScreen from './screens/CuentaScreen';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  nav: {
    flex: 1,
    style: { backgroundColor: '#3B3486' }, 
  },
});

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
        <Tab.Screen name="Categorias" component={CategoriaScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-bag" size={size} color={color} />
            ),
            tabBarLabel: () => <Text>Categorias</Text>, 
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

export default App;
