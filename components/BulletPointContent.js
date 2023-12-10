import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'
import MapManager from './MapManager'
import WebLink from './WebLink'

const BulletPointContent = ({bulletPointContent}) => {
  return (
    <>
      <View>
        {/* Subtitle if needed */}
        {bulletPointContent.subtitle &&
          <View style={bulletPointContentStyles.subtitleContainer}>
            <Text style={bulletPointContentStyles.bullet}>
              •
            </Text>
            <Text style={bulletPointContentStyles.subtitle}>
              {bulletPointContent.subtitle}
            </Text>
          </View>
        }

        {/* Content if needed*/}
        {bulletPointContent.content &&
          <View style={bulletPointContentStyles.contentContainer}>
            <Text style={bulletPointContent.detailsContent}>
              {bulletPointContent.content}
            </Text>
          </View>
        }

        {/* WebLink if needed */}
        { bulletPointContent.link &&
          <WebLink linkRequest={bulletPointContent.link} />
        }

        {/* Map if needed */}
        { bulletPointContent.map &&
          <View style={{flex: 1}}>
          <MapManager requestedMap={bulletPointContent.map} />
          </View>
        }

      </View>
    </>
  )
}

export default BulletPointContent

const bulletPointContentStyles = StyleSheet.create({
  subtitleContainer: {
    alignSelf: 'right',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: "3%",
  },
  bullet: {
    fontSize: 16,
    marginRight: 5,
    color: 'black', 
    fontWeight: 'bold',
  },  
  subtitle: {
    fontSize: 16,
    color: 'black', 
    fontWeight: 'bold',
  },
  contentContainer: {
    alignSelf: 'right',
    justifyContent: 'flex-start',
    margin: "1%",
  },
  detailsContent:{
    ...Platform.select({
      ios: {
        fontFamily: 'San Francisco', // 在 iOS 上使用 San Francisco 字体
      },
      android: {
        fontFamily: 'Roboto', // 在 Android 上使用 Roboto 字体
      },
    }),
    fontSize: 16,
    letterSpacing: 3,
    lineHeight: 30,
  }
})