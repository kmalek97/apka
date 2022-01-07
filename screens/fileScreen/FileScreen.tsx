import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import {
  Divider,
  Headline,
  Paragraph,
  Subheading,
  Title,
  useTheme,
} from "react-native-paper";
import Wrapper from "../../components/Wrapper";
import themee from "../../components/Wrapper/theme";
import { IFileScreenProps } from "./FileScreen.types";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import { styles as useStyles } from "./FileScreen.styles";
import { AntDesign } from "@expo/vector-icons";

const FileScreen = () => {
  const {
    params: { dataItem },
  } = useRoute<IFileScreenProps>();
  // console.log("PROPS: ", dataItem);

  const navigation = useNavigation();

  const theme = useTheme(themee);

  const styles = useStyles(theme);

  const allCategories = () => {
    return dataItem.categories.map((category) => {
      return (
        <View key={category.id} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>{category.name}</Text>
        </View>
      );
    });
  };

  const differentContent = () => {
    if (Number(dataItem.numberOfPages) > 0) {
      return (
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewMedia", {
                dataItem,
              })
            }
            style={styles.iconAndTimeContainer}
          >
            <AntDesign name="play" size={44} color={theme.colors.primary} />
          </TouchableOpacity>
          <Divider
            style={{ backgroundColor: theme.colors.primary, marginTop: 10 }}
          />
          <View style={styles.iconAndTimeContainer}>
            <Icon name="book" color="black" size={20} />
            <Paragraph>{dataItem.numberOfPages}</Paragraph>
          </View>
          <Divider style={{ backgroundColor: themee.colors.primary }} />
          <View>
            <View style={styles.typeContainer}>
              <Paragraph style={styles.paragraphStyle}>Type </Paragraph>
              <Headline>Ebook</Headline>
            </View>
            <View style={styles.typeContainer}>
              <Paragraph>Categories</Paragraph>
              <View style={styles.categoriesContainer}>{allCategories()}</View>
            </View>
            <View style={styles.typeContainer}>
              <Paragraph style={styles.paragraphStyle}>
                Publishing house{" "}
              </Paragraph>
              <Headline>{dataItem.publishing}</Headline>
            </View>
            <View style={styles.typeContainer}>
              <Paragraph>Publication date </Paragraph>
              <Headline>{dataItem.publicationDate}</Headline>
            </View>
            <View style={styles.typeContainer}>
              <Paragraph>Description </Paragraph>
              <Headline>{dataItem.description}</Headline>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ViewMedia", {
              dataItem,
            })
          }
          style={styles.iconAndTimeContainer}
        >
          <AntDesign name="play" size={44} color={theme.colors.primary} />
        </TouchableOpacity>
        <Divider
          style={{ backgroundColor: theme.colors.primary, marginTop: 10 }}
        />
        <View style={styles.iconAndTimeContainer}>
          <Icon name="headphones" color="black" size={20} />
          <Paragraph>
            {dataItem.time.hour}h{dataItem.time.minute}m
          </Paragraph>
        </View>
        <Divider style={{ backgroundColor: theme.colors.primary }} />
        <View>
          <View style={styles.typeContainer}>
            <Paragraph>Lector </Paragraph>
            <Headline>{dataItem.lector}</Headline>
          </View>
          <View style={styles.typeContainer}>
            <Paragraph>Type </Paragraph>
            <Headline>Audiobook</Headline>
          </View>
          <View style={styles.typeContainer}>
            <Paragraph>Categories </Paragraph>
            <View style={styles.categoriesContainer}>{allCategories()}</View>
          </View>
          <View style={styles.typeContainer}>
            <Paragraph>Publishing house </Paragraph>
            <Headline>{dataItem.publishing}</Headline>
          </View>
          <View style={styles.typeContainer}>
            <Paragraph>Publication date </Paragraph>
            <Headline>{dataItem.publicationDate}</Headline>
          </View>
          <View style={styles.typeContainer}>
            <Paragraph>Description </Paragraph>
            <Headline>{dataItem.description}</Headline>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Wrapper>
      <ScrollView style={styles.screenScrollContainer}>
        <View style={styles.screenContainer}>
          <View style={styles.coverContainer}>
            <Image source={{ uri: dataItem.coverURL }} style={styles.cover} />
          </View>
          <View style={{ alignSelf: "stretch" }}>
            <Title style={{ textAlign: "center" }}>{dataItem.title}</Title>
            <Subheading style={{ textAlign: "center" }}>
              {dataItem.author}
            </Subheading>
          </View>
          <View style={{ alignSelf: "stretch" }}>{differentContent()}</View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default FileScreen;
