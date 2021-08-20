import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import EbookOrAudiobooks from '../../components/EbookOrAudiobooks/EbookOrAudiobooks.component';
import Wrapper from '../../components/Wrapper';
import { styles } from './Home.styles';
import firebase from 'firebase';

export default function Home() {
  const ads = () => {
    firebase.auth().signOut();
  };

  return (
    <Wrapper>
      <Appbar.Header>
        <Appbar.Content title="All Books" color="#E5E7E9" />
        <Appbar.Action icon="dots-horizontal" color="#E5E7E9" onPress={ads} />
        <Appbar.Action icon="magnify" color="#E5E7E9" onPress={() => { }} />
      </Appbar.Header>
      <View style={styles.screenContainer}>
        <EbookOrAudiobooks />
      </View>
    </Wrapper>
  );
}
