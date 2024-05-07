import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const API_URL = 'http://localhost/ProyectoCatedra_DPS/api/dashboard/marca.php?action=';

const MarcaList = () => { 
  const [marcas, setMarcas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreMarca, setNombreMarca] = useState('');
  const [idMarca, setIdMarca] = useState('');

  useEffect(() => {
      fetchMarcas();
  }, []);

  const fetchMarcas = () => {
      axios.get(API_URL + 'readAll')
          .then(response => {
            console.log('Respuesta del servidor:', response.data);
              setMarcas(response.data.dataset);
          })
          .catch(error => {
              console.error('Error fetching marcas:', error);
          });
  };

  const handleCreateOrUpdateMarca = () => {
      const url = idMarca ? API_URL + 'update' : API_URL + 'create';
      axios.post(url, {
          id: idMarca,  
          nombre: nombreMarca
      })
      .then(response => {
          if (response.data.status === 1) {
              alert(idMarca ? 'Marca actualizada correctamente' : 'Marca creada correctamente');
              resetForm();
              fetchMarcas();  
          } else {
              alert(response.data.exception || 'Error al procesar la marca');
          }
      })
      .catch(error => {
          console.error('Error processing marca:', error);
          alert('Error técnico al procesar la marca');
      });
  };

  const resetForm = () => {
      setIdMarca('');
      setNombreMarca('');
      setModalVisible(false);
  };

  const handleEditPress = (marca) => {
      setIdMarca(marca.id_marca);
      setNombreMarca(marca.nombre_marca);
      setModalVisible(true);
  };

  const eliminarMarca = (id) => {
    axios.post(API_URL + 'delete', {
        id: id  
    })
    .then(response => {
        if (response.data.status === 1) {
            alert('Marca eliminada correctamente');
            fetchMarcas();  
        } else {
            alert(response.data.exception || 'Error al eliminar la marca');
        }
    })
    .catch(error => {
        console.error('Error al eliminar la marca:', error);
        alert('Error técnico al eliminar la marca');
    });
};

  return (
      <View style={styles.container}>
          <Button title="Agregar Marca" onPress={() => {
              setIdMarca('');
              setNombreMarca('');
              setModalVisible(true);
          }} />
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={resetForm}
          >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <TextInput
                          style={styles.input}
                          onChangeText={setNombreMarca}
                          value={nombreMarca}
                          placeholder="Nombre de la marca"
                      />
                      <View style={styles.buttonGroup}>
                          <Button title={idMarca ? "Actualizar" : "Crear"} onPress={handleCreateOrUpdateMarca} />
                          <Button title="Cerrar" color="red" onPress={resetForm} />
                      </View>
                  </View>
              </View>
          </Modal>
          <FlatList
              data={marcas}
              keyExtractor={item => item.id_marca.toString()}
              renderItem={({ item }) => (
                  <View style={styles.row}>
                      <Text style={styles.cell}>{item.id_marca}</Text>
                      <Text style={styles.cell}>{item.nombre_marca}</Text>
                      <View style={styles.buttons}>
                          <TouchableOpacity style={styles.button} onPress={() => handleEditPress(item)}>
                              <Icon name="pencil" size={20} color="white" />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.button} onPress={() => eliminarMarca(item.id_marca)}>
                              <Icon name="delete" size={20} color="white" />
                          </TouchableOpacity>
                      </View>
                  </View>
              )}
          />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 22
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        width: 300,
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10
    },
    buttonGroup: {
        flexDirection: 'row',
        padding: 10
    },
    row: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    cell: {
        flex: 1,
        marginRight: 10,
        fontSize: 16,
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        marginLeft: 12,
        padding: 8,
        backgroundColor: '#007bff',
        borderRadius: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 1.22,
    }
});

export default MarcaList;