import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import BulletPointContent from '../components/BulletPointContent';

const Details = ({navigation, route}) => {
  const detailsContent = route.params.detailsContent;
  const headerTitle = detailsContent.title;

  useEffect(() => {
    navigation.setOptions({ title: headerTitle });
  }, [navigation]);

  return (
    <SafeAreaView>
      {detailsContent.contents.map((bulletPointContent, index) => (
        <BulletPointContent bulletPointContent={bulletPointContent} key={index}/>
      )) }
    </SafeAreaView>
  )
}

export default Details

const detailsStyles = StyleSheet.create({
title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
},
})