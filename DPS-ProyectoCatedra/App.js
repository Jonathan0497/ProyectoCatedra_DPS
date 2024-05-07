import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MarcaList from './screens/MarcaList'; 
import ProductScreen from './screens/ProductScreen';
import CategoriaList from './screens/CategoriaList';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Marca" component={MarcaList} /> 
        <Stack.Screen name="Product" component={ProductScreen} /> 
        <Stack.Screen name="Categoria" component={CategoriaList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
