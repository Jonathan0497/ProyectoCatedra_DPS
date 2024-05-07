import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ProductFormScreen = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [marca, setMarca] = useState('');
  const [estado, setEstado] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('precio', precio);
      formData.append('cantidad', cantidad);
      formData.append('categoria', categoria);
      formData.append('marca', marca);
      formData.append('estado', estado);
      formData.append('imagen', imagen);

      const response = await axios.post('URL_API', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Descripción del producto"
        value={descripcion}
        onChangeText={setDescripcion}
      />
  
      <TextInput
        style={styles.input}
        placeholder="Precio del producto"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
     
      <TextInput
        style={styles.input}
        placeholder="Cantidad del producto"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />
   
      <TextInput
        style={styles.input}
        placeholder="Categoría del producto"
        value={categoria}
        onChangeText={setCategoria}
      />
   
      <TextInput
        style={styles.input}
        placeholder="Marca del producto"
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado del producto"
        value={estado}
        onChangeText={setEstado}
      />
      <TouchableOpacity style={styles.button} onPress={() => { /* Lógica para seleccionar una imagen */ }}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#f8E559',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#3B3486',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductFormScreen;