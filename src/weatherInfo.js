import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";

const WeatherInfo = ({ weatherData }) => {
  const {
    name,
    visibility,
    weather: [{ icon, description }],
    main: { temp, humidity, feels_like },
    wind: { speed },
    sys: { sunrise, sunset },
  } = weatherData;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.logo}>
        <Image
          style={styles.largeIcon}
          source={{ uri: `https://openweathermap.org/img/wn/${icon}.png` }}
        />
        <Text style={styles.currentTemp}>{temp} °C</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.extraInfo}>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={{
              uri: "https://as1.ftcdn.net/v2/jpg/05/34/63/00/1000_F_534630064_klP1QWlZLLUg2R64VHsjLplGeiVmhwwe.jpg",
            }}
          />
          <Text style={styles.infoText}>{feels_like} °C</Text>
          <Text  style={styles.infoTextTitle}>Feels Like</Text>
        </View>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4148/4148460.png",
            }}
          />
          <Text style={styles.infoText}>{humidity} %</Text>
          <Text  style={styles.infoTextTitle}>Humidity</Text>
        </View>
      </View>
      <View style={styles.extraInfo}>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={{
              uri: "https://www.pikpng.com/pngl/m/422-4229124_supply-chain-visibility-icon-png-download-visibility-icon.png",
            }}
          />
          <Text style={styles.infoText}>{visibility} </Text>
          <Text  style={styles.infoTextTitle}>Visibility</Text>
        </View>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/740/740832.png",
            }}
          />
          <Text style={styles.infoText}>{speed} m/s</Text>
          <Text  style={styles.infoTextTitle}>Wind speed</Text>
        </View>
      </View>
      <View style={styles.extraInfo}>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={{
              uri: "https://p7.hiclipart.com/preview/455/525/244/sunrise-sunset-clip-art-sunset-cliparts-black.jpg",
            }}
          />
          <Text style={styles.infoText}>{new Date(sunrise*1000).toLocaleString()} </Text>
          <Text  style={styles.infoTextTitle}>Sunrise</Text>
        </View>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/008/096/406/small_2x/a-landscape-of-the-sunset-in-golden-color-and-its-reflection-on-the-surface-of-water-with-shadow-of-palm-trees-and-birds-free-vector.jpg",
            }}
          />
          <Text style={styles.infoText}>{new Date(sunset*1000).toLocaleString()}</Text>
          <Text style={styles.infoTextTitle}>Sunset</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5DB",
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#e96e50",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  largeIcon: {
    width: 200,
    height: 200,
  },
  currentTemp: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 18,
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 7,
  },
  info: {
    width: Dimensions.get("screen").width / 2.3,
    backgroundColor: "#D0EAFA",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    marginLeft: 6
  },
  smallIcon: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    marginLeft: 50,
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
  },
  infoTextTitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight:"bold"
  },
});
