import { StyleSheet, Text, SafeAreaView, Button, FlatList } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import BulletPointList from "../components/BulletPointList";
import { readInfoData, writeToInfoDataDB } from "../firebase/FirebaseHelper";

const Details = ({ navigation, route }) => {
  //Temporary Manual Data
  const manualContents = route.params.detailsContent;
  const manualCategory = route.params.category;
  const manualDocID = route.params.docID;

  //Online data
  const [contents, setContents] = useState("")

  let headerTitle; 
  if (manualContents) {
    headerTitle = manualContents.title;
  }  else {
    headerTitle = "Loading";
  }

  useEffect(() => {
    navigation.setOptions({ title: headerTitle });
  }, [navigation]);

  useEffect(() => {
    const getContent = async () => {
      try{
        if(route.params.topic){ //to be deleted
          const downloadedContent = await readInfoData(route.params.topic)
          setContents(downloadedContent)
          navigation.setOptions({title: downloadedContent.title})
        }
      } catch (err){
        console.log(err)
      }
    }
    getContent()
  },[navigation])

  return (
    <SafeAreaView style={detailsStyles.detailsContainer}>
      {!manualContents && !contents  
        && <Text>Loading</Text>
      }
      {contents &&
        <FlatList
          style={{flex:1}}
          data={contents.contents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <BulletPointList bulletPointList={item} key={index}/>
          )}
        />
         }

      {manualContents && 
        <FlatList
          style={{flex:1}}
          data={manualContents.contents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <BulletPointList bulletPointList={item} key={index}/>
          )}
        />
        }
      {manualCategory && 
        <Button title="All good. Upload to Firebase" onPress={() => writeToInfoDataDB(manualContents, manualCategory, manualDocID)}/>
      }
    </SafeAreaView>
  );
};

export default Details;

const detailsStyles = StyleSheet.create({
  detailsContainer: {
    paddingHorizontal: "7%",
    paddingTop: "5%",
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
