import { StyleSheet, Text, View, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapManager from './MapManager'
import WebLink from './WebLink'
import WebView from 'react-native-webview'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase/FirebaseSetup'
import { ActivityIndicator } from 'react-native'
import { colors } from '../helper/HelperColors'

const BulletPointContent = ({bulletPointContent}) => {
  const [downloadImageURL, setDownloadImageURL] = useState(null)
    useEffect(() => {
      if (bulletPointContent.image) {
        console.log("bulletPointContent.image: ", bulletPointContent.image)
        const getURL = async () => {
          try{
            const imageRef = ref(storage, bulletPointContent.image)
            console.log("imageRef: ", imageRef)
            const url = await getDownloadURL(imageRef)
            console.log("download url: ", url)
            setDownloadImageURL(url)
          } catch (err){
            console.log(err)
          }
        }
        getURL()
      }
    }, [])
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

        {/* Image if needed */}
        { bulletPointContent.image &&
          <View>
            {!downloadImageURL ? (
              <ActivityIndicator size="large" color={colors.themeDark} />
            ) : (
              <Image
                source={{ uri: downloadImageURL }}
                style={bulletPointContentStyles.image}
                resizeMode="cover"
              />
            )}
          </View>
        }

        {/* Map if needed */}
        { bulletPointContent.map &&
          <MapManager requestedMap={bulletPointContent.map} />
        }

        {/* Webview if needed */}
        { bulletPointContent.webview &&
          <WebView source={{ uri: bulletPointContent.webview }} style={bulletPointContentStyles.webview} />
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
  },
  map: {
    margin: "1%",
  },
  webview: {
    height: 400,
    margin: "1%",
  },
  image: {
    width: "100%",
    height: 200,
    margin: "1%",
  }
})