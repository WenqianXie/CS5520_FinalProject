import { StyleSheet, Text, View, Platform, Image } from "react-native";
import React, { useEffect, useState } from "react";
import MapManager from "./MapManager";
import WebLink from "./WebLink";
import WebView from "react-native-webview";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/FirebaseSetup";
import { ActivityIndicator } from "react-native";
import { colors } from "../helper/HelperColors";
import { bulletPointContentStyles } from "../helper/HelperStyles";

const BulletPointContent = ({ bulletPointContent }) => {
  const [downloadImageURL, setDownloadImageURL] = useState(null);
  useEffect(() => {
    if (bulletPointContent.image) {
      console.log("bulletPointContent.image: ", bulletPointContent.image);
      const getURL = async () => {
        try {
          const imageRef = ref(storage, bulletPointContent.image);
          console.log("imageRef: ", imageRef);
          const url = await getDownloadURL(imageRef);
          console.log("download url: ", url);
          setDownloadImageURL(url);
        } catch (err) {
          console.log(err);
        }
      };
      getURL();
    }
  }, []);
  // return (
  //   <>
  //     <View>
  //       {/* Subtitle if needed */}
  //       {bulletPointContent.subtitle && (
  //         <View style={bulletPointContentStyles.subtitleContainer}>
  //           <Text style={bulletPointContentStyles.bullet}></Text>
  //           <Text style={bulletPointContentStyles.subtitle}>
  //             {bulletPointContent.subtitle}
  //           </Text>
  //         </View>
  //       )}

  //       {/* Content if needed*/}
  //       {bulletPointContent.content && (
  //         <View style={bulletPointContentStyles.contentContainer}>
  //           <Text style={bulletPointContent.detailsContent}>
  //             {bulletPointContent.content}
  //           </Text>
  //         </View>
  //       )}

  //       {/* WebLink if needed */}
  //       {bulletPointContent.link && (
  //         <WebLink linkRequest={bulletPointContent.link} />
  //       )}

  //       {/* Image if needed */}
  //       {bulletPointContent.image && (
  //         <View>
  //           {!downloadImageURL ? (
  //             <ActivityIndicator size="large" color={colors.themeDark} />
  //           ) : (
  //             <Image
  //               source={{ uri: downloadImageURL }}
  //               style={bulletPointContentStyles.image}
  //               resizeMode="cover"
  //             />
  //           )}
  //         </View>
  //       )}

  //       {/* Map if needed */}
  //       {bulletPointContent.map && (
  //         <MapManager requestedMap={bulletPointContent.map} />
  //       )}

  //       {/* Webview if needed */}
  //       {bulletPointContent.webview && (
  //         <WebView
  //           source={{ uri: bulletPointContent.webview }}
  //           style={bulletPointContentStyles.webview}
  //         />
  //       )}
  //     </View>
  //   </>
  // );
  return (
    <>
      <View style={bulletPointContentStyles.sectionContainer}>
        {/* Subtitle if needed */}
        {bulletPointContent.subtitle && (
          <View >
            <Text style={bulletPointContentStyles.subtitle}>
              {bulletPointContent.subtitle}
            </Text>
          </View>
        )}

        {/* Content if needed */}
        {bulletPointContent.content && (
          <View>
            <Text style={bulletPointContentStyles.detailsContent}>
              {bulletPointContent.content}
            </Text>
          </View>
        )}

        {/* WebLink if needed */}
        {bulletPointContent.link && (
          <View>
            <WebLink linkRequest={bulletPointContent.link} />
          </View>
        )}

        {/* Image if needed */}
        {bulletPointContent.image && (
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
        )}

        {/* Map if needed */}
        {bulletPointContent.map && (
          <View>
            <MapManager requestedMap={bulletPointContent.map} />
          </View>
        )}

        {/* WebView if needed */}
        {bulletPointContent.webview && (
          <View>
            <WebView
              source={{ uri: bulletPointContent.webview }}
              style={bulletPointContentStyles.webview}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default BulletPointContent;
