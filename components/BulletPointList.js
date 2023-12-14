import { Text, View, Image, FlatList } from "react-native";
import React from "react";
import MapManager from "./MapManager";
import WebLink from "./WebLink";
import WebView from "react-native-webview";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/FirebaseSetup";
import { bulletPointListStyles } from "../helper/HelperStyles";

const BulletPointList = ({ bulletPointList }) => {

  const getURL = async (imageStorageUrl) => {
    try {
      const imageRef = ref(storage, imageStorageUrl);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (err) {
      console.log(err);
    }
  };

  const renderSingleBulletPoint = ({ item }) => (
      <>
        {/* Content if needed */}
        {item.content && (
          <View>
            <Text style={bulletPointListStyles.detailsContent}>
              {item.content}
            </Text>
          </View>
        )}

        {/* WebLink if needed */}
        {item.link && (
          <View>
            <WebLink linkRequest={item.link} />
          </View>
        )}

        {/* Image if needed */}
        {item.image &&  (
            <View>
              <Image
                source={{ uri: getURL(item.image) }}
                style={bulletPointListStyles.image}
                resizeMode="cover"
              />
            </View>
          )
        }

        {/* Map if needed */}
        {item.map && (
          <View>
            <MapManager requestedMap={item.map} />
          </View>
        )}

        {/* WebView if needed */}
        {item.webview && (
          <View>
            <WebView
              source={{ uri: item.webview }}
              style={bulletPointListStyles.webview}
            />
          </View>
        )}
      </>
    )
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
      <View style={bulletPointListStyles.sectionContainer}>
        {/* Subtitle if needed */}
        {bulletPointList.subtitle && (
          <View >
            <Text style={bulletPointListStyles.subtitle}>
              {bulletPointList.subtitle}
            </Text>
          </View>
        )}

        {/* Bullet Point List if needed */}
        {bulletPointList.list && (
          <FlatList
            data={bulletPointList.list}
            renderItem={renderSingleBulletPoint}
            keyExtractor={(item) => item.id}
            />
        )}
      </View>
    </>
  );
};

export default BulletPointList;
