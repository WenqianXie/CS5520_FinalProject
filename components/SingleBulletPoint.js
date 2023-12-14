// Purpose: This file creates a component that displays a single bullet point

import { View, Text, Image} from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import MapManager from "./MapManager";
import WebLink from "./WebLink";
import WebView from "react-native-webview";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/FirebaseSetup";
import { bulletPointListStyles } from '../helper/HelperStyles';

const SingleBulletPoint = ({singleBulletPoint}) => {
  const [downloadImageURL, setDownloadImageURL] = useState(null);

  // useEffect to get the download URL of the image only if there is an image
  useEffect(() => {
    if (singleBulletPoint.image) {
      const getURL = async () => {
        try {
          const imageRef = ref(storage, singleBulletPoint.image);
          const url = await getDownloadURL(imageRef);
          setDownloadImageURL(url);
        } catch (err) {
          console.log(err);
        }
      };
      getURL();
    }
  }, []);

  return (
    <>
      {/* Content if needed */}
      {singleBulletPoint.content && (
        <View>
          <Text style={bulletPointListStyles.detailsContent}>
            {singleBulletPoint.content}
          </Text>
        </View>
      )}

      {/* WebLink if needed */}
      {singleBulletPoint.link && (
        <View>
          <WebLink linkRequest={singleBulletPoint.link} />
        </View>
      )}

      {/* Image if needed */}
      {singleBulletPoint.image &&  (
          <View>
            <Image
              source={{ uri: downloadImageURL }}
              style={bulletPointListStyles.image}
              resizeMode="cover"
            />
          </View>
        )
      }

      {/* Map if needed */}
      {singleBulletPoint.map && (
        <View>
          <MapManager requestedMap={singleBulletPoint.map} />
        </View>
      )}

      {/* WebView if needed */}
      {singleBulletPoint.webview && (
        <View style={bulletPointListStyles.webview}>
          <WebView
            source={{ uri: singleBulletPoint.webview }}
          />
        </View>
      )}
    </>
    )
}

export default SingleBulletPoint