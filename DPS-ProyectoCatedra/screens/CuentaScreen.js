import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const CuentaScreen = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dui, setDUI] = useState('');
  const [aliasRegistro, setAliasRegistro] = useState('');
  const [contrasenaRegistro, setContrasenaRegistro] = useState('');
  const [aliasInicioSesion, setAliasInicioSesion] = useState('');
  const [contrasenaInicioSesion, setContrasenaInicioSesion] = useState('');
  const [modo, setModo] = useState('registro'); 

  const handleRegistro = async () => {
    // Validaciones
    if (!nombre || !apellido || !correo || !telefono || !dui || !aliasRegistro || !contrasenaRegistro) {
      console.error('Por favor, complete todos los campos.');
      return;
    }
    if (!/^[a-zA-Z]+$/.test(nombre)) {
      console.error('El nombre solo puede contener letras.');
      return;
    }
    if (!/^[a-zA-Z]+$/.test(apellido)) {
      console.error('El apellido solo puede contener letras.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(correo)) {
      console.error('El correo electrónico no tiene un formato válido.');
      return;
    }
    if (!/^\d{8}$/.test(telefono)) {
      console.error('El teléfono debe contener solo 8 dígitos.');
      return;
    }
    if (!/^\d{8}-\d{1}$/.test(dui)) {
      console.error('El DUI debe tener el formato 12345678-9.');
      return;
    }
    if (!/(?=.*\d)(?=.*[A-Z]).{6,}/.test(contrasenaRegistro)) {
      console.error('La contraseña debe contener al menos un número y una letra mayúscula, y tener una longitud mínima de 6 caracteres.');
      return;
    }

    try {
      const response = await fetch('ACA LA URL DE LA API?action=register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          correo,
          telefono,
          dui,
          alias: aliasRegistro,
          clave: contrasenaRegistro,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Usuario registrado correctamente');
      } else {
        console.error('Error al registrar usuario:', data.exception);
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  };

  const handleInicioSesion = async () => {
    // Validaciones
    if (!aliasInicioSesion || !contrasenaInicioSesion) {
      console.error('Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await fetch('ACA LA URL DE LA API?action=logIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alias: aliasInicioSesion,
          clave: contrasenaInicioSesion,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso');
      } else {
        console.error('Error al iniciar sesión:', data.exception);
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>{modo === 'registro' ? 'Registro de Usuario' : 'Inicio de Sesión'}</Text>
      {modo === 'registro' ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Documento Único de Identidad (DUI)"
            value={dui}
            onChangeText={setDUI}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Alias"
            value={aliasRegistro}
            onChangeText={setAliasRegistro}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={contrasenaRegistro}
            onChangeText={setContrasenaRegistro}
            secureTextEntry
          />
          <Button
            title="Registrarse"
            onPress={handleRegistro}
            color="#F8E559"
            accessibilityLabel="Botón para registrarse"
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="¿Ya tienes una cuenta? Inicia Sesión"
            onPress={() => setModo('inicioSesion')}
            color="#F8E559"
            accessibilityLabel="Botón para ir a la pantalla de inicio de sesión"
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Alias"
            value={aliasInicioSesion}
            onChangeText={setAliasInicioSesion}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={contrasenaInicioSesion}
            onChangeText={setContrasenaInicioSesion}
            secureTextEntry
          />
          <Button
            title="Iniciar Sesión"
            onPress={handleInicioSesion}
            color="#F8E559"
            accessibilityLabel="Botón para iniciar sesión"
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="¿No tienes una cuenta? Regístrate"
            onPress={() => setModo('registro')}
            color="#F8E559"
            accessibilityLabel="Botón para ir a la pantalla de registro"
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fFF',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonSpacer: {
    marginVertical: 10,
  },
});

export default CuentaScreen;

