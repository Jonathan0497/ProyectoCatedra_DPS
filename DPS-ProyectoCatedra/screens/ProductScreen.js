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
  const [estado, setEstado] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: '',
    categoria: '',
    marca: '',
    estado: ''
  });

  useEffect(() => {
    fetchProductos();
    fetchMarcas();
    fetchCategoria();
    fetchEstado();
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

  const fetchEstado = () => {
    axios.get(API_URL + 'readAllEstado')
      .then(response => {
        setEstado(response.data.dataset || []);
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
    const action = producto.id ? 'update' : 'create';
    const payload = {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      categoria: producto.categoria,
      marca: producto.marca,
      estado: producto.estado
    };

    // Imprimir en consola los datos que se van a enviar
    console.log('Enviando datos al servidor:', payload);

    axios.post(API_URL + action, payload)
      .then(response => {
        if (response.data.status === 1) {
          alert(`Producto ${producto.id ? 'actualizado' : 'creado'} correctamente`);
          setModalVisible(false);
          fetchProductos();
          setProducto({
            id: '',
            nombre: '',
            descripcion: '',
            precio: '',
            cantidad: '',
            categoria: '',
            marca: '',
            estado: ''
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
    console.log('Editando producto:', item);  // Puedes usar esto para verificar los datos recibidos.
    setProducto({
      id: item.id_producto,
      nombre: item.nombre_producto,
      descripcion: item.descripcion,
      precio: item.precio_producto,
      cantidad: item.cantidad_disponible,
      categoria: item.id_categoria_producto,
      marca: item.id_marca,
      estado: item.id_estado_producto
    });
    setModalVisible(true);
  };
  
  const eliminarProducto = (id) => {
    axios.post(API_URL + 'delete', { id: id })
      .then(response => {
        if (response.data.status === 1) {
          alert('Producto eliminado correctamente');
          fetchProductos(); // Actualizamos la lista de productos después de eliminar uno.
        } else {
          alert(response.data.exception || 'Error al eliminar el Producto');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
        alert('Error técnico al eliminar el producto');
      });
  };


  return (
    <View style={styles.container}>
      <Button title="Agregar Producto" onPress={() => {
        setProducto({
          id: '',
          nombre: '',
          descripcion: '',
          precio: '',
          cantidad: '',
          categoria: '',
          marca: '',
          estado: ''
        });
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
              onChangeText={(text) => setProducto(prevState => ({
                ...prevState, nombre: text
              }))}
              value={producto.nombre}
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
              onChangeText={(text) => setProducto({ ...producto, precio: text })}
              value={producto.precio}
              placeholder="Precio"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setProducto({ ...producto, cantidad: text })}
              value={producto.cantidad}
              placeholder="Cantidad disponible"
            />
            <Picker
              selectedValue={producto.categoria}
              style={styles.input}
              onValueChange={(itemValue) => {
                console.log('Categoría seleccionada:', itemValue);
                setProducto(prevState => ({
                  ...prevState,
                  categoria: itemValue
                }));
              }}
            >
              <Picker.Item label="Seleccione uno" value="" />
              {categorias.map((categoria) => (
                <Picker.Item key={categoria.id_categoria_producto} label={categoria.categoria_producto} value={categoria.id_categoria_producto} />
              ))}
            </Picker>
            <Picker
              selectedValue={producto.marca}
              style={styles.input}
              onValueChange={(itemValue) => setProducto(prevState => ({
                ...prevState,
                marca: itemValue
              }))}
            >
              <Picker.Item label="Seleccione uno" value="" />
              {marcas.map((marca) => (
                <Picker.Item key={marca.id_marca} label={marca.nombre_marca} value={marca.id_marca} />
              ))}
            </Picker>
            <Picker
              selectedValue={producto.estado}
              style={styles.input}
              onValueChange={(itemValue) => setProducto(prevState => ({
                ...prevState,
                estado: itemValue
              }))}
            >
              <Picker.Item label="Seleccione uno" value="" />
              {estado.map((estado) => (
                <Picker.Item key={estado.id_estado_producto} label={estado.estado_producto} value={estado.id_estado_producto} />
              ))}
            </Picker>
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
            <Text style={styles.cell}>${item.precio_producto}</Text>
            <Text style={styles.cell}>{item.cantidad_disponible}</Text>
            <Text style={styles.cell}>{item.nombre_marca}</Text>
            <Text style={styles.cell}>{item.categoria_producto}</Text>
            <Text style={styles.cell}>{item.estado_producto}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={() => handleEditPress(item)}>
                <Icon name="pencil" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => eliminarProducto(item.id_producto)}>
                <Icon name="delete" size={20} color="white" />
              </TouchableOpacity>
              { }
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
