/*
  Purpose: Screen component where users can search for recipies
  Author: Aiden Frevert
  Editors: 
*/
import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, Keyboard } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function SearchScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#345C50" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Discover New Recipes</Text>
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search here..." style={styles.searchInput} />
          <TouchableOpacity style={styles.filtersButton} onPress={Keyboard.dismiss}>
            <MaterialCommunityIcons name="filter-variant" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.grid}>
        <CategoryItem title="Trending (Top)" iconName="fire" iconColor="#FF4500" />
        <CategoryItem title="Trending (Local)" iconName="map-marker" iconColor="#4DB8FF" />
        <CategoryItem title="Lunch" iconName="food" iconColor="#FFD700" />
        <CategoryItem title="Dinner" iconName="food-variant" iconColor="#FF6347" />
        <CategoryItem title="Italian" iconName="pizza" iconColor="#FF4500" />
        <CategoryItem title="Vegan" iconName="leaf" iconColor="#32CD32" />
        <CategoryItem title="Indian" iconName="bowl" iconColor="#FF8C00" />
        <CategoryItem title="Chinese" iconName="noodles" iconColor="#FF4500" />
      </View>
    </View>
  );
}

const CategoryItem = ({ title, iconName, iconColor }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={Keyboard.dismiss}>
    <MaterialCommunityIcons name={iconName} size={50} color={iconColor} />
    <Text style={styles.categoryText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: "SF-Pro-Text-Regular",
  },
  headerContainer: {
    backgroundColor: '#345c50', // Dark green color similar to the image
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    fontFamily: "SF-Pro-Text-Regular",
  },
  header: {
    marginTop: 25,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: "SF-Pro-Text-Regular",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
    fontFamily: "SweetSansProMedium",
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: "SweetSansProMedium",
  },
  filtersButton: {
    padding: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 25,
  },
  categoryItem: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    fontFamily: "SweetSansProMedium",
  },
  categoryText: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: "SweetSansProMedium",
  },
});