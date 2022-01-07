import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import FilePreview from "./content";
import { styles } from "./EbookOrAudiobooks.styles";
import { ITypes } from "./EbookorAudiobooks.types";

export default function EbookOrAudiobooks() {
  const [selectedType, setSelectedType] = useState<ITypes>("ebook");

  const check = (type: ITypes) => {
    return selectedType === type ? styles.button : styles.buttonOff;
  };

  return (
    <>
      <View style={styles.buttonsContainer}>
        <Button
          style={check("ebook")}
          labelStyle={styles.buttonText}
          mode="outlined"
          onPress={() => setSelectedType("ebook")}
        >
          Ebooks
        </Button>

        <Button
          labelStyle={styles.buttonText}
          style={check("audio")}
          mode="outlined"
          onPress={() => setSelectedType("audio")}
        >
          Audiobooks
        </Button>
      </View>
      <View>
        <FilePreview selectedType={selectedType} />
      </View>
    </>
  );
}
