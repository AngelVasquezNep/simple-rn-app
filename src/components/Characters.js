import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import useFetch from '../hooks/useFetch';

const API_URL = 'https://rickandmortyapi.com/api';
const API = {
  CHARACTER: API_URL + '/character',
};

const Character = ({ name, image, status, species, location, origin }) => (
  <View style={styles.container}>
    <View>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
    </View>
    <View style={styles.body}>
      <View style={styles.bodySection}>
        <Text style={[styles.bodyText, styles.title]}>{name}</Text>
        <Text style={[styles.bodyText]}> {status} - {species} </Text>
      </View>
      <View style={styles.bodySection}>
        <Text style={[styles.bodyText, styles.subtitle]}>Last known location:</Text>
        <Text style={[styles.bodyText]}>{location.name}</Text>
      </View>
      <View style={styles.bodySection}>
        <Text style={[styles.bodyText, styles.subtitle]}>First seen in:</Text>
        <Text style={[styles.bodyText]}>{origin.name}</Text>
      </View>
    </View>
  </View>
);

const renderItem = ({ item }) => <Character {...item} />;

const Characters = () => {
  const { data, loading, error } = useFetch(API.CHARACTER);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>error...</Text>;
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Rick And Morth</Text>
      <FlatList
        data={data.results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  listTitle: {
    fontSize: 35,
    marginBottom: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#3c3e44',
    maxHeight: 180,
  },
  image: {
    width: 150,
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  body: {
    padding: 10,
  },
  bodySection: {
    paddingBottom: 10,
  },
  title: {
    fontSize: 25,
  },
  subtitle: {
    color: '#9e9e9e',
  },
  bodyText: {
    color: 'white',
  }
});

export default Characters;
