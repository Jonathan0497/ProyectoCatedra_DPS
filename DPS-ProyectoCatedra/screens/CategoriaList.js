import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const API_URL = 'http://localhost/ProyectoCatedra_DPS/api/dashboard/categoria.php?action=';

const CategoriaList = () => {
    const [categorias, setCategorias] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [idCategoria, setIdCategoria] = useState('');

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = () => {
        axios.get(API_URL + 'readAll')
            .then(response => {
                console.log('Respuesta del servidor:', response.data);
                    setCategorias(response.data.dataset);
                }).catch(error => {
                    console.error('Error fetching Categorias:', error);
                }); 
            };

    const handleCreateOrUpdateCategoria = () => {
        const url = idCategoria ? API_URL + 'update' : API_URL + 'create';
        axios.post(url, {
            id: idCategoria,
            categoria: nombreCategoria
        })
            .then(response => {
                if (response.data.status === 1) {
                    alert(idCategoria ? 'Categoria actualizada correctamente' : 'Categoria creada correctamente');
                    resetForm();
                    fetchCategorias();
                } else {
                    alert(response.data.exception || 'Error al procesar la categoria');
                }
            })
            .catch(error => {
                console.error('Error processing marca:', error);
          alert('Error técnico al procesar la marca');
            });
    };

    const resetForm = () => {
        setIdCategoria('');
        setNombreCategoria('');
        setModalVisible(false);
    };

    const handleEditPress = (categoria) => {
        setIdCategoria(categoria.id_categoria_producto);
        setNombreCategoria(categoria.categoria_producto);
        setModalVisible(true);
    };

    const eliminarCategoria = (id) => {
        axios.post(API_URL + 'delete', {
            id: id  
        })
        .then(response => {
            if (response.data.status === 1) {
                alert('Categoria eliminada correctamente');
                fetchCategorias();  
            } else {
                alert(response.data.exception || 'Error al eliminar la categorias');
            }
        })
        .catch(error => {
            console.error('Error al eliminar la categoria:', error);
            alert('Error técnico al eliminar la categoria');
        });
    };

    return (
        <View style={styles.container}>
            <Button title="Agregar Categoría" onPress={() => {
                setIdCategoria('');
                setNombreCategoria('');
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
                            onChangeText={setNombreCategoria}
                            value={nombreCategoria}
                            placeholder="Nombre de la categoría"
                        />
                        <View style={styles.buttonGroup}>
                            <Button title={idCategoria ? "Actualizar" : "Crear"} onPress={handleCreateOrUpdateCategoria} />
                            <Button title="Cerrar" color="red" onPress={resetForm} />
                        </View>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={categorias}
                keyExtractor={item => item.id_categoria_producto.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{item.id_categoria_producto}</Text>
                        <Text style={styles.cell}>{item.categoria_producto}</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button} onPress={() => handleEditPress(item)}>
                                <Icon name="pencil" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => eliminarCategoria(item.id_categoria_producto)}>
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

export default CategoriaList;
