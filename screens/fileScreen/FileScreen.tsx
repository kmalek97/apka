import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native-paper";
import { IItemsData } from "../../components/EbookOrAudiobooks/content/FilePreview.types";
import Wrapper from "../../components/Wrapper";
import { IFileScreenProps } from "./FileScreen.types";

const FileScreen = () => {
  const {
    params: { dataItem },
  } = useRoute<IFileScreenProps>();
  console.log("PROPS: ", dataItem);
  return (
    <Wrapper>
      <Text>sdsdaadad</Text>
    </Wrapper>
  );
};

export default FileScreen;
