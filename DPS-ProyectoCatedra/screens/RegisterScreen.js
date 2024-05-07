import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';

function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    dui: '',
    alias: '',
    clave: ''
  });

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    const url = 'http://localhost/ProyectoCatedra_DPS/api/dashboard/usuarios.php?action=register';
    const data = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      correo: formData.correo,
      telefono: formData.telefono,
      dui: formData.dui,
      alias: formData.alias,
      clave: formData.clave
    };
  
    console.log('Datos a enviar:', data);
    axios.post(url, data)
      .then(response => {
        if (response.data.status === 1) {
          alert('Usuario registrado correctamente');
          navigation.navigate('Login');  // Redirigir al login tras un registro exitoso
        } else {
            console.log('Respuesta del servidor:', response.data);
          alert(response.data.exception || 'Error al registrar usuario');
        }
      })
      .catch(error => {
        console.error('Error al registrar usuario:', error);
        alert('Error técnico al registrar usuario');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Registrarse</Text>
        <TextInput
          label="Nombre"
          value={formData.nombre}
          onChangeText={text => handleInputChange('nombre', text)}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="account-box" />}
        />
        <TextInput
          label="Apellido"
          value={formData.apellido}
          onChangeText={text => handleInputChange('apellido', text)}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="account-box-outline" />}
        />
        <TextInput
          label="Correo"
          value={formData.correo}
          onChangeText={text => handleInputChange('correo', text)}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="email" />}
        />
        <TextInput
          label="Teléfono"
          value={formData.telefono}
          onChangeText={text => handleInputChange('telefono', text)}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="phone" />}
        />
        <TextInput
          label="DUI"
          value={formData.dui}
          onChangeText={text => handleInputChange('dui', text)}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="card-account-details" />}
        />
        <TextInput
          label="Alias"
          value={formData.alias}
          onChangeText={text => handleInputChange('alias', text)}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="account" />}
        />
        <TextInput
          label="Clave"
          value={formData.clave}
          onChangeText={text => handleInputChange('clave', text)}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon name="lock" />}
        />
        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Registrarse
        </Button>
        <Button mode='contained' onPress={navigateToLogin} style={styles.button}>
            ¿Ya tienes una cuenta? Inicia Sesión
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  form: {
    margin: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  input: {
    marginBottom: 15
  },
  button: {
    marginTop: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  }
});

export default RegisterScreen;
