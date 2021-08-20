import React, {FC} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native';

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

const theme = {
  ...DefaultTheme,
  // Specify custom property in nested object

  colors: {
    ...DefaultTheme.colors,
    primary: '#E79A36',
    accent: '#fff',
    surface: '#fff',
  },
};

const Wrapper: FC = ({children}) => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView>{children}</SafeAreaView>
    </PaperProvider>
  );
};

export default Wrapper;
