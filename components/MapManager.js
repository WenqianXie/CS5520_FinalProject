import { View, Button, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

const MapManager = () => {
  const route = useRoute();
  const requestedMap = route.params.requestedMap;
  const [showRegion, setShowRegion] = useState(requestedMap.initialRegion);
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [userLocation, setUserLocation] = useState(null);
  /*
  useEffect(() => {
    if (route.params) {
      // I have come from interactive map
      setUserLocation(route.params.selectedCoord);
    }
  }, [route]);
  */

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
    const updatedRegion = {
          latitude: (userLocation.latitude + requestedMap.initialRegion.latitude) / 2,
          longitude: (userLocation.longitude + requestedMap.initialRegion.longitude) / 2,
          latitudeDelta: Math.max(
            Math.abs(userLocation.latitude - requestedMap.initialRegion.latitude) * 2,
            requestedMap.initialRegion.latitudeDelta
          ),
          longitudeDelta: Math.max(
            Math.abs(userLocation.longitude - requestedMap.initialRegion.longitude) * 2,
            requestedMap.initialRegion.longitudeDelta
          ),
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
          />
          ))
        }

        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="My Location"
            pinColor='blue'
          />
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
  },
  mapView: {
    width:"90%",
    height:"30%",
    alignSelf: "center",
  }
})