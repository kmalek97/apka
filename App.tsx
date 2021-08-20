import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import * as firebase from 'firebase';

import AplicationNavigation from './components/AplicationNavigation';

var firebaseConfig = {
  apiKey: "AIzaSyAEzbWm3_D-9LuA6qNGw-MDeg6LYsDGoCw",
  authDomain: "library-8e9d1.firebaseapp.com",
  projectId: "library-8e9d1",
  storageBucket: "library-8e9d1.appspot.com",
  messagingSenderId: "308073493480",
  appId: "1:308073493480:web:eac3aebec6637ad19fea5d",
  measurementId: "G-8QX7WSX3PN"
};
// Initialize Firebase
if (firebase.default.apps.length === 0) {
  firebase.default.initializeApp(firebaseConfig);
}


 function App() {
  return (
    <Provider store={store}>
      <AplicationNavigation />
    </Provider>
  );
}

export default App

