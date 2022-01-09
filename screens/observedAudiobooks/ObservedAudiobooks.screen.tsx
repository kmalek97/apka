import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react'
import { View } from 'react-native'
import { List } from 'react-native-paper';

const ObservedAudiobooks = () => {

  const navigation = useNavigation();

  const { params: { finalData } }: any = useRoute();

  return (
    <View>
      {finalData.map((book: any) => {
        return (
          <List.Item title={book.title}
            onPress={() => navigation?.navigate("FileScreen", { dataItem: book })}
          />
        )
      })}
    </View>
  )
}

export default ObservedAudiobooks