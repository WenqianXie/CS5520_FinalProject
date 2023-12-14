import { Text, View, FlatList } from "react-native";
import React from "react";
import { bulletPointListStyles } from "../helper/HelperStyles";
import SingleBulletPoint from "./SingleBulletPoint";

const BulletPointList = ({ bulletPointList }) => {
  // this is the component for rendering a list of bullet points
  // which uses the SingleBulletPoint component to render each bullet point
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

        {/* if there are multiple bulletpoints, render with FlatList. Otherwise, render directly */}
        {bulletPointList.list ? (
          <FlatList
            data={bulletPointList.list}
            renderItem={({ item, index}) => (
              <SingleBulletPoint singleBulletPoint={item} key={index}/>
            )}
            />
        ) : (
          <SingleBulletPoint singleBulletPoint={bulletPointList}/>
        )
      }
      </View>
    </>
  );
};

export default BulletPointList;
