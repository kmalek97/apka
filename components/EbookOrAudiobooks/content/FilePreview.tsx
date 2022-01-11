import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Card,
  Paragraph,
  Title,
  useTheme,
  Subheading,
  Button,
  Portal,
  Dialog,
} from "react-native-paper";
import SelfActivityIndicator from "../../ActivityIndicator/SelfActivityIndicator";
import {
  IFilePreviewProps,
  IItemsData,
  ISingleItem,
} from "./FilePreview.types";

const FilePreview = ({
  selectedType,
  getFile,
  ebooks,
  audiobooks,
  userState,
}: IFilePreviewProps) => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getFile(selectedType);
  }, [selectedType]);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const type = selectedType === "audio" ? audiobooks : ebooks;

  const theme = useTheme();

  const navigation = useNavigation();

  const onEndReached = (info: { distanceFromEnd: number }) => {
    console.log("info.distanceFromEnd", info.distanceFromEnd);

    if (info.distanceFromEnd < 0 && !type.empty) {
      getFile(selectedType, type[type.length - 1]);
    }
  };

  const deleteFile = (itemId: string) => {
    setIsLoading(true);
    const currentCollection =
      selectedType === "audio" ? "audiobooks" : "ebooks";
    firebase
      .firestore()
      .collection(currentCollection)
      .doc(itemId)
      .delete()
      .then((e) => {
        setIsLoading(false);
        hideDialog();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const renderItem = ({ item }: ISingleItem) => {
    const dataItem = item.data() as IItemsData;
    return (
      <Card style={{ marginBottom: 25 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FileScreen", {
              dataItem: { ...dataItem, id: item.id },
            });
          }}
        >
          <Card.Cover
            source={{ uri: dataItem.coverURL }}
            resizeMode="contain"
            style={{ backgroundColor: theme.colors.myOwnColor }}
          />
          <Card.Content>
            <Title>{dataItem.title}</Title>
            <Subheading>author: {dataItem.author}</Subheading>
            <Paragraph>{dataItem.description}</Paragraph>
          </Card.Content>
        </TouchableOpacity>
        {userState.userRole === "admin" ? (
          <Card.Actions>
            <Button onPress={() => showDialog()}>Delete</Button>
            <Portal>
              {isLoading ? <SelfActivityIndicator /> : null}
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Are you sure?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => deleteFile(item.id)}>Delete</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            <Button
              onPress={() =>
                navigation.navigate(
                  selectedType === "audio"
                    ? "AddAudiobookForm"
                    : "AddEbookForm",
                  { item }
                )
              }
            >
              Edit
            </Button>
          </Card.Actions>
        ) : null}
      </Card>
    );
  };

  return (
    <FlatList
      data={type}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedType}
      onEndReached={onEndReached}
      onEndReachedThreshold={0}
    />
  );
};

export default FilePreview;
