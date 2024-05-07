import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';

const API_URL = 'http://localhost/ProyectoCatedra_DPS/api/dashboard/producto.php?action=';
const API_MARCA = 'http://localhost/ProyectoCatedra_DPS/api/dashboard/marca.php?action=';
const API_CATEGORIA = 'http://localhost/ProyectoCatedra_DPS/api/dashboard/categoria.php?action=';

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [producto, setProducto] = useState({
    id_producto: '',
    nombre_producto: '',
    descripcion: '',
    precio_producto: '',
    cantidad_disponible: '',
    imagen_producto: '',
    id_categoria_producto: '',
    id_marca: '',
    id_estado_producto: '',
    id_usuario: ''
  });

  useEffect(() => {
    fetchProductos();
    fetchMarcas(); 
    fetchCategoria();
  }, []);

  const fetchProductos = () => {
    axios.get(API_URL + 'readAll')
      .then(response => {
        setProductos(response.data.dataset || []);
      })
      .catch(error => {
        console.error('Error fetching productos:', error);
      });
  };

  const fetchMarcas = () => {
    axios.get(API_MARCA + 'readAll')
      .then(response => {
        setMarcas(response.data.dataset || []);
      })
      .catch(error => {
        console.error('Error fetching marcas:', error);
      });
  };

  const fetchCategoria = () => {
    axios.get(API_CATEGORIA + 'readAll')
      .then(response => {
        setCategorias(response.data.dataset || []);
      })
      .catch(error => {
        console.error('Error fetching marcas:', error);
      });
  };


  const handleSaveProducto = () => {
    const action = producto.id_producto ? 'update' : 'create';
    axios.post(API_URL + action, producto)
      .then(response => {
        if (response.data.status === 1) {
          alert('Producto ' + (producto.id_producto ? 'actualizado' : 'creado') + ' correctamente');
          setModalVisible(false);
          fetchProductos();
          setProducto({
            id_producto: '',
            nombre_producto: '',
            descripcion: '',
            precio_producto: '',
            cantidad_disponible: '',
            imagen_producto: '',
            id_categoria_producto: '',
            id_marca: '',
            id_estado_producto: '',
            id_usuario: ''
          });
        } else {
          alert(response.data.exception);
        }
      })
      .catch(error => {
        console.error('Error processing producto:', error);
        alert('Error técnico al procesar el producto');
      });
  };

  const handleEditPress = (item) => {
    setProducto(item);
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
      <Button title="Agregar Producto" onPress={() => {
        setProducto({ id_producto: '', nombre: '', descripcion: '', precio: '', cantidad: '', categoria: '', marca: '', estado: '' });
        setModalVisible(true);
      }} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setProducto({ ...producto, nombre_producto: text })}
              value={producto.nombre_producto}
              placeholder="Nombre del producto"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setProducto({ ...producto, descripcion: text })}
              value={producto.descripcion}
              placeholder="Descripción"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setProducto({ ...producto, precio_producto: text })}
              value={producto.precio_producto}
              placeholder="Precio"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setProducto({ ...producto, cantidad_disponible: text })}
              value={producto.cantidad_disponible}
              placeholder="Cantidad disponible"
            />
            <Picker
              selectedValue={producto.id_categoria_producto}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setProducto({ ...producto, id_categoria_producto: itemValue })
              }>
              {categorias.map((categoria) => (
                <Picker.Item key={categoria.id_categoria_producto} label={categoria.categoria_producto} value={categoria.id_categoria_producto} />
              ))}
            </Picker>
            <Picker
              selectedValue={producto.id_marca}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                setProducto({ ...producto, id_marca: itemValue })
              }>
              {marcas.map((marca) => (
                <Picker.Item key={marca.id_marca} label={marca.nombre_marca} value={marca.id_marca} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setProducto({ ...producto, id_estado_producto: text })}
              value={producto.id_estado_producto}
              placeholder="ID del estado"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setProducto({ ...producto, id_usuario: text })}
              value={producto.id_usuario}
              placeholder="ID del usuario"
            />
            <View style={styles.buttonGroup}>
              <Button title="Guardar" onPress={handleSaveProducto} />
              <Button title="Cerrar" color="red" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={productos}
        keyExtractor={item => item.id_producto.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.id_producto}</Text>
            <Text style={styles.cell}>{item.nombre_producto}</Text>
            <Text style={styles.cell}>{item.descripcion}</Text>
            <Text style={styles.cell}>{item.precio_producto}</Text>
            <Text style={styles.cell}>{item.cantidad_disponible}</Text>
            <Text style={styles.cell}>{item.nombre_marca}</Text>
            <Text style={styles.cell}>{item.categoria_producto}</Text>
            <Text style={styles.cell}>{item.estado_producto}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={() => handleEditPress(item)}>
                <Icon name="pencil" size={20} color="white" />
              </TouchableOpacity>
              {}
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

export default ProductoList;
