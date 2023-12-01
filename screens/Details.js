import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapManager from '../components/MapManager'

const Details = ({navigation, route}) => {
    console.log(route.params);
  return (
    <View>
      <Text>Details</Text>
      <MapManager />
    </View>
  )
}

export default Details

const styles = StyleSheet.create({})