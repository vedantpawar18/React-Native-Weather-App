import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import WeatherInfo from './weatherInfo';

const API_KEYS ='35575b8dc81ee6d1ab9d98d7aa0ee143';

const Weather = () => {
    const [weatherData, setWeatherData]= useState(null);
    const [loaded, setLoaded]= useState(false);

    const fetchWeatherData = async (cityName) => {
        try {
            setLoaded(false);
          const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEYS}&units=metric`);
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          const data = await response.json();
          setWeatherData(data);
          setLoaded(true);
        } catch (error) {
          console.error('Error fetching weather data:', error); 
          Alert.alert('Error', 'Failed to fetch weather data. Please try again later.');
        }
      };
      
      useEffect(()=>{
        fetchWeatherData("Pune");
      }, []);

      if(!loaded){
        return (
            <View  style= {styles.container}>
               <ActivityIndicator size="large" color="red"/>
            </View>
        )
      }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather App</Text>
      </View>
    <WeatherInfo weatherData={weatherData} />
    </View>
  );
};

export default Weather;

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF5DB',
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#C5D2EF',
    height: height * 0.1,  
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: height * 0.04,  
    fontWeight: 'bold',
  },
});

