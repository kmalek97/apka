import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, Avatar, Divider, Headline, Menu } from "react-native-paper";
import firebase from "firebase";
import Wrapper from "../../components/Wrapper";
import { styles } from "./UserAccount.styles";
import { IUserAccountProps } from "./UserAccount.types";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import SelfActivityIndicator from "../../components/ActivityIndicator/SelfActivityIndicator";

const UserAccount = ({ userState, isLoading }: IUserAccountProps) => {
  useEffect(() => {
    if (!userState.userName) {
      signOut();
    }
  }, []);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const navigation = useNavigation();

  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.5,
    });

    if (!result.cancelled) {
      uploadImage(result?.uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase
      .storage()
      .ref()
      .child(`avatar/${userState.userId}/${Math.random().toString(36)}`)
      .put(blob);

    const taskProgress = (snapshot: { bytesTransferred: any }) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        saveAvatar(snapshot);
      });
    };

    const taskError = (snapshot: any) => {
      alert(`Something went wrong ${snapshot}`);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const saveAvatar = (downloadURL: string) => {
    firebase.firestore().collection("users").doc(userState.userId).update({
      downloadURL,
    });
  };

  return (
    <Wrapper>
      {isLoading ? (
        <SelfActivityIndicator />
      ) : (
        <>
          <Appbar.Header>
            <Appbar.Content title="Profile" color="#E5E7E9" />
            <View />
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <Appbar.Action
                  icon={"dots-horizontal"}
                  onPress={openMenu}
                  color="#E5E7E9"
                />
              }
            >
              <Menu.Item onPress={signOut} title="Sign out" />
              <Divider />
              {userState.userRole === "admin" ? (
                <>
                  <Menu.Item
                    onPress={() => {
                      closeMenu(), navigation.navigate("AddEbookForm");
                    }}
                    title="Add ebook"
                  />
                  <Menu.Item
                    onPress={() => {
                      closeMenu(), navigation.navigate("AddAudiobookForm");
                    }}
                    title="Add audiobook"
                  />
                </>
              ) : null}
            </Menu>
          </Appbar.Header>
          <View style={styles.dataContainer}>
            <TouchableOpacity onPress={pickImage}>
              {!userState.userAvatar?.length ? (
                <Avatar.Text
                  size={150}
                  label={userState.userName.slice(0, 2).toUpperCase()}
                  labelStyle={styles.imageLabel}
                />
              ) : (
                <Avatar.Image
                  size={150}
                  source={{ uri: userState.userAvatar }}
                />
              )}
            </TouchableOpacity>
            <Headline>{userState.userName}</Headline>
          </View>
        </>
      )}
    </Wrapper>
  );
};

export default UserAccount;
