import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import {
  Card,
  Paragraph,
  Title,
  useTheme,
  Subheading,
} from "react-native-paper";
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
}: IFilePreviewProps) => {
  useEffect(() => {
    getFile(selectedType);
  }, [selectedType]);

  const type = selectedType === "audio" ? audiobooks : ebooks;

  const theme = useTheme();

  const navigation = useNavigation();

  const onEndReached = (info: { distanceFromEnd: number }) => {
    // console.log("info.distanceFromEnd", info.distanceFromEnd);
    if (info.distanceFromEnd < 0 && !type.empty) {
      // console.log("type[type.length - 1]", type[type.length - 1]);
      getFile(selectedType, type[type.length - 1]);
    }
  };

  const renderItem = ({ item }: ISingleItem) => {
    const dataItem = item.data() as IItemsData;
    return (
      <Card
        style={{ marginBottom: 25 }}
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
