// Purpose: This file creates a component that displays a link to a website.

import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 
import { bulletPointListStyles } from '../helper/HelperStyles';

const WebLink = ({linkRequest}) => {
  const handleLinkPress = () => {
    Linking.openURL(linkRequest.url);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLinkPress} style={webLinkStyles.linkContainer}>
        <Text style={[bulletPointListStyles.detailsContent, webLinkStyles.linkURL]}>
          {linkRequest.title}
        </Text>
        <View style={webLinkStyles.linkIcon}>
          <EvilIcons name="external-link" size={14} color="steelblue" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WebLink;

const webLinkStyles = StyleSheet.create({
  linkContainer: {
    flexDirection: 'row',
    alignSelf: 'right',
    justifyContent: 'flex-start',
  },
  linkURL: {
    textDecorationLine: 'underline',
    color: 'steelblue',
  },
  linkIcon: {
    alignSelf: "flex-start"
  }
});