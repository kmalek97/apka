import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import Wrapper from "../../components/Wrapper";

import { styles } from "./InitialScreen.styles";
import { IInitialScreenProps } from "./InitialScreen.types";

const InitialScreen = ({ loginPress, registerPress }: IInitialScreenProps) => {
  const navigation = useNavigation();

  const login = () => {
    loginPress ? loginPress() : navigation.navigate("Login");
  };

  const register = () => {
    registerPress ? registerPress() : navigation.navigate("Register");
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        <TouchableOpacity onPress={login}>
          <Button
            mode="outlined"
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            log in
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={register}>
          <Button
            mode="outlined"
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            register
          </Button>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};
export default InitialScreen;
