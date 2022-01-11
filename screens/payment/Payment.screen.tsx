import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import WebView, { WebViewNavigation } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

const Payment = ({ userState }: any) => {
  useEffect(() => {
    if (userState.paymentStatus) {
      openPaymentInfo();
    } else {
      openPaymentSheet();
    }
  }, []);

  const navigation = useNavigation();

  const [url, setUrl] = useState("");

  const openPaymentInfo = async () => {
    const functionRef = firebase
      .app()
      .functions("us-central1")
      .httpsCallable("ext-firestore-stripe-payments-createPortalLink");
    const { data } = await functionRef({
      returnUrl: "https://www.google.pl/",
      locale: "auto",
      configuration: "bpc_1Jyx88I4IOxw6fNyPXAJE7Kz",
    });
    setUrl(data.url);
  };

  const openPaymentSheet = async () => {
    const uid = await firebase.auth().currentUser?.uid;
    // console.log(userState);
    const docRef = await firebase
      .firestore()
      .collection("users")
      .doc(userState.userId)
      // .doc(uid)
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
      if (url) {
        setUrl(url);
      }
    });
  };

  const onNavigationState = (webViewState: WebViewNavigation) => {
    if (webViewState.url === "https://www.google.pl/") {
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!!url.length && (
        <WebView
          source={{ uri: url }}
          onNavigationStateChange={onNavigationState}
        />
      )}
    </View>
  );
};

export default Payment;
