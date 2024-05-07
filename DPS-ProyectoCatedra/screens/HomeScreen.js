import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

function HomeScreen({ navigation }) {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido a la Aplicación</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#5F9EA0' }]} onPress={() => navigation.navigate('Marca')}>
          <Text style={styles.buttonText}>Gestionar Marcas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#6A5ACD' }]} onPress={() => navigation.navigate('Product')}>
          <Text style={styles.buttonText}>Gestionar Productos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF8C00' }]} onPress={() => navigation.navigate('Categoria')}>
          <Text style={styles.buttonText}>Gestionar Categorías</Text>
        </TouchableOpacity> {/* Añade este botón para navegar a la lista de categorías */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#4682B4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 40, 
    width: '80%',
  },
  button: {
    backgroundColor: '#DDA0DD', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 10,
    marginBottom: 20, 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
