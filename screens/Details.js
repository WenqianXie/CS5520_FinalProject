import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import { useEffect } from "react";
import BulletPointContent from "../components/BulletPointContent";
import { readInfoData, writeToInfoDataDB } from "../firebase/FirebaseHelper";

const Details = ({ navigation, route }) => {
  const contents = route.params.detailsContent;
  const category = route.params.category;
  const docID = route.params.docID;
  const headerTitle = contents.title;
  // const [contents, setContents] = useState("")


  useEffect(() => {
    navigation.setOptions({ title: headerTitle });
  }, [navigation]);

  // useEffect(() => {
  //   const getContent = async () => {
  //     try{
  //       console.log("topic is : ", route.params.topic)
  //     const downloadedContent = await readInfoData(route.params.topic)
  //     console.log("downloadedContent is: ", downloadedContent)
  //     setContents(downloadedContent)
  //     } catch (err){
  //       console.log(err)
  //     }
  //   }
  //   getContent()
  // },[navigation])

  return (
    <SafeAreaView style={detailsStyles.detailsContainer}>
    {/*!contents  ? <Text>Loading</Text>
                  : contents.contents.map((bulletPointContent, index) => (
        <BulletPointContent bulletPointContent={bulletPointContent} key={index}/>
                  )) */}
      {contents.contents.map((bulletPointContent, index) => (
        <BulletPointContent
          bulletPointContent={bulletPointContent}
          key={index}
        />
      ))}
      {category && 
        <Button title="All good. Upload to Firebase" onPress={() => writeToInfoDataDB(contents, category, docID)}/>
      }
    </SafeAreaView>
  );
};

export default Details;

const detailsStyles = StyleSheet.create({
  detailsContainer: {
    padding: "7%",
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
