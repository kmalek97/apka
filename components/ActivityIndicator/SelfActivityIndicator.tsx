import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const windowHeight = Dimensions.get('window').height;

export default function SelfActivityIndicator() {
  return (
    <ActivityIndicator
      size={50}
      color="#E79A36"
      style={styles.activityIndicator}
    />
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    minHeight: windowHeight - 50,
  },
});
