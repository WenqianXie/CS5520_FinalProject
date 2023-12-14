import { Text, View, Image, FlatList } from "react-native";
import React from "react";
import MapManager from "./MapManager";
import WebLink from "./WebLink";
import WebView from "react-native-webview";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/FirebaseSetup";
import { bulletPointListStyles } from "../helper/HelperStyles";
import SingleBulletPoint from "./SingleBulletPoint";

const BulletPointList = ({ bulletPointList }) => {
  console.log("bulletPointList: ", bulletPointList);

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
            renderItem={({ item, index}) => (
              <SingleBulletPoint singleBulletPoint={item} key={index}/>
            )}
            />
        )}
      </View>
    </>
  );
};

export default BulletPointList;
