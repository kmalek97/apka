import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import firebase from 'firebase'

export default function UserAccount() {
  const asd = () => {
    firebase.auth().signOut();
  };

  return (
    <View>
      <Button onPress={asd}>log out</Button>
    </View>
  );
}
