import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from 'firebase';
import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./SearchScreen.styles";

const SearchScreen = () => {

  const navigation = useNavigation();
  const { params: { type } }: any = useRoute();

  const [books, setBooks] = useState<any>([]);

  const fetchData = (search: string) => {
    if (search.length === 0) {
      setBooks([]);
    } else {
      firebase
        .firestore()
        .collection(type)
        .where("title", ">=", search)
        .get()
        .then((snapshot) => {
          const book = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setBooks(book);
        });
    }
  };

  return (
    <View>
      <View
        style={styles.inputContainer}
      >
        <AntDesign name="search1" size={24} color="#7F8283" />
        <TextInput
          style={styles.inputText}
          placeholder="Title"
          onChangeText={(search) => fetchData(search)}
        />
      </View>

      <FlatList
        data={books}
        extraData={books}
        numColumns={1}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.userButton}
              onPress={() => navigation?.navigate("FileScreen", { dataItem: item })}
            >
              <Text style={styles.userText}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  )
}

export default SearchScreen;
