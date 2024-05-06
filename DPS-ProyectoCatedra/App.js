import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const MarcaForm = () => {
  const [marcas, setMarcas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    try {
      const response = await axios.get('http://localhost/ProyectoCatedra_DPS/api/dashboard/marca.php?action=readAll');
      setMarcas(response.data.dataset);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost/ProyectoCatedra_DPS/api/dashboard/marca.php?action=create', {
        nombre
      });
      setNombre('');
      fetchMarcas();
    } catch (error) {
      console.error('Error creating marca: ', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post('http://localhost/ProyectoCatedra_DPS/api/dashboard/marca.php?action=update', {
        id: selectedId,
        nombre
      });
      setNombre('');
      setSelectedId(null);
      fetchMarcas();
    } catch (error) {
      console.error('Error updating marca: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('http://localhost/ProyectoCatedra_DPS/api/dashboard/marca.php?action=delete', {
        id
      });
      fetchMarcas();
    } catch (error) {
      console.error('Error deleting marca: ', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre de la marca"
        value={nombre}
        onChangeText={setNombre}
      />
      <Button title="Crear Marca" onPress={handleCreate} />
      {selectedId && <Button title="Actualizar Marca" onPress={handleUpdate} />}
      <FlatList
        data={marcas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre}</Text>
            <Button title="Editar" onPress={() => {
              setSelectedId(item.id);
              setNombre(item.nombre);
            }} />
            <Button title="Eliminar" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default MarcaForm;
