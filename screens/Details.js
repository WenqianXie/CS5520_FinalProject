import { StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import BulletPointList from "../components/BulletPointList";
import { readInfoData } from "../firebase/FirebaseHelper";

const Details = ({ navigation, route }) => {
  // this is the screen for the details of a specific topic
  // which will be rendered according to the topic selected

  const [contents, setContents] = useState("")
  
  // fetch the data from the database and set the header title to the topic name
  useEffect(() => {
    const getContent = async () => {
      try{
        if(route.params.topic){ 
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
      {!contents ? ( // if the contents is not loaded yet, show loading
        <Text>Loading</Text>
      ) : ( // if the contents is loaded, show the contents
        <FlatList
          style={{flex:1}}
          data={contents.contents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <BulletPointList bulletPointList={item} key={index}/>
          )}
        />
      )}

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
