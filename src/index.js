import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import WeatherInfo from './weatherInfo';
import * as FileSystem from 'expo-file-system';

const API_KEYS ='35575b8dc81ee6d1ab9d98d7aa0ee143';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const backgroundImageUri = 'https://img.freepik.com/free-vector/blue-iridescent-background_125540-1079.jpg';
    const localBackgroundImage = `${FileSystem.cacheDirectory}background.jpg`;

    useEffect(() => {
        downloadBackgroundImage();
        fetchWeatherData("Pune");
    }, []);

    const downloadBackgroundImage = async () => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(localBackgroundImage);
            if (!fileInfo.exists) {
                await FileSystem.downloadAsync(backgroundImageUri, localBackgroundImage);
            }
        } catch (error) {
            console.error('Error downloading background image:', error);
        }
    };

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

    if (!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="red" />
            </View>
        )
    }

    return (
        <ImageBackground source={{ uri: localBackgroundImage }} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Weather App</Text>
                </View>
                <WeatherInfo weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
            </View>
        </ImageBackground>
    );
};

export default Weather;

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    header: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',  
        height: height * 0.1,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: height * 0.04,
        fontWeight: 'bold',
    },
});
