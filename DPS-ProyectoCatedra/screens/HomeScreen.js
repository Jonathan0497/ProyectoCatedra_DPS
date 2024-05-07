import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';

const NavBar = () => {
  return (
    <SafeAreaView style={{ backgroundColor: 'lightgray' }}>
      <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mi Tienda</Text>
      </View>
    </SafeAreaView>
  );
};

const SearchBar = () => {
  return (
    <View style={{ backgroundColor: 'blue', height: 40, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Buscar..."
        style={{ backgroundColor: 'white', width: '90%', height: '70%', borderRadius: 10, paddingLeft: 10 }}
      />
    </View>
  );
};

const CategoriaSection = () => {
  return (
    <TouchableOpacity onPress={() => {/* Navega a la página de categorías */}}>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>Categorías</Text>
          <TouchableOpacity>
            <Text style={{ color: 'blue', fontSize: 16 }}>Ver más</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../assets/Categorias.jpg')} style={{ width: 300, height: 100 }} />
      </View>
    </TouchableOpacity>
  );
};

const Inicio = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <NavBar />
      <SearchBar />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        {/* Carrusel de imágenes */}
        <ScrollView horizontal>
          <Image source={require('../assets/imagen1.jpg')} style={{ width: 200, height: 200, borderWidth: 1, borderColor: 'black', marginRight: 10 }} />
          <Image source={require('../assets/imagen2.jpg')} style={{ width: 200, height: 200, borderWidth: 1, borderColor: 'black', marginRight: 10 }} />
          <Image source={require('../assets/imagen3.jpg')} style={{ width: 200, height: 200, borderWidth: 1, borderColor: 'black' }} />
          {/* Agrega más imágenes según sea necesario */}
        </ScrollView>

        {/* Imágenes de productos */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <TouchableOpacity onPress={() => {/* Maneja la acción para el producto 1 */}}>
            <Image source={require('../assets/producto1.jpg')} style={{ width: 150, height: 150, borderWidth: 1, borderColor: 'black', marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {/* Maneja la acción para el producto 2 */}}>
            <Image source={require('../assets/producto2.jpg')} style={{ width: 150, height: 150, borderWidth: 1, borderColor: 'black' }} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <TouchableOpacity onPress={() => {/* Maneja la acción para el producto 3 */}}>
            <Image source={require('../assets/producto3.jpg')} style={{ width: 150, height: 150, borderWidth: 1, borderColor: 'black', marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {/* Maneja la acción para el producto 4 */}}>
            <Image source={require('../assets/producto4.jpg')} style={{ width: 150, height: 150, borderWidth: 1, borderColor: 'black' }} />
          </TouchableOpacity>
        </View>

        {/* Sección de categorías */}
        <CategoriaSection />
      </View>
    </ScrollView>
  );
};

export default Inicio;
