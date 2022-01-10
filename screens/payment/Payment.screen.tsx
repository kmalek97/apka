import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import WebView, { WebViewNavigation } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

const Payment = () => {

  useEffect(() => {
    openPaymentSheet();
  }, []);

  const navigation = useNavigation();

  const [url, setUrl] = useState('https://buy.stripe.com/test_dR614w96ifC32K4289');

  const openPaymentSheet = async () => {
    const uidd = await firebase.auth().currentUser?.uid;

    const docRef = await firebase
      .firestore()
      .collection("users")
      .doc(uidd)
      .collection("checkout_sessions")
      .add({
        price: "price_1K7fljI4IOxw6fNyTkdBQdKv",
        success_url: "https://www.google.pl/",
        cancel_url: "https://www.google.pl/",
      });
    docRef.onSnapshot((snap) => {
      const { error, url }: any = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (url === 'https://www.google.pl/') {
        navigation.goBack()
      }
      if (url && url !== 'https://www.google.pl/') {
        setUrl(url)
      }
    })
  };

  const onNavigationState = (webViewState: WebViewNavigation) => {
    if (webViewState.url === 'https://www.google.pl/') {
      navigation.goBack()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        onNavigationStateChange={onNavigationState}
      />
    </View>
  );
};

export default Payment;
