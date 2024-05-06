import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const API_URL = 'http://localhost/ProyectoCatedra_DPS/api/dashboard/marca.php?action=';

const MarcaList = () => {
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        fetchMarcas();
    }, []);

    const fetchMarcas = () => {
        axios.get(API_URL + 'readAll')
            .then(response => {
                setMarcas(response.data.dataset);
            })
            .catch(error => {
                console.error('Error fetching marcas:', error);
            });
    };

    const editarMarca = (id) => {
        console.log('Editar marca:', id);
        
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
        <FlatList
            data={marcas}
            keyExtractor={item => item.id_marca.toString()} 
            renderItem={({ item }) => (
                <View style={styles.row}>
                    <Text style={styles.cell}>{item.id_marca}</Text>  
                    <Text style={styles.cell}>{item.nombre_marca}</Text>  
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={() => editarMarca(item.id_marca)}>
                            <Icon name="pencil" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => eliminarMarca(item.id_marca)}>
                            <Icon name="delete" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
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
