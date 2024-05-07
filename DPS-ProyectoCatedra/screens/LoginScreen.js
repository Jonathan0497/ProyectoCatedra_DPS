import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';

axios.defaults.withCredentials = true;

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigateToRegister = () => {
    navigation.navigate('Register');
  };
  const handleLogin = () => {
    const url = 'http://localhost:80/ProyectoCatedra_DPS/api/dashboard/usuarios.php?action=logIn';
    const data = {
      alias: email,
      clave: password
    };

    axios.post(url, data)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        if (response.data.status === 1) {
          navigation.navigate('Home');
        } else {
          alert(response.data.exception || 'Error en el inicio de sesión');
        }
      })
      .catch(error => {
        console.error('Error de conexión:', error);
        alert('Error de conexión con el servidor');
      });
  };

  const handleLogout = () => {
    const url = 'http://localhost:80/ProyectoCatedra_DPS/api/dashboard/usuarios.php?action=logOut';

    axios.get(url)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        if (response.data.status === 1) {
          navigation.navigate('Login');
        } else {
          alert(response.data.exception || 'Error al cerrar sesión');
        }
      })
      .catch(error => {
        console.error('Error de conexión:', error);
        alert('Error de conexión con el servidor');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="email" />}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="lock" />}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Iniciar Sesión
        </Button>
        <Button mode='contained' onPress={navigateToRegister} style={styles.button}>
            Registrarse
        </Button>
        <Button onPress={handleLogout} style={styles.button}>
          Cerrar Sesión
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  form: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
