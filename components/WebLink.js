import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 
import { styles } from '../helper/HelperStyles';

const WebLink = ({linkRequest}) => {
  const handleLinkPress = () => {
    Linking.openURL(linkRequest.url);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLinkPress} style={webLinkStyles.linkContainer}>
        <Text style={[styles.detailsContent, webLinkStyles.linkURL]}>
          {linkRequest.title}
        </Text>
        <View style={webLinkStyles.linkIcon}>
          <EvilIcons name="external-link" size={14} color="blue" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WebLink;

const webLinkStyles = StyleSheet.create({
  linkContainer: {
    flexDirection: 'row',
  },
  linkURL: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  linkIcon: {
    alignSelf: "flex-start"
  }
});