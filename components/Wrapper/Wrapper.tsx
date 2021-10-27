import React, { FC } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import theme from "./theme";

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      myOwnColor?: string;
    }

    interface Theme {
      myOwnProperty?: boolean;
    }
  }
}

const Wrapper: FC = ({ children }) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

export default Wrapper;
