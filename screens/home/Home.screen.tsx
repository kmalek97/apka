import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import EbookOrAudiobooks from '../../components/EbookOrAudiobooks/EbookOrAudiobooks.component';
import Wrapper from '../../components/Wrapper';
import { styles } from './Home.styles';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const ads = () => {
    firebase.auth().signOut();
  };

  const navigation = useNavigation();

  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Wrapper>
      <Appbar.Header>
        <Appbar.Content title="All Books" color="#E5E7E9" />
        {/* <Appbar.Action icon="dots-horizontal" color="#E5E7E9" onPress={ads} /> */}
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon={"magnify"}
              onPress={openMenu}
              color="#E5E7E9"
            />
          }
        >
          <>
            <Menu.Item
              onPress={() => {
                closeMenu(), navigation.navigate("SearchScreen", { type: 'ebooks' });
              }}
              title="Search for ebook"
            />
            <Menu.Item
              onPress={() => {
                closeMenu(), navigation.navigate("SearchScreen", { type: 'audiobooks' });
              }}
              title="Search for audiobook"
            />
          </>
        </Menu>
      </Appbar.Header>
      <View style={styles.screenContainer}>
        <EbookOrAudiobooks />
      </View>
    </Wrapper>
  );
}
