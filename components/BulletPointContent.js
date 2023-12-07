import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapManager from './MapManager'
import WebLink from './WebLink'
import { styles } from '../helper/HelperStyles'

const BulletPointContent = ({bulletPointContent}) => {
  return (
    <>
      <View>
        {/* Subtitle */}
        <View style={bulletPointContentStyles.subtitleContainer}>
          <Text style={bulletPointContentStyles.bullet}>
            •
          </Text>
          <Text style={bulletPointContentStyles.subtitle}>
            {bulletPointContent.subtitle}
          </Text>
        </View>

        {/* Content */}
        <View style={bulletPointContentStyles.contentContainer}>
          <Text style={styles.detailsContent}>
            {bulletPointContent.content}
          </Text>
        </View>

        {/* WebLink if needed */}
        { bulletPointContent.link &&
          <WebLink linkRequest={bulletPointContent.link} />
        }

        {/* Map if needed */}
        { bulletPointContent.map &&
          <MapManager requestedMap={bulletPointContent.map} />
        }

      </View>
    </>
  )
}

export default BulletPointContent

const bulletPointContentStyles = StyleSheet.create({
  subtitleContainer: {
    width:"90%",
    alignSelf: 'right',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    width:"85%",
    alignSelf: 'right',
    justifyContent: 'flex-start',
  },
  
})