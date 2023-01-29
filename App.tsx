import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import * as firebase from "firebase";
import { StripeProvider } from "@stripe/stripe-react-native";

import AplicationNavigation from "./components/AplicationNavigation";

var firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXX.firebaseapp.com",
  projectId: "XXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXX",
  messagingSenderId: "1111111111111",
  appId: "X:XXXXXXXXXXXXXXXX",
  measurementId: "X-XXXXXXXXXX",
};

if (firebase.default.apps.length === 0) {
  firebase.default.initializeApp(firebaseConfig);
}

function App() {
  return (
    <StripeProvider publishableKey="XX_XXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX">
      <Provider store={store}>
        <AplicationNavigation />
      </Provider>
    </StripeProvider>
  );
}

export default App;
