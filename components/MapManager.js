import { View, Button, StyleSheet } from 'react-native'
import React from 'react'
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from 'react';
import { colors } from '../helper/HelperColors';
import { MaterialIcons } from '@expo/vector-icons';

const MapManager = ({requestedMap}) => {
  const [minLatitude, setMinLatitude] = useState(0);
  const [maxLatitude, setMaxLatitude] = useState(0);
  const [minLongitude, setMinLongitude] = useState(0);
  const [maxLongitude, setMaxLongitude] = useState(0);
  const [showRegion, setShowRegion] = useState("");
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (requestedMap.initialRegion) {
      setShowRegion(requestedMap.initialRegion);
    } else if (requestedMap.markersList) {
       // Calculate bounding box
      const minLatitude_temp = Math.min(...requestedMap.markersList.map(marker => marker.coordinate.latitude));
      setMinLatitude(minLatitude_temp);
      const maxLatitude_temp = Math.max(...requestedMap.markersList.map(marker => marker.coordinate.latitude));
      setMaxLatitude(maxLatitude_temp)
      const minLongitude_temp = Math.min(...requestedMap.markersList.map(marker => marker.coordinate.longitude));
      setMinLongitude(minLongitude_temp);
      const maxLongitude_temp = Math.max(...requestedMap.markersList.map(marker => marker.coordinate.longitude));
      setMaxLongitude(maxLongitude_temp);

      // Calculate center and deltas
      const centerLatitude = (minLatitude_temp + maxLatitude_temp) / 2;
      const centerLongitude = (minLongitude_temp + maxLongitude_temp) / 2;
      const latitudeDelta = (maxLatitude_temp - minLatitude_temp) + 0.02; // Add margin
      const longitudeDelta = (maxLongitude_temp - minLongitude_temp) +0.02;// Add margin
      setShowRegion({
        latitude: centerLatitude,
        longitude: centerLongitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta:longitudeDelta,
      });
    } else {
      console.log("No initial region or markers list")
    }
  }, []);

  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };

  const getUserLocation = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give access to your location");
      }
      const locationObject = await Location.getCurrentPositionAsync();
      const userLocation = {
        latitude: locationObject.coords.latitude,
        longitude: locationObject.coords.longitude,
      };
      setUserLocation(userLocation);
      return userLocation;
    } catch (err) {
      console.log("locate user ", err);
    }
  }
  
  const zoomRegionToIncludeUserLocation = (userLocation) => {
    const minLatitude_temp = Math.min(minLatitude, userLocation.latitude);
    const maxLatitude_temp = Math.max(maxLatitude, userLocation.latitude);
    const minLongitude_temp = Math.min(minLongitude, userLocation.longitude);
    const maxLongitude_temp = Math.max(maxLongitude, userLocation.longitude);
    const updatedRegion = {
          latitude: (minLatitude_temp + maxLatitude_temp) / 2,
          longitude: (minLongitude_temp + maxLongitude_temp) / 2,
          latitudeDelta: (maxLatitude_temp - minLatitude_temp) + 0.02, //Add a small margin
          longitudeDelta: (maxLongitude_temp - minLongitude_temp) + 0.02, //Add a small margin
        };
    setShowRegion(updatedRegion);
  }

  async function myLocationHandler() {
    const currLocation = await getUserLocation();
    if(currLocation){
      zoomRegionToIncludeUserLocation(currLocation);
    }
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        region={showRegion}
        style={[styles.mapView, requestedMap.style && requestedMap.style]}
      >
        {requestedMap.markersList.map((marker, index) => (

          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
          >
            <MaterialIcons name={marker.icon? marker.icon : "location-pin"} size={24} color={colors.themeDark}/>
          </Marker>
          ))
        }

        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="My Location"
            pinColor='blue'
          >
            <MaterialIcons name="person-pin-circle" size={30} color="dodgerblue"/>
          </Marker>
        )}

      </MapView>
      <Button title="My Location" onPress={myLocationHandler}/>
    </View>
  )
}

export default MapManager

const styles = StyleSheet.create({
  mapContainer: {
    width:"100%",
    height:"100%",
    margin: "1%",
  },
  mapView: {
    width:"100%",
    height: 200,
    alignSelf: "center",
  },
  marker: {
    borderWidth: 0.5,
    borderColor: "white",
  }
})