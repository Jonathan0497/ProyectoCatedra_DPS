import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,ScrollView,TextInput,SafeAreaView } from 'react-native';

const Card = () => {
  const handleLike = () => {
    // Manejar la lógica de like
  };
const NavBar = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#3b3486' }}>
      <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

      </View>
    </SafeAreaView>
  );
};

const SearchBar = () => {
  return (
    <View style={{ backgroundColor: '#3b3486', height: 40, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Buscar..."
        style={{ backgroundColor: 'white', width: '90%', height: '70%', borderRadius: 10, paddingLeft: 10 }}
      />
    </View>
  );
};
  return (
        <ScrollView style={{ flex: 1 }}>
          <NavBar />
      <SearchBar />
    <View style={styles.cards}>
      <View style={styles.card}>
        <View style={styles.card__preview}>
          <Text style={styles.card__price}>
            Precio: $30
          </Text>
        </View>
        <View style={styles.card__content}>
          <Text style={styles.card__title}>Funko Pop: Batman</Text>
          <Text style={styles.card__address}>
            <Text style={styles.bold}>Categoria:</Text> Funko Pop
          </Text>
          <Text style={styles.card__description}>
            Figura de vinilo coleccionable que representa al icónico superhéroe de DC Comics, 
            caracterizado por su distintivo traje negro y capa, así como por su emblemático 
            logo de murciélago en el pecho.
          </Text>
          <View style={styles.card__bottom}>
            <View style={styles.card__properties}>
              <Text>Stock: 23 |</Text>
            </View>

          </View>
        </View>
      </View>
    </View>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  cards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8FF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    width: 300,
    height: 400,
    flexDirection: 'column',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  card__preview: {
    height: 120,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  card__price: {
    backgroundColor: '#fff',
    color: '#262626',
    zIndex: 1,
    position: 'absolute',
    bottom: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    left: 20,
    fontWeight: 'bold',
  },
  card__content: {
    padding: 20,
    flexGrow: 1,
    color: '#262626',
  },
  card__title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card__address: {
    marginTop: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  card__description: {
    marginTop: 8,
  },
  card__bottom: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card__properties: {},
  card__btn: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 30,
    width: 30,
  },
});

export default Card;
